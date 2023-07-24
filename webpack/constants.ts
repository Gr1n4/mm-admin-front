import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: '../.env' });

export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = process.env.NODE_ENV === 'production';
export const __BASE_URL__ = __DEV__ ? "'./'" : "'./'";
export const __API_URL__ = __DEV__ ? "'http://localhost:1337'" : "'https://test-project.site/api'";

export const rootDir = resolve(__dirname, '../');
export const distDir = resolve(rootDir, 'dist');
export const srcDir = resolve(rootDir, 'src');
export const libsDir = resolve(srcDir, 'libs');
export const srcDesktopDir = resolve(srcDir, 'app');
export const assetsDir = resolve(srcDir, 'assets');
