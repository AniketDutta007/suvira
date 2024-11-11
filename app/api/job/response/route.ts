import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    console.log(request);

    console.log("GET /api/job/response");
    return NextResponse.json({
        message: "GET /api/job/response",
    });
}