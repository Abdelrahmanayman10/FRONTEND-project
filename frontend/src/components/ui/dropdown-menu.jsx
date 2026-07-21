import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext({
  open: false,
  setOpen: () => {},
})

function DropdownMenu({ children }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)

  return (
    <div
      data-slot="dropdown-trigger"
      className={cn("inline-flex cursor-pointer select-none", className)}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuContent({ className, align = "right", children, ...props }) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  const ref = React.useRef(null)

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open, setOpen])

  if (!open) return null

  const alignClass = align === "left" ? "left-0" : "right-0"

  return (
    <div
      ref={ref}
      data-slot="dropdown-content"
      className={cn(
        "absolute z-50 mt-2 w-48 rounded-xl border bg-popover p-1 text-popover-foreground shadow-lg animate-in fade-in-80 duration-150 dark:border-border dark:bg-card",
        alignClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuItem({ className, onClick, children, ...props }) {
  const { setOpen } = React.useContext(DropdownMenuContext)

  return (
    <div
      data-slot="dropdown-item"
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuLabel({ className, ...props }) {
  return (
    <div
      data-slot="dropdown-label"
      className={cn("px-2.5 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }) {
  return (
    <div
      data-slot="dropdown-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}
