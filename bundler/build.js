import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/ziwei-chart.js'],
    bundle: true,
    outfile: '../docs/ziwei-chart.bundle.js',
    format: 'iife',
    globalName: 'ZiweiChartBundle',
    loader: { '.css': 'empty' }, // 忽略 CSS 檔案
    minify: true
}).then(() => console.log('Build complete')).catch(() => process.exit(1));
