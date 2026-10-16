import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { dataUrl } = await req.json();
    if (!dataUrl || typeof dataUrl !== "string" || !dataUrl.startsWith("data:image/png;base64,")) {
      return NextResponse.json({ ok: false, error: "Invalid dataUrl" }, { status: 400 });
    }
    const base64 = dataUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64, "base64");
    const filePath = path.join(process.cwd(), "public", "sample-cutout.png");
    fs.writeFileSync(filePath, buffer);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
