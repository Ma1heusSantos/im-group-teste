"use client";

type DeleteConfirmModalProps = {
  taskTitle: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

function DeleteConfirmModal({
  taskTitle,
  open,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-lg app-card p-6 shadow-lg">
        <h2 className="mb-2 text-lg font-semibold">Confirmar exclusão</h2>
        <p className="mb-4 text-sm app-muted">
          Tem certeza que deseja excluir a tarefa{" "}
          <strong>&ldquo;{taskTitle}&rdquo;</strong>? Esta ação não pode ser
          desfeita.
        </p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium app-muted hover:app-muted-soft"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="app-accent-danger rounded-md px-4 py-2 text-sm font-medium text-white transition"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
