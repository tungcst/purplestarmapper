import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/ziwei-chart.js',
    output: {
        file: '../docs/ziwei-chart.bundle.js',
        format: 'iife',
        name: 'ZiweiChartBundle',
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-iztro': 'iztro'
        }
    },
    plugins: [
        resolve(),
        commonjs({
            ignoreTryCatch: true, // 忽略無法解析的模組（如 CSS）
            sourceMap: false
        })
    ],
    external: [],
    onwarn(warning, warn) {
        // 忽略 CSS 相關的解析錯誤
        if (warning.code === 'PARSE_ERROR' && warning.loc.file.includes('.css')) {
            return;
        }
        if (warning.code === 'UNRESOLVED_IMPORT' && warning.source.includes('.css')) {
            return;
        }
        warn(warning);
    }
};
