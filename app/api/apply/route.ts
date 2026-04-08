export const runtime = "nodejs";

import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: "require",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { 
      name, 
      email, 
      phone, 
      instrument, 
      otherInstrument, 
      genre, 
      experience, 
      about 
    } = body;

    // 👇 key logic
    const finalInstrument =
      instrument === "Other" ? otherInstrument : instrument;

    if (!name || !email || !phone || !finalInstrument || !experience || !about) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO "AcademyApplication"
      (id, name, email, phone, instrument, "Genre", experience, about, "createdAt")
      VALUES
      (${crypto.randomUUID()}, ${name}, ${email}, ${phone}, ${finalInstrument}, ${genre}, ${experience}, ${about}, NOW())
    `;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}