import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      instrument?: string;
      experience?: string;
      about?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const instrument = body.instrument?.trim();
    const experience = body.experience?.trim();
    const about = body.about?.trim();

    if (!name || !email || !phone || !instrument || !experience || !about) {
      return NextResponse.json({ success: false, error: "All fields are required." }, { status: 400 });
    }

    await prisma.academyApplication.create({
      data: {
        name,
        email,
        phone,
        instrument,
        experience,
        about,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application submission failed:", error);
    return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
  }
}
