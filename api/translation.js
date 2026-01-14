import dotenv from 'dotenv';
import express from 'express';
import { translate } from '@vitalets/google-translate-api';

dotenv.config();

const app = express();

const SECRET_KEY = process.env.SECRET_KEY;

app.use(express.json());

function authorizeRequest(req, res, next) {
    console.log('>> Authorizing request...');
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${SECRET_KEY}`) {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
}

async function parseRequestBody(req) {
    const { query, src, dest } = req.body;
    return { query, src, dest };
}

app.get('/api/health', async (req, res) => {
    console.log('>> api health checking...');
    res.status(200).json({ status: 'ok' });
});

app.post('/api/translate', authorizeRequest, async (req, res) => {
    console.log('>> translate...');
    try {
        const { query, src, dest } = await parseRequestBody(req);
        if (!query) {
            return res.status(400).json({ error: "Missing required parameter: query" });
        }
        const options = src ? { from: src, to: dest } : { to: dest };
        const { text } = await translate(query, options);
        res.json({ status: "200", results: text });
    } catch (error) {
        console.error('Error during search:', error);
        res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
    }
});

// 错误处理
app.use((err, req, res, next) => {
    console.log('>> Error:', err);
    res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

export default app;