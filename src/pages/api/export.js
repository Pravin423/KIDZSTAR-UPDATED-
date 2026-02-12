import connectDB from "@/lib/db";
import Admission from "@/models/Admission";
import Teacher from "@/models/Teacher";
import * as XLSX from "xlsx";

export default async function handler(req, res) {
  await connectDB();

  const admissions = await Admission.find().lean();
  const teachers = await Teacher.find().lean();

  if (req.query.download) {
    const workbook = XLSX.utils.book_new();

    const sheet1 = XLSX.utils.json_to_sheet(admissions);
    const sheet2 = XLSX.utils.json_to_sheet(teachers);

    XLSX.utils.book_append_sheet(workbook, sheet1, "Admissions");
    XLSX.utils.book_append_sheet(workbook, sheet2, "Teachers");

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=data.xlsx"
    );
    res.send(buffer);
  } else {
    res.status(200).json({ admissions, teachers });
  }
}
