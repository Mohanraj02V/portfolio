import { motion } from 'framer-motion';
import { Brain, Building2 } from 'lucide-react';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';






export function RoleSelector({ className, size = 'md' }) {
  const { currentRole, setRole } = useRole();

  const sizeClasses = {
    sm: 'h-10 text-xs',
    md: 'h-14 text-sm',
    lg: 'h-16 text-base'
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  };

  const roles = [
  { id: 'ai', label: 'AI Engineer', icon: Brain },
  { id: 'zoho', label: 'Zoho Creator', icon: Building2 }];


  return (
    <motion.div
      className={cn(
        'relative inline-flex items-center rounded-full p-1.5',
        'bg-dark-lighter/80 backdrop-blur-xl border border-white/10',
        sizeClasses[size],
        className
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
      
      {/* Animated background pill */}
      <motion.div
        className={cn(
          'absolute rounded-full',
          currentRole === 'ai' ?
          'bg-gradient-to-r from-purple to-blue' :
          'bg-gradient-to-r from-cyan to-blue'
        )}
        layoutId="roleSelectorBg"
        initial={false}
        animate={{
          x: currentRole === 'ai' ? 0 : '100%',
          width: '50%'
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 30
        }}
        style={{
          left: '4px',
          top: '4px',
          bottom: '4px',
          width: 'calc(50% - 4px)'
        }} />
      

      {/* Role buttons */}
      {roles.map((role) => {
        const Icon = role.icon;
        const isActive = currentRole === role.id;

        return (
          <motion.button
            key={role.id}
            onClick={() => setRole(role.id)}
            className={cn(
              'relative z-10 flex items-center gap-2 px-4 py-2 rounded-full',
              'font-medium transition-colors duration-300',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
              isActive ? 'text-white' : 'text-white/60 hover:text-white/80'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}>
            
            <motion.div
              animate={{
                rotate: isActive ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.5 }}>
              
              <Icon size={iconSizes[size]} />
            </motion.div>
            <span className="whitespace-nowrap">{role.label}</span>
            
            {/* Glow effect for active role */}
            {isActive &&
            <motion.div
              className={cn(
                'absolute inset-0 rounded-full blur-xl opacity-50 -z-10',
                role.id === 'ai' ? 'bg-purple' : 'bg-cyan'
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }} />

            }
          </motion.button>);

      })}
    </motion.div>);

}

export function RoleBadge({ role, className }) {
  const config = {
    ai: {
      icon: Brain,
      label: 'AI Engineer',
      gradient: 'from-purple to-blue'
    },
    zoho: {
      icon: Building2,
      label: 'Zoho Creator',
      gradient: 'from-cyan to-blue'
    }
  };

  const { icon: Icon, label, gradient } = config[role];

  return (
    <motion.div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full',
        'bg-gradient-to-r text-white font-medium text-sm',
        gradient,
        className
      )}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}>
      
      <Icon size={16} />
      <span>{label}</span>
    </motion.div>);

}