import { headers } from 'next/headers'
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryUrl = searchParams.get('url') ?? ""

  const headersList = headers()
  const apiKey = headersList.get('X-MBX-APIKEY') ?? "";

  const payload = req?.json() ?? {};

  const response = await fetch(
    queryUrl,
    {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': apiKey
      },
      body: JSON.stringify(payload)
    }
  );

  if (response.ok) {
    return Response.json(
      await response.json()
    )
  }

  return Response.json({
    error: "failed to fetch"
  })
}