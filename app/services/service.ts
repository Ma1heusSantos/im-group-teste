export function onTaskClick(taskId: number) {
  const newTask = task.map((task) => {
    if (task.id === taskId) {
      return { ...task, isCompleted: !task.isCompleted };
    }
    return task;
  });
  setTask(newTask);
}

export function deleteTask(taskId: number) {
  const newTask = task.filter((t) => t.id != taskId);
  setTask(newTask);
}
