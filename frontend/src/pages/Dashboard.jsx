  const totalToday = todayTasks.length;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const weekTasks = tasks.filter((task) => {
    const created = new Date(task.createdAt);
    return created >= startOfWeek && created <= endOfWeek;
  });

  const completedThisWeek = weekTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const weeklyCompletionPercent = weekTasks.length
    ? Math.round((completedThisWeek / weekTasks.length) * 100)
    : 0;

  const upcomingTasks = tasks
    .filter((task) => task.status !== "Completed")
    .slice(0, 2);
@@ -90,7 +111,7 @@ export default function Dashboard() {
        <div className="flex-1 animate-in delay-200">
          <StatCard
            label="This Week"
            value="72%"
            value={`${weeklyCompletionPercent}%`}
            subtitle="Completion"
            icon={<Calendar size={20} />}
          />
