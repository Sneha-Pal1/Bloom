"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Play, 
  PauseCircle, 
  SkipForward, 
  RotateCcw,
  Heart
} from "lucide-react";
import { getGifForPose } from "@/lib/pose-gifs";

interface Exercise {
  id: string;
  name: string;
  duration: string;
  isCompleted: boolean;
}

export default function ActiveRoutinePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const routineName = searchParams?.get("name") || "Workout";
  const routineType = searchParams?.get("type") || "yoga";
  
  // Get exercises from URL params or default to empty
  const exercisesParam = searchParams?.get("exercises");
  const initialExercises = exercisesParam 
    ? exercisesParam.split(",").map(id => ({
        id,
        name: formatExerciseName(id),
        duration: "45 sec",
        isCompleted: false
      }))
    : [];
  
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // Default 45 seconds per exercise
  
  // Format exercise ID to readable name (e.g., "cat-cow" => "Cat Cow")
  function formatExerciseName(id: string): string {
    return id
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  
  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Move to next exercise when time is up
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setTimeLeft(45); // Reset timer
        
        // Mark the completed exercise
        setExercises(prev => 
          prev.map((ex, idx) => 
            idx === currentIndex ? { ...ex, isCompleted: true } : ex
          )
        );
      } else {
        // Routine completed
        setIsPlaying(false);
        setExercises(prev => 
          prev.map((ex, idx) => 
            idx === currentIndex ? { ...ex, isCompleted: true } : ex
          )
        );
      }
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, currentIndex, exercises.length]);
  
  // Handle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  // Skip to next exercise
  const nextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(45); // Reset timer
      
      // Mark current as completed
      setExercises(prev => 
        prev.map((ex, idx) => 
          idx === currentIndex ? { ...ex, isCompleted: true } : ex
        )
      );
    }
  };
  
  // Go back to previous exercise
  const prevExercise = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTimeLeft(45); // Reset timer
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };
  
  // No exercises found
  if (exercises.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="p-2 mr-2" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">No exercises found</h1>
        </div>
        
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-md">
          <CardContent className="p-8 text-center">
            <p className="mb-6">No exercises were specified for this routine.</p>
            <Button 
              onClick={() => router.push("/routines")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              Return to Routines
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const currentExercise = exercises[currentIndex];
  const gifPath = getGifForPose(currentExercise.id);
  const isLastExercise = currentIndex === exercises.length - 1;
  
  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with back button and title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            className="p-2 mr-2" 
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{routineName}</h1>
        </div>
        
        <Badge className="bg-purple-100 text-purple-800 border-0">
          {exercises.filter(ex => ex.isCompleted).length}/{exercises.length} Completed
        </Badge>
      </div>
      
      {/* Main content */}
      <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 border-0 shadow-lg rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* GIF Display */}
          <div className="aspect-video w-full relative bg-gray-100">
            {gifPath ? (
              gifPath.endsWith('.mp4') ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  className="w-full h-full object-contain"
                >
                  <source src={gifPath} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={gifPath}
                  alt={currentExercise.name}
                  fill
                  className="object-contain"
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No animation available</p>
              </div>
            )}
          </div>
          
          {/* Exercise info and controls */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{currentExercise.name}</h2>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{currentExercise.duration}</span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-purple-600">
                {formatTime(timeLeft)}
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12 border-2"
                onClick={prevExercise}
                disabled={currentIndex === 0}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              
              <Button 
                size="icon" 
                className="rounded-full w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500"
                onClick={togglePlayPause}
              >
                {isPlaying ? (
                  <PauseCircle className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white ml-1" />
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full w-12 h-12 border-2"
                onClick={nextExercise}
                disabled={isLastExercise}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Progress bar */}
            <div className="bg-gray-100 h-2 rounded-full mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
                style={{ width: `${((currentIndex + (1 - timeLeft/45)) / exercises.length) * 100}%` }}
              ></div>
            </div>
            
            {/* Exercises list */}
            <div className="space-y-2 mb-6">
              <h3 className="font-medium mb-2">Up Next:</h3>
              {exercises.slice(currentIndex + 1, currentIndex + 4).map((exercise, idx) => (
                <div 
                  key={exercise.id}
                  className="flex items-center p-3 bg-white/70 rounded-xl"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 text-xs font-medium">
                    {currentIndex + idx + 2}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{exercise.name}</p>
                  </div>
                  <Badge className="bg-gray-100 text-gray-600 ml-2">
                    {exercise.duration}
                  </Badge>
                </div>
              ))}
            </div>
            
            {isLastExercise && exercises.every(ex => ex.isCompleted) && (
              <div className="bg-green-50 p-4 rounded-xl text-center mb-4">
                <p className="text-green-700 font-medium flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 mr-2" /> 
                  Routine completed!
                </p>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => router.push("/routines")}
                className="border-purple-200 text-purple-700"
              >
                Exit Routine
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                onClick={() => {
                  // Favorite or save progress functionality here
                }}
              >
                <Heart className="h-4 w-4 mr-2" /> Save Routine
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
