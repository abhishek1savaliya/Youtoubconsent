import consent from '@/model/consent';
import { NextResponse } from 'next/server';
const { connectDb } = require('@/helper/db');

export async function POST(req, res) {
    try {
        const newApplicationData = await req.json();

        const newConsent = new consent(newApplicationData);

        await connectDb();

        const savedConsent = await newConsent.save();

        return NextResponse.json({ message: true, consent: savedConsent }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: false }, { status: 401 });
    }
}

export async function GET(req, res) {
    try {
        await connectDb();

        const applications = await visaApplication.find();

        return NextResponse.json(modifiedApplications);

    } catch (err) {
        return NextResponse.json({ message: err }, { status: 401 });
    }
}

