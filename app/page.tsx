'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [hoveredProject, setHoveredProject] = useState<any>(null);

  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && window.innerWidth > 768) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const fictionProjects = [
    {
      title: 'Kamad',
      creator: 'Anna Maria Hawa',
      role: 'Writer & Director',
      details: 'Fiction · 14 min · 2025',
      note:
        'Tel Aviv International Student Film Festival — Best Editing Award',
      image: '/stills/Kamad.png',
      link: 'https://player.vimeo.com/video/1038170086',
      password: 'GMR@32',
      watchable: true,
    },
    {
      title: 'Venus Sucks',
      creator: 'Sivan Eyal',
      role: 'Cinematographer',
      details: 'Fiction · 13 min · 2025',
      image: '/stills/Venus.png',
      link: 'https://www.youtube.com/watch?v=O7pVanRH7zk',
      watchable: true,
    },
    {
      title: 'Apartment 14',
      creator: 'Naomi Davidoff',
      role: 'Cinematographer',
      details: 'Fiction · 14 min · 2025',
      image: '/stills/apartment14.png',
    },
    {
      title: 'Line 231',
      creator: 'Abigaelle Haddad',
      role: 'Cinematographer',
      details: 'Fiction · 18 min · 2026',
      image: '/stills/line231.png',
    },
    {
      title: 'Sheker Hachen',
      creator: 'Mor Slae',
      role: 'Cinematographer',
      details: 'Fiction · 15 min · 2025',
      image: '/stills/sheker.jpg',
    },
    {
      title: 'Keep Going Without Stopping',
      creator: 'Mika Friehmann',
      role: 'Cinematographer',
      details: 'Fiction · 8 min · 2023',
      image: '/stills/fast.png',
    },
  ];

  const documentaryProjects = [
    {
      title: 'What Makes You Proud',
      creator: 'Ember Mental Health',
      role: 'Director & Cinematographer',
      details: 'Documentary · 5 min · 2025',
      image: '/stills/proud.png',
      link: 'https://www.youtube.com/watch?v=a_Cs_imDukc',
      watchable: true,
    },
    {
      title: 'Language of Power',
      creator: 'Ayelet Bacher · Makan',
      role: 'Cinematographer',
      details: 'Documentary Short Series · 40 min · 2026',
      image: '/stills/doc_series.png',
    },
    {
      title: 'Language of Power Part II',
      creator: 'Ayelet Bacher · Makan',
      role: 'Cinematographer',
      details: 'Documentary Short Series · 40 min · 2026',
      image: '/stills/doc_series_2.png',
    },
    {
      title: 'A Land’s Story',
      creator: 'Ahlam Kinani',
      role: 'Cinematographer',
      details: 'Short Documentary · 10 min · 2026',
      image: '/stills/land.png',
    },
  ];

  const getEmbedUrl = (url: string): string => {
    if (!url) return '';

    if (url.includes('youtube.com/watch')) {
      const match = url.match(/v=([^&]+)/);
      const id = match ? match[1] : null;

      return id
        ? `https://www.youtube.com/embed/${id}`
        : url;
    }

    if (url.includes('youtu.be')) {
      const id = url.split('/').pop();

      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  const renderProjects = (projects: any[]) => {
    return projects.map((project, index) => (
      <div
        key={index}
        onMouseEnter={() => {
          if (window.innerWidth > 768) {
            setHoveredProject(project);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth > 768) {
            setHoveredProject(null);
          }
        }}
        onClick={() => {
          if (!project.watchable) return;

          setSelectedProject(project);
        }}
        className={`group ${
          project.watchable
            ? 'cursor-pointer'
            : 'cursor-default'
        }`}
      >

        <div className="grid items-end gap-10 md:grid-cols-2">

          {/* IMAGE */}
          <div className="overflow-hidden">

            <img
              src={project.image}
              alt={project.title}
              draggable="false"
              className="aspect-video w-full object-cover transition duration-[2000ms] group-hover:scale-[1.03]"
            />

          </div>

          {/* TEXT */}
          <div className="pb-4">

            <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-zinc-500 sm:text-[11px] sm:tracking-[0.4em]">
              {project.role}
            </p>

            <h3 className="mb-5 text-4xl font-extralight md:text-6xl">
              {project.title}
            </h3>

            <div className="space-y-3 text-zinc-500">

              <p className="text-sm uppercase tracking-[0.2em] text-zinc-400 sm:tracking-[0.25em]">
                {project.creator}
              </p>

              <p className="text-sm">
                {project.details}
              </p>

              {project.note && (
                <p className="pt-2 text-sm text-zinc-400">
                  {project.note}
                </p>
              )}

              {project.watchable && (
                <div className="flex flex-wrap gap-6 pt-4 text-sm">

                  <span className="transition group-hover:text-white">
                    Watch Film
                  </span>

                  {project.password && (
                    <span>
                      Password: {project.password}
                    </span>
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    ));
  };

  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#050505] text-white">

      {/* CURSOR */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 backdrop-blur-sm md:block"
      />

      {/* HOVER IMAGE - DESKTOP ONLY */}
      {hoveredProject && (
        <div className="pointer-events-none fixed inset-0 z-0 hidden opacity-[0.10] transition duration-[1500ms] md:block">

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
          preload="auto"
          className="h-full w-full object-cover opacity-[0.18]"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

      </div>

      {/* NOISE */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage: "url('/noise.png')",
        }}
      />

      {/* VIGNETTE */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle, transparent 35%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* HERO */}
      <section className="relative isolate z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">

        {/* WARM LIGHT */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(180,120,70,0.18),transparent_60%)]" />

        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom,rgba(120,70,40,0.12),transparent_70%)]" />

        {/* HERO FADE */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-full bg-gradient-to-b from-transparent to-[#050505]" />

        <div className="relative z-10 flex flex-col items-center">

          <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-zinc-600 sm:text-xs sm:tracking-[0.7em]">
            cinematography ✦ direction
          </p>

          <h1 className="text-[3.6rem] font-extralight leading-none tracking-[-0.05em] sm:text-[5.5rem] md:text-[9rem]">
            Anna Maria Hawa
          </h1>

          <p className="mt-8 max-w-xl text-center text-sm text-zinc-500">
            Fiction · Documentary · Visual Storytelling
          </p>

          {/* NAVIGATION */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

            <a
              href="#fiction"
              className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.25em] text-zinc-400 transition hover:border-white/30 hover:text-white"
            >
              Fiction
            </a>

            <a
              href="#documentary"
              className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.25em] text-zinc-400 transition hover:border-white/30 hover:text-white"
            >
              Documentary
            </a>

            <a
              href="#contact"
              className="rounded-full border border-white/10 px-6 py-3 text-xs uppercase tracking-[0.25em] text-zinc-400 transition hover:border-white/30 hover:text-white"
            >
              Contact
            </a>

          </div>

        </div>

      </section>

      {/* FICTION */}
      <section
        id="fiction"
        className="relative z-10 px-6 pb-40"
      >

        <div className="mx-auto max-w-6xl">

          <div className="mb-24 text-center">

            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-600 sm:tracking-[0.5em]">
              Selected Work
            </p>

            <h2 className="text-4xl font-extralight sm:text-5xl md:text-7xl">
              Fiction
            </h2>

          </div>

          <div className="space-y-32">
            {renderProjects(fictionProjects)}
          </div>

        </div>

      </section>

      {/* DOCUMENTARY */}
      <section
        id="documentary"
        className="relative z-10 px-6 pb-40"
      >

        <div className="mx-auto max-w-6xl border-t border-white/5 pt-32">

          <div className="mb-24 text-center">

            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-zinc-600 sm:tracking-[0.5em]">
              Selected Work
            </p>

            <h2 className="text-4xl font-extralight sm:text-5xl md:text-7xl">
              Documentary
            </h2>

          </div>

          <div className="space-y-32">
            {renderProjects(documentaryProjects)}
          </div>

        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="relative z-10 border-t border-white/5 px-6 py-32"
      >

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="mb-16 text-4xl font-extralight sm:text-5xl md:text-7xl">
            Contact
          </h2>

          <div className="space-y-6 text-lg text-zinc-500">

            <a
              href="tel:+972509621242"
              className="transition hover:text-white"
            >
              +972 50 962 1242
            </a>

            <a
              href="mailto:annamariahawa@gmail.com"
              className="block transition hover:text-white"
            >
              annamariahawa@gmail.com
            </a>

            <a
              href="https://www.instagram.com/anna_m_ha"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition hover:text-white"
            >
              Instagram
            </a>

          </div>

        </div>

      </section>

      {/* VIDEO MODAL */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-6 backdrop-blur-md"
        >

          <div
            className="w-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >

            <iframe
              className="aspect-video w-full"
              src={getEmbedUrl(selectedProject.link)}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-8 text-zinc-500 transition hover:text-white"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </main>
  );
}