import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getSeoRoutes } from "./scripts/seo-data.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const vitePrerenderModule = require("vite-plugin-prerender");
const vitePrerender = vitePrerenderModule.default || vitePrerenderModule;
const Renderer = vitePrerender.PuppeteerRenderer || vitePrerenderModule.PuppeteerRenderer;
const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
];
const prerenderExecutablePath = chromeCandidates.find((candidate) => {
  try {
    return require("node:fs").existsSync(candidate);
  } catch {
    return false;
  }
});

export default defineConfig(async () => {
  const routes = await getSeoRoutes();

  return {
    plugins: [
      react(),
      vitePrerender({
        staticDir: path.join(__dirname, "dist"),
        routes,
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          decodeEntities: true,
          keepClosingSlash: true,
          sortAttributes: true
        },
        renderer: new Renderer({
          maxConcurrentRoutes: 4,
          renderAfterDocumentEvent: "app-rendered",
          executablePath: prerenderExecutablePath
        })
      })
    ]
  };
});
