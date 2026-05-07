import type React from "react";

export default function Tag({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  const className = `inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition ${
    active ? "bg-cinnabar text-white shadow-soft" : "bg-sand text-muted hover:bg-[#f7dfbf]"
  } ${onClick ? "cursor-pointer" : ""}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {children}
      </button>
    );
  }

  return <span className={className}>{children}</span>;
}
