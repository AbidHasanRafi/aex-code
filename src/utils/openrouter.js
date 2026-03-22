import OpenAI from 'openai';
import { getConfig } from './configManager.js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local', silent: true });

export const createClient = () => {
    const apiKey = process.env.OPENROUTER_API_KEY || getConfig('OPENROUTER_API_KEY');
    if (!apiKey) {
        throw new Error('OpenRouter API Key not found. Please run "aex-code config" to setup your key.');
    }

    return new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: apiKey.trim(),
        defaultHeaders: {
            'HTTP-Referer': 'https://github.com/aex-code',
            'X-Title': 'AEX Code CLI',
        }
    });
};

export const debugApiKey = () => {
    const key = process.env.OPENROUTER_API_KEY || getConfig('OPENROUTER_API_KEY');
    if (!key) return null;
    return `${key.substring(0, 10)}...${key.slice(-4)}`;
};

export const getDefaultModel = () => {
    return process.env.OPENROUTER_DEFAULT_MODEL || getConfig('OPENROUTER_DEFAULT_MODEL') || 'qwen/qwen-2.5-coder-32b-instruct:free';
};
