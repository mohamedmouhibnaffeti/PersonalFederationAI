import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET() {
  try {
    const headersInstance = headers()
    const authHeader = headersInstance.get('authorization')
    if(!authHeader){
        return NextResponse.json(
            { message: 'Unauthorized' },
            {
            status: 400,
            },
        )
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (!decoded) {
      return NextResponse.json(
        { message: 'Expired' },
        {
          status: 400,
        },
      )
    } else {
      return NextResponse.json(
        
        { data: 'Protected data' },
        {
          status: 200,
        },
      )
    }
  } catch (error) {
    console.error('Token verification failed', error)
    return NextResponse.json(
      { message: 'Unauthorized' },
      {
        status: 400,
      },
    )
  }
}