import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const body = await req.json();
  const {userID} = body
    const user = await prisma?.user.findFirst({
        where: {
        id: parseInt(userID),
        },
    });
    if (!user) {
        return NextResponse.json({ error: 'Invalid username or email' }, { status: 401 });
    }
    else{
        return NextResponse.json({ user });
    }
}
