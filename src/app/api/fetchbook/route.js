import { NextResponse } from "next/server";
import { connectToDatabase } from '@/lib/connection';
import { databaseErrorResponse } from '@/lib/database-error';
import { Bookmodel } from '../../../../model/BooksSchema';

export async function POST(request) {
  let filter;
  try {
    filter = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const books = await Bookmodel.find(filter);
    return NextResponse.json(books);
  } catch (error) {
    return databaseErrorResponse('api/fetchbook', error);
  }
}
