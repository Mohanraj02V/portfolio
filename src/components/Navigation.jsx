import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { RoleSelector } from './RoleSelector';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
{ label: 'About', href: '#about' },
{ label: 'Skills', href: '#skills' },
{ label: 'Projects', href: '#projects' },
{ label: 'Experience', href: '#experience' },
{ label: 'Contact', href: '#contact' }];


export function Navigation() {
  const { isAI } = useRole();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled ?
          'py-3 bg-dark/80 backdrop-blur-xl border-b border-white/5' :
          'py-6 bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              className="text-xl font-display font-bold text-white"
              whileHover={{ scale: 1.02 }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}>
              
              MV<span className="text-gradient">.</span>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'text-sm text-white/60 hover:text-white transition-colors',
                  'relative group'
                )}>
                
                  {link.label}
                  <span className={cn(
                  'absolute -bottom-1 left-0 w-0 h-0.5 rounded-full',
                  'group-hover:w-full transition-all duration-300',
                  isAI ? 'bg-purple' : 'bg-cyan'
                )} />
                </button>
              )}
            </nav>

            {/* Role Selector & Mobile Menu */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <RoleSelector size="sm" />
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          
            {/* Backdrop */}
            <motion.div
            className="absolute inset-0 bg-dark/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)} />
          

            {/* Menu Content */}
            <motion.nav
            className="absolute top-20 left-0 right-0 p-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            
              <div className="space-y-4">
                {navLinks.map((link, index) =>
              <motion.button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'block w-full text-left text-2xl font-display font-semibold text-white py-3',
                  'border-b border-white/10'
                )}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}>
                
                    {link.label}
                  </motion.button>
              )}

                {/* Mobile Role Selector */}
                <motion.div
                className="pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}>
                
                  <p className="text-white/50 text-sm mb-3">Switch Role</p>
                  <RoleSelector size="md" />
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}