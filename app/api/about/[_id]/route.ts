import { NextRequest, NextResponse } from "next/server";
import { middleware } from "../../user/authVerify";
import { dbConnect } from "@/app/database/db";
import { About } from "@/app/models";
import { AboutInterface } from "@/app/types";

// Get Single About data
export async function GET(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    // await middleware(request);
    await dbConnect();

    const aboutData = await About.findById(params._id);
    if (!aboutData) {
      return NextResponse.json(
        { error: "About entry not found" },
        { status: 404 }
      );
    }

    // Convert lean document to AboutInterface
    const responseData: AboutInterface = {
      _id: aboutData._id.toString(),
      title: aboutData.title,
      description: aboutData.description,
      last_edited: aboutData.last_edited,
      createdAt: aboutData.createdAt,
      updatedAt: aboutData.updatedAt,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching About entry:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Update About
export async function PATCH(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    await middleware(request);
    const data: Partial<AboutInterface> = await request.json();
    await dbConnect();
    const aboutToEdit = await About.findById(params._id);
    console.log(aboutToEdit);
    if (!aboutToEdit) {
      return NextResponse.json({ msg: "About data not found" });
    }
    // Apply updates and save
    Object.assign(aboutToEdit, data);
    await aboutToEdit.save();

    return NextResponse.json({ success: "About successfully updated" });
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error Updating about",
    });
  }
}

// Delete About
export async function DELETE(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" });
    }
    await dbConnect();
    const aboutToDelete = await About.findById(params._id);
    if (!aboutToDelete) {
      return NextResponse.json({ msg: "No such about exists" });
    }
    await About.deleteOne(aboutToDelete);
    // await aboutToDelete.delete();
    console.log(aboutToDelete);
    return NextResponse.json({ success: "Successfully deleted" });
  } catch (error) {
    return NextResponse.json({
      msg: error instanceof Error ? error.message : "Error deleting",
    });
  }
}
