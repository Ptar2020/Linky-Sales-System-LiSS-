// import { User } from "@/app/models";
// import { NextResponse, NextRequest } from "next/server";
// import { middleware } from "../authVerify";
// import { dbConnect } from "@/app/database/db";

// //Get a user
// export async function GET(
//   request: NextRequest,
//   { params }: { params: { _id: string } }
// ) {
//   try {
//     // Middleware check
//     const authVerify = await middleware(request);
//     if (!authVerify) {
//       return (
//         NextResponse.json({ msg: "Unauthorized access" }),
//         {
//           status: 401,
//         }
//       );
//     }
//     await dbConnect();
//     const user = await User.findById(params._id).populate("business");
//     const userData = {
//       username: user.username,
//       email: user.email,
//       gender: user.gender,
//       is_active: user.is_active,
//       is_admin: user.is_admin,
//       is_superuser: user.is_superuser,
//       business: user.business,
//     };
//     return NextResponse.json(userData);
//   } catch (error) {
//     return NextResponse.json({
//       msg:
//         error instanceof Error ? error.message : "Unexpected Error experienced",
//     });
//   }
// }

import { User } from "@/app/models";
import { NextResponse, NextRequest } from "next/server";
import { middleware } from "../authVerify";
import { dbConnect } from "@/app/database/db";
import { UserInterface } from "@/app/types";

// Get a user
export async function GET(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    // Middleware check
    const authVerify = await middleware(request);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" }, { status: 401 });
    }

    await dbConnect();
    const user: UserInterface = await User.findById(params._id).populate(
      "business"
    );

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const userData: Partial<UserInterface> = {
      username: user.username,
      email: user.email,
      gender: user.gender,
      is_active: user.is_active,
      is_admin: user.is_admin,
      is_superuser: user.is_superuser,
      business: user.business,
    };

    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json(
      {
        msg:
          error instanceof Error
            ? error.message
            : "Unexpected Error experienced",
      },
      { status: 500 }
    );
  }
}

// Update a user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    // Middleware check
    const authVerify = await middleware(req);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" }, { status: 401 });
    }

    // Parse request body for updates
    const updates: Partial<UserInterface> = await req.json();
    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json(
        { msg: "No data provided for update" },
        { status: 400 }
      );
    }

    // Validate update fields
    const allowedFields = [
      "username",
      "email",
      "gender",
      "is_active",
      "is_admin",
      "is_superuser",
      "business",
    ];
    const invalidFields = Object.keys(updates).filter(
      (key) => !allowedFields.includes(key)
    );
    if (invalidFields.length > 0) {
      return NextResponse.json(
        { msg: `Invalid fields: ${invalidFields.join(", ")}` },
        { status: 400 }
      );
    }

    // DB connection
    await dbConnect();

    // Find the item to edit by ID
    const userToEdit: UserInterface = await User.findById(params._id);
    if (!userToEdit) {
      return NextResponse.json({ msg: "User does not exist" }, { status: 404 });
    }

    // Apply updates and save
    Object.assign(userToEdit, updates);
    await userToEdit.save();

    // Return success message
    return NextResponse.json({
      success: "User updated successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        msg:
          err instanceof Error ? err.message : "Unexpected Error experienced",
      },
      { status: 500 }
    );
  }
}

// Edit a user
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { _id: string } }
// ) {
//   try {
//     // Middleware check
//     const authVerify = await middleware(req);
//     if (!authVerify) {
//       return NextResponse.json({ msg: "Unauthorized access" });
//     }

//     // Parse request body for updates
//     const updates = await req.json();
//     if (!updates || Object.keys(updates).length === 0) {
//       return NextResponse.json({ msg: "No data provided for update" });
//     }

//     // DB connection
//     await dbConnect();

//     // Find the item to edit by ID
//     const userToEdit = await User.findById(params._id);
//     if (!userToEdit) {
//       return NextResponse.json({ msg: "User does not exist" });
//     }

//     // Apply updates and save
//     Object.assign(userToEdit, updates);
//     await userToEdit.save();

//     // Return success message
//     return NextResponse.json({
//       success: "User updated successfully",
//     });
//   } catch (err) {
//     return NextResponse.json({
//       msg: err instanceof Error ? err.message : "Unexpected Error experienced",
//     });
//   }
// }

// Delete a user
export async function DELETE(
  req: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    // Middleware check
    const authVerify = await middleware(req);
    if (!authVerify) {
      return NextResponse.json({ msg: "Unauthorized access" }, { status: 401 });
    }

    // DB connection
    await dbConnect();

    // Find the item to delete by ID
    const userToDelete: UserInterface = await User.findById(params._id);
    if (!userToDelete) {
      return NextResponse.json({ msg: "User does not exist" }, { status: 404 });
    }

    // Delete the item
    await userToDelete.deleteOne();

    // Return success message
    return NextResponse.json(
      { success: "User deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        msg:
          err instanceof Error ? err.message : "Unexpected error experienced",
      },
      { status: 500 }
    );
  }
}

//Delete a user

// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { _id: string } }
// ) {
//   try {
//     // Middleware check
//     const authVerify = await middleware(req);
//     if (!authVerify) {
//       return (
//         NextResponse.json({ msg: "Unauthorized access" }),
//         {
//           status: 401,
//         }
//       );
//     }

//     // DB connection
//     await dbConnect();

//     // Find the item to delete by ID
//     const userToDelete = await User.findById(params._id);
//     if (!userToDelete) {
//       return (
//         NextResponse.json({ msg: "User does not exist" }),
//         {
//           status: 404,
//         }
//       );
//     }

//     // Delete the item
//     await userToDelete.deleteOne();

//     // Return success message
//     return (
//       NextResponse.json({ success: "User deleted" }),
//       {
//         status: 200,
//       }
//     );
//   } catch (err) {
//     return (
//       NextResponse.json({
//         msg:
//           err instanceof Error ? err.message : "Unexpected Error experienced",
//       }),
//       {
//         status: 500,
//       }
//     );
//   }
// }
