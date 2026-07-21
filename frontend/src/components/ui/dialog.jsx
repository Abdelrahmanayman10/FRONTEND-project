import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const DialogContext = React.createContext({
  open: false,
  setOpen: () => {},
})

function Dialog({ children, open: controlledOpen, onOpenChange }) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : uncontrolledOpen

  const setOpen = React.useCallback(
    (value) => {
      if (!isControlled) {
        setUncontrolledOpen(value)
      }
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ className, children, onClick, ...props }) {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <div
      className={cn("inline-block cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(true)
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function DialogClose({ className, children, onClick, ...props }) {
  const { setOpen } = React.useContext(DialogContext)
  return (
    <div
      className={cn("inline-block cursor-pointer", className)}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented) setOpen(false)
      }}
      {...props}
    >
      {children}
    </div>
  )
}

function DialogContent({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(DialogContext)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={() => setOpen(false)}
      />
      {/* Content Container */}
      <div
        data-slot="dialog-content"
        className={cn(
          "relative z-50 grid w-full max-w-lg gap-4 rounded-xl border bg-background p-6 shadow-xl transition-all animate-in zoom-in-95 dark:border-border dark:bg-card",
          className
        )}
        {...props}
      >
        {children}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  )
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
}

function DialogTitle({ className, ...props }) {
  return (
    <div
      data-slot="dialog-title"
      className={cn("text-lg font-semibold leading-none tracking-tight text-foreground", className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }) {
  return (
    <div
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
