/**
 * Cloudflare Pages Function: 支付回调通知
 * GET/POST /api/zy/notify
 */

export async function onRequest(context) {
  const { request, env } = context

  try {
    const url = new URL(request.url)
    const params = Object.fromEntries(url.searchParams)
    
    // 如果是 POST，合并 body 参数
    if (request.method === 'POST') {
      const contentType = request.headers.get('content-type') || ''
      if (contentType.includes('application/x-www-form-urlencoded')) {
        const body = await request.text()
        for (const [key, value] of new URLSearchParams(body)) {
          params[key] = value
        }
      }
    }

    console.log('Notify params:', JSON.stringify(params))

    const PUBLIC_KEY = getPublicKey(env.ZY_PUBLIC_KEY || '')
    
    if (!PUBLIC_KEY) {
      console.log('Missing public key')
      return new Response('error', { status: 500 })
    }

    // 验签
    const isValid = await verifyParams(params, PUBLIC_KEY)
    if (!isValid) {
      console.log('Invalid signature')
      return new Response('invalid sign', { status: 400 })
    }

    if (params.trade_status !== 'TRADE_SUCCESS') {
      console.log('Invalid trade status:', params.trade_status)
      return new Response('invalid status', { status: 400 })
    }

    console.log('Payment success:', params.out_trade_no)
    
    // 返回 success 告诉志云付已收到通知
    return new Response('success', { status: 200 })

  } catch (err) {
    console.error('Notify error:', err.message)
    return new Response('error', { status: 500 })
  }
}

function getPublicKey(raw) {
  if (!raw) return ''
  let text = raw.replace(/\\n/g, '\n').replace(/\s+/g, '').trim()
  text = text
    .replace(/-----BEGIN\s*PUBLIC\s*KEY-----/gi, '')
    .replace(/-----END\s*PUBLIC\s*KEY-----/gi, '')
    .replace(/\s/g, '')
  const lines = text.match(/.{1,64}/g) || [text]
  return `-----BEGIN PUBLIC KEY-----\n${lines.join('\n')}\n-----END PUBLIC KEY-----`
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

async function verifyParams(params, publicKeyPem) {
  const sign = params.sign
  if (!sign) return false
  
  const signString = buildSignString(params)
  
  try {
    const pemContents = publicKeyPem
      .replace(/-----BEGIN PUBLIC KEY-----/, '')
      .replace(/-----END PUBLIC KEY-----/, '')
      .replace(/\s/g, '')
    
    const binaryKey = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0))
    
    const publicKey = await crypto.subtle.importKey(
      'spki',
      binaryKey,
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    )

    const encoder = new TextEncoder()
    const data = encoder.encode(signString)
    const signature = Uint8Array.from(atob(sign), c => c.charCodeAt(0))
    
    return await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signature, data)
  } catch (err) {
    console.error('Verify error:', err.message)
    return false
  }
}
