import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Linkedin,
  Github,
  CheckCircle,
  Loader2 } from
'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';








const socialLinks = [
{
  name: 'LinkedIn',
  icon: Linkedin,
  url: 'https://linkedin.com/in/mohanrajvelmani',
  color: '#0077b5'
},
{
  name: 'GitHub',
  icon: Github,
  url: 'https://github.com/mohanrajvelmani',
  color: '#333'
}];









const contactInfo = [
{
  icon: Mail,
  label: 'Email',
  value: 'mohanrajvmvm221023@gmail.com',
  href: 'mailto:mohanrajvmvm221023@gmail.com'
},
{
  icon: Phone,
  label: 'Phone',
  value: '+91 9360239398',
  href: 'tel:+919360239398'
},
{
  icon: MapPin,
  label: 'Location',
  value: 'India'
}];


export function Contact() {
  const { isAI } = useRole();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const text = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;

    // Open WhatsApp in a new tab
    const waUrl = `https://wa.me/919360239398?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    // Open default mail client
    const mailtoUrl = `mailto:mohanrajvmvm221023@gmail.com?subject=${encodeURIComponent(`New Contact Message from ${formState.name}`)}&body=${encodeURIComponent(text)}`;
    window.location.href = mailtoUrl;

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10',
            isAI ? 'bg-purple' : 'bg-cyan'
          )} />
        
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          
          <motion.span
            className={cn(
              'inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4',
              'bg-white/5 border border-white/10',
              isAI ? 'text-purple-light' : 'text-cyan'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}>
            
            Get In Touch
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full',
            'bg-gradient-to-r',
            isAI ? 'from-purple to-blue' : 'from-cyan to-blue'
          )} />
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">
                Contact Information
              </h3>
              <p className="text-white/60 mb-8">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) =>
              <motion.div
                key={info.label}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl',
                  'bg-white/[0.03] border border-white/10',
                  'hover:border-white/20 transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}>
                
                  <div className={cn(
                  'p-3 rounded-lg',
                  'bg-white/5',
                  isAI ? 'text-purple-light' : 'text-cyan'
                )}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">{info.label}</div>
                    {info.href ?
                  <a
                    href={info.href}
                    className="text-white hover:text-gradient transition-all">
                    
                        {info.value}
                      </a> :

                  <div className="text-white">{info.value}</div>
                  }
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) =>
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'p-4 rounded-xl border border-white/10',
                    'bg-white/[0.03] text-white/60',
                    'hover:text-white hover:border-white/30',
                    'transition-all duration-300'
                  )}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}>
                  
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              className={cn(
                'inline-flex items-center gap-3 px-5 py-3 rounded-xl',
                'bg-white/[0.03] border border-white/10'
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.9 }}>
              
              <span className="relative flex h-3 w-3">
                <span className={cn(
                  'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                  isAI ? 'bg-green-400' : 'bg-cyan'
                )} />
                <span className={cn(
                  'relative inline-flex rounded-full h-3 w-3',
                  isAI ? 'bg-green-400' : 'bg-cyan'
                )} />
              </span>
              <span className="text-white/80 text-sm">
                Available for freelance projects
              </span>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={cn(
              'rounded-2xl p-8 border',
              'bg-white/[0.03] border-white/10'
            )}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            
            <h3 className="text-xl font-semibold text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/70">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple/50" />
                  
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/70">
                    Your Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple/50" />
                  
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white/70">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple/50 resize-none" />
                
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={cn(
                  'w-full h-12',
                  isAI ?
                  'bg-gradient-to-r from-purple to-blue hover:shadow-glow-purple' :
                  'bg-gradient-to-r from-cyan to-blue hover:shadow-glow-cyan',
                  'transition-all duration-300'
                )}>
                
                {isSubmitting ?
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </> :
                isSubmitted ?
                <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Message Sent!
                  </> :

                <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                }
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>);

}