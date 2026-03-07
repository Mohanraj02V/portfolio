import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { RoleSelector } from '@/components/RoleSelector';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Particle network background component
function ParticleNetwork() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef(
    []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1
    }));

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(13, 13, 13, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const particles = particlesRef.current;

        // Update and draw particles
        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(126, 100, 237, 0.6)';
          ctx.fill();

          // Draw connections (only check every 5th particle for performance)
          if (i % 5 === 0) {
            particles.slice(i + 1).forEach((other, j) => {
              if (j % 3 !== 0) return;
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(126, 100, 237, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            });
          }
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: 'transparent' }} />);


}

// Animated text component
function AnimatedText({ text, className, delay = 0 }) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}>

      {text}
    </motion.span>);

}

// Glitch text effect component
function GlitchText({ text, className }) {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.
          split('').
          map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).
          join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
}

export function Hero() {
  const { isAI } = useRole();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Gradient background */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-1000',
            isAI ?
              'bg-gradient-to-br from-purple/20 via-dark to-blue/10' :
              'bg-gradient-to-br from-cyan/20 via-dark to-blue/10'
          )} />


        {/* Particle network */}
        <ParticleNetwork />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, #0d0d0d 70%)'
          }} />


        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />

      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        style={{ opacity, y, scale }}>

        <div className="text-center">
          {/* Role Selector */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <RoleSelector size="md" />
          </motion.div>

          {/* Name */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}>

            <AnimatedText text="MOHANRAJ" delay={0.3} className="mr-4" />
            <AnimatedText text="VELMANI" delay={0.5} className="text-gradient" />
          </motion.h1>

          {/* Title with glitch effect */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}>

            <span className={cn(
              'inline-block px-4 py-2 rounded-full text-sm font-medium',
              'bg-white/5 border border-white/10',
              isAI ? 'text-purple-light' : 'text-cyan'
            )}>
              {isAI ?
                <GlitchText text="AI ENGINEER / ML ENGINEER" /> :

                <GlitchText text="ZOHO CREATOR / IT EXECUTIVE" />
              }
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}>

            {isAI ?
              <>
                Building production-grade AI systems,
                <br />
                from model training to scalable deployment.
              </> :

              <>
                Architecting enterprise solutions,
                <br />
                from low-code platforms to ERP systems.
              </>
            }
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}>

            <Button
              size="lg"
              onClick={() => scrollToSection('projects')}
              className={cn(
                'group relative overflow-hidden',
                isAI ?
                  'bg-gradient-to-r from-purple to-blue hover:shadow-glow-purple' :
                  'bg-gradient-to-r from-cyan to-blue hover:shadow-glow-cyan',
                'transition-all duration-300'
              )}>

              <span className="relative z-10">View Projects</span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }} />

            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="border-white/20 hover:bg-white/5 hover:border-white/40">

              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:bg-white/5 hover:border-white/40"
              asChild>

              <a
                href={isAI ? '/Professional-AI.pdf' : '/MOHANRAJ VELMANI ZOHO CREATOR RESUME.docx'}
                download>

                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}>

            {[
              { icon: Github, href: 'https://github.com/Mohanraj02V', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/mohanraj-velmani-3b2960285?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', label: 'LinkedIn' }].
              map((social, index) =>
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'p-3 rounded-full border border-white/10',
                    'bg-white/5 text-white/60',
                    'hover:text-white hover:border-white/30 hover:bg-white/10',
                    'transition-all duration-300'
                  )}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}>

                  <social.icon size={20} />
                </motion.a>
              )}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}>

        <motion.div
          className="flex flex-col items-center gap-2 text-white/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}>

          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <div className={cn(
          'absolute top-8 left-8 w-32 h-px',
          isAI ? 'bg-gradient-to-r from-purple to-transparent' : 'bg-gradient-to-r from-cyan to-transparent'
        )} />
        <div className={cn(
          'absolute top-8 left-8 w-px h-32',
          isAI ? 'bg-gradient-to-b from-purple to-transparent' : 'bg-gradient-to-b from-cyan to-transparent'
        )} />
      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
        <div className={cn(
          'absolute bottom-8 right-8 w-32 h-px',
          isAI ? 'bg-gradient-to-l from-purple to-transparent' : 'bg-gradient-to-l from-cyan to-transparent'
        )} />
        <div className={cn(
          'absolute bottom-8 right-8 w-px h-32',
          isAI ? 'bg-gradient-to-t from-purple to-transparent' : 'bg-gradient-to-t from-cyan to-transparent'
        )} />
      </div>
    </section>);

}