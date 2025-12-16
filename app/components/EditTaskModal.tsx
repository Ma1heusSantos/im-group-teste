"use client";

import { useState, useEffect, FormEvent } from "react";
import type { Task } from "@/types/taskType";

type EditTaskModalProps = {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) => void;
};

function EditTaskModal({ task, open, onClose, onSave }: EditTaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(
    task?.priority ?? "medium"
  );
  const [dueDate, setDueDate] = useState(task?.dueDate ?? "");

  useEffect(() => {
    if (!task || !open) return;
    const timer = setTimeout(() => {
      setTitle(task.title);
      setDescription(task.description ?? "");
      setPriority(task.priority ?? "medium");
      setDueDate(task.dueDate ?? "");
    }, 0);
    return () => clearTimeout(timer);
  }, [task?.id, open]);

  if (!open || !task) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onSave({
      title: trimmed,
      description: description.trim(),
      priority,
      dueDate: dueDate || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 mt-36 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg app-card p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Editar tarefa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="app-input w-full rounded-md px-3 py-2 text-sm outline-none transition"
              placeholder="Digite o título da tarefa"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="app-input w-full rounded-md px-3 py-2 text-sm outline-none transition"
              rows={3}
              placeholder="Detalhe a tarefa (opcional)"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 space-y-1">
              <label className="block text-sm font-medium">Prioridade</label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "low" | "medium" | "high")
                }
                className="app-input w-full rounded-md px-3 py-2 text-sm outline-none transition"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>

            <div className="flex-1 space-y-1">
              <label className="block text-sm font-medium">Prazo</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="app-input w-full rounded-md px-3 py-2 text-sm outline-none transition"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md px-4 py-2 text-sm font-medium app-muted hover:app-muted-soft"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="app-accent rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed opacity-90 disabled:opacity-60"
            >
              Salvar alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
