import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import data from '@/data.json'

export async function GET(req: NextRequest, context: any) {
    const { params } = context;
    const user = data.sinhvien.filter(x => params.userId === x.id.toString());
    return NextResponse.json(user);
}