import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import ReadingPage from "./pages/ReadingPage";
import CultureMapPage from "./pages/CultureMapPage";
import AccessibilityPage from "./pages/AccessibilityPage";
import AccessibilityResourcesPage from "./pages/AccessibilityResourcesPage";
import AccessibilityRoutesPage from "./pages/AccessibilityRoutesPage";
import AudiencePage from "./pages/AudiencePage";
import AboutPage from "./pages/AboutPage";

// 滚动到顶部
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// 加载动画组件
function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gilt/30 backdrop-blur-sm">
      <div className="relative">
        {/* 外圈旋转 */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-ink/80"></div>
        {/* 内圈反向旋转 */}
        <div className="absolute inset-2 animate-spin-reverse rounded-full border-4 border-transparent border-t-accessible/60"></div>
        {/* 中心点 */}
        <div className="absolute inset-5 animate-pulse rounded-full bg-ink/20"></div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingAnimation />}
      <div className={`min-h-screen transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/reading" element={<ReadingPage />} />
          <Route path="/culture-map" element={<CultureMapPage />} />
          <Route path="/accessibility" element={<AccessibilityPage />} />
          <Route path="/accessibility/resources" element={<AccessibilityResourcesPage />} />
          <Route path="/accessibility/routes" element={<AccessibilityRoutesPage />} />
          <Route path="/audience" element={<AudiencePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
