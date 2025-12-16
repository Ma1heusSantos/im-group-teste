"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Task } from "@/types/taskType";
import { getTasks, saveTasks } from "@/storage/taskStorage";
import EditTaskModal from "@/app/components/EditTaskModal";

function TaskDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const task = useMemo<Task | null>(() => {
    if (typeof window === "undefined" || !mounted) return null;
    const allTasks = getTasks();
    return allTasks.find((t) => t.id === params.id) ?? null;
  }, [params.id, mounted]);

  const notFound = task === null;

  function handleUpdateTask(data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) {
    if (!task) return;

    const allTasks = getTasks();
    const updatedTasks: Task[] = allTasks.map((t) =>
      t.id === task.id
        ? {
            ...t,
            title: data.title,
            description: data.description,
            priority: data.priority,
            dueDate: data.dueDate,
          }
        : t
    );

    saveTasks(updatedTasks);
    setEditingTask(null);
    router.refresh();
  }

  if (notFound) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl app-card p-6 text-center shadow-lg">
          <h1 className="mb-2 text-lg font-semibold">Tarefa não encontrada</h1>
          <p className="app-muted text-sm">
            A tarefa que você tentou acessar não existe mais ou foi removida.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-4 app-accent rounded-md px-4 py-2 text-sm font-medium text-white"
          >
            Voltar para a lista
          </button>
        </div>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl app-card p-6 text-center shadow-lg">
          <p className="app-muted text-sm">Carregando tarefa...</p>
        </div>
      </main>
    );
  }

  const statusLabel = task.status === "completed" ? "Concluída" : "Pendente";

  const priorityLabel =
    task.priority === "high"
      ? "Alta"
      : task.priority === "medium"
      ? "Média"
      : "Baixa";

  return (
    <main className="flex min-h-screen items-start justify-center px-3 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-2xl app-card p-5 shadow-xl sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-xs font-medium app-muted hover:underline"
          >
            ← Voltar
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEditingTask(task)}
              className="app-accent rounded-md px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
            >
              Editar
            </button>
            <span className="text-xs app-muted" suppressHydrationWarning>
              Criada em{" "}
              {mounted
                ? new Date(task.createdAt).toLocaleDateString("pt-BR")
                : new Date(task.createdAt).toISOString().split("T")[0]}
            </span>
          </div>
        </div>

        <h1 className="mb-3 text-xl font-semibold sm:text-2xl">{task.title}</h1>

        <div className="mb-4 flex flex-wrap gap-2 text-xs">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 font-medium ${
              task.status === "completed"
                ? "bg-emerald-500/15 text-emerald-500"
                : "bg-amber-500/15 text-amber-500"
            }`}
          >
            {statusLabel}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 font-medium ${
              task.priority === "high"
                ? "bg-red-500/15 text-red-500"
                : task.priority === "medium"
                ? "bg-amber-500/15 text-amber-500"
                : "bg-emerald-500/15 text-emerald-500"
            }`}
          >
            Prioridade: {priorityLabel}
          </span>
          {task.dueDate && (
            <span
              className="inline-flex items-center rounded-full bg-slate-500/10 px-2.5 py-1 font-medium text-slate-500"
              suppressHydrationWarning
            >
              Prazo:{" "}
              {mounted
                ? new Date(task.dueDate).toLocaleDateString("pt-BR")
                : new Date(task.dueDate).toISOString().split("T")[0]}
            </span>
          )}
        </div>

        {task.description && (
          <section className="mb-4 rounded-md app-surface p-3 text-sm">
            <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide app-muted">
              Descrição
            </h2>
            <p className="whitespace-pre-line leading-relaxed">
              {task.description}
            </p>
          </section>
        )}

        <section className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
          <div className="rounded-md app-surface p-3">
            <p className="app-muted text-[11px] font-semibold uppercase tracking-wide">
              Criada em
            </p>
            <p className="mt-1" suppressHydrationWarning>
              {mounted
                ? new Date(task.createdAt).toLocaleString("pt-BR")
                : new Date(task.createdAt).toISOString()}
            </p>
          </div>
          <div className="rounded-md app-surface p-3">
            <p className="app-muted text-[11px] font-semibold uppercase tracking-wide">
              Concluída em
            </p>
            <p className="mt-1" suppressHydrationWarning>
              {task.completedAt
                ? mounted
                  ? new Date(task.completedAt).toLocaleString("pt-BR")
                  : new Date(task.completedAt).toISOString()
                : "Ainda não concluída"}
            </p>
          </div>
        </section>
      </div>

      {editingTask && (
        <EditTaskModal
          key={editingTask.id}
          task={editingTask}
          open={true}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTask}
        />
      )}
    </main>
  );
}

export default TaskDetailPage;
