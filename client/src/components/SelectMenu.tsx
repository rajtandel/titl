import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export type SelectOption<T extends string> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

type SelectMenuProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly SelectOption<T>[];
  label?: string;
  className?: string;
};

function IconChevron({ className, open }: { className?: string; open: boolean }) {
  return (
    <svg
      className={[className, "transition-transform duration-200", open ? "rotate-180" : ""].join(" ")}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  label,
  className = "",
}: SelectMenuProps<T>) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();
  const labelId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={["relative z-30 inline-block", className].join(" ")}>
      {label ? (
        <span id={labelId} className="sr-only">
          {label}
        </span>
      ) : null}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? labelId : undefined}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        className={[
          "select-menu-trigger flex min-h-[44px] min-w-[11.5rem] items-center justify-between gap-2",
          open ? "select-menu-trigger-open" : "",
        ].join(" ")}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected.icon ? (
            <span className="shrink-0 text-titl-accent">{selected.icon}</span>
          ) : null}
          <span className="truncate text-sm font-medium text-titl-text">{selected.label}</span>
        </span>
        <IconChevron className="shrink-0 text-titl-subtle" open={open} />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={label}
          className="select-menu-panel animate-scale-in"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={[
                    "select-menu-option",
                    isSelected ? "select-menu-option-selected" : "",
                  ].join(" ")}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-2.5">
                    {option.icon ? (
                      <span
                        className={[
                          "shrink-0",
                          isSelected ? "text-titl-accent" : "text-titl-subtle",
                        ].join(" ")}
                      >
                        {option.icon}
                      </span>
                    ) : null}
                    <span className="truncate">{option.label}</span>
                  </span>
                  {isSelected ? <IconCheck className="shrink-0 text-titl-accent" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
