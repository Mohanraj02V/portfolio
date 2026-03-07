import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRole } from '@/context/RoleContext';
import { cn } from '@/lib/utils';
import {
  ExternalLink,
  Github,
  ChevronRight,

  Database,
  Cpu,
  Mic,
  Building2,
  ShoppingCart,
  TrendingUp
} from
  'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from
  '@/components/ui/dialog';

const aiProjects = [
  {
    id: 'aurora-erp',
    title: 'Aurora ERP',
    shortDescription: 'Modular ERP system designed for manufacturing, trading, and distribution businesses.',
    fullDescription: 'Aurora ERP is a modular enterprise resource planning system designed for manufacturing, trading, and distribution businesses. The platform integrates multiple business operations such as master data management, sales, purchasing, inventory tracking, production planning, and freight logistics into a single unified system, replacing manual and disconnected workflows with a centralized digital solution.\n\nThe system is built using a modern full-stack architecture with Django and Django REST Framework for the backend and React.js with Vite for the frontend, providing a fast and scalable single-page application experience. The backend manages business logic, data validation, and secure API communication, while the frontend delivers an interactive and responsive user interface.\n\nAurora ERP includes several core modules such as Master Management, Sales, Purchase, Inventory, Production, and Freight Management. These modules allow organizations to manage customers, vendors, warehouses, products, and operational transactions through structured workflows like sales order processing, procurement lifecycle management, and production planning.\n\nA key feature of the system is the Inventory Ledger, which automatically tracks stock inflows and outflows across warehouses. Instead of manually updating stock levels, inventory changes are triggered automatically through approved business transactions such as goods receipts or dispatches, ensuring accurate and transparent stock tracking.\n\nThe platform also includes dynamic forms, document approval workflows, automated calculations, bulk import/export capabilities, and real-time dashboard insights, enabling businesses to streamline operations and gain visibility into their supply chain activities.',
    image: '/project-erp.jpg',
    tags: ['Django', 'React.js', 'Vite', 'Full-Stack'],
    githubUrl: '',
    liveUrl: '',
    icon: Building2,
    features: [
      'Master management & operational transactions',
      'Automated Inventory Ledger tracking',
      'Document approval workflows',
      'Real-time dashboard insights',
      'Bulk import/export capabilities'
    ],
    techStack: ['Django', 'Django REST Framework', 'React.js', 'Vite', 'Python'],
    metrics: [
      { label: 'Architecture', value: 'Full-Stack' },
      { label: 'Frontend', value: 'React/Vite' },
      { label: 'Backend', value: 'Django API' }
    ],
    architecture: [
      'Client Interface → React.js & Vite',
      'API Layer → Django REST Framework',
      'Business Logic → Core Modules',
      'Data Management → Inventory Ledger'
    ]
  },
  {
    id: 'churn-prediction',
    title: 'Customer Churn Prediction',
    shortDescription: 'ML system predicting customer churn with 92% accuracy using ensemble methods.',
    fullDescription: 'A comprehensive machine learning system that predicts customer churn using advanced ensemble methods. The system processes customer behavioral data, performs feature engineering, and delivers real-time predictions through a REST API.',
    image: '/project-churn.jpg',
    tags: ['Machine Learning', 'Django', 'Scikit-learn', 'Docker'],
    githubUrl: 'https://github.com/Mohanraj02V/churn_pred_third_repo',
    liveUrl: 'https://example.com',
    icon: TrendingUp,
    features: [
      'Feature engineering on customer behavioral data',
      'Ensemble model with 92% accuracy',
      'REST API for real-time predictions',
      'Dockerized deployment on Render',
      'Model versioning and monitoring'],

    techStack: ['Python', 'Django', 'Scikit-learn', 'Pandas', 'Docker', 'Render'],
    metrics: [
      { label: 'Accuracy', value: '92%' },
      { label: 'Precision', value: '89%' },
      { label: 'Recall', value: '94%' }],

    architecture: [
      'Data Collection → Feature Engineering',
      'Model Training → Hyperparameter Tuning',
      'API Development → Docker Containerization',
      'Cloud Deployment → Monitoring']

  },
  {
    id: 'image-classification',
    title: 'Image Classification with PyTorch',
    shortDescription: 'CNN-based image classifier with ResNet transfer learning for multiple datasets.',
    fullDescription: 'Deep learning image classification system built with PyTorch, featuring custom CNN architectures and ResNet transfer learning. Achieves state-of-the-art results on MNIST and CIFAR-10 datasets.',
    image: '/project-pytorch.jpg',
    tags: ['Deep Learning', 'PyTorch', 'CNN', 'Computer Vision'],
    githubUrl: 'https://github.com/Mohanraj02V/Handwitten_Predict_repo',
    icon: Cpu,
    features: [
      'Custom CNN architecture from scratch',
      'ResNet transfer learning implementation',
      'Training on MNIST and CIFAR-10',
      'Weights & Biases experiment tracking',
      'Visualization of feature maps'],

    techStack: ['Python', 'PyTorch', 'TorchVision', 'Weights & Biases', 'NumPy'],
    metrics: [
      { label: 'MNIST Accuracy', value: '99.2%' },
      { label: 'CIFAR-10 Accuracy', value: '94.5%' },
      { label: 'Training Time', value: '< 1hr' }],

    architecture: [
      'Data Loading → Preprocessing',
      'CNN/ResNet Model → Training Loop',
      'Validation → Hyperparameter Tuning',
      'Inference → Deployment']

  },
  {
    id: 'ai-meeting-assistant',
    title: 'AI Meeting Assistant',
    shortDescription: 'Real-time meeting transcription with speaker diarization and sentiment analysis.',
    fullDescription: 'An AI-powered meeting assistant that transcribes audio in real-time, identifies different speakers, and analyzes sentiment. Built with OpenAI Whisper and deployed via Streamlit.',
    image: '/project-meeting.jpg',
    tags: ['NLP', 'Whisper', 'Streamlit', 'Audio Processing'],
    githubUrl: 'https://github.com/Mohanraj02V/AI-Meeting-Agent-Version-03',
    liveUrl: 'https://example.com',
    icon: Mic,
    features: [
      'Real-time speech-to-text with Whisper',
      'Speaker diarization identification',
      'Sentiment analysis of conversations',
      'Noise handling for real-world audio',
      'Export transcripts in multiple formats'],

    techStack: ['Python', 'OpenAI Whisper', 'Streamlit', 'PyAudio', 'Transformers'],
    metrics: [
      { label: 'WER', value: '8.5%' },
      { label: 'Speakers', value: 'Up to 10' },
      { label: 'Languages', value: '99+' }],

    architecture: [
      'Audio Input → Preprocessing',
      'Whisper STT → Speaker Diarization',
      'Sentiment Analysis → Post-processing',
      'Streamlit UI → Export']

  }];


const zohoProjects = [
  {
    id: 'erp-system',
    title: 'ERP System using Zoho Creator',
    shortDescription: 'Comprehensive ERP solution managing sales, purchase, inventory, and finance.',
    fullDescription: 'A full-featured ERP system built on Zoho Creator platform, integrating all core business operations including sales, purchase, inventory management, finance, and accounts modules.',
    image: '/project-erp.jpg',
    tags: ['Zoho Creator', 'ERP', 'Deluge', 'Automation'],
    icon: Building2,
    features: [
      'End-to-end business process automation',
      'Real-time inventory tracking',
      'Financial reporting and analytics',
      'Multi-user role management',
      'Custom workflow automation'],

    techStack: ['Zoho Creator', 'Deluge Script', 'Zoho CRM', 'Zoho Books', 'Zoho Inventory'],
    metrics: [
      { label: 'Modules', value: '5+' },
      { label: 'Users', value: '50+' },
      { label: 'Efficiency', value: '+40%' }],

    architecture: [
      'Sales → Purchase → Inventory',
      'Finance → Accounts → Reporting',
      'Workflow Automation → Notifications',
      'Integration → Analytics Dashboard']

  },
  {
    id: 'inventory-management',
    title: 'Inventory Management System',
    shortDescription: 'Automated stock management with real-time tracking and alerts.',
    fullDescription: 'Advanced inventory management system with automated stock tracking, reorder alerts, and comprehensive reporting. Integrated with Zoho Inventory for seamless operations.',
    image: '/project-erp.jpg',
    tags: ['Zoho Inventory', 'Automation', 'Stock Mgmt'],
    icon: ShoppingCart,
    features: [
      'Real-time stock level monitoring',
      'Automated reorder point alerts',
      'Multi-warehouse management',
      'Barcode integration support',
      'Detailed inventory reports'],

    techStack: ['Zoho Inventory', 'Zoho Creator', 'Deluge Script', 'APIs'],
    metrics: [
      { label: 'SKUs', value: '1000+' },
      { label: 'Warehouses', value: '3' },
      { label: 'Accuracy', value: '99.8%' }]

  },
  {
    id: 'crm-integration',
    title: 'CRM Integration Platform',
    shortDescription: 'Unified customer data platform integrating Zoho CRM with business systems.',
    fullDescription: 'Comprehensive CRM integration solution that connects Zoho CRM with various business systems, enabling unified customer data management and automated workflows.',
    image: '/project-erp.jpg',
    tags: ['Zoho CRM', 'Integration', 'Automation'],
    icon: Database,
    features: [
      'Unified customer data view',
      'Automated lead scoring',
      'Sales pipeline automation',
      'Customer journey tracking',
      'Integration with external systems'],

    techStack: ['Zoho CRM', 'Zoho Flow', 'Deluge Script', 'REST APIs'],
    metrics: [
      { label: 'Leads', value: '5000+' },
      { label: 'Conversion', value: '+25%' },
      { label: 'Automation', value: '80%' }]

  }];


function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { isAI } = useRole();
  const Icon = project.icon;

  return (
    <>
      <motion.div
        className={cn(
          'group relative rounded-2xl overflow-hidden',
          'bg-white/[0.03] border border-white/10',
          'hover:border-white/20 transition-all duration-500',
          'cursor-pointer'
        )}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetails(true)}>

        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5 }} />


          {/* Overlay */}
          <motion.div
            className={cn(
              'absolute inset-0',
              'bg-gradient-to-t from-dark via-dark/50 to-transparent'
            )}
            animate={{ opacity: isHovered ? 0.9 : 0.7 }} />


          {/* Icon badge */}
          <div className={cn(
            'absolute top-4 left-4 p-2 rounded-lg',
            'bg-white/10 backdrop-blur-sm'
          )}>
            <Icon className={cn(
              'w-5 h-5',
              isAI ? 'text-purple-light' : 'text-cyan'
            )} />
          </div>

          {/* Hover content */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}>

            <span className={cn(
              'px-4 py-2 rounded-full text-sm font-medium',
              'bg-white/10 backdrop-blur-sm text-white',
              'flex items-center gap-2'
            )}>
              View Details <ChevronRight className="w-4 h-4" />
            </span>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gradient transition-all">
            {project.title}
          </h3>
          <p className="text-white/60 text-sm mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) =>
              <span
                key={tag}
                className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/50">

                {tag}
              </span>
            )}
            {project.tags.length > 3 &&
              <span className="px-2 py-1 rounded-md text-xs bg-white/5 text-white/30">
                +{project.tags.length - 3}
              </span>
            }
          </div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          className={cn(
            'absolute inset-0 rounded-2xl pointer-events-none',
            isAI ? 'shadow-glow-purple' : 'shadow-glow-cyan'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }} />

      </motion.div>

      {/* Project Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-light border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold text-white flex items-center gap-3">
              <Icon className={cn(
                'w-6 h-6',
                isAI ? 'text-purple-light' : 'text-cyan'
              )} />
              {project.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image */}
            <div className="rounded-xl overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover" />

            </div>

            {/* Description */}
            <p className="text-white/70 leading-relaxed">
              {project.fullDescription}
            </p>

            {/* Metrics */}
            {project.metrics &&
              <div className="grid grid-cols-3 gap-4">
                {project.metrics.map((metric) =>
                  <div
                    key={metric.label}
                    className="text-center p-4 rounded-xl bg-white/5">

                    <div className={cn(
                      'text-2xl font-bold',
                      isAI ? 'text-purple-light' : 'text-cyan'
                    )}>
                      {metric.value}
                    </div>
                    <div className="text-white/50 text-sm">{metric.label}</div>
                  </div>
                )}
              </div>
            }

            {/* Features */}
            <div>
              <h4 className="text-white font-semibold mb-3">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) =>
                  <li key={i} className="flex items-start gap-2 text-white/70">
                    <span className={cn(
                      'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                      isAI ? 'bg-purple-light' : 'text-cyan'
                    )} />
                    {feature}
                  </li>
                )}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-white font-semibold mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) =>
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/70">

                    {tech}
                  </span>
                )}
              </div>
            </div>

            {/* Architecture */}
            {project.architecture &&
              <div>
                <h4 className="text-white font-semibold mb-3">Architecture Flow</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {project.architecture.map((step, i) =>
                    <div key={i} className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg text-sm bg-white/5 text-white/70">
                        {step}
                      </span>
                      {i < project.architecture.length - 1 &&
                        <ChevronRight className="w-4 h-4 text-white/30" />
                      }
                    </div>
                  )}
                </div>
              </div>
            }

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              {project.githubUrl &&
                <Button
                  variant="outline"
                  className="flex-1 border-white/20 hover:bg-white/5"
                  asChild>

                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
              }
              {project.liveUrl &&
                <Button
                  className={cn(
                    'flex-1',
                    isAI ?
                      'bg-gradient-to-r from-purple to-blue hover:shadow-glow-purple' :
                      'bg-gradient-to-r from-cyan to-blue hover:shadow-glow-cyan'
                  )}
                  asChild>

                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>);

}

export function Projects() {
  const { isAI } = useRole();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const projects = isAI ? aiProjects : zohoProjects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className={cn(
            'absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[200px] opacity-10',
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

            My Work
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full',
            'bg-gradient-to-r',
            isAI ? 'from-purple to-blue' : 'from-cyan to-blue'
          )} />
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            {isAI ?
              'Explore my AI and machine learning projects, from predictive models to deep learning systems.' :
              'Discover my enterprise solutions built on the Zoho platform, streamlining business operations.'
            }
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) =>
            <ProjectCard key={project.id} project={project} index={index} />
          )}
        </div>
      </div>
    </section>);

}