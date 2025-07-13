import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function GET() {
  try {
    await dbConnect();
    const newsletters = await Newsletter.find({}).sort({ createdAt: -1 });
    return NextResponse.json(newsletters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch newsletters' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { email } = body;

    const newsletter = new Newsletter({ email });
    await newsletter.save();
    return NextResponse.json(newsletter, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}