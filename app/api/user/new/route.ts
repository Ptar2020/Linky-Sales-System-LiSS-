import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import { dbConnect } from "@/app/database/db";
import bcryptjs from "bcryptjs";

//Add user
export async function POST(request: NextRequest) {
  try {
    await dbConnect(); //Very important;
    const { username, password, email, gender, business } =
      await request.json();

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 13);
    await new User({
      username,
      password: hashedPassword,
      email,
      is_active: true,
      gender,
      is_superuser: false,
      is_admin: false,
      business,
    }).save();
    return NextResponse.json({ success: "User created" });
  } catch (err) {
    return NextResponse.json({
      msg: err instanceof Error ? err.message : "Unexpected Error experienced",
    });
  }
}
