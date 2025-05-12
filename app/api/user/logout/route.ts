import { NextRequest, NextResponse } from "next/server";
import { DecodedToken, middleware } from "../authVerify"; // Import the type if exported

// Logout an authenticated user
export async function DELETE(req: NextRequest) {
  try {
    // Call middleware and type its return value
    const data: DecodedToken | null = await middleware(req);
    if (!data) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        { status: 401 }
      );
    }

    // Set security headers
    const securityHeaders: Record<string, string> = {
      "Content-Security-Policy": "default-src 'self'",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    };

    // Prepare cookie headers
    const isProduction = process.env.NODE_ENV === "production";
    const cookieHeaders = [
      `accessToken=; Path=/; Max-Age=0; HttpOnly;${
        isProduction ? " Secure;" : ""
      }`,
      `refreshToken=; Path=/; Max-Age=0; HttpOnly;${
        isProduction ? " Secure;" : ""
      }`,
    ];

    // Send the logout response
    return NextResponse.json(
      { success: "Logged Out Successfully" },
      {
        headers: {
          "Set-Cookie": cookieHeaders,
          "Content-Type": "application/json",
          ...securityHeaders,
        },
      }
    );
  } catch (err: unknown) {
    // Handle unknown errors safely
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error(errorMessage);
    return NextResponse.json({ msg: errorMessage }, { status: 500 });
  }
}
