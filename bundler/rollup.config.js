// bundler/rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json'; // <--- 新增的導入

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/ziwei-chart/element.js',
  output: {
    file: 'docs/ziwei-chart.bundle.js',
    format: 'iife',
    sourcemap: !isProduction,
    name: 'ZiweiChartCustomElement',
  },
  plugins: [
    resolve({
      browser: true,
      extensions: ['.js', '.jsx', '.json'],
    }),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    }),
    json(), // <--- 使用插件
    commonjs(),
    postcss({
      extensions: ['.css'],
      extract: false,
      minimize: isProduction,
      inject: { insertAt: 'top' },
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'],
    }),
    isProduction && terser(),
  ],
};
