/**
 * Cloudflare Pages Function: 查询订单状态
 * GET /api/zy/query-order?outTradeNo=xxx
 */

export async function onRequest(context) {
  const { request, env } = context
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers })
  }

  try {
    const API_BASE = env.ZY_API_BASE || 'http://pay.zy520888.com'
    const PID = env.ZY_PID
    const PRIVATE_KEY = getPrivateKey(env.ZY_PRIVATE_KEY || '')

    if (!PID || !PRIVATE_KEY) {
      return new Response(JSON.stringify({ error: 'Missing ZY config' }), { status: 500, headers })
    }

    const url = new URL(request.url)
    const outTradeNo = url.searchParams.get('outTradeNo')
    
    if (!outTradeNo) {
      return new Response(JSON.stringify({ error: 'outTradeNo required' }), { status: 400, headers })
    }

    console.log('Querying order:', outTradeNo)

    const params = {
      pid: parseInt(PID, 10),
      out_trade_no: outTradeNo,
      timestamp: Math.floor(Date.now() / 1000).toString(),
      sign_type: 'RSA',
    }
    params.sign = await signParams(params, PRIVATE_KEY)

    const resp = await postForm(`${API_BASE}/api/pay/query`, params)
    console.log('ZY query response:', JSON.stringify(resp))

    if (resp.code !== 0) {
      return new Response(JSON.stringify({ 
        outTradeNo, 
        paid: false, 
        status: 0,
        error: resp.msg 
      }), { status: 200, headers })
    }

    const paid = Number(resp.status) === 1
    return new Response(JSON.stringify({ 
      outTradeNo, 
      paid, 
      status: resp.status,
      tradeNo: resp.trade_no,
      money: resp.money
    }), { status: 200, headers })

  } catch (err) {
    console.error('Query error:', err.message)
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers })
  }
}

function getPrivateKey(raw) {
  if (!raw) return ''
  let text = raw.replace(/\\n/g, '\n').replace(/\s+/g, '').trim()
  text = text
    .replace(/-----BEGIN\s*(RSA\s*)?PRIVATE\s*KEY-----/gi, '')
    .replace(/-----END\s*(RSA\s*)?PRIVATE\s*KEY-----/gi, '')
    .replace(/\s/g, '')
  const lines = text.match(/.{1,64}/g) || [text]
  return `-----BEGIN PRIVATE KEY-----\n${lines.join('\n')}\n-----END PRIVATE KEY-----`
}

function buildSignString(params) {
  return Object.entries(params)
    .filter(([key, value]) => {
      if (key === 'sign' || key === 'sign_type') return false
      if (value === undefined || value === null) return false
      if (typeof value === 'string' && value.trim() === '') return false
      return true
    })
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
}

async function signParams(params, privateKeyPem) {
  const signString = buildSignString(params)
  
  const pemContents = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')
  
  const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0))
  
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const encoder = new TextEncoder()
  const data = encoder.encode(signString)
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, data)
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}

async function postForm(url, params) {
  const stringParams = {}
  for (const [key, value] of Object.entries(params)) {
    stringParams[key] = String(value)
  }
  
  const body = new URLSearchParams(stringParams).toString()
  
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  
  const text = await resp.text()
  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}
