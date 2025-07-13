import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';

export async function GET() {
  try {
    await dbConnect();
    const clients = await Client.find({}).sort({ createdAt: -1 });
    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, description, designation, image } = body;

    const client = new Client({
      name,
      description,
      designation,
      image,
    });

    await client.save();
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
  }
}