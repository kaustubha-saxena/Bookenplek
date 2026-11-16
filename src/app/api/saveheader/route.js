import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/connection';
import { databaseErrorResponse } from '@/lib/database-error';
import { Headermodel } from '../../../../model/header';
import { Header } from '../../../../Header_Data';

export async function GET() {
  try {
    await connectToDatabase();
    await Headermodel.bulkWrite(Header.map((header) => ({
      updateOne: {
        filter: { genre: header.genre },
        update: { $set: header },
        upsert: true,
      },
    })));

    return NextResponse.json({ message: 'done' });
  } catch (error) {
    return databaseErrorResponse('api/saveheader', error);
  }
}
