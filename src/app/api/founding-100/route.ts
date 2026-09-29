import { NextRequest, NextResponse } from "next/server";

const ARTICLE6_WAITLIST_URL = "https://article6.org/api/scoop-waitlist";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const upstream = await fetch(ARTICLE6_WAITLIST_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      redirect: "follow",
      cache: "no-store",
    });

    const text = await upstream.text();
    return new NextResponse(text || null, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[scoop-founding-100] Article6 intake proxy failed", error);
    return NextResponse.json(
      { error: "We could not add you to the Founding 100. Please try again." },
      { status: 502 },
    );
  }
}
