
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import tsconfigPaths from 'vite-tsconfig-paths';

  export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    build: {
      target: 'esnext',
      outDir: 'dist/',
    },
    server: {
      port: 3000,
      open: true,
      watch: {
        ignored: ['**/node_modules/**', '**/.git/**'],
      },
    },
  });