import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import Teacher from "@/models/Teacher";
import ExcelJS from "exceljs";
import { requireAdmin, withMethod } from "@/lib/adminAuth";

// ── Shared style helpers ────────────────────────────────────────────────────

const BRAND_BLUE   = "FF1D4ED8"; // blue-700
const BRAND_GREEN  = "FF15803D"; // green-700
const HEADER_BG    = "FFE0F2FE"; // sky-100  (column header rows)
const ALT_ROW_BG   = "FFF8FAFC"; // slate-50 (alternating rows)
const BORDER_COLOR = "FFCBD5E1"; // slate-300

// Thin border on all four sides of a cell
const thinBorder = {
  top:    { style: "thin", color: { argb: BORDER_COLOR } },
  left:   { style: "thin", color: { argb: BORDER_COLOR } },
  bottom: { style: "thin", color: { argb: BORDER_COLOR } },
  right:  { style: "thin", color: { argb: BORDER_COLOR } },
};

/** Apply style to a range of cells, e.g. "A1:H1" */
function styleRange(sheet, range, styleFn) {
  sheet.eachRow((row, rowNum) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      const cellAddr = cell.address; // e.g. "B3"
      // crude range check by row/col numbers is done via sheet.getCell
    });
  });
  // Use the built-in range iterator
  const [topLeft, bottomRight] = range.split(":");
  const start = sheet.getCell(topLeft);
  const end   = sheet.getCell(bottomRight);
  for (let r = start.row; r <= end.row; r++) {
    for (let c = start.col; c <= end.col; c++) {
      styleFn(sheet.getCell(r, c));
    }
  }
}

/**
 * Build the Admissions sheet with:
 * - Title banner row
 * - Summary stat row
 * - Column header row (coloured)
 * - Data rows with alternating background
 * - Totals row
 */
function buildAdmissionsSheet(workbook, admissions) {
  const sheet = workbook.addWorksheet("📋 Admissions", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  const cols = [
    { header: "#",           key: "no",         width: 6  },
    { header: "Child Name",  key: "childName",   width: 22 },
    { header: "Parent Name", key: "parentName",  width: 22 },
    { header: "Phone",       key: "phone",       width: 16 },
    { header: "Email",       key: "email",       width: 30 },
    { header: "Message",     key: "message",     width: 40 },
    { header: "Status",      key: "status",      width: 14 },
    { header: "Submitted On",key: "createdAt",   width: 18 },
  ];

  const totalCols = cols.length; // 8

  // ── Row 1: Title banner ────────────────────────────────────────────────
  sheet.mergeCells(1, 1, 1, totalCols);
  const titleCell = sheet.getCell("A1");
  titleCell.value = "🌟 KidzStar Preschool — Admission Enquiries";
  titleCell.font  = { name: "Calibri", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_BLUE } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(1).height = 36;

  // ── Row 2: Generated-on note ──────────────────────────────────────────
  sheet.mergeCells(2, 1, 2, totalCols);
  const noteCell = sheet.getCell("A2");
  noteCell.value = `Generated on: ${new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}   |   Total records: ${admissions.length}`;
  noteCell.font  = { name: "Calibri", size: 10, italic: true, color: { argb: "FF64748B" } };
  noteCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: "FFEFF6FF" } };
  noteCell.alignment = { horizontal: "center", vertical: "middle" };
  sheet.getRow(2).height = 20;

  // ── Row 3: blank spacer ───────────────────────────────────────────────
  sheet.getRow(3).height = 6;

  // ── Row 4: Column headers ─────────────────────────────────────────────
  const headerRow = sheet.getRow(4);
  cols.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.font  = { name: "Calibri", size: 11, bold: true, color: { argb: "FF1E3A5F" } };
    cell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: HEADER_BG } };
    cell.alignment = { vertical: "middle", horizontal: i === 0 ? "center" : "left" };
    cell.border = thinBorder;
  });
  headerRow.height = 24;

  // Set column widths
  cols.forEach((col, i) => {
    sheet.getColumn(i + 1).width = col.width;
  });

  // ── Data rows ─────────────────────────────────────────────────────────
  const pending = admissions.filter(a => (a.status || "pending") === "pending").length;
  const done    = admissions.filter(a => a.status === "done").length;

  admissions.forEach((a, idx) => {
    const rowNum = idx + 5; // data starts at row 5
    const row    = sheet.getRow(rowNum);
    const isAlt  = idx % 2 === 1;
    const isDone = a.status === "done";

    const values = [
      idx + 1,
      a.childName  || "—",
      a.parentName || "—",
      a.phone      || "—",
      a.email      || "—",
      a.message    || "—",
      isDone ? "✅ Done" : "🕐 Pending",
      a.createdAt  ? new Date(a.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—",
    ];

    values.forEach((val, colIdx) => {
      const cell = row.getCell(colIdx + 1);
      cell.value = val;
      cell.font  = { name: "Calibri", size: 10, color: { argb: isDone ? "FF15803D" : "FF1E293B" } };
      cell.fill  = {
        type: "pattern", pattern: "solid",
        fgColor: { argb: isDone ? "FFF0FDF4" : isAlt ? ALT_ROW_BG : "FFFFFFFF" },
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: colIdx === 0 ? "center" : colIdx === 6 ? "center" : "left",
        wrapText: colIdx === 5, // wrap message column
      };
      cell.border = thinBorder;
    });

    row.height = a.message && a.message.length > 60 ? 36 : 20;
  });

  // ── Totals / summary row ──────────────────────────────────────────────
  const summaryRowNum = admissions.length + 5;
  sheet.mergeCells(summaryRowNum, 1, summaryRowNum, totalCols);
  const summaryCell = sheet.getCell(summaryRowNum, 1);
  summaryCell.value = `📊  Total: ${admissions.length}   |   ✅ Done: ${done}   |   🕐 Pending: ${pending}`;
  summaryCell.font  = { name: "Calibri", size: 10, bold: true, color: { argb: "FF1D4ED8" } };
  summaryCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDBEAFE" } };
  summaryCell.alignment = { horizontal: "center", vertical: "middle" };
  summaryCell.border = thinBorder;
  sheet.getRow(summaryRowNum).height = 22;

  // Freeze panes: keep header visible while scrolling
  sheet.views = [{ state: "frozen", xSplit: 0, ySplit: 4 }];

  // Auto-filters on header row
  sheet.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4, column: totalCols } };
}

/**
 * Build the Teachers sheet with the same premium styling.
 */
function buildTeachersSheet(workbook, teachers) {
  const sheet = workbook.addWorksheet("👩‍🏫 Teacher Applications", {
    pageSetup: { paperSize: 9, orientation: "landscape", fitToPage: true, fitToWidth: 1 },
  });

  const cols = [
    { header: "#",            key: "no",        width: 6  },
    { header: "Name",         key: "name",      width: 24 },
    { header: "Email",        key: "email",     width: 30 },
    { header: "Phone",        key: "phone",     width: 16 },
    { header: "Experience",   key: "experience",width: 16 },
    { header: "Qualification",key: "qualification", width: 22 },
    { header: "Message",      key: "message",   width: 40 },
    { header: "Applied On",   key: "createdAt", width: 18 },
  ];

  const totalCols = cols.length;

  // Title banner
  sheet.mergeCells(1, 1, 1, totalCols);
  const titleCell = sheet.getCell("A1");
  titleCell.value = "🌟 KidzStar Preschool — Teacher Applications";
  titleCell.font  = { name: "Calibri", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
  titleCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: BRAND_GREEN } };
  titleCell.alignment = { vertical: "middle", horizontal: "center" };
  sheet.getRow(1).height = 36;

  // Note row
  sheet.mergeCells(2, 1, 2, totalCols);
  const noteCell = sheet.getCell("A2");
  noteCell.value = `Generated on: ${new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" })}   |   Total applications: ${teachers.length}`;
  noteCell.font  = { name: "Calibri", size: 10, italic: true, color: { argb: "FF64748B" } };
  noteCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF0FDF4" } };
  noteCell.alignment = { horizontal: "center", vertical: "middle" };
  sheet.getRow(2).height = 20;

  // Spacer
  sheet.getRow(3).height = 6;

  // Header row
  const headerRow = sheet.getRow(4);
  cols.forEach((col, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = col.header;
    cell.font  = { name: "Calibri", size: 11, bold: true, color: { argb: "FF14532D" } };
    cell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCFCE7" } };
    cell.alignment = { vertical: "middle", horizontal: i === 0 ? "center" : "left" };
    cell.border = thinBorder;
  });
  headerRow.height = 24;

  cols.forEach((col, i) => { sheet.getColumn(i + 1).width = col.width; });

  // Data rows
  teachers.forEach((t, idx) => {
    const rowNum = idx + 5;
    const row    = sheet.getRow(rowNum);
    const isAlt  = idx % 2 === 1;

    const values = [
      idx + 1,
      t.name         || "—",
      t.email        || "—",
      t.phone        || "—",
      t.experience   || "—",
      t.qualification|| "—",
      t.message      || "—",
      t.createdAt ? new Date(t.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—",
    ];

    values.forEach((val, colIdx) => {
      const cell = row.getCell(colIdx + 1);
      cell.value = val;
      cell.font  = { name: "Calibri", size: 10, color: { argb: "FF1E293B" } };
      cell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: isAlt ? ALT_ROW_BG : "FFFFFFFF" } };
      cell.alignment = {
        vertical: "middle",
        horizontal: colIdx === 0 ? "center" : "left",
        wrapText: colIdx === 6,
      };
      cell.border = thinBorder;
    });

    row.height = t.message && t.message.length > 60 ? 36 : 20;
  });

  // Summary row
  const summaryRowNum = teachers.length + 5;
  sheet.mergeCells(summaryRowNum, 1, summaryRowNum, totalCols);
  const summaryCell = sheet.getCell(summaryRowNum, 1);
  summaryCell.value = `📊  Total Applications: ${teachers.length}`;
  summaryCell.font  = { name: "Calibri", size: 10, bold: true, color: { argb: "FF15803D" } };
  summaryCell.fill  = { type: "pattern", pattern: "solid", fgColor: { argb: "FFDCFCE7" } };
  summaryCell.alignment = { horizontal: "center", vertical: "middle" };
  summaryCell.border = thinBorder;
  sheet.getRow(summaryRowNum).height = 22;

  sheet.views = [{ state: "frozen", xSplit: 0, ySplit: 4 }];
  sheet.autoFilter = { from: { row: 4, column: 1 }, to: { row: 4, column: totalCols } };
}

// ── Main handler ──────────────────────────────────────────────────────────────

async function handler(req, res) {
  await connectDB();

  const admissions = await Admission.find().sort({ createdAt: -1 }).lean();
  const teachers   = await Teacher.find().sort({ createdAt: -1 }).lean();

  if (req.query.download) {
    const workbook = new ExcelJS.Workbook();

    // Workbook metadata
    workbook.creator  = "KidzStar Admin";
    workbook.created  = new Date();
    workbook.modified = new Date();
    workbook.title    = "KidzStar Preschool — Enquiries Export";

    buildAdmissionsSheet(workbook, admissions);
    buildTeachersSheet(workbook, teachers);

    const buffer = await workbook.xlsx.writeBuffer();

    const filename = `KidzStar_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`;

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Cache-Control", "no-store");
    return res.send(Buffer.from(buffer));
  }

  // JSON response for the dashboard
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  return res.status(200).json({ admissions, teachers });
}

export default requireAdmin(withMethod(["GET"], handler));
