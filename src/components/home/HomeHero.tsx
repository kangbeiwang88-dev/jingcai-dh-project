import { Search } from "lucide-react";
import { FormEvent, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../data/images";

export default function HomeHero() {
  const [keyword, setKeyword] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    navigate(`/resources${keyword.trim() ? `?q=${encodeURIComponent(keyword.trim())}` : ""}`);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        {/* 左侧内容区 */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-black leading-tight text-ink md:text-5xl lg:text-5xl">
            打开<span className="text-cinnabar">京彩</span>，找到适合你的北京文化去处
          </h1>
          <p className="mt-5 text-base leading-7 text-muted">
            汇聚北京图书馆、文化馆、博物馆、演出展览、阅读空间与无障碍友好服务，支持按类型、区域、人群和时间快速筛选。
          </p>
          
          {/* 搜索框 */}
          <form onSubmit={submit} className="mt-6 flex overflow-hidden rounded-[22px] border border-gilt/70 bg-white p-2 shadow-soft focus-within:border-cinnabar">
            <label className="flex flex-1 items-center gap-2 px-3">
              <Search size={21} className="text-soft" />
              <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="w-full bg-transparent py-3 outline-none" placeholder="搜索图书馆、展览、演出、阅读空间、无障碍资源……" />
            </label>
            <button className="btn-primary px-6 py-3">搜索</button>
          </form>
        </div>

        {/* 右侧视觉区 */}
        <div 
          ref={containerRef}
          className="card relative min-h-[420px] overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
        >
          <img
            src={images.heroes.homeWideSoft}
            alt="北京文化生活插画"
            className="h-full w-full object-cover transition-transform duration-300 ease-out"
            style={{
              transform: `scale(1.05) translate(${(mousePos.x - 50) * -0.02}%, ${(mousePos.y - 50) * -0.02}%)`,
            }}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
          
          {/* 功能入口浮层 */}
          <button 
            onClick={() => navigate("/events")}
            className="absolute left-4 top-4 rounded-xl bg-cinnabar/90 px-4 py-2.5 text-left text-white backdrop-blur-sm transition-all hover:bg-cinnabar"
          >
            <span className="block text-xs opacity-80">今日推荐</span>
            <span className="block font-black">本周演出</span>
          </button>
          
          <button 
            onClick={() => navigate("/culture-map")}
            className="absolute right-4 top-4 rounded-xl bg-ink/85 px-4 py-2.5 text-left text-white backdrop-blur-sm transition-all hover:bg-ink"
          >
            <span className="block text-xs opacity-80">附近资源</span>
            <span className="block font-black">地图浏览</span>
          </button>
          
          <button 
            onClick={() => navigate("/audience")}
            className="absolute bottom-20 left-4 rounded-xl bg-gilt/90 px-4 py-2.5 text-left text-ink backdrop-blur-sm transition-all hover:bg-gilt"
          >
            <span className="block text-xs opacity-80">适合人群</span>
            <span className="block font-black">亲子·老年</span>
          </button>
          
          {/* 底部信息浮层 */}
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-paper/92 px-4 py-3 shadow-soft backdrop-blur-sm">
            <p className="text-sm font-black text-cinnabar">北京文化生活入口</p>
            <p className="mt-1 text-xs text-muted">公共文化 · 演出展览 · 阅读空间 · 无障碍友好</p>
          </div>
        </div>
      </div>
    </section>
  );
}
