import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "SWAPP_");
  return {
    define: {
      plugins: [react()],
      "process.env.SWAPP_REACT_APP_API_URL": JSON.stringify(
        env.SWAPP_REACT_APP_API_URL
      ),
    },
  };
});
