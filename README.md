# MBTI 测试网站

48 题 MBTI 性格测试，支付后查看完整报告。

## 技术栈

- React + TypeScript + Vite
- Tailwind CSS
- Cloudflare Pages + Functions
- 志云付支付

## 本地开发

```bash
npm install
npm run dev
```

## 部署

```bash
npm run build
wrangler pages deploy dist --project-name mbti-test
```

## 环境变量 (Cloudflare)

- `ZY_PID` - 志云付商户ID
- `ZY_PRIVATE_KEY` - 商户私钥
- `ZY_PUBLIC_KEY` - 平台公钥
- `ZY_PRICE` - 价格（默认1元）
