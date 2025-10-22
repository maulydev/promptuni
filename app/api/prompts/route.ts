import { Prompt } from "@/types/prompt";
import { NextResponse } from "next/server";

const SHEET_ID = "1UQYweHH59OLlzpxE1ghU1Jy_BDkiZKzI58BZMmVQ8i4";
const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

/**
 * Extracts and converts a Google Drive URL to a direct-view link
 */
function parseDriveImageUrl(url: string): string {
  if (!url) return "";

  try {
    // Handle patterns like:
    // - https://drive.google.com/open?id=FILE_ID
    // - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    // - https://drive.google.com/uc?id=FILE_ID&export=view
    let fileId = "";

    if (url.includes("open?id=")) {
      fileId = new URL(url).searchParams.get("id") || "";
    } else if (url.includes("/file/d/")) {
      const match = url.match(/\/file\/d\/([^/]+)/);
      fileId = match ? match[1] : "";
    } else if (url.includes("uc?id=")) {
      fileId = new URL(url).searchParams.get("id") || "";
    }

    return fileId
      ? `https://drive.google.com/uc?export=view&id=${fileId}`
      : url;
  } catch {
    return url;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").toLowerCase();
    const category = (searchParams.get("category") || "").toLowerCase();
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");

    const res = await fetch(GVIZ_URL, { cache: "no-store" });
    const text = await res.text();

    // Parse Google Sheets response
    const json = JSON.parse(
      text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );
    const cols = json.table.cols.map((c: any) => c.label || c.id);
    const rows = (json.table.rows || []).map((r: any) =>
      r.c ? r.c.map((cell: any) => (cell ? cell.v : "")) : []
    );

    // Map rows to objects
    const objects = rows.map((row: any[], index: number) => {
      const obj: Record<string, string> = {};
      cols.forEach((col: string, i: number) => (obj[col] = row[i] ?? ""));
      obj.id = (index + 1).toString();
      return obj;
    });

    // Apply filtering + handle image parsing
    let filtered = objects.map((item: any) => ({
      id: item.id,
      title: item.title || "Untitled",
      category: item.category || "Uncategorized",
      image: parseDriveImageUrl(item.image || ""),
      prompt: item.prompt || "",
      Timestamp: item.Timestamp || "",
    }));

    if (search) {
      filtered = filtered.filter((p: Prompt) =>
        p.title.toLowerCase().includes(search)
      );
    }

    if (category) {
      filtered = filtered.filter(
        (p: Prompt) => p.category.toLowerCase() === category
      );
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    return NextResponse.json(
      { prompts: paginated, total, totalPages },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching Google Sheet:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
