export function cdnUrl(cdnPath: string): string {
  const base = process.env.CDN_BASE_URL || "http://localhost:3000/cdn";
  return `${base}${cdnPath}`;
}
