import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const body = await req.json();
    try {
        const { email } = body;

        const existingUser = await client.user.findUnique({
            where: {
                email: email
            }
        });

        if (!existingUser?.dataAccount) {
            return NextResponse.json({
                success: false,
                message: "User does not exist"
            });
        }
        console.log("api",existingUser.dataAccount);

        return NextResponse.json({
            dataAccount: existingUser.dataAccount,
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            // @ts-ignore
            message: `Error getting dataAccount: ${error.message}`
        });
    }
}