import path from 'path';

import {defineConfig} from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@platform': path.resolve(__dirname, "src/platform"),
            '@math': path.resolve(__dirname, "src/math"),
            '@app': path.resolve(__dirname, "src/app"),
            '@editors': path.resolve(__dirname, "src/editors"),
            '@players': path.resolve(__dirname, "src/players"),
            '@components': path.resolve(__dirname, "src/components"),
            '@data': path.resolve(__dirname, "src/data"),
            '@api': path.resolve(__dirname, "src/api"),
            '@hooks': path.resolve(__dirname, "src/hooks"),
            '@external': path.resolve(__dirname, "src/external"),
            '@wasm': path.resolve(__dirname, "src/wasm"),
            '@views': path.resolve(__dirname, "src/views"),
            '@world': path.resolve(__dirname, "src/world"),
            '@icons': path.resolve(__dirname, "src/icons")
        }
    },
    build: {
        outDir: "build"
    },
    clearScreen: false,
    server: {
        strictPort: true,
        port: 3000,
        proxy: {
            "/api": "http://127.0.0.1:8000",
        }
    },


    plugins: [react()],
})
