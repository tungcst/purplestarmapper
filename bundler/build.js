// bundler/build.js
import esbuild from 'esbuild';
import fs from 'fs-extra'; // 用於確保 docs 目錄存在
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const docsDir = path.resolve(__dirname, '../docs');
const outfile = path.resolve(docsDir, 'ziwei-chart.bundle.js');

async function build() {
    try {
        // 確保 ../docs 目錄存在
        await fs.ensureDir(docsDir);

        await esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/ziwei-chart.js')],
            bundle: true,
            outfile: outfile,
            format: 'iife', // Immediately Invoked Function Expression, 適合瀏覽器 <script>
            globalName: 'ZiweiChartCustomElement', // 在 window 對象上暴露的全局名稱
            loader: { '.css': 'empty' }, // 忽略 CSS 文件的導入
            minify: true,
            sourcemap: false, // 生產環境可以禁用 sourcemap 以減小體積
            target: ['es2020','chrome90', 'firefox90', 'safari15', 'edge90'], // 兼容主流瀏覽器
            jsxFactory: 'React.createElement', // 如果 ziwei-chart.js 中包含 JSX
            jsxFragment: 'React.Fragment',     // 如果 ziwei-chart.js 中包含 JSX Fragment
            define: {
                'process.env.NODE_ENV': '"production"', // 設置為生產模式
            }
        });
        console.log('✅ ZiweiChart Bundle build complete!');
        console.log(`Output: ${outfile}`);
    } catch (e) {
        console.error('❌ ZiweiChart Bundle build failed:', e);
        process.exit(1);
    }
}

build();
