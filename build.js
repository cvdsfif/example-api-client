const esbuild = require("esbuild");

(async () => {
    esbuild.build({
        entryPoints: ["src/dev.tsx"],
        bundle: true,
        minify: true,
        treeShaking: true,
        sourcemap: true,
        outdir: "public",
        loader: {
            ".woff": "file",
            ".woff2": "file",
            ".ttf": "file",
            ".eot": "file",
            ".svg": "file"
        }
    });
})();