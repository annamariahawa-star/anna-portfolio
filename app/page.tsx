'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveCursor = (e: any) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  const projects = [
    {
      title: 'Kamad',
      role: 'Director',
      image: '/stills/kamad.png',
      link: 'https://player.vimeo.com/video/1038170086',
      password: 'GMR@32',
    },
    {
      title: 'What Makes You Proud',
      role: 'Director & Cinematographer',
      image: '/stills/proud.png',
      link: 'https://www.youtube.com/watch?v=a_Cs_imDukc',
    },
    {
      title: 'Venus',
      role: 'Cinematography',
      image: '/stills/venus.png',
      link: 'https://www.youtube.com/watch?v=O7pVanRH7zk',
    },
    {
      title: 'Apartment 14',
      role: 'Cinematography',
      image: '/stills/apartment14.png',
      link: 'https://player.vimeo.com/video/1040682295',
      password: 'GMR@32',
    },
    {
      title: 'Line 231',
      role: 'Cinematography',
      image: '/stills/line231.png',
      link: 'https://player.vimeo.com/video/1168682087?h=476ae6e26f',
    },
    {
      title: 'Sheker HaChen',
      role: 'Cinematography',
      image: '/stills/sheker.jpg',
      link: 'https://vimeo.com/1006509101',
      external: true, // 👈 חשוב
      password: 'GMR@32',
    },
    {
      title: 'Language of Power',
      role: 'Cinematography',
      image: '/stills/doc_series.png',
      link: 'https://player.vimeo.com/video/1149843501?h=b591b5f11b',
    },
    {
      title: 'Language of Power 2',
      role: 'Cinematography',
      image: '/stills/doc_series_2.png',
      link: 'https://player.vimeo.com/video/1142426915?h=78f4d86668',
    },
    {
      title: 'A Land’s Story',
      role: 'Cinematography',
      image: '/stills/land.png',
      link: 'https://www.youtube.com/watch?v=ybmXxNf22WY',
    },
    {
      title: 'Keep Going Without Stopping',
      role: 'Cinematography',
      image: '/stills/fast.png',
      link: 'https://player.vimeo.com/video/784365640',
      password: 'GR@32',
    },
  ];

  const getEmbedUrl = (url: string): string => {
    if (!url) return '';

    // YouTube
    if (url.includes('youtube.com/watch')) {
      const match = url.match(/v=([^&]+)/);
      const id = match ? match[1] : null;
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (url.includes('youtu.be')) {
      const id = url.split('/').pop();
      return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo כבר embed
    return url;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white cursor-none">

      {/* CURSOR */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 backdrop-blur-sm"
      />

      {/* HOVER BACKGROUND */}
      {hoveredProject && (
        <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] transition duration-[1500ms]">
          <img
            src={hoveredProject.image}
            className="h-full w-full scale-105 object-cover blur-sm"
            alt=""
          />
        </div>
      )}

      {/* HERO VIDEO */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-[0.18]"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute right-[-250px] top-0 z-0 h-[700px] w-[700px] rounded-full bg-orange-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-[-250px] z-0 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />

      {/* NOISE */}
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-screen"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      {/* VIGNETTE */}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            'radial-gradient(circle, transparent 35%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* HERO */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center text-center px-6">

        <p className="mb-8 text-xs uppercase tracking-[0.7em] text-zinc-600">
          cinematography · direction
        </p>

        <h1 className="text-6xl md:text-[9rem] font-extralight leading-none tracking-[-0.05em]">
          Anna Maria Hawa
        </h1>

        <p className="mt-8 max-w-xl text-sm text-zinc-500">
          Fiction · Documentary · Visual Storytelling
        </p>

        <a
          href="#work"
          className="mt-16 text-xs uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition"
        >
          View Work
        </a>

      </section>

      {/* WORK */}
      <section id="work" className="relative z-10 px-6 pb-40">

        <div className="mx-auto max-w-6xl">

          <h2 className="mb-24 text-5xl md:text-7xl font-extralight">
            Selected Work
          </h2>

          <div className="space-y-32">

            {projects.map((project, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => {
                  if (project.external) {
                    window.open(project.link, '_blank');
                    return;
                  }
                  setSelectedProject(project);
                }}
                className="group cursor-pointer"
              >

                <div className="grid md:grid-cols-2 gap-10 items-end">

                  <div className="overflow-hidden rounded-[30px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-video w-full object-cover transition duration-[2000ms] group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="pb-4">

                    <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-zinc-500">
                      {project.role}
                    </p>

                    <h3 className="mb-8 text-4xl md:text-6xl font-extralight">
                      {project.title}
                    </h3>

                    <div className="flex flex-wrap gap-6 text-sm text-zinc-500">

                      <span>
                        Watch Film
                      </span>

                      {project.password && (
                        <span>
                          Password: {project.password}
                        </span>
                      )}

                      {project.external && (
                        <span className="opacity-60 text-xs">
                          Opens in Vimeo ↗
                        </span>
                      )}

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section className="relative z-10 border-t border-white/5 px-6 py-32">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="mb-16 text-5xl md:text-7xl font-extralight">
            Contact
          </h2>

          <div className="space-y-6 text-lg text-zinc-500">

            <a href="tel:+972509621242" className="hover:text-white transition">
              +972 50 962 1242
            </a>

            <a href="mailto:annamariahawa@gmail.com" className="hover:text-white transition block">
              annamariahawa@gmail.com
            </a>

            <a
              href="https://www.instagram.com/anna_m_ha"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition block"
            >
              Instagram
            </a>

          </div>

        </div>

      </section>

      {/* MODAL */}
      {selectedProject && !selectedProject.external && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
        >
          <div
            className="w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="aspect-video w-full rounded-[30px]"
              src={getEmbedUrl(selectedProject.link)}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-8 text-zinc-500 hover:text-white transition"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </main>
  );
}