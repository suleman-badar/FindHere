import { Menu, Bell } from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="bg-white border-b border-[#e9e5e5] sticky top-0 z-30">
      <div className="px-6 py-4 flex items-center justify-between">
        
        {/* Left */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-[#6b7280] hover:text-[#b91c1c]"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Dashboard</h1>
            <p className="text-[#6b7280] text-sm">
              Manage your listings and performance
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-xl hover:bg-[#fff6f5]">
            <Bell className="w-6 h-6 text-[#6b7280]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff7043] rounded-full" />
          </button>

          <div className="flex items-center space-x-3 pl-4 border-l border-[#e9e5e5]">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="w-10 h-10 rounded-xl object-cover border"
            />
            <div className="hidden md:block">
              <p className="text-sm font-semibold text-[#0f172a]">User</p>
              <p className="text-xs text-[#6b7280]">Owner</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}