import { NextResponse } from 'next/server';
import prisma from '@/app/utils/prismaclient';
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userID } = body;

    const user = await prisma?.user.findFirst({
      where: {
        id: parseInt(userID),
      },
      include: {
        userpersonality: {
          select: {
            name: true,
            value: true,
          }
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid username or email' }, { status: 401 });
    }
    const series: any[] = [];

    user.userpersonality.forEach((personality, index) => {
      if (!series[index]) {
        series[index] = {
          name: personality.name,
          data: [],
        };
      }

      series[index].data.push(Number(personality.value.toFixed(2)));
    })

    const responseData = {
      user,
      personalities:  user.userpersonality,
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
