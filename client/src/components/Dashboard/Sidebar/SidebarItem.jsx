export default function SidebarItem({
  icon: Icon,
  label,
  onClick,
  isActive,
  subText,
  danger,
  collapsed
}) {
  return (
    <button
      onClick={onClick}
      className={`relative group w-full flex items-center px-3 py-2.5 rounded-xl transition-all duration-200
        ${
          isActive
            ? "bg-gradient-to-r from-[#b91c1c] to-[#ff7043] text-white shadow-md"
            : danger
            ? "text-red-500 hover:bg-red-50"
            : "text-[#0f172a] hover:bg-[#fff6f5]"
        }`}
    >
      <Icon className="w-5 h-5 shrink-0" />

      {!collapsed && (
        <div className="ml-3 text-left">
          <p className="text-sm font-medium capitalize">{label}</p>
          {subText && (
            <p className={`text-xs ${isActive ? "text-white/80" : "text-[#6b7280]"}`}>
              {subText}
            </p>
          )}
        </div>
      )}

      {/* Tooltip when collapsed */}
      {collapsed && (
        <span className="absolute left-full ml-3 px-2 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50">
          {label}
        </span>
      )}
    </button>
  );
}