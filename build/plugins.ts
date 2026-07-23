import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';
import UnoCss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import VueRouter from 'vue-router/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import ElementHooks from 'element-hooks';
import { VueRouterAutoImports } from 'vue-router/unplugin';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export function createVitePlugins() {
  return [
    AutoImport({
      dts: './types/auto-imports.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
      imports: [
        VueRouterAutoImports,
        'vue',
        {
          'element-plus': ['ElMessage', 'ElMessageBox'],
          'element-hooks': Object.keys(ElementHooks),
        },
      ],
    }),
    Components({
      dts: './types/components.d.ts',
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'icon',
          enabledCollections: ['ep'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    VueRouter({
      dts: './types/typed-router.d.ts',
      routesFolder: {
        src: './src/views',
      },
      exclude: ['**/components/**/*.vue'],
    }),
    ElementPlus({
      useSource: true,
    }),
    Vue({
      template: {
        transformAssetUrls: {
          ElImage: ['src'],
        },
      },
    }),
    VueJsx(),
    VueDevTools(),
    UnoCss(),
  ];
}
