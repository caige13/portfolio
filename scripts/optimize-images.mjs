// Converts raw Playwright captures in raw-assets/ into optimized WebP assets
// for the Projects section. Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const OUT = 'src/assets/projects';
await mkdir(OUT, { recursive: true });

const jobs = [
  { in: 'raw-assets/ca-desktop-hero.png',        out: 'crazy-ape-hero',        widths: [1440, 800] },
  { in: 'raw-assets/ca-desktop-tournaments.png', out: 'crazy-ape-tournaments', widths: [1440, 800] },
  { in: 'raw-assets/ca-desktop-whoweare.png',    out: 'crazy-ape-about',       widths: [1440, 800] },
  { in: 'raw-assets/ca-mobile-hero.png',         out: 'crazy-ape-mobile',      widths: [390] },
  { in: 'raw-assets/pb-desktop-hero.png',        out: 'picklebrackit',              widths: [1200] },
  { in: 'raw-assets/pb-desktop-dark.png',        out: 'picklebrackit-dark',         widths: [1200] },
  { in: 'raw-assets/pb-mobile-light.png',        out: 'picklebrackit-mobile-light', widths: [390] },
  { in: 'raw-assets/pb-mobile-dark.png',         out: 'picklebrackit-mobile-dark',  widths: [390] },
  { in: 'C:/Dev/portfolio/pictures/agent-board-screenshot.png',      out: 'agent-board',      widths: [1200] },
  { in: 'C:/Dev/portfolio/pictures/azerothhub-hero.png',             out: 'azerothhub',       widths: [1200] },
  { in: 'C:/Dev/portfolio/pictures/import-preflight-dashboard.png',  out: 'import-preflight', widths: [1200] },
];

for (const job of jobs) {
  for (const w of job.widths) {
    const file = `${OUT}/${job.out}-${w}.webp`;
    const info = await sharp(job.in).resize({ width: w }).webp({ quality: 80 }).toFile(file);
    console.log(`${file}  ${w}w  ${(info.size / 1024).toFixed(0)}KB`);
  }
}
