import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';       // ⬅️  thêm

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // ⬅️  alias @ -> src
    },
    extensions: ['.js', '.jsx'],           // không bắt buộc, nhưng giúp bỏ đuôi
  },
  server: {
    port: 3000,
  },
});
