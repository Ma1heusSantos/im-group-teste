"use client";
import { useState, useMemo, useEffect } from "react";
import { Task } from "@/types/taskType";
import { getTasks, saveTasks } from "@/storage/taskStorage";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import ThemeToggle from "./components/ThemeToggle";
import EditTaskModal from "./components/EditTaskModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import Toast from "./components/Toast";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTasks(getTasks());
  }, []);
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "completed"
  >("all");
  const [priorityFilter, setPriorityFilter] = useState<
    "all" | "low" | "medium" | "high"
  >("all");
  const [sortBy, setSortBy] = useState<
    "created" | "priority" | "title" | "dueDate"
  >("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [deletingTask, setDeletingTask] = useState<{
    id: string;
    title: string;
  } | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  function handleAddTask(data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      priority: data.priority,
      status: "pending",
      createdAt: new Date().toISOString(),
      dueDate: data.dueDate,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setToast({ message: "Tarefa criada com sucesso!", type: "success" });
  }

  function handleTaskClick(taskId: string) {
    const updatedTasks: Task[] = tasks.map((task) => {
      if (task.id !== taskId) return task;

      const isCompleting = task.status === "pending";

      return {
        ...task,
        status: isCompleting ? "completed" : "pending",
        completedAt: isCompleting ? new Date().toISOString() : undefined,
      };
    });

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  }

  function handleDeleteTask(taskId: string) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setDeletingTask({ id: taskId, title: task.title });
    }
  }

  function confirmDelete() {
    if (!deletingTask) return;
    const updatedTasks = tasks.filter((task) => task.id !== deletingTask.id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setToast({ message: "Tarefa excluída com sucesso!", type: "success" });
    setDeletingTask(null);
  }

  function handleStartEdit(taskId: string) {
    const task = tasks.find((t) => t.id === taskId) || null;
    setEditingTask(task);
  }

  function handleUpdateTask(data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) {
    if (!editingTask) return;

    const updatedTasks: Task[] = tasks.map((task) =>
      task.id === editingTask.id
        ? {
            ...task,
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
          }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
    setToast({ message: "Tarefa atualizada com sucesso!", type: "success" });
  }

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const normalizedSearch = search.trim().toLowerCase();
      const matchesSearch =
        !normalizedSearch ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        (task.description ?? "").toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Ordenação
    result = [...result].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "dueDate":
          const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0;
          const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0;
          comparison = aDate - bDate;
          break;
        case "created":
        default:
          comparison =
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [tasks, search, statusFilter, priorityFilter, sortBy, sortOrder]);

  const stats = useMemo(() => {
    if (!isMounted)
      return { total: 0, completed: 0, pending: 0, highPriority: 0 };
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = total - completed;
    const highPriority = tasks.filter((t) => t.priority === "high").length;

    return { total, completed, pending, highPriority };
  }, [tasks, isMounted]);

  return (
    <main className="flex min-h-screen items-start justify-center px-3 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-2xl app-card p-4 shadow-xl backdrop-blur-sm sm:p-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-balance text-2xl font-semibold sm:text-3xl">
              To Do List
            </h1>
            <p className="mt-1 text-xs app-muted" suppressHydrationWarning>
              {stats.total} tarefa{stats.total !== 1 ? "s" : ""} •{" "}
              {stats.completed} concluída{stats.completed !== 1 ? "s" : ""} •{" "}
              {stats.pending} pendente{stats.pending !== 1 ? "s" : ""}
            </p>
          </div>
          <ThemeToggle />
        </header>
        <AddTask
          onAddTask={handleAddTask}
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />
        <Tasks
          tasks={filteredTasks}
          onTaskClick={handleTaskClick}
          deleteTask={handleDeleteTask}
          onEditClick={handleStartEdit}
        />
        {editingTask && (
          <EditTaskModal
            key={editingTask.id}
            task={editingTask}
            open={true}
            onClose={() => setEditingTask(null)}
            onSave={handleUpdateTask}
          />
        )}
        {deletingTask && (
          <DeleteConfirmModal
            taskTitle={deletingTask.title}
            open={true}
            onClose={() => setDeletingTask(null)}
            onConfirm={confirmDelete}
          />
        )}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            open={true}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
