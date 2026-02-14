import { copyFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const from = join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const to = join(root, "public/pdf.worker.min.mjs");

if (!existsSync(from)) {
  console.warn("copy-pdf-worker: pdf.worker.min.mjs not found, skipping");
  process.exit(0);
}
mkdirSync(dirname(to), { recursive: true });
copyFileSync(from, to);
console.log("copy-pdf-worker: copied pdf.worker.min.mjs to public/");
