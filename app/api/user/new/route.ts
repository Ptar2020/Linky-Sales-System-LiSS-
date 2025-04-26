import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { dbConnect } from "@/app/database/db";

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); //Very important;
    const { username, password, email, gender } = await request.json();

    await new User({
      username,
      password,
      email,
      is_active: true,
      gender,
      is_superuser: false,
    }).save();

    return NextResponse.json({ msg: "User created" });
  } catch (err) {
    return NextResponse.json({
      msg: err instanceof Error ? err.message : "Unexpected Error experienced",
    });
  }
}
