// import { getData } from "@/actions/todoAction";
// import Todos from "@/components/todos";

// export default async function Home() {
//   const data = await getData();
//   return <Todos todos={data} />;
// }

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to AlphaTrainer
        </h1>
        <p className="text-muted-foreground">
          Plan, track, and share your fitness journey
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Weekly Workouts
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4/7</div>
            <p className="text-xs text-muted-foreground">
              Days completed this week
            </p>
            <Progress value={57} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Workouts
            </CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Current Week Plan</CardTitle>
            <CardDescription>
              Your workout schedule for this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, i) => (
                  <div key={day} className="flex flex-col items-center">
                    <div className="text-sm font-medium mb-1">{day}</div>
                    <div
                      className={`w-full aspect-square rounded-md flex items-center justify-center text-xs font-medium ${
                        i === 0
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : i === 2
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : i === 4
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : i === 5
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "bg-muted"
                      }`}
                    >
                      {i === 0
                        ? "Chest"
                        : i === 2
                        ? "Legs"
                        : i === 4
                        ? "Back"
                        : i === 5
                        ? "Arms"
                        : "Rest"}
                    </div>
                  </div>
                )
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <Button asChild size="sm">
                <Link href="/plan">
                  View Full Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
