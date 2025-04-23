"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ExerciseType } from "@/types/exerciseType";
import {
  addExercise as addExAction,
  deleteExercise as deleteExAction,
} from "@/actions/exerciseAction";
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
import { Plus, Trash2 } from "lucide-react";

interface Props {
  initialWorkouts: Record<string, ExerciseType[]>;
}

export default function WorkoutPlannerClient({ initialWorkouts }: Props) {
  // Workouts come from server via initialWorkouts
  const [open, setOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState("monday");
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 3,
    reps: "10-12",
    weight: 0,
  });
  const router = useRouter();

  const addExercise = async () => {
    if (!newExercise.name) return;
    await addExAction(
      currentDay,
      newExercise.name,
      newExercise.sets,
      newExercise.reps,
      newExercise.weight
    );
    setOpen(false);
    router.refresh();
  };

  const removeExercise = async (id: number) => {
    await deleteExAction(id);
    router.refresh();
  };

  const openAddDialog = (day: string) => {
    setCurrentDay(day);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="monday" className="w-full">
        <TabsList className="grid grid-cols-7">
          {Object.keys(initialWorkouts).map((day) => (
            <TabsTrigger key={day} value={day}>
              {day.slice(0, 3).toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(initialWorkouts).map(([day, exercises]) => (
          <TabsContent key={day} value={day} className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold capitalize">{day}</h2>
              <Button onClick={() => openAddDialog(day)}>
                <Plus className="mr-2 h-4 w-4" /> Add Exercise
              </Button>
            </div>

            {exercises.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-muted-foreground">
                  No exercises planned for this day.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {exercises.map((exercise) => (
                  <Card key={exercise.id}>
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <CardTitle>{exercise.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(exercise.id)}
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
              Add an exercise to your {currentDay} workout.
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
                  min={1}
                  value={newExercise.sets}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      sets: e.target.valueAsNumber,
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
                  min={0}
                  value={newExercise.weight}
                  onChange={(e) =>
                    setNewExercise({
                      ...newExercise,
                      weight: e.target.valueAsNumber,
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
    </div>
  );
}
