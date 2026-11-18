import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "contacts.json");

async function readContacts() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeContacts(contacts: unknown[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(contacts, null, 2));
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }
    const contacts = await readContacts();
    const entry = { id: crypto.randomUUID(), name, email, message, read: false, createdAt: new Date().toISOString() };
    contacts.unshift(entry);
    await writeContacts(contacts);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to save message" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await readContacts();
    return NextResponse.json({ success: true, data: contacts });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to read messages" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, read } = await req.json();
    const contacts = await readContacts();
    const idx = contacts.findIndex((c: { id: string }) => c.id === id);
    if (idx === -1) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    contacts[idx].read = read;
    await writeContacts(contacts);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to update" }, { status: 500 });
  }
}
