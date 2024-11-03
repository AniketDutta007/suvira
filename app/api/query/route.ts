import { QueryStatusFilterCriteria as FilterCriteria, QuerySortCriteria as SortCriteria } from "@/constants";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/config/prisma";
import { $Enums } from "@prisma/client";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || undefined;
        const status = (searchParams.get("status") as FilterCriteria) || FilterCriteria.All;
        const sort = (searchParams.get("sort") as SortCriteria) || SortCriteria.Latest;
        const page = parseInt(searchParams.get("page") || "1", 10) || 1;
        const limit = parseInt(searchParams.get("limit") || "12", 10) || 12;
        const paginate = searchParams.get("paginate") === 'true';

        const queries = await prisma.query.findMany({
            ...(
                paginate ? {
                    skip: (page - 1) * limit,
                    take: limit,
                } : {
                    take: page * limit,
                }
            ),
            where: {
                ...(search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { company: { contains: search, mode: 'insensitive' } },
                        { email: { contains: search, mode: 'insensitive' } },
                        { phone: { contains: search, mode: 'insensitive' } },
                        { query: { contains: search, mode: 'insensitive' } },
                    ],
                } : {}),
                ...(status == FilterCriteria.Open ? { status: $Enums.QueryStatus.OPEN } : {}),
                ...(status == FilterCriteria.Closed ? { status: $Enums.QueryStatus.CLOSED } : {}),
            },
            orderBy: {
                ...(sort == SortCriteria.Latest ? { updatedAt: 'desc' } : {}),
                ...(sort == SortCriteria.Name ? { name: 'asc' } : {}),
            }
        });

        return NextResponse.json({
            success: true,
            data: queries || [],
            error: null,
        }, {
            status: 200,
        });

    } catch (error) {
        console.log('Error:', error);

        console.error(error);
        return NextResponse.json({
            success: false,
            data: null,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        }, {
            status: 500,
        });
    }
}
