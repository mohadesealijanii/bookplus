import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    const res = await fetch(
      "https://stg-core.bpapp.net/api/Member/AdminLogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )

    if (!res.ok) {
      return NextResponse.json({ error: "Login failed" }, { status: 400 })
    }

    const data = await res.json()

    const response = NextResponse.json({ message: "Login successful" })
    response.cookies.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    })

    return response
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
