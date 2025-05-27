import { dbConnect } from "@/app/database/db";
import { About } from "@/app/models";
import { AboutInterface } from "@/app/types";
import { NextResponse, NextRequest } from "next/server";

// CREATE ABOUT
export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  if (!title || !description) {
    return NextResponse.json({ msg: "Important data fields missing" });
  }
  console.log(title, description);
  await dbConnect();
  await new About(title, description).save();
  return NextResponse.json({ success: "About data added" });
}

export async function GET() {
  await dbConnect();
  const about: AboutInterface[] = await About.find();
  return NextResponse.json(about);
}
