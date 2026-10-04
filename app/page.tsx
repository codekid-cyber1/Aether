'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register the GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingLoadRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const msg1Ref = useRef<HTMLDivElement>(null);
  const msg2Ref = useRef<HTMLDivElement>(null);
  const msg3Ref = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    
    const frameCount = 120;
    
    // Set internal canvas resolution (match your video resolution)
    canvas.width = 1920;
    canvas.height = 1080;

    const currentFrame = (index: number) => (
      `/sequence/${(index + 1).toString().padStart(4, '0')}.png`
    );

    const images: HTMLImageElement[] = [];
    const sequence = { frame: 0 };

    // Preload all images into browser memory to prevent flickering
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Draw the very first frame immediately on load
    images[0].onload = () => {
      context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };

    // ─── GSAP Context (Perfect for React cleanup/Strict Mode) ────────────────
    const ctx = gsap.context(() => {
      
      // Initial Load Animations (replaces CSS keyframes)
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
      
      gsap.from(navRef.current, {
        opacity: 0,
        y: -16,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(headingLoadRef.current, {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });
      
      // We use a single master timeline for everything.
      // This ensures all animations are perfectly synced with the scroll progress
      // and avoids issues with multiple ScrollTriggers on a pinned container.
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
          pin: true,
        }
      });

      // 1. Canvas Image Sequence
      // We set duration to frameCount so we can use frame numbers as absolute time positions!
      masterTl.to(sequence, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        duration: frameCount,
        onUpdate: () => {
          const img = images[Math.round(sequence.frame)];
          if (img && img.complete) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        }
      }, 0); // start at time/frame 0

      // 2. Heading Fade-out (Frames 0 to 15)
      masterTl.to(headingRef.current, {
        opacity: 0,
        y: -50,
        ease: "power2.inOut",
        duration: 15
      }, 0);

      // 3. Message 1 (Frames 25 to 55)
      masterTl.fromTo(msg1Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 
        25
      );
      masterTl.to(msg1Ref.current, 
        { opacity: 0, y: -50, duration: 8, ease: "power2.in" }, 
        47
      ); // 25 (start) + 22 (wait) = 47

      // 4. Message 2 (Frames 60 to 90)
      masterTl.fromTo(msg2Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 
        60
      );
      masterTl.to(msg2Ref.current, 
        { opacity: 0, y: -50, duration: 8, ease: "power2.in" }, 
        82
      );

      // 5. Message 3 (Frames 95 to 119)
      masterTl.fromTo(msg3Ref.current, 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 8, ease: "power2.out" }, 
        95
      );

    }, containerRef); // Scope all selectors to our container

    // Cleanup to prevent memory leaks on unmount
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      {/* ─── Premium Floating Navbar ─── */}
      <header
        ref={navRef}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          right: '20px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <nav
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 28px',
            borderRadius: '12px',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
            pointerEvents: 'auto',
          }}
        >
          {/* Logo */}
          <div className="font-gendy text-white cursor-pointer select-none" style={{ fontSize: '16px', letterSpacing: '0.16em' }}>
            AETHER
          </div>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center" style={{ gap: '40px' }}>
            {(['Models', 'Design', 'Innovation', 'About'] as const).map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.65)',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <button
            style={{
              padding: '8px 18px',
              fontSize: '9px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.85)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)';
              (e.currentTarget as HTMLButtonElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.08)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)';
            }}
          >
            Get Started
          </button>
        </nav>
      </header>

      {/* ─── GSAP Scroll Animation Container ─── */}
      <div ref={containerRef} className="relative h-screen min-h-screen w-full overflow-hidden bg-black font-sans">

        {/* The Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full object-cover"
        />

        {/* Overlay wrapper — pointer-events-none so it never blocks scrolling */}
        <div className="pointer-events-none absolute inset-0 h-full w-full text-white">

          {/* Initial heading — Phase 1 Hero */}
          <div ref={headingLoadRef} className="absolute inset-0 flex flex-col items-start justify-end" style={{ padding: '0 6% 10%' }}>
            <div ref={headingRef} className="flex flex-col items-start" style={{ maxWidth: '680px' }}>

              {/* Category label */}
              <span style={{
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                marginBottom: '20px',
                display: 'block',
                fontFamily: 'inherit',
              }}>
                Performance · Heritage · Power
              </span>

              {/* Main heading */}
              <h1
                className="font-gendy"
                style={{
                  fontSize: 'clamp(22px, 2.8vw, 42px)',
                  fontWeight: 500,
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                  color: 'white',
                  marginBottom: '36px',
                  textShadow: '0 4px 60px rgba(0,0,0,0.6)',
                  textAlign: 'left',
                }}
              >
                Experience the ultimate fusion of classic heritage, aggressive design, and unadulterated power
              </h1>

              {/* CTA Button — clean white outline pill */}
              <button
                className="pointer-events-auto"
                style={{
                  padding: '13px 32px',
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'white',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.5)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.35s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,1)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#000';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'white';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                  (e.currentTarget as HTMLButtonElement).style.color = 'white';
                  (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
                }}
              >
                Build Yours Now
              </button>
            </div>
          </div>

          {/* ── Face 2 — Performance ── */}
          <div
            ref={msg1Ref}
            className="absolute inset-0"
            style={{ opacity: 0 }}
          >
            {/* Main content — vertically centered, full bleed */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              bottom: '120px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 7%',
              gap: '48px',
            }}>
              {/* LEFT — giant hero number */}
              <div style={{ flex: '0 0 auto' }}>
                <div style={{
                  fontSize: '8px',
                  fontWeight: 600,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '12px',
                }}>
                  Untamed Muscle
                </div>
                <div className="font-gendy" style={{
                  fontSize: 'clamp(64px, 9vw, 140px)',
                  fontWeight: 700,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: 'white',
                  textShadow: '0 0 80px rgba(255,255,255,0.08)',
                }}>
                  3.4<span style={{ fontSize: '0.3em', fontWeight: 400, opacity: 0.5, letterSpacing: '0.05em', marginLeft: '4px' }}>sec</span>
                </div>
                <div style={{
                  fontSize: '10px',
                  fontWeight: 400,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.8)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  marginTop: '10px',
                }}>
                  0 – 60 mph
                </div>
              </div>

              {/* Vertical divider */}
              <div style={{ width: '1px', height: '100px', background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

              {/* RIGHT — headline + sub copy */}
              <div style={{ flex: 1 }}>
                <h2 className="font-gendy" style={{
                  fontSize: 'clamp(18px, 2.4vw, 36px)',
                  fontWeight: 600,
                  lineHeight: 1.15,
                  letterSpacing: '-0.01em',
                  color: 'white',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}>
                  0–60 MPH in<br />3.4 Seconds
                </h2>
                <p style={{
                  fontSize: 'clamp(10px, 0.9vw, 13px)',
                  fontWeight: 400,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.85)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  maxWidth: '340px',
                  letterSpacing: '0.01em',
                }}>
                  Supercharged 6.2L HEMI® V8 with Launch Assist for instant, tire‑smoking domination.
                </p>
              </div>
            </div>

            {/* Bottom stats strip */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '110px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              padding: '0 7%',
            }}>
              {[
                { value: '797', unit: '', label: 'Peak Horsepower' },
                { value: '707', unit: 'lb‑ft', label: 'Max Torque' },
                { value: '203', unit: 'mph', label: 'Top Speed' },
              ].map((stat, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <div style={{ width: '1px', height: '32px', background: 'rgba(255,255,255,0.1)', marginRight: 'auto' }} />}
                  <div style={{ margin: i > 0 ? '0 auto' : '0 auto 0 0' }}>
                    <div className="font-gendy" style={{
                      fontSize: 'clamp(22px, 3vw, 44px)',
                      fontWeight: 700,
                      color: 'white',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}>
                      {stat.value}
                      {stat.unit && <span style={{ fontSize: '0.4em', fontWeight: 400, opacity: 0.5, marginLeft: '3px' }}>{stat.unit}</span>}
                    </div>
                    <div style={{
                      fontSize: '7.5px',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.7)',
                      textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                      marginTop: '6px',
                      fontWeight: 500,
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* ── Face 3 — Aggressive Architecture ── */}
          <div
            ref={msg2Ref}
            className="absolute inset-0"
            style={{ opacity: 0 }}
          >
            {/* Right-anchored editorial layout */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0, right: 0,
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 7% 0 5%',
            }}>
              {/* Kicker */}
              <span style={{
                fontSize: '8px',
                fontWeight: 600,
                letterSpacing: '0.42em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: '20px',
                display: 'block',
                textShadow: '0 2px 16px rgba(0,0,0,0.9)',
              }}>
                Aggressive Architecture
              </span>

              {/* Main headline */}
              <h2
                className="font-gendy"
                style={{
                  fontSize: 'clamp(24px, 3.2vw, 50px)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  color: 'white',
                  marginBottom: '24px',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 40px rgba(0,0,0,0.7)',
                }}
              >
                Crafted to<br />Command the<br />Asphalt
              </h2>

              {/* Hairline */}
              <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.35)', marginBottom: '24px' }} />

              {/* Subtext */}
              <p style={{
                fontSize: 'clamp(10px, 0.9vw, 13px)',
                fontWeight: 400,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.8)',
                maxWidth: '340px',
                letterSpacing: '0.01em',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              }}>
                Integrated fender flares add 3.5 inches of width, housing massive 305-width Pirelli tires for maximum grip and an unapologetic presence.
              </p>
            </div>
          </div>

          {/* ── Face 4 — The Apex (Final CTA) ── */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ padding: '0 8%' }}>
            <div
              ref={msg3Ref}
              className="flex flex-col items-center"
              style={{ opacity: 0, maxWidth: '820px' }}
            >

              {/* Main headline */}
              <h2
                className="font-gendy"
                style={{
                  fontSize: 'clamp(32px, 5.5vw, 88px)',
                  fontWeight: 700,
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'white',
                  marginBottom: '28px',
                  textTransform: 'uppercase',
                  textShadow: '0 4px 60px rgba(0,0,0,0.6)',
                }}
              >
                The Apex of<br />American Muscle
              </h2>

              {/* Subtext */}
              <p style={{
                fontSize: 'clamp(11px, 1vw, 14px)',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '420px',
                letterSpacing: '0.01em',
                marginBottom: '44px',
                textShadow: '0 2px 20px rgba(0,0,0,0.8)',
              }}>
                Configure your custom beast or schedule an exclusive test drive today.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {/* Primary — solid white */}
                <button
                  className="pointer-events-auto"
                  style={{
                    padding: '15px 36px',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#000',
                    background: 'white',
                    border: '1px solid white',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.85)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'white';
                  }}
                >
                  Build Yours Now
                </button>

                {/* Secondary — ghost outline */}
                <button
                  className="pointer-events-auto"
                  style={{
                    padding: '15px 36px',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.9)',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.16)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.6)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)';
                  }}
                >
                  Book Test Drive
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}