import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip } from
'recharts';













const aiSkillCategories = [
{
  name: 'AI/ML',
  color: '#7e64ed',
  skills: [
  { name: 'Machine Learning', level: 95, category: 'AI/ML' },
  { name: 'Deep Learning', level: 90, category: 'AI/ML' },
  { name: 'NLP', level: 85, category: 'AI/ML' },
  { name: 'Computer Vision', level: 88, category: 'AI/ML' },
  { name: 'MLOps', level: 82, category: 'AI/ML' }]

},
{
  name: 'Programming',
  color: '#5b7fff',
  skills: [
  { name: 'Python', level: 95, category: 'Programming' },
  { name: 'Django', level: 90, category: 'Programming' },
  { name: 'FastAPI', level: 85, category: 'Programming' },
  { name: 'SQL', level: 88, category: 'Programming' },
  { name: 'JavaScript', level: 75, category: 'Programming' }]

},
{
  name: 'Frameworks',
  color: '#00d4ff',
  skills: [
  { name: 'PyTorch', level: 92, category: 'Frameworks' },
  { name: 'TensorFlow', level: 85, category: 'Frameworks' },
  { name: 'Scikit-learn', level: 95, category: 'Frameworks' },
  { name: 'Pandas', level: 90, category: 'Frameworks' },
  { name: 'NumPy', level: 92, category: 'Frameworks' }]

},
{
  name: 'MLOps',
  color: '#ff5b5b',
  skills: [
  { name: 'Docker', level: 88, category: 'MLOps' },
  { name: 'Git', level: 90, category: 'MLOps' },
  { name: 'AWS', level: 75, category: 'MLOps' },
  { name: 'CI/CD', level: 80, category: 'MLOps' },
  { name: 'Monitoring', level: 78, category: 'MLOps' }]

}];


const zohoSkillCategories = [
{
  name: 'Zoho Platform',
  color: '#00d4ff',
  skills: [
  { name: 'Zoho Creator', level: 95, category: 'Zoho Platform' },
  { name: 'Zoho CRM', level: 90, category: 'Zoho Platform' },
  { name: 'Zoho Books', level: 88, category: 'Zoho Platform' },
  { name: 'Zoho Inventory', level: 92, category: 'Zoho Platform' },
  { name: 'Zoho Projects', level: 85, category: 'Zoho Platform' }]

},
{
  name: 'Development',
  color: '#5b7fff',
  skills: [
  { name: 'Deluge Script', level: 95, category: 'Development' },
  { name: 'Python', level: 85, category: 'Development' },
  { name: 'HTML/CSS', level: 80, category: 'Development' },
  { name: 'JavaScript', level: 75, category: 'Development' },
  { name: 'APIs', level: 88, category: 'Development' }]

},
{
  name: 'ERP Systems',
  color: '#7e64ed',
  skills: [
  { name: 'Inventory Mgmt', level: 92, category: 'ERP Systems' },
  { name: 'Finance', level: 88, category: 'ERP Systems' },
  { name: 'Sales', level: 90, category: 'ERP Systems' },
  { name: 'Purchase', level: 87, category: 'ERP Systems' },
  { name: 'Accounts', level: 85, category: 'ERP Systems' }]

},
{
  name: 'Professional',
  color: '#ff5b5b',
  skills: [
  { name: 'Problem Solving', level: 95, category: 'Professional' },
  { name: 'Requirements', level: 90, category: 'Professional' },
  { name: 'Training', level: 85, category: 'Professional' },
  { name: 'Analysis', level: 92, category: 'Professional' },
  { name: 'Communication', level: 88, category: 'Professional' }]

}];


// Radar chart data for AI
const aiRadarData = [
{ subject: 'ML', A: 95, fullMark: 100 },
{ subject: 'DL', A: 90, fullMark: 100 },
{ subject: 'NLP', A: 85, fullMark: 100 },
{ subject: 'CV', A: 88, fullMark: 100 },
{ subject: 'MLOps', A: 82, fullMark: 100 },
{ subject: 'Python', A: 95, fullMark: 100 }];


// Radar chart data for Zoho
const zohoRadarData = [
{ subject: 'Creator', A: 95, fullMark: 100 },
{ subject: 'CRM', A: 90, fullMark: 100 },
{ subject: 'Books', A: 88, fullMark: 100 },
{ subject: 'Inventory', A: 92, fullMark: 100 },
{ subject: 'Deluge', A: 95, fullMark: 100 },
{ subject: 'ERP', A: 90, fullMark: 100 }];


function SkillBar({ skill, index, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      <div className="flex justify-between mb-2">
        <span className="text-white/80 text-sm font-medium">{skill.name}</span>
        <motion.span
          className="text-white/60 text-sm"
          animate={{ opacity: isHovered ? 1 : 0.6 }}>
          
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }} />
        
      </div>
    </motion.div>);

}

function SkillCategoryCard({ category, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className={cn(
        'rounded-2xl p-6 border transition-all duration-300',
        'bg-white/[0.03] border-white/10',
        'hover:border-white/20 hover:bg-white/[0.05]'
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}>
        
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: category.color }} />
          
          <h4 className="text-white font-semibold">{category.name}</h4>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}>
          
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden">
        
        <div className="space-y-4 pt-2">
          {category.skills.map((skill, skillIndex) =>
          <SkillBar
            key={skill.name}
            skill={skill}
            index={skillIndex}
            color={category.color} />

          )}
        </div>
      </motion.div>

      {!isExpanded &&
      <div className="flex flex-wrap gap-2 mt-2">
          {category.skills.slice(0, 3).map((skill) =>
        <span
          key={skill.name}
          className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/60">
          
              {skill.name}
            </span>
        )}
          {category.skills.length > 3 &&
        <span className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/40">
              +{category.skills.length - 3} more
            </span>
        }
        </div>
      }
    </motion.div>);

}

export function Skills() {
  const { isAI } = useRole();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const categories = isAI ? aiSkillCategories : zohoSkillCategories;
  const radarData = isAI ? aiRadarData : zohoRadarData;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10',
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
            
            My Expertise
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Skills <span className="text-gradient">& Technologies</span>
          </h2>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full',
            'bg-gradient-to-r',
            isAI ? 'from-purple to-blue' : 'from-cyan to-blue'
          )} />
        </motion.div>

        {/* Skills Visualization */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Radar Chart */}
          <motion.div
            className={cn(
              'rounded-3xl p-8 border',
              'bg-white/[0.03] border-white/10'
            )}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>
            
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              Skill Distribution
            </h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }} />
                  
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false} />
                  
                  <Radar
                    name="Skills"
                    dataKey="A"
                    stroke={isAI ? '#7e64ed' : '#00d4ff'}
                    fill={isAI ? '#7e64ed' : '#00d4ff'}
                    fillOpacity={0.3}
                    strokeWidth={2} />
                  
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(13, 13, 13, 0.9)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} />
                  
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Categories */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}>
            
            <h3 className="text-xl font-semibold text-white mb-6">
              Technical Proficiency
            </h3>
            {categories.map((category, index) =>
            <SkillCategoryCard
              key={category.name}
              category={category}
              index={index} />

            )}
          </motion.div>
        </div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}>
          
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {isAI ?
            <>
                {['Python', 'PyTorch', 'TensorFlow', 'Django', 'FastAPI', 'Docker', 'AWS', 'Git', 'Scikit-learn', 'Pandas', 'NumPy', 'Whisper'].map((tech, index) =>
              <motion.span
                key={tech}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-medium',
                  'bg-white/5 border border-white/10 text-white/80',
                  'hover:border-purple/50 hover:text-white hover:bg-purple/10',
                  'transition-all duration-300 cursor-default'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}>
                
                    {tech}
                  </motion.span>
              )}
              </> :

            <>
                {['Zoho Creator', 'Zoho CRM', 'Zoho Books', 'Zoho Inventory', 'Zoho Projects', 'Deluge', 'Python', 'HTML/CSS', 'JavaScript', 'APIs', 'ERP', 'Workflow Automation'].map((tech, index) =>
              <motion.span
                key={tech}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-medium',
                  'bg-white/5 border border-white/10 text-white/80',
                  'hover:border-cyan/50 hover:text-white hover:bg-cyan/10',
                  'transition-all duration-300 cursor-default'
                )}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}>
                
                    {tech}
                  </motion.span>
              )}
              </>
            }
          </div>
        </motion.div>
      </div>
    </section>);

}