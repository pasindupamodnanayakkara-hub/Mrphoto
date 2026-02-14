import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const dirsToScan = [
  path.join(rootDir, 'src/assets'),
  path.join(rootDir, 'public')
];

const extensions = ['.png', '.jpg', '.jpeg'];

async function optimizeImages() {
  console.log('Starting image optimization...');
  let totalSaved = 0;
  let count = 0;

  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`);
      continue;
    }
    
    await processDirectory(dir);
  }

  async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await processDirectory(filePath);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (extensions.includes(ext)) {
          const webpPath = filePath.replace(ext, '.webp');
          
          // Skip if WebP already exists and is newer
          if (fs.existsSync(webpPath)) {
             const webpStat = fs.statSync(webpPath);
             if (webpStat.mtime > stat.mtime) {
                 continue; 
             }
          }

          try {
            const initialSize = stat.size;
            await sharp(filePath)
              .webp({ quality: 80 })
              .toFile(webpPath);
            
            const newSize = fs.statSync(webpPath).size;
            const saved = initialSize - newSize;
            totalSaved += saved;
            count++;

            console.log(`Optimized: ${file} (${Math.round(initialSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB)`);
          } catch (err) {
            console.error(`Error optimizing ${file}:`, err.message);
          }
        }
      }
    }
  }

  console.log(`\nOptimization complete!`);
  console.log(`Processed ${count} images.`);
  console.log(`Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
