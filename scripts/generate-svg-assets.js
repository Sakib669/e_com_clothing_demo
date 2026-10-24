const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');
const productsDir = path.join(publicDir, 'products');
const placeholdersDir = path.join(publicDir, 'placeholders');

fs.mkdirSync(productsDir, { recursive: true });
fs.mkdirSync(placeholdersDir, { recursive: true });

function createSvg({ title, category, colorHex, secondaryHex, iconType }) {
  let garmentSvg = '';
  
  if (iconType === 'tee') {
    garmentSvg = `
      <!-- T-Shirt Silhouette -->
      <path d="M280 240 L350 240 C365 290 435 290 450 240 L520 240 L590 340 L520 380 L490 330 L490 680 L310 680 L310 330 L280 380 L210 340 Z" 
            fill="${colorHex}" stroke="#C5A24D" stroke-width="4" stroke-linejoin="round" />
      <!-- Crewneck Collar Ring -->
      <path d="M350 240 C370 280 430 280 450 240" fill="none" stroke="#C5A24D" stroke-width="6" stroke-linecap="round" />
      <path d="M355 248 C372 278 428 278 445 248" fill="none" stroke="${secondaryHex}" stroke-width="3" />
      <!-- Sleeves & Hem stitches -->
      <line x1="225" y1="358" x2="270" y2="330" stroke="#C5A24D" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="575" y1="358" x2="530" y2="330" stroke="#C5A24D" stroke-width="2" stroke-dasharray="4,4" />
      <line x1="315" y1="665" x2="485" y2="665" stroke="#C5A24D" stroke-width="2" stroke-dasharray="5,5" />
      <!-- Embroidered FX Crest -->
      <circle cx="430" cy="380" r="14" fill="none" stroke="#C5A24D" stroke-width="2" />
      <text x="430" y="384" font-family="'Cinzel', serif, Georgia" font-size="10" font-weight="bold" fill="#C5A24D" text-anchor="middle">FX</text>
    `;
  } else if (iconType === 'shirt') {
    garmentSvg = `
      <!-- Shirt Silhouette -->
      <path d="M270 230 L360 250 L400 280 L440 250 L530 230 L600 340 L530 380 L500 320 L500 680 L300 680 L300 320 L270 380 L200 340 Z" 
            fill="${colorHex}" stroke="#C5A24D" stroke-width="4" stroke-linejoin="round" />
      <!-- Button Placket -->
      <line x1="400" y1="280" x2="400" y2="680" stroke="#C5A24D" stroke-width="3" />
      <!-- Collar Leaves -->
      <polygon points="360,250 400,285 365,305 340,265" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="2" />
      <polygon points="440,250 400,285 435,305 460,265" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="2" />
      <!-- Mother of Pearl Buttons -->
      <circle cx="400" cy="340" r="5" fill="#FFFFF0" stroke="#C5A24D" stroke-width="1.5" />
      <circle cx="400" cy="410" r="5" fill="#FFFFF0" stroke="#C5A24D" stroke-width="1.5" />
      <circle cx="400" cy="480" r="5" fill="#FFFFF0" stroke="#C5A24D" stroke-width="1.5" />
      <circle cx="400" cy="550" r="5" fill="#FFFFF0" stroke="#C5A24D" stroke-width="1.5" />
      <circle cx="400" cy="620" r="5" fill="#FFFFF0" stroke="#C5A24D" stroke-width="1.5" />
      <!-- Chest Pocket -->
      <path d="M330 370 L370 370 L370 420 L350 435 L330 420 Z" fill="none" stroke="#C5A24D" stroke-width="2" stroke-dasharray="4,3" />
    `;
  } else if (iconType === 'pants') {
    garmentSvg = `
      <!-- Trousers Silhouette -->
      <path d="M310 240 L490 240 L490 320 L470 680 L415 680 L400 420 L385 680 L330 680 L310 320 Z" 
            fill="${colorHex}" stroke="#C5A24D" stroke-width="4" stroke-linejoin="round" />
      <!-- Waistband & Belt Loops -->
      <line x1="310" y1="270" x2="490" y2="270" stroke="#C5A24D" stroke-width="3" />
      <rect x="330" y="240" width="8" height="30" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="1" />
      <rect x="396" y="240" width="8" height="30" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="1" />
      <rect x="462" y="240" width="8" height="30" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="1" />
      <!-- Crease / Pleat Lines -->
      <line x1="365" y1="290" x2="365" y2="670" stroke="#C5A24D" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6" />
      <line x1="435" y1="290" x2="435" y2="670" stroke="#C5A24D" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6" />
      <!-- Slanted Pockets -->
      <line x1="315" y1="280" x2="350" y2="330" stroke="#C5A24D" stroke-width="2.5" />
      <line x1="485" y1="280" x2="450" y2="330" stroke="#C5A24D" stroke-width="2.5" />
    `;
  } else {
    // jacket / outerwear
    garmentSvg = `
      <!-- Outerwear / Bomber Silhouette -->
      <path d="M270 230 L360 240 L400 260 L440 240 L530 230 L610 340 L540 390 L510 330 L510 650 C510 670 470 680 400 680 C330 680 290 670 290 650 L290 330 L260 390 L190 340 Z" 
            fill="${colorHex}" stroke="#C5A24D" stroke-width="4" stroke-linejoin="round" />
      <!-- Ribbed Hem and Cuffs -->
      <path d="M290 645 Q400 660 510 645 L510 675 Q400 690 290 675 Z" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="2" />
      <!-- Heavy Brass Zipper -->
      <line x1="400" y1="260" x2="400" y2="675" stroke="#F59E0B" stroke-width="5" stroke-linecap="round" />
      <rect x="396" y="320" width="8" height="18" fill="#F59E0B" rx="2" stroke="#0A0A0A" stroke-width="1" />
      <!-- Zippered / Welt Pockets -->
      <line x1="330" y1="500" x2="370" y2="530" stroke="#C5A24D" stroke-width="3" stroke-linecap="round" />
      <line x1="470" y1="500" x2="430" y2="530" stroke="#C5A24D" stroke-width="3" stroke-linecap="round" />
      <!-- Stand Ribbed Collar -->
      <path d="M360 240 Q400 220 440 240 Q400 265 360 240 Z" fill="${secondaryHex}" stroke="#C5A24D" stroke-width="2" />
    `;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141416" />
      <stop offset="50%" stop-color="#0A0A0C" />
      <stop offset="100%" stop-color="#050507" />
    </linearGradient>

    <!-- Gold Accent Gradient -->
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9E7F30" />
      <stop offset="50%" stop-color="#F5D061" />
      <stop offset="100%" stop-color="#C5A24D" />
    </linearGradient>

    <!-- Subtle Radial Glow -->
    <radialGradient id="centerGlow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#C5A24D" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#C5A24D" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Deep Luxury Canvas Background -->
  <rect width="800" height="1000" fill="url(#bgGrad)" />

  <!-- Radial Atmosphere Glow -->
  <circle cx="400" cy="450" r="380" fill="url(#centerGlow)" />

  <!-- Elegant Architectural Border -->
  <rect x="25" y="25" width="750" height="950" fill="none" stroke="#C5A24D" stroke-width="1.5" stroke-opacity="0.35" rx="12" />
  <rect x="35" y="35" width="730" height="930" fill="none" stroke="#C5A24D" stroke-width="0.75" stroke-opacity="0.2" rx="8" />

  <!-- Corner Flourishes -->
  <path d="M45 65 L45 45 L65 45" fill="none" stroke="#C5A24D" stroke-width="2" />
  <path d="M755 65 L755 45 L735 45" fill="none" stroke="#C5A24D" stroke-width="2" />
  <path d="M45 935 L45 955 L65 955" fill="none" stroke="#C5A24D" stroke-width="2" />
  <path d="M755 935 L755 955 L735 955" fill="none" stroke="#C5A24D" stroke-width="2" />

  <!-- Top Brand Crest -->
  <g transform="translate(400, 95)">
    <text y="0" font-family="'Cinzel', serif, 'Playfair Display', Georgia" font-size="14" font-weight="700" letter-spacing="6" fill="url(#goldGrad)" text-anchor="middle">
      FX FASHION GALLERY
    </text>
    <text y="20" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="600" letter-spacing="4" fill="#A1A1AA" text-anchor="middle">
      BESPOKE LUXURY • DHAKA
    </text>
    <line x1="-120" y1="32" x2="120" y2="32" stroke="#C5A24D" stroke-width="1" stroke-opacity="0.4" />
    <circle cx="0" cy="32" r="3" fill="#F59E0B" />
  </g>

  <!-- Garment Illustration Centerpiece -->
  <g id="garment-group">
    ${garmentSvg}
  </g>

  <!-- Bottom Spec & Label Card -->
  <g transform="translate(400, 830)">
    <!-- Decorative Divider Ribbon -->
    <line x1="-160" y1="-20" x2="160" y2="-20" stroke="#C5A24D" stroke-width="1" stroke-opacity="0.5" />
    <polygon points="0,-25 5,-20 0,-15 -5,-20" fill="#F59E0B" />

    <text y="10" font-family="'Cinzel', serif, 'Playfair Display', Georgia" font-size="20" font-weight="800" fill="#FFFFF0" text-anchor="middle" letter-spacing="1">
      ${title}
    </text>
    <text y="35" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="700" fill="#F59E0B" text-anchor="middle" letter-spacing="3">
      CATEGORY: ${category.toUpperCase()}
    </text>
    <text y="58" font-family="'Plus Jakarta Sans', sans-serif" font-size="10" font-weight="500" fill="#71717A" text-anchor="middle" letter-spacing="1.5">
      100% AUTHENTIC QUALITY GUARANTEED
    </text>
  </g>
</svg>`;
}

const assets = [
  {
    fileName: 'prod-1-supima-tee.svg',
    title: 'SUPIMA CREWNECK TEE',
    category: 'T-Shirts',
    colorHex: '#18181B',
    secondaryHex: '#27272A',
    iconType: 'tee'
  },
  {
    fileName: 'prod-2-drop-tee.svg',
    title: 'HEAVYWEIGHT DROP TEE',
    category: 'T-Shirts',
    colorHex: '#262626',
    secondaryHex: '#3F3F46',
    iconType: 'tee'
  },
  {
    fileName: 'prod-3-oxford-shirt.svg',
    title: 'OXFORD BUTTON-DOWN',
    category: 'Shirts',
    colorHex: '#1E293B',
    secondaryHex: '#334155',
    iconType: 'shirt'
  },
  {
    fileName: 'prod-4-linen-shirt.svg',
    title: 'CUBAN LINEN RESORT SHIRT',
    category: 'Shirts',
    colorHex: '#374151',
    secondaryHex: '#4B5563',
    iconType: 'shirt'
  },
  {
    fileName: 'prod-5-smart-chinos.svg',
    title: 'TAILORED SMART CHINOS',
    category: 'Pants',
    colorHex: '#1E293B',
    secondaryHex: '#334155',
    iconType: 'pants'
  },
  {
    fileName: 'prod-6-selvedge-denim.svg',
    title: 'SELVEDGE INDIGO JEANS',
    category: 'Pants',
    colorHex: '#172554',
    secondaryHex: '#1E3A8A',
    iconType: 'pants'
  },
  {
    fileName: 'prod-7-suede-bomber.svg',
    title: 'SUEDE FLIGHT BOMBER',
    category: 'Jackets',
    colorHex: '#271A14',
    secondaryHex: '#452A1E',
    iconType: 'jacket'
  },
  {
    fileName: 'prod-8-utility-windbreaker.svg',
    title: 'UTILITY WINDBREAKER',
    category: 'Jackets',
    colorHex: '#18181B',
    secondaryHex: '#27272A',
    iconType: 'jacket'
  },
  {
    fileName: 'hero-collection.svg',
    title: 'AUTUMN / WINTER 2026',
    category: 'Signature Edit',
    colorHex: '#18181B',
    secondaryHex: '#27272A',
    iconType: 'jacket'
  },
  {
    fileName: 'fallback-placeholder.svg',
    title: 'FX BESPOKE PIECE',
    category: 'Apparel',
    colorHex: '#18181B',
    secondaryHex: '#27272A',
    iconType: 'shirt'
  }
];

assets.forEach(asset => {
  const content = createSvg(asset);
  fs.writeFileSync(path.join(productsDir, asset.fileName), content, 'utf8');
});

// Also create default placeholder in placeholdersDir
fs.writeFileSync(
  path.join(placeholdersDir, 'apparel-placeholder.svg'),
  createSvg({
    title: 'FX FASHION GALLERY',
    category: 'Premium Quality',
    colorHex: '#18181B',
    secondaryHex: '#27272A',
    iconType: 'shirt'
  }),
  'utf8'
);

console.log('Successfully generated all luxury SVG fashion assets in public/images/');
