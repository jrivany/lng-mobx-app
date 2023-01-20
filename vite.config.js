import { defineConfig } from "vite"

// Remove extra bits that don't work on samsung
const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      return html.replace(`type="module" crossorigin`, "");
    }
  }
}

export default defineConfig({
  build: {
    target: 'chrome53' // Lg webos 4
  },
  plugins: [noAttr()]
})