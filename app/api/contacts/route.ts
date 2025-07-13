import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { fullName, email, mobile, city } = body;

    const contact = new Contact({
      fullName,
      email,
      mobile,
      city,
    });

    await contact.save();
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 });
  }
}