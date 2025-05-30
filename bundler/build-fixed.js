// bundler/build-fixed.js (修正 React 衝突問題)
import esbuild from 'esbuild';
import fs from 'fs-extra';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const docsDir = path.resolve(__dirname, '../docs');
const outfile = path.resolve(docsDir, 'ziwei-chart.bundle.js');

async function build() {
    console.log('[Build Script] Starting esbuild - fixing React conflicts...');
    try {
        await fs.ensureDir(docsDir);
        console.log(`[Build Script] Output directory: ${docsDir}`);

        await esbuild.build({
            entryPoints: [path.resolve(__dirname, 'src/ziwei-chart-external-react.js')],
            bundle: true,
            outfile: outfile,
            format: 'iife',
            globalName: 'ZiweiChartBundle',
            platform: 'browser',
            target: ['es2020','chrome90', 'firefox90', 'safari15', 'edge90'],
            
            // 關鍵修正：將 React 和 ReactDOM 設為外部依賴
            external: ['react', 'react-dom'],
            
            define: {
                'process.env.NODE_ENV': '"development"',
            },
            logLevel: 'info',
            minify: false,
            sourcemap: false,
            
            mainFields: ['module', 'browser', 'main'],
            conditions: ['module', 'browser', 'import', 'default'],
            resolveExtensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
        });
        
        console.log('✅ [Build Script] Bundle complete (React externalized)!');
        console.log(`   Output: ${outfile}`);
        console.log(`   React dependencies now external - uses Wix React`);
    } catch (e) {
        console.error('❌ [Build Script] Build FAILED:', e);
        if (e.errors) {
            e.errors.forEach(err => {
                console.error('  Error:', err.text);
                if (err.location) {
                    console.error(`    at ${err.location.file}:${err.location.line}:${err.location.column}`);
                }
            });
        }
        process.exit(1);
    }
}

build(); 