import * as React from "react"
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 4000

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const listeners = []
let memoryState = { toasts: [] }

function dispatch(action) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      }
      break
    case "UPDATE_TOAST":
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }
      break
    case "DISMISS_TOAST": {
      const { toastId } = action
      if (toastId) {
        memoryState = {
          ...memoryState,
          toasts: memoryState.toasts.filter((t) => t.id !== toastId),
        }
      } else {
        memoryState = { ...memoryState, toasts: [] }
      }
      break
    }
  }
  listeners.forEach((listener) => listener(memoryState))
}

function toast({ title, description, variant = "default", duration = TOAST_REMOVE_DELAY }) {
  const id = genId()

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      id,
      title,
      description,
      variant,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  if (duration > 0) {
    setTimeout(() => {
      dismiss()
    }, duration)
  }

  return { id, dismiss }
}

toast.success = (title, description) => toast({ title, description, variant: "success" })
toast.error = (title, description) => toast({ title, description, variant: "destructive" })
toast.info = (title, description) => toast({ title, description, variant: "default" })

function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg transition-all transform animate-in slide-in-from-bottom-5 duration-300",
            t.variant === "destructive" && "bg-destructive text-destructive-foreground border-destructive/20",
            t.variant === "success" && "bg-emerald-950 text-emerald-100 border-emerald-800 dark:bg-emerald-900",
            t.variant === "default" && "bg-card text-card-foreground border-border dark:bg-popover"
          )}
        >
          {t.variant === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />}
          {t.variant === "destructive" && <AlertCircle className="h-5 w-5 text-destructive-foreground shrink-0 mt-0.5" />}
          {t.variant === "default" && <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />}

          <div className="flex-1 text-sm">
            {t.title && <div className="font-semibold">{t.title}</div>}
            {t.description && <div className="text-xs opacity-90 mt-0.5">{t.description}</div>}
          </div>

          <button
            onClick={() => dismiss(t.id)}
            className="rounded-xs opacity-70 hover:opacity-100 transition-opacity p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export { toast, useToast, Toaster }
