import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 POST /api/auth/register called');
    
    const body = await request.json();
    const { name, email, password } = body;

    console.log('Registration data:', { name, email, password: password ? '[HIDDEN]' : null });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'student',
      },
    });

    console.log('✅ User created:', user.email);

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('❌ Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to create user', details: error.message },
      { status: 500 }
    );
  }
}