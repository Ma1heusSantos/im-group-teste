"use client";

import { FormEvent, useState } from "react";

type AddTaskProps = {
  onAddTask: (data: {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
  }) => void;
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: "all" | "pending" | "completed";
  onStatusFilterChange: (value: "all" | "pending" | "completed") => void;
  priorityFilter: "all" | "low" | "medium" | "high";
  onPriorityFilterChange: (value: "all" | "low" | "medium" | "high") => void;
  sortBy: "created" | "priority" | "title" | "dueDate";
  onSortByChange: (value: "created" | "priority" | "title" | "dueDate") => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
};

function AddTask({
  onAddTask,
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
}: AddTaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAddTask({
      title: trimmed,
      description: description.trim(),
      priority,
      dueDate: dueDate || undefined,
    });

    setTitle("");
    setDescription("");
    setPriority("medium");
    setDueDate("");
    setIsModalOpen(false);
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pesquisar tarefas..."
          className="app-input flex-1 rounded-md px-3 py-2 text-sm outline-none transition"
        />
        <button
          type="button"
          className="app-accent rounded-md px-4 py-2 text-sm font-medium text-white transition"
          onClick={() => setIsModalOpen(true)}
        >
          Nova tarefa
        </button>
      </div>

      <div className="flex flex-col gap-2 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusFilterChange(
                e.target.value as "all" | "pending" | "completed"
              )
            }
            className="app-input rounded-md px-2 py-1 outline-none transition"
          >
            <option value="all">Todas</option>
            <option value="pending">Pendentes</option>
            <option value="completed">Concluídas</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) =>
              onPriorityFilterChange(
                e.target.value as "all" | "low" | "medium" | "high"
              )
            }
            className="app-input rounded-md px-2 py-1 outline-none transition"
          >
            <option value="all">Todas prioridades</option>
            <option value="high">Alta</option>
            <option value="medium">Média</option>
            <option value="low">Baixa</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(
                e.target.value as "created" | "priority" | "title" | "dueDate"
              )
            }
            className="app-input rounded-md px-2 py-1 outline-none transition"
          >
            <option value="created">Data criação</option>
            <option value="priority">Prioridade</option>
            <option value="title">Título</option>
            <option value="dueDate">Prazo</option>
          </select>
          <button
            type="button"
            onClick={() =>
              onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
            }
            className="app-input rounded-md px-2 py-1 outline-none transition hover:opacity-80"
            title={sortOrder === "asc" ? "Crescente" : "Decrescente"}
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
        <p className="app-muted text-[11px]">Buscando em título e descrição</p>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 mt-36 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg app-card p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold">Nova tarefa</h2>

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
                  <label className="block text-sm font-medium">
                    Prioridade
                  </label>
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
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!title.trim()}
                  className="app-accent rounded-md px-4 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed opacity-90 disabled:opacity-60"
                >
                  Salvar tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
