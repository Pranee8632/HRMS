import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        'C:/Users/HP/OneDrive/Desktop/HRMS_project2/HRMS',
        'C:/Users/HP/node_modules' // Add the directory where your node_modules is located
      ]
    }
  }
})


