// Tremor BarList [v0.1.1]

import React from "react"

import { cx, focusRing } from "@/utils/utils"

type Bar<T> = T & {
  id: number
  key?: string
  href?: string
  value: number
  amount: number
  name: string
}

interface BarListProps<T = unknown>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: Bar<T>[]
  valueFormatter?: (value: number, amount: number) => string
  showAnimation?: boolean
  onValueChange?: (payload: Bar<T>) => void
  sortOrder?: "ascending" | "descending" | "none"
}

function BarListInner<T>(
  {
    data = [],
    valueFormatter = (value) => value.toString(),
    showAnimation = false,
    onValueChange,
    sortOrder = "descending",
    className,
    ...props
  }: BarListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const Component = onValueChange ? "button" : "div"
  const sortedData = React.useMemo(() => {
    if (sortOrder === "none") {
      return data
    }
    return [...data].sort((a, b) => {
      return sortOrder === "ascending" ? a.value - b.value : b.value - a.value
    })
  }, [data, sortOrder])

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...sortedData.map((item) => item.value), 0)
    return sortedData.map((item) =>
      item.value === 0 ? 0 : Math.max((item.value / maxValue) * 100, 2),
    )
  }, [sortedData])

  const rowHeight = "h-8"

  return (
    <div
  ref={forwardedRef}
  className={cx(
    "flex justify-between gap-4 p-1",
    className
  )}
  aria-sort={sortOrder}
  tremor-id="tremor-raw"
  {...props}
>
  <div className="relative w-full space-y-2">
    {sortedData.map((item, index) => (
      <Component
        key={item.key ?? item.id}
        onClick={() => onValueChange?.(item)}
        className={cx(
          "group w-full rounded-lg transition-all duration-300",
          focusRing,
          onValueChange && [
            "cursor-pointer hover:shadow-md",
            "hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-white"
          ]
        )}
      >
        <div className="relative h-full overflow-hidden rounded-lg">
          {/* Barre de progression avec effet de profondeur */}
          <div
            className={cx(
              "flex items-center h-full rounded-lg transition-all duration-700",
              "bg-gradient-to-r from-primary-blue to-primary-blue/80",
              onValueChange && "group-hover:from-primary-blue/90 group-hover:to-primary-blue/70",
              {
                "mb-0": index === sortedData.length - 1,
                "animate-grow": showAnimation,
              }
            )}
            style={{
              width: `${widths[index]}%`,
              height: rowHeight === "h-8" ? "32px" : rowHeight === "h-9" ? "36px" : "40px",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2)"
            }}
          >
            {/* Contenu de l'item */}
            <div className={cx(
              "absolute left-3 right-3 flex items-center justify-between",
              "text-white mix-blend-lighten"
            )}>
              <div className="flex items-center gap-3 max-w-[80%]">
                <div className={cx(
                  "flex-shrink-0 flex items-center justify-center",
                  "rounded-full w-6 h-6 border-2 border-white/80",
                  "bg-primary-blue/90 font-medium text-xs",
                  "group-hover:bg-white group-hover:text-primary-blue",
                  "transition-colors duration-300"
                )}>
                  {index + 1}
                </div>
                
                {item.href ? (
                  <a
                    href={item.href}
                    title={`Voir ${item.name}`}
                    className={cx(
                      "truncate font-medium text-sm",
                      "hover:text-white hover:underline hover:underline-offset-2",
                      "transition-all duration-200"
                    )}
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.name}
                  </a>
                ) : (
                  <p className="truncate font-medium text-sm">
                    {item.name}
                  </p>
                )}
              </div>
              
              <p className={cx(
                "text-sm font-semibold min-w-[60px] text-right",
                "text-white/90 group-hover:text-white",
                "transition-colors duration-200"
              )}>
                {valueFormatter(item.value, item.amount)}
              </p>
            </div>
          </div>
        </div>
      </Component>
    ))}
  </div>
</div>
  )
}

BarListInner.displayName = "BarList"

const BarList = React.forwardRef(BarListInner) as <T>(
  p: BarListProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof BarListInner>

export { BarList, type BarListProps }