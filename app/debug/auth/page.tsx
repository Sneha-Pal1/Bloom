"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { AuthDebug } from "@/components/auth-debug";

export default function AuthDebugPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center mb-6 text-purple-600 hover:text-purple-800"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Authentication Diagnostics</CardTitle>
          <CardDescription>
            This page provides tools to diagnose authentication issues with your
            Bloom application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  The debug panel below shows your current authentication state,
                  environment variables, and provides tools to test API
                  connectivity. Use this information to troubleshoot any login
                  issues.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AuthDebug />

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Common Authentication Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Missing Environment Variables</strong>: Make sure your
              NEXT_PUBLIC_API_URL is correctly set in .env.local
            </li>
            <li>
              <strong>API Connection Issues</strong>: Check if your API server
              is running and accessible
            </li>
            <li>
              <strong>CORS Issues</strong>: Backend may not be allowing requests
              from your frontend domain
            </li>
            <li>
              <strong>Token Storage</strong>: Check if localStorage is properly
              storing/retrieving your auth tokens
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-600">
            Remember to check your browser's console and network tabs for
            additional error information.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
