import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/221025-gab-gtd-apollo-client/",
  plugins: [react()],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})

// import { defineConfig, loadEnv } from 'vite'

// export default defineConfig(({ command, mode }) => {
//   // Load env file based on `mode` in the current working directory.
//   // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//     // vite config
//     define: {
//       __APP_ENV__: env.APP_ENV
//     }
//   }
// })
