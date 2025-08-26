"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getGifForPose } from "@/lib/pose-gifs";
import { Play, X } from "lucide-react";

interface PoseGifDisplayProps {
  poseId: string;
  poseName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function PoseGifDisplay({
  poseId,
  poseName,
  isOpen,
  onClose,
}: PoseGifDisplayProps) {
  const gifPath = getGifForPose(poseId);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 bg-white rounded-3xl shadow-2xl overflow-hidden border-0">
        <div className="relative">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              {poseName}
            </DialogTitle>
            <button
              onClick={onClose}
              className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="p-6 pt-3">
            {gifPath ? (
              <div className="aspect-square w-full relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
                {gifPath.endsWith(".mp4") ? (
                  <video
                    autoPlay
                    loop
                    muted
                    controls
                    className="w-full h-full object-cover"
                  >
                    <source src={gifPath} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={gifPath}
                    alt={poseName}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            ) : (
              <div className="aspect-square w-full flex items-center justify-center bg-gray-100 rounded-2xl mb-4">
                <p className="text-gray-500">No animation available</p>
              </div>
            )}

            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl">
              <Play className="h-4 w-4 mr-2" />
              Start Practice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
