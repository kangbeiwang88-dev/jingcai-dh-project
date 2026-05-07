import PageHero from "../components/layout/PageHero";
import { images } from "../data/images";
import { useState, useEffect, useRef } from "react";
import { Heart, Globe, Sparkles, Shield, RefreshCw, Accessibility } from "lucide-react";

const blocks = [
  { 
    icon: Globe,
    title: "项目缘起", 
    text: "北京公共文化资源丰富，但入口分散、核验成本高，不同人群的参与需求也不相同。京彩希望把文化生活入口整理得更清晰。",
    color: "from-blue-100 to-indigo-50"
  },
  { 
    icon: Sparkles,
    title: "我们为什么做这个网站", 
    text: "我们希望帮助公众更容易发现图书馆、文化馆、博物馆、演出展览、阅读空间、无障碍服务和人群指南。",
    color: "from-amber-100 to-orange-50"
  },
  { 
    icon: Shield,
    title: "数据来源", 
    text: "计划接入北京市文旅局公开资料、公共图书馆与文化馆列表、无障碍文化旅游资源手册、商业演出信息表及团队整理数据。",
    color: "from-green-100 to-emerald-50"
  },
  { 
    icon: Heart,
    title: "数据限制", 
    text: "京彩不是官方平台，不替代官方预约、票务和地图服务。本站整理公开信息并提供入口，实时开放、票务、预约和路线以官方页面为准。",
    color: "from-rose-100 to-pink-50"
  },
  { 
    icon: RefreshCw,
    title: "更新机制", 
    text: "后续通过 Excel/JSON 导入，保留 source、verifyStatus、updateNote 字段，明确区分官方来源、已核验、需人工核验与 Mock 示例。",
    color: "from-purple-100 to-violet-50"
  },
  { 
    icon: Accessibility,
    title: "无障碍与公共文化价值", 
    text: "京彩关注残障人士、老年人、亲子家庭、新北京人/游客等人群，让文化参与更加平等、便捷、温暖。",
    color: "from-teal-100 to-cyan-50"
  },
];

function AnimatedBlock({ icon: Icon, title, text, color, index }: { 
  icon: any; 
  title: string; 
  text: string; 
  color: string;
  index: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (blockRef.current) observer.observe(blockRef.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={blockRef}>
      <section 
        className={`card group relative overflow-hidden p-6 transition-all duration-500 hover:shadow-soft ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        {/* 背景渐变 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
        
        {/* 内容 */}
        <div className="relative">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cinnabar/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-cinnabar/20">
            <Icon className="text-cinnabar" size={24} />
          </div>
          <h2 className="text-xl font-black text-ink group-hover:text-cinnabar transition-colors">{title}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
        </div>
        
        {/* 装饰元素 */}
        <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-cinnabar/5 transition-transform duration-500 group-hover:scale-150" />
      </section>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero title="关于京彩" subtitle="京彩是面向公众的北京文化生活资源入口，不是官方平台，也不替代官方预约、票务和地图服务。" image={images.heroes.about5} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 lg:px-6">
        {/* 介绍 */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-cinnabar/5 to-gilt/30 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="text-cinnabar" size={24} />
            <h2 className="text-lg font-black text-ink">关于京彩</h2>
          </div>
          <p className="text-sm leading-7 text-muted">
            京彩是一个致力于让北京文化生活更易获取的项目。我们相信，每个人都应该能够便捷地参与文化活动，无论年龄、身体状况或背景。通过整合分散的文化资源信息，京彩希望成为公众探索北京文化生活的得力助手。
          </p>
        </div>

        {/* 动画网格卡片 */}
        <div className="grid gap-5 md:grid-cols-2">
          {blocks.map((block, index) => (
            <AnimatedBlock key={block.title} {...block} index={index} />
          ))}
        </div>

        {/* 后续计划 */}
        <div className="mt-8 rounded-2xl border border-gilt/50 bg-gradient-to-r from-paper to-gilt/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accessible/10">
              <RefreshCw className="text-accessible" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-black text-ink">后续计划</h2>
              <p className="text-xs text-muted">我们正在不断完善和改进</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-white/60 p-4">
              <h3 className="font-bold text-ink">数据完善</h3>
              <p className="mt-2 text-sm text-muted">接入更多真实数据来源，丰富文化资源信息</p>
            </div>
            <div className="rounded-xl bg-white/60 p-4">
              <h3 className="font-bold text-ink">交互优化</h3>
              <p className="mt-2 text-sm text-muted">持续优化用户界面和交互体验</p>
            </div>
            <div className="rounded-xl bg-white/60 p-4">
              <h3 className="font-bold text-ink">无障碍增强</h3>
              <p className="mt-2 text-sm text-muted">进一步提升网站的无障碍访问支持</p>
            </div>
            <div className="rounded-xl bg-white/60 p-4">
              <h3 className="font-bold text-ink">社区反馈</h3>
              <p className="mt-2 text-sm text-muted">建立用户反馈机制，及时响应改进建议</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
