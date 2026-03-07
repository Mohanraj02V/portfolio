import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';











const aiExperiences = [
{
  id: 'zoho-ai',
  role: 'Zoho Creator Developer - IT Executive',
  company: 'Enterprise Solutions',
  location: 'India',
  period: 'Oct 2024 - Present',
  description: [
  'Develop and maintain low-code business applications for enterprise workflows',
  'Migrate Zoho Creator applications to custom Django + React.js architectures',
  'Design backend logic, APIs, and database models',
  'Collaborate with stakeholders to optimize performance and scalability',
  'Gain strong understanding of business automation and production-grade systems'],

  skills: ['Zoho Creator', 'Django', 'Python', 'APIs', 'React.js']
}];


const zohoExperiences = [
{
  id: 'zoho-current',
  role: 'Zoho Creator Developer - IT Executive',
  company: 'Enterprise Solutions',
  location: 'India',
  period: 'Oct 2024 - Present',
  description: [
  'Develop and maintain low-code business applications using Zoho Creator for enterprise workflows',
  'Administer Zoho CRM, Zoho Books, Zoho Inventory, and Zoho Projects',
  'Design and implement backend logic, APIs, and database models using Deluge',
  'Migrate Zoho Creator applications to custom architectures',
  'Collaborate with stakeholders to gather requirements and deliver solutions',
  'Develop comprehensive understanding of ERP workflows',
  'Train and mentor team members on Zoho platform capabilities'],

  skills: ['Zoho Creator', 'Zoho CRM', 'Deluge', 'ERP', 'Workflow Automation']
}];


function ExperienceCard({ experience, index, isLeft }) {
  const { isAI } = useRole();
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-start',
        isLeft ? '' : 'lg:flex-row-reverse'
      )}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}>
      
      {/* Timeline dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-0 z-10">
        <motion.div
          className={cn(
            'w-4 h-4 rounded-full border-4',
            'bg-dark',
            isAI ? 'border-purple' : 'border-cyan'
          )}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }} />
        
      </div>

      {/* Content */}
      <div className={cn(
        'lg:pr-16',
        isLeft ? 'lg:text-right lg:col-start-1' : 'lg:col-start-2 lg:pl-16 lg:pr-0'
      )}>
        <motion.div
          className={cn(
            'rounded-2xl p-6 border',
            'bg-white/[0.03] border-white/10',
            'hover:border-white/20 transition-all duration-300'
          )}
          whileHover={{ y: -5 }}>
          
          {/* Header */}
          <div className={cn(
            'flex flex-col gap-2 mb-4',
            isLeft ? 'lg:items-end' : ''
          )}>
            <div className={cn(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs',
              'bg-white/5 text-white/60'
            )}>
              <Calendar className="w-3 h-3" />
              {experience.period}
            </div>
            
            <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
            <div className={cn(
              'flex items-center gap-4 text-white/60 text-sm',
              isLeft ? 'lg:justify-end' : ''
            )}>
              <span className="flex items-center gap-1">
                <Briefcase className="w-4 h-4" />
                {experience.company}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </span>
            </div>
          </div>

          {/* Description */}
          <ul className={cn(
            'space-y-2 mb-4',
            isLeft ? 'lg:text-right' : ''
          )}>
            {experience.description.map((item, i) =>
            <li
              key={i}
              className={cn(
                'text-white/70 text-sm flex items-start gap-2',
                isLeft ? 'lg:flex-row-reverse' : ''
              )}>
              
                <ChevronRight className={cn(
                'w-4 h-4 mt-0.5 flex-shrink-0',
                isAI ? 'text-purple-light' : 'text-cyan'
              )} />
                {item}
              </li>
            )}
          </ul>

          {/* Skills */}
          <div className={cn(
            'flex flex-wrap gap-2',
            isLeft ? 'lg:justify-end' : ''
          )}>
            {experience.skills.map((skill) =>
            <span
              key={skill}
              className="px-3 py-1 rounded-lg text-xs bg-white/5 text-white/60">
              
                {skill}
              </span>
            )}
          </div>
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className={isLeft ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'} />
    </motion.div>);

}

export function Experience() {
  const { isAI } = useRole();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const experiences = isAI ? aiExperiences : zohoExperiences;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-5',
            isAI ? 'bg-purple' : 'bg-cyan'
          )} />
        
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            My Journey
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full',
            'bg-gradient-to-r',
            isAI ? 'from-purple to-blue' : 'from-cyan to-blue'
          )} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line - hidden on mobile */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className={cn(
                'absolute top-0 left-0 w-full',
                isAI ? 'bg-purple' : 'bg-cyan'
              )}
              style={{ height: lineHeight }} />
            
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((experience, index) =>
            <div key={experience.id} className="lg:py-8">
                <ExperienceCard
                experience={experience}
                index={index}
                isLeft={index % 2 === 0} />
              
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}