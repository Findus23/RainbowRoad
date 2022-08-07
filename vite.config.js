import {defineConfig} from "vite";

export default defineConfig({
    plugins: [
        // splitVendorChunkPlugin(),
        // visualizer(),
    ],
    base: "",
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
                "index": 'index.html',
                "canvastest": 'canvastest.html',
            },
        }
    }
})
