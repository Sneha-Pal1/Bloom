import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the user data from the request body
  const { name, email, password } = req.body;

  // Mock registration - in a real app, you would save to a database
  if (name && email && password) {
    // For demo purposes, accept any registration with required fields
    res.status(200).json({
      token: "mock-jwt-token",
      user: {
        id: "2",
        email: email,
        name: name,
      },
    });
  } else {
    res.status(400).json({ message: "Missing required fields" });
  }
}
