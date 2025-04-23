"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Clock, Dumbbell, Plus, Save } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Get current day
const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const currentDay = days[new Date().getDay()];

// Sample workout data for today
const todaysWorkout = {
  monday: [
    {
      id: 1,
      name: "Bench Press",
      sets: 4,
      reps: "8-10",
      weight: 135,
      completed: [false, false, false, false],
    },
    {
      id: 2,
      name: "Incline Dumbbell Press",
      sets: 3,
      reps: "10-12",
      weight: 50,
      completed: [false, false, false],
    },
    {
      id: 3,
      name: "Cable Flyes",
      sets: 3,
      reps: "12-15",
      weight: 25,
      completed: [false, false, false],
    },
  ],
  wednesday: [
    {
      id: 1,
      name: "Squats",
      sets: 4,
      reps: "8-10",
      weight: 185,
      completed: [false, false, false, false],
    },
    {
      id: 2,
      name: "Leg Press",
      sets: 3,
      reps: "10-12",
      weight: 300,
      completed: [false, false, false],
    },
    {
      id: 3,
      name: "Leg Extensions",
      sets: 3,
      reps: "12-15",
      weight: 90,
      completed: [false, false, false],
    },
  ],
  friday: [
    {
      id: 1,
      name: "Pull-ups",
      sets: 4,
      reps: "8-10",
      weight: 0,
      completed: [false, false, false, false],
    },
    {
      id: 2,
      name: "Barbell Rows",
      sets: 3,
      reps: "10-12",
      weight: 135,
      completed: [false, false, false],
    },
    {
      id: 3,
      name: "Lat Pulldowns",
      sets: 3,
      reps: "12-15",
      weight: 120,
      completed: [false, false, false],
    },
  ],
  saturday: [
    {
      id: 1,
      name: "Bicep Curls",
      sets: 4,
      reps: "10-12",
      weight: 30,
      completed: [false, false, false, false],
    },
    {
      id: 2,
      name: "Tricep Pushdowns",
      sets: 3,
      reps: "12-15",
      weight: 50,
      completed: [false, false, false],
    },
    {
      id: 3,
      name: "Shoulder Press",
      sets: 3,
      reps: "8-10",
      weight: 45,
      completed: [false, false, false],
    },
  ],
};

// For demo purposes, if current day has no workout, use Monday's workout
const workoutToShow = todaysWorkout[currentDay] || todaysWorkout.monday;

export default function WorkoutTracker() {
  const [workout, setWorkout] = useState(workoutToShow);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Calculate progress
  const totalSets = workout.reduce((acc, exercise) => acc + exercise.sets, 0);
  const completedSets = workout.reduce(
    (acc, exercise) => acc + exercise.completed.filter((set) => set).length,
    0
  );
  const progressPercentage = Math.round((completedSets / totalSets) * 100);

  const startWorkout = () => {
    setWorkoutStarted(true);
    setTimerActive(true);
  };

  const toggleSet = (exerciseIndex, setIndex) => {
    const updatedWorkout = [...workout];
    updatedWorkout[exerciseIndex].completed[setIndex] =
      !updatedWorkout[exerciseIndex].completed[setIndex];
    setWorkout(updatedWorkout);
  };

  const finishWorkout = () => {
    setWorkoutStarted(false);
    setTimerActive(false);
    // Here you would typically save the workout data
    alert("Workout completed and saved!");
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer effect would be added here in a real app

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Track Your Workout
        </h1>
        <p className="text-muted-foreground">
          Record your sets, reps, and weights
        </p>
      </div>

      {!workoutStarted ? (
        <Card>
          <CardHeader>
            <CardTitle>Today's Workout</CardTitle>
            <CardDescription>
              {workout.length > 0
                ? `You have ${workout.length} exercises planned for today`
                : "No workout planned for today"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {workout.length > 0 ? (
              <div className="space-y-4">
                {workout.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.sets} sets × {exercise.reps} reps •{" "}
                        {exercise.weight} lbs
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No exercises planned for today. You can add a quick workout or
                take a rest day.
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={startWorkout} className="w-full">
              <Dumbbell className="mr-2 h-4 w-4" />
              Start Workout
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Workout in Progress</CardTitle>
                <Badge variant="outline" className="flex gap-1 items-center">
                  <Clock className="h-3 w-3" />
                  {formatTime(timer)}
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-right text-muted-foreground mt-1">
                {completedSets} of {totalSets} sets completed (
                {progressPercentage}%)
              </div>
            </CardHeader>
          </Card>

          {workout.map((exercise, exerciseIndex) => (
            <Card key={exercise.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{exercise.name}</CardTitle>
                <CardDescription>
                  Target: {exercise.sets} sets × {exercise.reps} reps •{" "}
                  {exercise.weight} lbs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                    <div key={setIndex}>
                      <Button
                        variant={
                          exercise.completed[setIndex] ? "default" : "outline"
                        }
                        className={`w-full h-16 ${
                          exercise.completed[setIndex]
                            ? "bg-green-600 hover:bg-green-700"
                            : ""
                        }`}
                        onClick={() => toggleSet(exerciseIndex, setIndex)}
                      >
                        {exercise.completed[setIndex] && (
                          <CheckCircle2 className="h-5 w-5" />
                        )}
                        <span
                          className={
                            exercise.completed[setIndex] ? "sr-only" : ""
                          }
                        >
                          Set {setIndex + 1}
                        </span>
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`weight-${exercise.id}`}>
                      Weight (lbs)
                    </Label>
                    <Input
                      id={`weight-${exercise.id}`}
                      type="number"
                      defaultValue={exercise.weight}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`reps-${exercise.id}`}>Actual Reps</Label>
                    <Input
                      id={`reps-${exercise.id}`}
                      type="text"
                      placeholder={exercise.reps}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end gap-3">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
            <Button onClick={finishWorkout}>
              <Save className="mr-2 h-4 w-4" />
              Finish Workout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
