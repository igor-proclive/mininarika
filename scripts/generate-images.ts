import fs from "fs";
import path from "path";

const recipes = [
  { slug: "strukle-sa-sirom", label: "Štrukle", color: "#FE000C" },
  { slug: "pasticada-s-njokima", label: "Pašticada", color: "#61C081" },
  { slug: "crni-rizot", label: "Crni rižot", color: "#C7C8C9" },
  { slug: "zagorski-mlinci", label: "Mlinci", color: "#FCE201" },
  { slug: "fritule", label: "Fritule", color: "#FE000C" },
];

function textColor(bg: string): string {
  const num = parseInt(bg.slice(1), 16);
  const r = (num >> 16) & 0xff;
  const g = (num >> 8) & 0xff;
  const b = num & 0xff;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#1a1a1a" : "#ffffff";
}

for (const r of recipes) {
  const dir = path.join(process.cwd(), "cdn-assets", "recipes", r.slug);
  fs.mkdirSync(dir, { recursive: true });

  const fg = textColor(r.color);
  const fgFaded = fg === "#ffffff" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)";
  const fgSubtle = fg === "#ffffff" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)";
  const circleFill = fg === "#ffffff" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)";
  const circleStroke = fg === "#ffffff" ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.15)";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="${r.color}"/>
  <circle cx="400" cy="210" r="80" fill="${circleFill}" stroke="${circleStroke}" stroke-width="2"/>
  <text x="400" y="225" text-anchor="middle" font-family="serif" font-size="48" fill="${fg}">&#127860;</text>
  <text x="400" y="340" text-anchor="middle" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="${fg}" letter-spacing="2">${r.label}</text>
  <line x1="340" y1="365" x2="460" y2="365" stroke="${fgFaded}" stroke-width="2"/>
  <text x="400" y="395" text-anchor="middle" font-family="system-ui,sans-serif" font-size="13" fill="${fgSubtle}" letter-spacing="4">MININARIKA</text>
</svg>`;

  fs.writeFileSync(path.join(dir, "hero.svg"), svg);
  console.log(`Generated ${r.slug}/hero.svg`);
}
