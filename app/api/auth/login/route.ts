import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const serverPassword = process.env.WIKI_PASSWORD;

    if (!serverPassword) {
      console.error("WIKI_PASSWORD is not set in environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password === serverPassword) {
      // Create the response
      const response = NextResponse.json({ success: true });

      // Set the session cookie
      // Max age: 30 days (seconds)
      const thirtyDays = 30 * 24 * 60 * 60;
      
      response.cookies.set("phenix_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: thirtyDays,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
