import { NextResponse } from 'next/server';

export function databaseErrorResponse(route, error) {
  // Avoid logging the connection string or raw driver message.
  console.error(`[${route}] Database request failed`, {
    name: error?.name ?? 'Error',
    code: error?.code ?? error?.codeName ?? 'UNKNOWN',
  });

  const missingConfiguration = error?.code === 'MONGODB_URI_MISSING';
  return NextResponse.json(
    { error: missingConfiguration ? 'Database is not configured' : 'Database request failed' },
    { status: 503 },
  );
}
