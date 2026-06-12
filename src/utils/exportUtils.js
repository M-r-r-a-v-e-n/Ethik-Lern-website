/**
 * badgeGenerator.js + pdfExport.js (combined)
 * 
 * - generateBadgeSVG: returns SVG string for a badge
 * - downloadBadgeSVG: triggers SVG download
 * - generateCertificatePDF: creates a printable HTML certificate
 *   (uses window.print() – no external library needed in Vite/React)
 */

import { BADGES } from '../lib/badges.js';

// ── Badge SVG Generator ───────────────────────────────────

/**
 * Generate an SVG badge string
 * @param {Object} badge  - from BADGES array
 * @param {string} name   - user display name
 * @returns {string} SVG markup
 */
export function generateBadgeSVG(badge, name = '') {
  const color = badge.color ?? '#6366f1';
  const lightColor = color + '22';
  const date = new Date().toLocaleDateString('de-DE');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" role="img" aria-label="${badge.name} Badge">
  <title>${badge.name}</title>
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${lightColor};stop-opacity:1"/>
      <stop offset="100%" style="stop-color:${color}22;stop-opacity:1"/>
    </linearGradient>
  </defs>
  <!-- Background circle -->
  <circle cx="100" cy="100" r="96" fill="url(#bg)" stroke="${color}" stroke-width="4"/>
  <!-- Inner ring -->
  <circle cx="100" cy="100" r="82" fill="none" stroke="${color}" stroke-width="1.5" stroke-dasharray="8 4"/>
  <!-- Icon -->
  <text x="100" y="95" font-size="48" text-anchor="middle" dominant-baseline="middle" font-family="Segoe UI Emoji, Apple Color Emoji, sans-serif">${badge.icon}</text>
  <!-- Badge name -->
  <text x="100" y="140" font-size="13" text-anchor="middle" fill="${color}" font-weight="bold" font-family="Inter, system-ui, sans-serif">${badge.name}</text>
  <!-- User name -->
  ${name ? `<text x="100" y="158" font-size="10" text-anchor="middle" fill="#888" font-family="Inter, system-ui, sans-serif">${name}</text>` : ''}
  <!-- Date -->
  <text x="100" y="174" font-size="9" text-anchor="middle" fill="#aaa" font-family="Inter, system-ui, sans-serif">${date}</text>
</svg>`;
}

/**
 * Download badge as SVG file
 */
export function downloadBadgeSVG(badge, userName = '') {
  const svg = generateBadgeSVG(badge, userName);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `badge-${badge.id}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Certificate PDF (print-based) ────────────────────────

/**
 * Generate QR code URL via a public API (no external lib needed)
 */
function qrCodeUrl(text, size = 150) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}

/**
 * Open a printable certificate in a new window.
 * Triggers window.print() automatically.
 */
export function printCertificate({ userName, badges = [], stats = {}, courseTitle = 'Ethik Quali-Kurs' }) {
  const date = new Date().toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });
  const pct = (() => {
    const c = stats.totalCorrect ?? 0, w = stats.totalWrong ?? 0;
    return c + w > 0 ? Math.round((c / (c + w)) * 100) : 0;
  })();
  const qrData = `Ethik-Lernapp Zertifikat – ${userName} – ${date} – ${pct}%`;
  const badgeList = badges.map((b) => `<span style="font-size:1.8rem" title="${b.name}">${b.icon}</span>`).join(' ');

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8"/>
  <title>Zertifikat – ${userName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', sans-serif; background: #fff; color: #1c1917; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; }
    .cert { width: 700px; border: 4px solid #4338ca; border-radius: 16px; padding: 3rem; text-align: center; position: relative; }
    .cert::before { content: ''; position: absolute; inset: 8px; border: 1px dashed #c7d2fe; border-radius: 10px; pointer-events: none; }
    .logo { font-size: 3rem; margin-bottom: 0.5rem; }
    .subtitle { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6366f1; font-weight: 700; margin-bottom: 2rem; }
    h1 { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 0.5rem; }
    .name { font-size: 2.5rem; font-weight: 900; color: #1c1917; margin-bottom: 0.75rem; }
    .course { font-size: 16px; color: #555; margin-bottom: 1.5rem; }
    .score { font-size: 3.5rem; font-weight: 900; color: ${pct >= 75 ? '#059669' : pct >= 50 ? '#d97706' : '#e11d48'}; margin-bottom: 0.25rem; }
    .score-sub { font-size: 13px; color: #888; margin-bottom: 2rem; }
    .badges { margin-bottom: 2rem; }
    .badges-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #888; margin-bottom: 0.5rem; }
    .qr { display: flex; justify-content: center; align-items: center; gap: 2rem; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e2dc; }
    .date { font-size: 12px; color: #aaa; }
    @media print { body { background: white; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="logo">📚</div>
    <div class="subtitle">Ethik Lernapp · Quali-Vorbereitung</div>
    <h1>Hiermit wird bestätigt, dass</h1>
    <div class="name">${userName}</div>
    <div class="course">den Kurs <strong>${courseTitle}</strong> erfolgreich abgeschlossen hat.</div>
    <div class="score">${pct}%</div>
    <div class="score-sub">Durchschnittliche Quiz-Trefferquote · ${stats.sessions?.length ?? 0} Quizze gespielt</div>
    ${badges.length > 0 ? `<div class="badges"><div class="badges-label">Freigeschaltete Badges</div>${badgeList}</div>` : ''}
    <div class="qr">
      <div>
        <img src="${qrCodeUrl(qrData)}" alt="QR-Code zur Verifizierung" width="100" height="100"/>
        <div class="date">Verifizierungs-QR</div>
      </div>
      <div class="date">Ausgestellt am ${date}</div>
    </div>
  </div>
  <script>window.onload = function() { window.print(); }</script>
</body>
</html>`;

  const win = window.open('', '_blank');
  if (win) {
    win.document.write(html);
    win.document.close();
  } else {
    alert('Pop-up blockiert. Bitte Pop-ups für diese Seite erlauben.');
  }
}

/**
 * Get all unlocked badge objects from IDs
 */
export function getBadgeObjects(badgeIds = []) {
  return BADGES.filter((b) => badgeIds.includes(b.id));
}
