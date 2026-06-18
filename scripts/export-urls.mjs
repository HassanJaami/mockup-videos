import ExcelJS from "exceljs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rows = [
  { customer: "Alertora",              url: "https://alertora.com",              status: "✅ Correct",  notes: "WhatsApp travel safety" },
  { customer: "Axirify",               url: "https://axirify.com",               status: "⚠️ Mismatch", notes: "Site shows property management, not clinic/med spa" },
  { customer: "Backlink Brain",        url: "https://backlinkbrain.com",          status: "✅ Correct",  notes: "SEO backlink outreach" },
  { customer: "CE Tax",                url: "https://cetax.com",                  status: "⚠️ Mismatch", notes: "Different company: ClearEdge Tax (property tax consulting)" },
  { customer: "CellEasy",              url: "https://celleasy.com",               status: "❌ Dead",      notes: "Parked / for sale on GoDaddy" },
  { customer: "DARE",                  url: "https://dare.ai",                    status: "❌ Dead",      notes: "Redirects to introvert.com (parked)" },
  { customer: "Gold Selling Standards",url: "https://goldsellingstandards.com",   status: "✅ Correct",  notes: "Sales coaching" },
  { customer: "HG Garage",             url: "https://hggarage.com",               status: "✅ Correct",  notes: "Automotive parts e-commerce" },
  { customer: "Insidermemes",          url: "https://insidermemes.com",           status: "⚠️ Unclear",  notes: "Site loads but minimal content returned" },
  { customer: "Notifier",              url: "https://notifier.com",               status: "❌ Mismatch", notes: "Redirects to Honeywell security/fire brand" },
  { customer: "ONEai Health",          url: "https://oneaihealth.com",            status: "✅ Correct",  notes: "AI chronic care platform" },
  { customer: "SalesEdgeAI",           url: "https://salesedgeai.com",            status: "✅ Correct",  notes: "Sales automation / CRM" },
  { customer: "Samwise AI",            url: "https://samwiseai.com",              status: "⚠️ Mismatch", notes: "Site is consumer lifestyle AI, not GovTech/federal contracting" },
  { customer: "Scoutside",             url: "https://scoutside.com",              status: "⚠️ Mismatch", notes: "Site is a digital commerce agency, not lacrosse recruiting" },
  { customer: "Stammer AI",            url: "https://stammer.ai",                 status: "✅ Correct",  notes: "White-label AI agents" },
  { customer: "TalentArc",             url: "https://talentarc.ai",               status: "✅ Correct",  notes: "AI recruitment platform" },
  { customer: "Zinng AI",              url: "https://zinng.ai",                   status: "✅ Correct",  notes: "AI phone receptionist for small businesses" },
];

const wb = new ExcelJS.Workbook();
const ws = wb.addWorksheet("URL Verification");

// Column definitions
ws.columns = [
  { key: "customer", width: 28 },
  { key: "url",      width: 42 },
  { key: "status",   width: 18 },
  { key: "notes",    width: 52 },
  { key: "verdict",  width: 20 },
];

// Header row
const header = ws.addRow(["Customer", "Website URL", "Auto Status", "Notes", "Correct? (Yes/No/Fix URL)"]);
header.font = { bold: true, color: { argb: "FFFFFFFF" } };
header.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A5F" } };
header.alignment = { vertical: "middle", horizontal: "center" };
ws.getRow(1).height = 22;

// Data rows
rows.forEach((r, i) => {
  const row = ws.addRow([r.customer, "", r.status, r.notes, ""]);

  // Clickable hyperlink in column B
  const cell = ws.getCell(`B${i + 2}`);
  cell.value = { text: r.url, hyperlink: r.url };
  cell.font = { color: { argb: "FF0563C1" }, underline: true };

  // Row shading
  const bg = i % 2 === 0 ? "FFF5F7FA" : "FFFFFFFF";
  row.eachCell((c) => {
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
    c.alignment = { vertical: "middle", wrapText: false };
    c.border = {
      bottom: { style: "thin", color: { argb: "FFE0E0E0" } },
    };
  });

  // Status colour coding
  const statusCell = ws.getCell(`C${i + 2}`);
  if (r.status.startsWith("✅")) {
    statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD4EDDA" } };
    statusCell.font = { color: { argb: "FF155724" } };
  } else if (r.status.startsWith("❌")) {
    statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8D7DA" } };
    statusCell.font = { color: { argb: "FF721C24" } };
  } else {
    statusCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF3CD" } };
    statusCell.font = { color: { argb: "FF856404" } };
  }
});

// Freeze header
ws.views = [{ state: "frozen", ySplit: 1 }];

const outPath = path.resolve(__dirname, "../url-verification.xlsx");
await wb.xlsx.writeFile(outPath);
console.log("Saved:", outPath);
