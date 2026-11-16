import { NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/connection';
import { databaseErrorResponse } from '@/lib/database-error';
import { Headermodel } from "../../../../model/header";

export async function POST(request) {
  let filter;
  try {
    filter = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const headers = await Headermodel.find(filter);
    return NextResponse.json(headers);
  } catch (error) {
    return databaseErrorResponse('api/fetchheader', error);
  }
}
