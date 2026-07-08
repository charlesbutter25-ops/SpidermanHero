import { useEffect, useRef, useState } from "react";

export default function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const heroElement = containerRef.current.querySelector("[data-hero]");
      if (!heroElement) return;

      // Calculate scroll position relative to the hero section
      const rect = heroElement.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      let progress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
      progress = Math.max(0, Math.min(1, progress));

      // Scale from 1 to 1.5 as user scrolls
      const newScale = 1 + progress * 0.5;
      setScale(newScale);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section
        data-hero
        className="relative h-screen w-full flex items-center justify-center bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(255,0,0,.05)_25%,rgba(255,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(255,0,0,.05)_75%,rgba(255,0,0,.05)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,0,0,.05)_25%,rgba(255,0,0,.05)_26%,transparent_27%,transparent_74%,rgba(255,0,0,.05)_75%,rgba(255,0,0,.05)_76%,transparent_77%,transparent)] bg-[length:50px_50px]" />
        </div>

        {/* Radial glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          {/* Main heading */}
          <div className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
              SPIDER-MAN
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 font-light max-w-2xl">
              Your Friendly Neighborhood Web-Slinger
            </p>
          </div>

          {/* 3D Spiderman Figure */}
          <div
            className="relative w-64 h-80 sm:w-80 sm:h-96 md:w-96 md:h-[450px] flex items-center justify-center"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center",
              transition: "transform 0.3s ease-out",
              perspective: "1000px",
            }}
          >
            {/* Spiderman SVG illustration */}
            <svg
              viewBox="0 0 200 300"
              className="w-full h-full drop-shadow-2xl relative z-10"
              style={{
                filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.4))",
              }}
            >
              {/* Body */}
              <ellipse
                cx="100"
                cy="100"
                rx="35"
                ry="50"
                fill="#c41e3a"
                stroke="#1a1a1a"
                strokeWidth="2"
              />

              {/* Head */}
              <circle
                cx="100"
                cy="40"
                r="25"
                fill="#c41e3a"
                stroke="#1a1a1a"
                strokeWidth="2"
              />

              {/* Eyes mask */}
              <ellipse cx="88" cy="35" rx="8" ry="10" fill="#000080" />
              <ellipse cx="112" cy="35" rx="8" ry="10" fill="#000080" />

              {/* Left eye white */}
              <ellipse cx="88" cy="36" rx="5" ry="6" fill="white" />
              {/* Right eye white */}
              <ellipse cx="112" cy="36" rx="5" ry="6" fill="white" />

              {/* Left pupil */}
              <circle cx="86" cy="37" r="2.5" fill="#000" />
              {/* Right pupil */}
              <circle cx="110" cy="37" r="2.5" fill="#000" />

              {/* Left arm */}
              <line
                x1="70"
                y1="80"
                x2="30"
                y2="60"
                stroke="#c41e3a"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Right arm */}
              <line
                x1="130"
                y1="80"
                x2="170"
                y2="60"
                stroke="#c41e3a"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Left leg */}
              <line
                x1="80"
                y1="145"
                x2="70"
                y2="220"
                stroke="#1a1a1a"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Right leg */}
              <line
                x1="120"
                y1="145"
                x2="130"
                y2="220"
                stroke="#1a1a1a"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Left shoe */}
              <ellipse cx="70" cy="230" rx="8" ry="6" fill="#1a1a1a" />
              {/* Right shoe */}
              <ellipse cx="130" cy="230" rx="8" ry="6" fill="#1a1a1a" />

              {/* Web pattern on chest */}
              <g stroke="#ffcc00" strokeWidth="1" fill="none" opacity="0.8">
                <path d="M 100 55 Q 95 70 100 85 Q 105 70 100 55" />
                <path d="M 85 75 Q 92 80 100 85" />
                <path d="M 115 75 Q 108 80 100 85" />
              </g>

              {/* Spider symbol */}
              <circle cx="100" cy="105" r="8" fill="#ffcc00" opacity="0.9" />
              <circle cx="100" cy="105" r="6" fill="none" stroke="#c41e3a" strokeWidth="1" />
              <line x1="100" y1="99" x2="100" y2="111" stroke="#c41e3a" strokeWidth="0.5" />
              <line x1="94" y1="105" x2="106" y2="105" stroke="#c41e3a" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm text-gray-400">Scroll to explore</p>
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative z-20 px-4 sm:px-6 lg:px-8 py-20 sm:py-32 bg-gradient-to-b from-black to-slate-900">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in-up animation-delay-200">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              The Web-Slinger Experience
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              Scroll to see Spider-Man grow larger on your screen. This immersive 3D experience brings the iconic superhero to life with dynamic scroll-based animations. Watch as he scales with your scroll progress, creating an engaging and interactive hero section.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Interactive", desc: "Scroll-driven 3D effects" },
                { title: "Modern", desc: "Built with React & TailwindCSS" },
                { title: "Responsive", desc: "Works on all screen sizes" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-red-500/20 hover:border-red-500/50 transition-colors animate-fade-in-up"
                  style={{
                    animationDelay: `${i * 100}ms`,
                  }}
                >
                  <h3 className="text-xl font-semibold text-red-500 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scroll progress bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 z-50" 
        style={{
          width: `${scrollProgress * 100}%`,
        }} 
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
}
