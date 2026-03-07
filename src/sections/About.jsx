import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';



export function About() {
  const { isAI } = useRole();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageRotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);




  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute top-1/4 -left-64 w-96 h-96 rounded-full blur-[150px] opacity-20',
            isAI ? 'bg-purple' : 'bg-cyan'
          )} />
        
        <div
          className={cn(
            'absolute bottom-1/4 -right-64 w-96 h-96 rounded-full blur-[150px] opacity-20',
            isAI ? 'bg-blue' : 'bg-blue'
          )} />
        
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
          
          <motion.span
            className={cn(
              'inline-block px-4 py-1.5 rounded-full text-xs font-medium mb-4',
              'bg-white/5 border border-white/10',
              isAI ? 'text-purple-light' : 'text-cyan'
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}>
            
            Get To Know Me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full',
            'bg-gradient-to-r',
            isAI ? 'from-purple to-blue' : 'from-cyan to-blue'
          )} />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            ref={imageRef}
            className="relative"
            style={{
              perspective: '1000px'
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            
            <motion.div
              className="relative"
              style={{
                rotateY: imageRotateY,
                scale: imageScale
              }}>
              
              {/* Image frame */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Glow effect */}
                <div className={cn(
                  'absolute -inset-1 rounded-2xl blur-xl opacity-50',
                  isAI ? 'bg-gradient-to-br from-purple to-blue' : 'bg-gradient-to-br from-cyan to-blue'
                )} />
                
                {/* Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                  <img
                    src="/1772696274833.png"
                    alt="Mohanraj Velmani"
                    className="w-full h-full object-cover" />
                  
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  
                  {/* Tech overlay on hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `
                        linear-gradient(180deg, transparent 0%, rgba(126, 100, 237, 0.1) 100%),
                        repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 2px,
                          rgba(126, 100, 237, 0.03) 2px,
                          rgba(126, 100, 237, 0.03) 4px
                        )
                      `
                    }} />
                  
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className={cn(
                  'absolute -bottom-4 -right-4 px-6 py-3 rounded-xl',
                  'glass-strong',
                  'flex items-center gap-3'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}>
                
                <div className={cn(
                  'w-3 h-3 rounded-full animate-pulse',
                  isAI ? 'bg-green-400' : 'bg-cyan'
                )} />
                <span className="text-white font-medium text-sm">
                  Available for work
                </span>
              </motion.div>

              {/* Decorative elements */}
              <div className={cn(
                'absolute -top-4 -left-4 w-24 h-24 rounded-full blur-2xl opacity-30',
                isAI ? 'bg-purple' : 'bg-cyan'
              )} />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}>
            
            <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white">
              {isAI ?
              <>AI Engineer with a passion for <span className="text-gradient">building intelligent systems</span></> :

              <>IT Executive specializing in <span className="text-gradient">enterprise automation</span></>
              }
            </h3>

            <div className="space-y-4 text-white/70 leading-relaxed">
              {isAI ?
              <>
                  <p>
                    I'm an AI Engineer with strong expertise in Machine Learning, Deep Learning, NLP, 
                    and MLOps, backed by hands-on experience in Django REST APIs, PyTorch, Scikit-learn, 
                    and production deployment using Docker and cloud platforms.
                  </p>
                  <p>
                    My proven ability to design end-to-end AI systems spans from data engineering and 
                    feature extraction to model training, evaluation, deployment, and monitoring. I've 
                    built real-world AI products including churn prediction systems, image classification 
                    pipelines, meeting transcription tools, and time-series forecasting solutions.
                  </p>
                </> :

              <>
                  <p>
                    I'm a results-driven Zoho Developer and IT Executive with comprehensive expertise 
                    in Zoho ecosystem implementation, low-code application development, and enterprise 
                    workflow automation.
                  </p>
                  <p>
                    With a proven track record in developing business applications using Zoho Creator, 
                    CRM, Books, Inventory, and Projects, I bring strong foundation in Python programming 
                    and ERP workflow management across Finance, Sales, Purchase, Accounts, and Inventory modules.
                  </p>
                </>
              }
            </div>


          </motion.div>
        </div>
      </div>
    </section>);

}