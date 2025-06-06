"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, Trash2 } from "lucide-react";

// Sample workout data
const initialWorkouts = {
  monday: [
    { id: 1, name: "Bench Press", sets: 4, reps: "8-10", weight: 135 },
    {
      id: 2,
      name: "Incline Dumbbell Press",
      sets: 3,
      reps: "10-12",
      weight: 50,
    },
    { id: 3, name: "Cable Flyes", sets: 3, reps: "12-15", weight: 25 },
  ],
  tuesday: [],
  wednesday: [
    { id: 1, name: "Squats", sets: 4, reps: "8-10", weight: 185 },
    { id: 2, name: "Leg Press", sets: 3, reps: "10-12", weight: 300 },
    { id: 3, name: "Leg Extensions", sets: 3, reps: "12-15", weight: 90 },
  ],
  thursday: [],
  friday: [
    { id: 1, name: "Pull-ups", sets: 4, reps: "8-10", weight: 0 },
    { id: 2, name: "Barbell Rows", sets: 3, reps: "10-12", weight: 135 },
    { id: 3, name: "Lat Pulldowns", sets: 3, reps: "12-15", weight: 120 },
  ],
  saturday: [
    { id: 1, name: "Bicep Curls", sets: 4, reps: "10-12", weight: 30 },
    { id: 2, name: "Tricep Pushdowns", sets: 3, reps: "12-15", weight: 50 },
    { id: 3, name: "Shoulder Press", sets: 3, reps: "8-10", weight: 45 },
  ],
  sunday: [],
};

export default function WorkoutPlanner() {
  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [open, setOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("monday");
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 3,
    reps: "10-12",
    weight: 0,
  });

  const addExercise = () => {
    if (!newExercise.name) return;

    const exercise = {
      id: Date.now(),
      name: newExercise.name,
      sets: newExercise.sets,
      reps: newExercise.reps,
      weight: newExercise.weight,
    };

    setWorkouts({
      ...workouts,
      [currentDay]: [...workouts[currentDay], exercise],
    });

    setNewExercise({
      name: "",
      sets: 3,
      reps: "10-12",
      weight: 0,
    });

    setOpen(false);
  };

  const removeExercise = (day, id) => {
    setWorkouts({
      ...workouts,
      [day]: workouts[day].filter((exercise) => exercise.id !== id),
    });
  };

  const openAddDialog = (day) => {
    setCurrentDay(day);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Weekly Workout Plan
        </h1>
        <p className="text-muted-foreground">
          Plan your workouts for the entire week
        </p>
      </div>

      <Tabs defaultValue="monday" className="w-full">
        <TabsList className="grid grid-cols-7">
          <TabsTrigger value="monday">Mon</TabsTrigger>
          <TabsTrigger value="tuesday">Tue</TabsTrigger>
          <TabsTrigger value="wednesday">Wed</TabsTrigger>
          <TabsTrigger value="thursday">Thu</TabsTrigger>
          <TabsTrigger value="friday">Fri</TabsTrigger>
          <TabsTrigger value="saturday">Sat</TabsTrigger>
          <TabsTrigger value="sunday">Sun</TabsTrigger>
        </TabsList>

        {Object.keys(workouts).map((day) => (
          <TabsContent key={day} value={day} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold capitalize">{day}</h2>
              <Button onClick={() => openAddDialog(day)}>
                <Plus className="mr-2 h-4 w-4" /> Add Exercise
              </Button>
            </div>

            {workouts[day].length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  No exercises planned for this day. Click "Add Exercise" to
                  start building your workout.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {workouts[day].map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>{exercise.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(day, exercise.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Sets:</span>{" "}
                          {exercise.sets}
                        </div>
                        <div>
                          <span className="font-medium">Reps:</span>{" "}
                          {exercise.reps}
                        </div>
                        <div>
                          <span className="font-medium">Weight:</span>{" "}
                          {exercise.weight} lbs
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Exercise</DialogTitle>
            <DialogDescription>
              Add a new exercise to your {currentDay} workout.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="exercise">Exercise Name</Label>
              <Input
                id="exercise"
                value={newExercise.name}
                onChange={(e) =>
                  setNewExercise({ ...newExercise, name: e.target.value })
                }
                placeholder="e.g., Bench Press"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  type="number"
                  min="1"
                  value={newExercise.sets}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      sets: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="reps">Reps</Label>
                <Select
                  value={newExercise.reps}
                  onValueChange={(value) =>
                    setNewExercise({ ...newExercise, reps: value })
                  }
                >
                  <SelectTrigger id="reps">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="8-10">8-10</SelectItem>
                    <SelectItem value="10-12">10-12</SelectItem>
                    <SelectItem value="12-15">12-15</SelectItem>
                    <SelectItem value="15-20">15-20</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  value={newExercise.weight}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      weight: Number.parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={addExercise}>Add Exercise</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Weekly Plan
        </Button>
      </div>
    </div>
  );
}
