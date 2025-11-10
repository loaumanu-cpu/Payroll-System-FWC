import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Set base for GitHub Pages hosting at /Payroll-System-FWC/
  base: '/Payroll-System-FWC/',
  plugins: [react()],
})

