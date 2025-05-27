import { dbConnect } from "@/app/database/db";
import { About } from "@/app/models";
import { AboutInterface } from "@/app/types";
import { NextResponse, NextRequest } from "next/server";

// POST: Create a new About entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description }: AboutInterface = body;

    // Validate required fields
    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json(
        {
          error: "Missing required fields: title and description are mandatory",
        },
        { status: 400 }
      );
    }

    await dbConnect();
    const newAbout = new About({ title, description });
    await newAbout.save();

    return NextResponse.json(
      { message: "About entry created successfully", data: newAbout },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating About entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET: Retrieve all About entries
export async function GET() {
  try {
    await dbConnect();
    const aboutEntries: AboutInterface[] = await About.find().lean();

    return NextResponse.json({ data: aboutEntries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching About entries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
