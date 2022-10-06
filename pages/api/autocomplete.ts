// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = { 
  items: string[]
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const q = (query.q as string).trim();
  const items: string[] = []

  if (!q) {
    return res.status(200).json({ items });
  }

  for (let i = 0; i < 5; i++) {
    items.push(q + '.' + i);
  }

  if (query.delay) {
    setTimeout(() => {
      res.status(200).json({ items });
    }, q === 'g' ? 8000 : 750);
  
    return;
  }

  res.status(200).json({ items });
}
