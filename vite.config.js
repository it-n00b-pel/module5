import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        createSvgSpritePlugin({
            symbolId: 'icon-[name]-[hash]',
        })
    ],
    base: '/module5/',
    historyApiFallback: true,
    server: {
        cors: false,
    },
    resolve: {
        alias: [{ find: '@', replacement: '/src', }],
    },
    css:{
        preprocessorOptions:{
            scss:{
                additionalData: `@import './src/assets/scss/_variables.scss';`,
            },
        },
    },
});
