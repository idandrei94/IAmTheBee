import { isAdmin } from '@/lib/actions/user.actions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(await isAdmin());
}