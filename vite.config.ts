import path from 'path';
import { defineConfig } from 'vite'; // No necesitamos loadEnv si usamos el formato VITE_ estándar
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        port: 3000,
        host: '0.0.0.0',
    },
    plugins: [react()],
    // ELIMINAMOS EL BLOQUE 'define' para usar el formato estándar de Vite (import.meta.env.VITE_...)
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '.'),
        }
    }
});
