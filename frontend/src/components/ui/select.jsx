import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const SelectContext = React.createContext({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
})

function Select({ value, defaultValue, onValueChange, children }) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  const [open, setOpen] = React.useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : uncontrolledValue

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setUncontrolledValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  )
}

function SelectTrigger({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(SelectContext)

  return (
    <button
      type="button"
      data-slot="select-trigger"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
    </button>
  )
}

function SelectValue({ placeholder, className }) {
  const { value } = React.useContext(SelectContext)
  return (
    <span className={cn("block truncate", !value && "text-muted-foreground", className)}>
      {value || placeholder}
    </span>
  )
}

function SelectContent({ className, children, ...props }) {
  const { open, setOpen } = React.useContext(SelectContext)
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

  return (
    <div
      ref={ref}
      data-slot="select-content"
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function SelectItem({ value, className, children, ...props }) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  return (
    <div
      data-slot="select-item"
      onClick={() => onValueChange(value)}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent/50 font-medium text-accent-foreground",
        className
      )}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </div>
  )
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}
