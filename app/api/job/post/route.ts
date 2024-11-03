import { StatusFilterCriteria as FilterCriteria, JobPostSortCriteria as SortCriteria } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/config/prisma";
import { $Enums } from "@prisma/client";


export async function GET(
    request: NextRequest,
) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || undefined;
        const status = (searchParams.get("status") as FilterCriteria) || FilterCriteria.All;
        const sort = (searchParams.get("sort") as SortCriteria) || SortCriteria.Latest;
        const page = parseInt(searchParams.get("page") || "1", 10) || 1;
        const limit = parseInt(searchParams.get("limit") || "12", 10) || 12;
        const paginate = Boolean(searchParams.get("paginate") === 'true');

        const posts = await prisma.jobPost.findMany({
            include: {
                _count: {
                    select: {
                        applications: true,
                    }
                }
            },
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
                        { title: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                        { location: { contains: search, mode: 'insensitive' } },
                        {
                            role: {
                                contains: search, mode: 'insensitive'
                            }
                        },
                    ],
                } : {}),
                ...status == FilterCriteria.Active ? { status: $Enums.Status.ACTIVE } : {},
                ...status == FilterCriteria.Inactive ? { status: $Enums.Status.INACTIVE } : {},
            },
            orderBy: {
                ...sort == SortCriteria.Latest ? { updatedAt: 'desc' } : {},
                ...sort == SortCriteria.Title ? { title: 'asc' } : {},
                ...sort == SortCriteria.Salary ? { salary: 'desc' } : {},
                ...sort == SortCriteria.NoOfApplicants ? {
                    _count: {
                        applications: 'desc'
                    }
                } : {},
            }
        }).then((posts) => posts.map(
            ({ _count, ...post }) => ({
                ...post,
                applicationCount: _count.applications,
            })
        ));

        return NextResponse.json({
            success: true,
            data: posts || [],
            error: null,
        }, {
            status: 200,
        });
    } catch (error) {
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