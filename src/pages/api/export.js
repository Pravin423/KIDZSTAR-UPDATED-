import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import Teacher from "@/models/Teacher";
import * as XLSX from "xlsx";
import { requireAdmin, withMethod } from "@/lib/adminAuth";

async function handler(req, res) {
  await connectDB();

  const admissions = await Admission.find().lean();
  const teachers = await Teacher.find().lean();

  if (req.query.download) {
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(admissions), "Admissions");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(teachers), "Teachers");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Cache-Control", "no-store");
    return res.send(buffer);
  }

  // No caching on admin data
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  return res.status(200).json({ admissions, teachers });
}

// Only authenticated admins can export data; only GET allowed
export default requireAdmin(withMethod(["GET"], handler));
