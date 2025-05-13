import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/ziwei-chart/element.js'],
  bundle: true,
  outfile: 'docs/ziwei-chart.bundle.js',
  format: 'iife',
  globalName: 'ZiweiChartBundle',
  loader: { '.css': 'empty' },
  jsx: 'automatic',
  external: ['react', 'react-dom'],
  minify: true
}).then(() => {
  console.log('✅  build complete');
}).catch((err) => {
  console.error(err);
  process.exit(1);
});

