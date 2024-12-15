// pages/api/download-model.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET(req: Request) {
  try {
    // Define the file path
    const filePath = path.join(process.cwd(), "tmp/model", "script.py");

    // Check if the file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read the file content
    const fileData = await fs.readFile(filePath);

    // Create a response with file content
    const response = new NextResponse(fileData, {
      status: 200,
      headers: {
        "Content-Disposition": 'attachment; filename="script.py"',
        "Content-Type": "application/octet-stream",
      },
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for this API route
  },
};
