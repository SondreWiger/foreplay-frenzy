// Generates PWA icons and favicon from SVG
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0505"/>
      <stop offset="100%" style="stop-color:#0d0202"/>
    </linearGradient>
    <linearGradient id="fire" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="40%" style="stop-color:#ef4444"/>
      <stop offset="70%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#fbbf24"/>
    </linearGradient>
    <linearGradient id="fire2" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#991b1b"/>
      <stop offset="50%" style="stop-color:#dc2626"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <rect x="8" y="8" width="496" height="496" rx="88" fill="none" stroke="#dc2626" stroke-width="3" opacity="0.3"/>
  <!-- Main flame -->
  <path d="M256 80 C256 80 340 160 340 260 C340 320 304 360 270 380 C285 350 290 320 280 290 C275 270 265 255 256 245 C247 255 237 270 232 290 C222 320 227 350 242 380 C208 360 172 320 172 260 C172 160 256 80 256 80Z" fill="url(#fire)"/>
  <!-- Inner flame -->
  <path d="M256 180 C256 180 295 220 295 270 C295 305 275 325 256 340 C237 325 217 305 217 270 C217 220 256 180 256 180Z" fill="url(#fire2)" opacity="0.8"/>
  <!-- Core -->
  <path d="M256 250 C256 250 275 270 275 295 C275 310 265 320 256 325 C247 320 237 310 237 295 C237 270 256 250 256 250Z" fill="#fbbf24" opacity="0.9"/>
  <!-- Text FF -->
  <text x="256" y="460" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="56" fill="white" opacity="0.9" letter-spacing="8">FF</text>
</svg>`;

const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a0505"/>
      <stop offset="100%" style="stop-color:#0d0202"/>
    </linearGradient>
    <linearGradient id="fire" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" style="stop-color:#dc2626"/>
      <stop offset="50%" style="stop-color:#ef4444"/>
      <stop offset="100%" style="stop-color:#fbbf24"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#bg)"/>
  <path d="M32 8 C32 8 46 20 46 32 C46 40 40 44 36 48 C38 44 38 40 37 37 C36 35 34 33 32 32 C30 33 28 35 27 37 C26 40 26 44 28 48 C24 44 18 40 18 32 C18 20 32 8 32 8Z" fill="url(#fire)"/>
  <path d="M32 22 C32 22 39 28 39 34 C39 38 36 40 32 42 C28 40 25 38 25 34 C25 28 32 22 32 22Z" fill="#fbbf24" opacity="0.8"/>
</svg>`;

async function generate() {
  const publicDir = path.join(__dirname, '..', 'public');

  // Generate PWA icons
  for (const size of [192, 512]) {
    await sharp(Buffer.from(svgIcon))
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // Generate favicon as PNG (32x32 for browser tab)
  await sharp(Buffer.from(svgFavicon))
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));
  console.log('Generated favicon.png');

  // Generate apple-touch-icon
  await sharp(Buffer.from(svgIcon))
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate OG image (1200x630)
  const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a0505"/>
        <stop offset="50%" style="stop-color:#0d0202"/>
        <stop offset="100%" style="stop-color:#1a0505"/>
      </linearGradient>
      <linearGradient id="fire" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" style="stop-color:#dc2626"/>
        <stop offset="50%" style="stop-color:#ef4444"/>
        <stop offset="100%" style="stop-color:#fbbf24"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#dc2626" stroke-width="2" opacity="0.2"/>
    <!-- Flame icon -->
    <g transform="translate(480, 80) scale(1.8)">
      <path d="M100 20 C100 20 140 60 140 100 C140 130 120 150 105 160 C112 145 115 130 110 115 C107 105 103 98 100 93 C97 98 93 105 90 115 C85 130 88 145 95 160 C80 150 60 130 60 100 C60 60 100 20 100 20Z" fill="url(#fire)"/>
      <path d="M100 65 C100 65 120 85 120 105 C120 120 110 130 100 135 C90 130 80 120 80 105 C80 85 100 65 100 65Z" fill="#fbbf24" opacity="0.8"/>
    </g>
    <!-- Title -->
    <text x="600" y="340" text-anchor="middle" font-family="Arial Black, Impact, sans-serif" font-weight="900" font-size="72" fill="white" letter-spacing="4">FOREPLAY FRENZY</text>
    <!-- Subtitle -->
    <text x="600" y="400" text-anchor="middle" font-family="Arial, sans-serif" font-weight="400" font-size="28" fill="white" opacity="0.5">The ultimate party &amp; couples game</text>
    <!-- Vibe pills -->
    <g transform="translate(340, 440)">
      <rect x="0" y="0" width="120" height="40" rx="20" fill="#b45309" opacity="0.3"/>
      <text x="60" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="#f59e0b">🎉 Party</text>
    </g>
    <g transform="translate(480, 440)">
      <rect x="0" y="0" width="120" height="40" rx="20" fill="#0f766e" opacity="0.3"/>
      <text x="60" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="#2dd4bf">😌 Chill</text>
    </g>
    <g transform="translate(620, 440)">
      <rect x="0" y="0" width="120" height="40" rx="20" fill="#991b1b" opacity="0.3"/>
      <text x="60" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="#ff2d95">🌶️ Spicy</text>
    </g>
    <g transform="translate(760, 440)">
      <rect x="0" y="0" width="120" height="40" rx="20" fill="#7f1d1d" opacity="0.3"/>
      <text x="60" y="26" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" fill="#ef4444">🖤 Dark</text>
    </g>
    <!-- Bottom text -->
    <text x="600" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-weight="400" font-size="18" fill="white" opacity="0.3">300+ cards • 15 game modes • Mobile-first PWA</text>
  </svg>`;

  await sharp(Buffer.from(ogSvg))
    .resize(1200, 630)
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));
  console.log('Generated og-image.png');
}

generate().catch(console.error);
