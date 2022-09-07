import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    svgrPlugin({
      include: 'src/**/*.svg',
      svgrOptions: { memo: true, svgo: true, icon: true, exportType: 'named' },
    }),
    reactPlugin(),
    tsconfigPaths(),
  ],
  build: { sourcemap: true },
  server: {
    hmr: true,
    host: true,
    port: 3000,
  },
  clearScreen: false,
  root: '.',
});
