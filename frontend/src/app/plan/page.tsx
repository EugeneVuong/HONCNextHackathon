import { getWorkouts } from "@/actions/exerciseAction";
import WorkoutPlannerClient from "@/app/plan/WorkoutPlannerClient";

export default async function PlanPage() {
  const workoutsArray = await getWorkouts();
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const workouts = days.reduce((acc, day) => {
    acc[day] = workoutsArray.filter((e) => e.day === day);
    return acc;
  }, {} as Record<string, typeof workoutsArray>);
  return <WorkoutPlannerClient initialWorkouts={workouts} />;
}
