import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://weather-app/config/
export default defineConfig({
  plugins: [react()],
});
