export const login = async (data: { email: string; password: string }) => {
  const contents = await fetch(
    "https://accelerist.herokuapp.com/api/v1/auth/sign_in",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }
  );
  return contents;
};

import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
