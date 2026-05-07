import { Menu, MessageSquareText, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { images } from "../../data/images";

const nav = [
  { to: "/", label: "首页" },
  { to: "/resources", label: "文化资源" },
  { to: "/events", label: "演出展览" },
  { to: "/culture-map", label: "文化地图" },
  { to: "/accessibility", label: "无障碍友好" },
  { to: "/audience", label: "人群入口" },
  { to: "/reading", label: "阅读空间" },
  { to: "/about", label: "关于项目" },
];

function Logo() {
  return (
    <span className="flex items-center gap-3">
      <img
        src={images.brand.logoHorizontal}
        alt="京彩 北京文化生活入口"
        className="h-12 w-auto object-contain"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
      <span className="sr-only">京彩 北京文化生活入口</span>
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-warmline bg-[#fffaf2]/94 shadow-[0_8px_24px_rgba(69,45,22,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-3 lg:px-6">
        <NavLink to="/" onClick={() => setOpen(false)} aria-label="京彩首页">
          <Logo />
        </NavLink>
        <nav className="hidden items-center gap-8 xl:flex" aria-label="主导航">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative px-1 py-3 text-[15px] font-black transition-all duration-300 ${isActive ? "text-cinnabar" : "text-ink hover:text-cinnabar"}`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span className={`absolute bottom-1 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-cinnabar transition-all duration-300 ${isActive ? "w-16" : "w-0 group-hover:w-10"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <a href="mailto:contact@jingcai.example" className="btn-primary hidden items-center gap-2 px-5 py-3 text-sm xl:inline-flex">
          <MessageSquareText size={16} /> 资源反馈
        </a>
        <button onClick={() => setOpen((v) => !v)} className="rounded-md border border-warmline bg-paper p-2 xl:hidden" aria-label="打开导航">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`overflow-hidden border-t border-warmline bg-rice transition-all duration-300 xl:hidden ${open ? "max-h-[620px]" : "max-h-0"}`}>
        <div className="mx-auto grid max-w-[1280px] gap-2 px-4 py-3">
          {nav.map((item) => {
            const active = location.pathname === item.to;
            return (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className={`rounded-md px-4 py-3 text-sm font-black ${active ? "bg-cinnabar text-white" : "bg-paper text-ink"}`}>
                {item.label}
              </NavLink>
            );
          })}
          <a href="mailto:contact@jingcai.example" className="btn-primary px-4 py-3 text-center text-sm">资源反馈</a>
        </div>
      </div>
    </header>
  );
}
