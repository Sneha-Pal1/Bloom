"use client";

import { useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

export function AuthDebug() {
  const { user, token, isAuthenticated } = useAuth();
  const [envVars, setEnvVars] = useState<Record<string, string>>({});
  const [networkTest, setNetworkTest] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "Not tested yet",
  });
  const [storedData, setStoredData] = useState<{
    token: string | null;
    user: any | null;
  }>({
    token: null,
    user: null,
  });

  // Check environment variables
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    setEnvVars({
      NEXT_PUBLIC_API_URL: apiUrl,
    });
  }, []);

  // Check localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      setStoredData({
        token: storedToken,
        user: storedUser ? JSON.parse(storedUser) : null,
      });
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  // Test API connection
  const testAPIConnection = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setNetworkTest({
        status: "error",
        message: "NEXT_PUBLIC_API_URL environment variable is not defined",
      });
      return;
    }

    setNetworkTest({ status: "loading", message: "Testing API connection..." });

    try {
      // Try to ping the API health endpoint if available, or just attempt to connect
      const testUrl = `${apiUrl}/health` || apiUrl;
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), 5000)
      );

      const response = await Promise.race([fetch(testUrl), timeoutPromise]);

      if (response instanceof Response) {
        setNetworkTest({
          status: "success",
          message: `Successfully connected to API. Status: ${response.status}`,
        });
      }
    } catch (error) {
      setNetworkTest({
        status: "error",
        message: `Failed to connect to API: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" /> Authentication Debug Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current Auth Status */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Auth Status</h3>
            <div className="flex items-center gap-2">
              <Badge variant={isAuthenticated ? "success" : "destructive"}>
                {isAuthenticated ? "Authenticated" : "Not Authenticated"}
              </Badge>
            </div>
          </div>

          {/* User Info */}
          <Accordion type="single" collapsible>
            <AccordionItem value="user-context">
              <AccordionTrigger>User Context Data</AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-60">
                  <pre>
                    {JSON.stringify(
                      {
                        user,
                        token: token ? `${token.substring(0, 15)}...` : null,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* LocalStorage Data */}
            <AccordionItem value="local-storage">
              <AccordionTrigger>LocalStorage Data</AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-60">
                  <pre>
                    {JSON.stringify(
                      {
                        token: storedData.token
                          ? `${storedData.token.substring(0, 15)}...`
                          : null,
                        user: storedData.user,
                      },
                      null,
                      2
                    )}
                  </pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Environment Variables */}
            <AccordionItem value="env-vars">
              <AccordionTrigger>Environment Variables</AccordionTrigger>
              <AccordionContent>
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-auto max-h-60">
                  <pre>{JSON.stringify(envVars, null, 2)}</pre>
                </div>
                {!envVars.NEXT_PUBLIC_API_URL && (
                  <div className="mt-3 flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span>
                      NEXT_PUBLIC_API_URL is not defined. Check your .env.local
                      file.
                    </span>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Network Test */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">API Connection Test</h3>
            <div className="flex items-center gap-3">
              <Button
                onClick={testAPIConnection}
                disabled={networkTest.status === "loading"}
              >
                Test Connection
              </Button>
              <div className="flex items-center gap-2">
                {networkTest.status === "loading" && (
                  <div className="animate-spin">⏳</div>
                )}
                {networkTest.status === "success" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {networkTest.status === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <span
                  className={
                    networkTest.status === "error" ? "text-red-500" : ""
                  }
                >
                  {networkTest.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
