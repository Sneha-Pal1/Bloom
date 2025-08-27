import { useEffect } from "react";
import { useAuth } from "@/components/auth-context";

export function AuthDebug() {
  const auth = useAuth();

  useEffect(() => {
    // Log API URL and auth state
    console.log("=== AUTH DEBUG INFO ===");
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    console.log("Is authenticated:", !!auth.token);
    console.log("User:", auth.user);
    console.log("=====================");

    // Test API connectivity
    const testConnection = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/health`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          console.log("✅ API connection successful:", await response.text());
        } else {
          console.error(
            "❌ API connection failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error("❌ API connection error:", error.message);
        } else {
          console.error("❌ API connection error:", error);
        }
        console.log(
          "This likely means your backend is not running at",
          process.env.NEXT_PUBLIC_API_URL
        );
        console.log("Tips: 1) Make sure your backend is running");
        console.log("      2) Check if CORS is configured correctly");
        console.log("      3) Verify the port number is correct");
      }
    };

    testConnection();
  }, [auth.token, auth.user]);

  // Render nothing visible
  return null;
}
