import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

import { prisma } from '@/config/prisma';

export async function DELETE(request: NextApiRequest, { params }: { params: Promise<{ id: string; }>; }) {
    try {
        const id = (await params).id;
        const query = await prisma.query.findUnique({
            where: {
                id,
            },
        });
        if (!query) {
            return NextResponse.json({
                success: false,
                data: null,
                error: 'Query not found',
            }, {
                status: 404,
            });
        }
        await prisma.query.delete({
            where: {
                id,
            },
        });
        return NextResponse.json({
            success: true,
            data: null,
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