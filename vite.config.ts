import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const colors = {
  'primary-color': '#c89979',
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve('./src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: (function () {
          let variables = '';

          for (const key in colors) {
            const variable = `@${key}`;
            const color = colors[key];

            variables += `${variable}: ${color};\n`;
          }

          return variables;
        }()),
      },
    },
  },
});
