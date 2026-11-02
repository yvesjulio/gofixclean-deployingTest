import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiArchive, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import { errorText } from "@/lib/operations";
export default function RecordActions({
  entity,
  id,
  name,
  archived,
  onDone,
}: {
  entity: "booking" | "provider" | "application";
  id: string;
  name: string;
  archived: boolean;
  onDone: () => void | Promise<void>;
}) {
  const [action, setAction] = useState<"archive" | "restore" | "delete" | null>(
      null,
    ),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [confirmation, setConfirmation] = useState("");
  async function submit() {
    setBusy(true);
    setError("");
    try {
      const { error } = await supabase.rpc("manage_operations_record", {
        entity,
        record_id: id,
        operation: action,
      });
      if (error) throw error;
      await onDone();
      setAction(null);
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <button
        className={archived ? "" : "ops-subtle"}
        onClick={() => {
          setError("");
          setAction(archived ? "restore" : "archive");
        }}
      >
        {archived ? (
          <FiRotateCcw aria-hidden="true" />
        ) : (
          <FiArchive aria-hidden="true" />
        )}{" "}
        {archived ? "Restore" : "Archive"}
      </button>
      {archived && (
        <button
          className="ops-danger"
          onClick={() => {
            setError("");
            setConfirmation("");
            setAction("delete");
          }}
        >
          <FiTrash2 aria-hidden="true" /> Delete permanently
        </button>
      )}
      <Dialog.Root
        open={action !== null}
        onOpenChange={(open) => {
          if (!open && !busy) setAction(null);
        }}
      >
        <Dialog.Portal>
          <div className="ops ops-dialog-scope">
            <Dialog.Overlay className="ops-dialog-overlay" />
            <Dialog.Content
              className="ops-dialog"
              onEscapeKeyDown={(e) => {
                if (busy) e.preventDefault();
              }}
              onInteractOutside={(e) => {
                if (busy) e.preventDefault();
              }}
            >
              <Dialog.Title>
                {action === "delete"
                  ? "Delete permanently?"
                  : action === "restore"
                    ? "Restore this record?"
                    : "Move to archive?"}
              </Dialog.Title>
              <Dialog.Description>
                {action === "delete"
                  ? `“${name}” will be permanently removed. This cannot be undone. Bookings with payment records and providers linked to bookings cannot be permanently deleted.`
                  : action === "restore"
                    ? `“${name}” will return to your workspace.`
                    : `“${name}” will be hidden from your active lists. You can restore it from the Archived tab anytime.`}
              </Dialog.Description>
              {action === "delete" && (
                <label>
                  Type DELETE to confirm
                  <input
                    autoComplete="off"
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                  />
                </label>
              )}
              {error && (
                <div role="alert" className="ops-error">
                  {error}
                </div>
              )}
              <div className="ops-actions">
                <Dialog.Close asChild>
                  <button disabled={busy}>Keep record</button>
                </Dialog.Close>
                <button
                  className={action === "delete" ? "ops-danger" : "primary"}
                  disabled={
                    busy || (action === "delete" && confirmation !== "DELETE")
                  }
                  onClick={() => void submit()}
                >
                  {busy
                    ? "Saving…"
                    : action === "delete"
                      ? "Delete permanently"
                      : action === "restore"
                        ? "Restore"
                        : "Archive record"}
                </button>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
