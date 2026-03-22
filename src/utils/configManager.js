import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_PATH = path.join(os.homedir(), '.aex-code.json');

export const loadConfig = () => {
    if (fs.existsSync(CONFIG_PATH)) {
        try {
            const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
            return JSON.parse(raw);
        } catch (e) {
            return {};
        }
    }
    return {};
};

export const saveConfig = (newConfig) => {
    const config = { ...loadConfig(), ...newConfig };
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), 'utf-8');
    return config;
};

export const getConfig = (key) => loadConfig()[key];
