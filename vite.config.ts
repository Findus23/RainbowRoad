import {defineConfig, Plugin} from "vite";
import {readFileSync} from "fs";

function svgToDataURL(svgStr: string): string {
    const encoded = encodeURIComponent(svgStr)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22')

    const header = 'data:image/svg+xml,'
    return header + encoded
}

function customSvgLoader() {
    return {
        enforce: "pre",
        name: 'vite-svg-patch-plugin',
        load: function (id: string): null | string {
            if (!id.endsWith('.svg')) {
                return null
            }
            const extractedSvg = readFileSync(id, 'utf8');
            return `export default '${svgToDataURL(extractedSvg)}'`;

        }
    } as Plugin;
}

export default defineConfig({
    plugins: [
        // splitVendorChunkPlugin(),
        // visualizer(),
        customSvgLoader()
    ],
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
