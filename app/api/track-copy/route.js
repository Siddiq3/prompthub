import fs from "fs";
import path from "path";

const COPY_COUNTS_FILE = path.join(process.cwd(), "data", "copy-counts.json");

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.dirname(COPY_COUNTS_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load copy counts from file
function loadCopyCounts() {
  try {
    ensureDataDir();
    if (fs.existsSync(COPY_COUNTS_FILE)) {
      const data = fs.readFileSync(COPY_COUNTS_FILE, "utf-8");
      return JSON.parse(data || "{}");
    }
    return {};
  } catch (error) {
    console.error("Error loading copy counts:", error);
    return {};
  }
}

// Save copy counts to file
function saveCopyCounts(counts) {
  try {
    ensureDataDir();
    fs.writeFileSync(COPY_COUNTS_FILE, JSON.stringify(counts, null, 2));
  } catch (error) {
    console.error("Error saving copy counts:", error);
  }
}

export async function POST(request) {
  try {
    const { promptId } = await request.json();

    if (!promptId) {
      return Response.json(
        { error: "promptId is required" },
        { status: 400 }
      );
    }

    // Load current counts
    const counts = loadCopyCounts();

    // Increment copy count for this prompt
    counts[promptId] = (counts[promptId] || 0) + 1;

    // Save updated counts
    saveCopyCounts(counts);

    return Response.json({
      success: true,
      promptId,
      copies: counts[promptId],
    });
  } catch (error) {
    console.error("Error tracking copy:", error);
    return Response.json(
      { error: "Failed to track copy" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get("promptId");

    if (!promptId) {
      // Return all copy counts
      const counts = loadCopyCounts();
      return Response.json(counts);
    }

    // Return copy count for specific prompt
    const counts = loadCopyCounts();
    const copies = counts[promptId] || 0;

    return Response.json({ promptId, copies });
  } catch (error) {
    console.error("Error fetching copy counts:", error);
    return Response.json(
      { error: "Failed to fetch copy counts" },
      { status: 500 }
    );
  }
}
