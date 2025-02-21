import { NextResponse } from "next/server"

export async function GET(req) {
  const token = req.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const res = await fetch(
      "https://stg-core.bpapp.net/api/Member/GetProfile",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    const user = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}
