// bundler/build.js (完整修改版，旨在更好地處理 ES 模塊)
import esbuild from 'esbuild';
import fs from 'fs-extra';
import path from 'path';

// 解析當前模塊的文件路徑
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const docsDir = path.resolve(__dirname, '../docs');
const outfile = path.resolve(docsDir, 'ziwei-chart.bundle.js');

async function build() {
    console.log('[Build Script] Starting esbuild process with refined config...');
    try {
        await fs.ensureDir(docsDir);
        console.log(`[Build Script] Ensured output directory exists: ${docsDir}`);

        await esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/ziwei-chart.js')],
            bundle: true,
            outfile: outfile,
            format: 'iife', // 保持 IIFE，Custom Element 需要這種格式的 bundle
            globalName: 'ZiweiChartCustomElementGlobal', // 在 window 上暴露的全局名稱
            platform: 'browser', // 明確指定打包目標為瀏覽器環境
            target: ['es2020','chrome90', 'firefox90', 'safari15', 'edge90'], // 主流瀏覽器兼容性
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            define: {
                'process.env.NODE_ENV': '"development"', // 設置為開發模式，可以看到更多 React 警告
            },
            logLevel: 'info', // esbuild 打包時輸出更詳細的日誌
            minify: false,    // 為了調試，暫時禁用代碼壓縮
            sourcemap: false, // 暫時禁用 sourcemap，如果需要調試 bundle 內部可以設為 'inline'

            // --- 針對 ES 模塊和第三方庫的關鍵調整 ---
            mainFields: ['module', 'browser', 'main'], // 優先使用包的 'module' (ESM) 或 'browser' 入口
            conditions: ['module', 'browser', 'import', 'default'], // 幫助 esbuild 更好地解析 ES 模塊的條件導出
            resolveExtensions: ['.jsx', '.js', '.ts', '.tsx', '.json', '.css'], // 確保能解析這些擴展名
            // external: ['react', 'react-dom'], // 暫時不將 react 和 react-dom 設為外部依賴，讓 esbuild 打包進去。
                                              // 如果 `Astrolabe` 仍然是 undefined，下一步可以考慮將它們設為 external，
                                              // 然後在 Wix 頁面通過 <script> 標籤全局引入 React 和 ReactDOM。
                                              // 但這會增加複雜性，先嘗試讓 esbuild 自己處理。
            loader: {
                // '.css': 'text' // 如果有 CSS 文件直接 import，可以這樣處理。但我們是 JS 內嵌樣式。
            },
            // treeShaking: true, // esbuild 默認啟用 tree shaking，通常不需要顯式設置為 true。
                               // 保持其默認行為，除非遇到特定問題。
        });
        console.log('✅ [Build Script] ZiweiChart Bundle build complete!');
        console.log(`   Output: ${outfile}`);
        console.log(`   Please ensure this file is committed and pushed to GitHub, and that GitHub Pages is updated.`);
        console.log(`   The URL for Wix Custom Element should be: https://tungcst.github.io/purplestarmapper/ziwei-chart.bundle.js`);
    } catch (e) {
        console.error('❌ [Build Script] ZiweiChart Bundle build FAILED:', e);
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(err => {
                console.error('  Error detail:', err.text);
                if (err.location) {
                    console.error(`    at ${err.location.file}:${err.location.line}:${err.location.column}`);
                }
            });
        }
        process.exit(1);
    }
}

build();