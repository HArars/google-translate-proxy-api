# Google Translate Proxy API

基于 Express.js 和 Google Translate API 的翻译代理服务，支持多语言翻译。

## 快速部署

点击下方按钮一键部署到 Vercel：

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/HArars/google-translate-proxy-api)

**环境变量配置：**
- `SECRET_KEY`：API 授权密钥（必需）

部署后在 Vercel 项目设置中添加环境变量，或使用命令：
```bash
vercel env add SECRET_KEY
```

## API 端点

所有翻译端点需要在请求头中携带：`Authorization: Bearer YOUR_SECRET_KEY`

- `GET /api/health` - 健康检查（无需授权）
- `POST /api/translate` - 文本翻译

**请求参数：**
```json
{
  "query": "要翻译的文本",
  "src": "源语言代码（可选，自动检测）",
  "dest": "目标语言代码"
}
```

**语言代码示例：**
- `zh-CN` - 简体中文
- `en` - 英语
- `ja` - 日语
- `ko` - 韩语
- `fr` - 法语
- `de` - 德语
- `es` - 西班牙语

## 使用示例

### 健康检查
```bash
curl -X GET "https://your-app.vercel.app/api/health"
```

### 翻译文本（自动检测源语言）
```bash
curl -X POST "https://your-app.vercel.app/api/translate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secret_key" \
  -d '{"query": "你好世界", "dest": "en"}'
```

### 翻译文本（指定源语言）
```bash
curl -X POST "https://your-app.vercel.app/api/translate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your_secret_key" \
  -d '{"query": "Hello World", "src": "en", "dest": "zh-CN"}'
```

**响应示例：**
```json
{
  "status": "200",
  "results": "Hello World"
}
```

## 本地开发

```bash
# 克隆仓库
git clone https://github.com/YOUR_USERNAME/google-translate-proxy-api.git
cd google-translate-proxy-api

# 安装依赖
npm install

# 创建 .env 文件并配置 SECRET_KEY
echo "SECRET_KEY=your_secret_key_here" > .env

# 启动本地服务
npm run dev
```

本地服务将在 `http://localhost:3000` 启动。

## License

MIT
