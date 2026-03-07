import { motion } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const { isAI } = useRole();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }];


  const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:mohanrajvmvm221023@gmail.com', label: 'Email' }];


  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Top border gradient */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-px',
        'bg-gradient-to-r from-transparent via-white/20 to-transparent'
      )} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            
            <h3 className="text-xl font-display font-bold text-white mb-2">
              Mohanraj <span className="text-gradient">Velmani</span>
            </h3>
            <p className="text-white/50 text-sm">
              {isAI ? 'AI Engineer & ML Developer' : 'Zoho Creator & IT Executive'}
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            className="flex flex-wrap justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}>
            
            {footerLinks.map((link) =>
            <a
              key={link.label}
              href={link.href}
              className="text-white/50 hover:text-white text-sm transition-colors">
              
                {link.label}
              </a>
            )}
          </motion.nav>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            
            {socialLinks.map((social) =>
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'p-2 rounded-lg text-white/50',
                'hover:text-white hover:bg-white/5',
                'transition-all duration-300'
              )}
              aria-label={social.label}>
              
                <social.icon className="w-5 h-5" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.p
            className="text-white/40 text-sm flex items-center gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Mohanraj Velmani
          </motion.p>

          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}>
            
            {currentYear} All rights reserved.
          </motion.p>

          {/* Back to top button */}
          <motion.button
            onClick={scrollToTop}
            className={cn(
              'p-3 rounded-full border border-white/10',
              'bg-white/5 text-white/50',
              'hover:text-white hover:border-white/30 hover:bg-white/10',
              'transition-all duration-300'
            )}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}>
            
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>);

}