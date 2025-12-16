"use client";
import Link from "next/link";
import type { Task } from "../../types/taskType";

type TasksProps = {
  tasks: Task[];
  onTaskClick: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  onEditClick: (taskId: string) => void;
};

function Tasks({ tasks, onTaskClick, deleteTask, onEditClick }: TasksProps) {
  if (tasks.length === 0) {
    return (
      <p className="app-muted-soft app-muted mt-6 rounded-md px-4 py-3 text-center text-sm">
        Nenhuma tarefa cadastrada. Adicione uma nova acima.
      </p>
    );
  }

  return (
    <ul className="app-surface mt-6 max-h-[50vh] space-y-4 overflow-y-auto rounded-md p-4 shadow sm:p-6">
      {tasks.map((t) => (
        <li className="flex flex-col gap-2 sm:flex-row" key={t.id}>
          <button
            onClick={() => onTaskClick(t.id)}
            className={`group w-full rounded-md p-2 text-left text-sm text-white transition ${
              t.priority === "high"
                ? "bg-red-500/90 hover:bg-red-600"
                : t.priority === "medium"
                ? "bg-amber-500/90 hover:bg-amber-600"
                : "bg-emerald-500/90 hover:bg-emerald-600"
            } ${t.status === "completed" ? "line-through opacity-60" : ""}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate">{t.title}</span>
              <span
                className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ${
                  t.priority === "high"
                    ? "bg-white/15 text-red-50"
                    : t.priority === "medium"
                    ? "bg-white/15 text-amber-50"
                    : "bg-white/15 text-emerald-50"
                }`}
              >
                {t.priority === "high"
                  ? "Alta"
                  : t.priority === "medium"
                  ? "Média"
                  : "Baixa"}
              </span>
            </div>
          </button>
          <Link
            href={`/tasks/${t.id}`}
            className="rounded bg-slate-500/80 px-3 py-2 text-center text-sm font-medium text-white transition hover:bg-slate-600 sm:self-stretch"
          >
            Detalhes
          </Link>
          <button
            type="button"
            className="rounded bg-slate-500/80 px-3 py-2 text-white text-sm font-medium transition hover:bg-slate-600 sm:self-stretch"
            onClick={() => onEditClick(t.id)}
          >
            Editar
          </button>
          <button
            type="button"
            className="rounded bg-red-500 px-3 py-2 text-white text-sm font-medium transition hover:bg-red-600 sm:self-stretch"
            onClick={() => deleteTask(t.id)}
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
