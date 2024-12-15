import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

async function authenticateUser(name: string, email: string) {
  const user = await prisma?.user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      role: true,
      dominantpersonality: true,
      name: true,
      email: true
    }
  });
  if (user) {
    console.log({user});
    return user;
  } else {
    const createdUser = await prisma?.user.create({
      data: {
        email: email,
        name: name,
      },
    });
    console.log({createdUser});
    return createdUser;
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email } = body;

  const user = await authenticateUser(name, email);
  if (!user) {
    return NextResponse.json({ error: 'Invalid username or email' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: '365d',
  });

  const response = NextResponse.json({ token, role: user.role });

  response.cookies.set('userId', user.id.toString(), {
    maxAge: 365 * 24 * 60 * 60,
  });
  response.cookies.set('role', user.role, {
    maxAge: 365 * 24 * 60 * 60,
  });
  

  return response;
}
