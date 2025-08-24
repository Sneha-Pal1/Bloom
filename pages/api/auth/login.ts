import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only handle POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get the email and password from the request body
  const { email, password } = req.body;

  // Mock authentication - in a real app, you would validate against a database
  if (email && password) {
    // For demo purposes, accept any non-empty email/password
    res.status(200).json({
      token: "mock-jwt-token",
      user: {
        id: "1",
        email: email,
        name: email.split("@")[0], // Extract name from email
      },
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
}
