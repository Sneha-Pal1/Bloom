import Link from "next/link";
import { Heart, Youtube, Linkedin, X } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-16 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 mt-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 md:grid-cols-3 max-w-4xl mx-auto">
          {/* About Bloom */}
          <div className="space-y-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full flex items-center justify-center mr-3 shadow-sm">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-2xl font-semibold text-gray-800">
                Bloom
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
              "You are worthy of the love you keep trying to give everyone
              else."
            </p>
          </div>

          {/* Connect */}
          <div className="space-y-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800">Connect</h3>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <X className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-12 h-12 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-6 text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-sm font-medium"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 pt-8 border-t border-white/30">
          <p className="text-center text-sm text-gray-600 font-medium">
            © 2025 Bloom. Made with love for your wellness journey.
          </p>
        </div>
      </div>
    </footer>
  );
}
