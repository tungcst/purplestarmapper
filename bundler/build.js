// bundler/build.js
import esbuild from 'esbuild';
import fs from 'fs-extra'; // 用於確保 docs 目錄存在
import path from 'path';

// 解析當前模塊的文件路徑，以正確獲取 __dirname
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const docsDir = path.resolve(__dirname, '../docs'); // 輸出到項目根目錄下的 docs 文件夾
const outfile = path.resolve(docsDir, 'ziwei-chart.bundle.js');

async function build() {
    console.log('[Build Script] Starting esbuild process...');
    try {
        // 確保 ../docs 目錄存在
        await fs.ensureDir(docsDir);
        console.log(`[Build Script] Ensured output directory exists: ${docsDir}`);

        await esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/ziwei-chart.js')],
            bundle: true,
            outfile: outfile,
            format: 'iife', // Immediately Invoked Function Expression, 適合瀏覽器 <script>
            globalName: 'ZiweiChartCustomElementGlobal', // 在 window 對象上暴露的全局名稱 (主要用於 IIFE)
            loader: {
                // '.css': 'text' // 如果需要將 CSS 作為文本導入然後注入
            }, 
            minify: false, // 為了調試方便，暫時禁用壓縮
            sourcemap: false, // 生產環境可以禁用 sourcemap 以減小體積，調試時可開啟 'inline'
            target: ['es2020','chrome90', 'firefox90', 'safari15', 'edge90'],
            jsxFactory: 'React.createElement',
            jsxFragment: 'React.Fragment',
            define: {
                'process.env.NODE_ENV': '"development"', // 開發模式可以看到更多 React 警告
            },
            logLevel: 'info', // 顯示更多 esbuild 日誌
        });
        console.log('✅ [Build Script] ZiweiChart Bundle build complete!');
        console.log(`   Output: ${outfile}`);
        console.log(`   Please ensure this file is committed and pushed to GitHub, and that GitHub Pages is updated.`);
        console.log(`   The URL for Wix Custom Element should be: https://tungcst.github.io/purplestarmapper/ziwei-chart.bundle.js`);
    } catch (e) {
        console.error('❌ [Build Script] ZiweiChart Bundle build FAILED:', e);
        process.exit(1); // 構建失敗時退出腳本
    }
}

build();