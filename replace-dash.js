import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceDashes(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      replaceDashes(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('\u2014')) {
        content = content.replace(/\u2014/g, '-');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Replaced in', filePath);
      }
    }
  }
}

replaceDashes(path.join(__dirname, 'src'));
