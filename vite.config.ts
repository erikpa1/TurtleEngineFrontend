import path from 'path';

import {defineConfig} from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@platform': path.resolve(__dirname, "src/platform"),
            '@app': path.resolve(__dirname, "src/app"),
            '@editors': path.resolve(__dirname, "src/editors"),
            '@players': path.resolve(__dirname, "src/players"),
            '@components': path.resolve(__dirname, "src/components"),
            '@external': path.resolve(__dirname, "src/external")
        }
    },
    build: {
        outDir: "build"
    },
    clearScreen: false,
    server: {
        strictPort: true,
        port: 3000
    },


    plugins: [react()],
})
