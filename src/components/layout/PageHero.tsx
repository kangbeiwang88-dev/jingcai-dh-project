import type React from "react";
import { useState, useCallback, useRef } from "react";

export default function PageHero({
  title,
  subtitle,
  image,
  children,
}: {
  title: string;
  subtitle: string;
  image?: string;
  children?: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative overflow-hidden border-b border-warmline bg-[#fff8ef]"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-y-0 right-0 hidden h-[120%] w-[75%] object-cover opacity-85 lg:block transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${(mousePos.x - 50) * -0.02}%, ${(mousePos.y - 50) * -0.02}%)`,
          }}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fff8ef] via-[#fff8ef]/92 to-[#fff8ef]/8" />
      <div className="relative mx-auto max-w-[1280px] px-4 py-12 lg:px-6 lg:py-16">
        <div className="max-w-2xl">
          <h1 className="hero-title text-5xl leading-tight text-ink md:text-7xl">{title}</h1>
          <p className="mt-4 max-w-xl text-base font-semibold leading-8 text-muted md:text-lg">{subtitle}</p>
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
