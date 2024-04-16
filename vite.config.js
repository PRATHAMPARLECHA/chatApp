import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      
      'process.env.VITE_apiKey': JSON.stringify(env.VITE_apiKey),
      'process.env.VITE_authDomain': JSON.stringify(env.VITE_authDomain),
      'process.env.VITE_projectId': JSON.stringify(env.VITE_projectId),
      'process.env.VITE_storageBucket': JSON.stringify(env.VITE_storageBucket),
      'process.env.VITE_messagingSenderId': JSON.stringify(env.VITE_messagingSenderId),
      'process.env.VITE_appId': JSON.stringify(env.VITE_appId),
    },
    plugins: [react()],
  }
})
