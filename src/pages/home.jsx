import React, { useRef, useState } from 'react';
import { 
  FaCode, FaServer, FaTerminal, FaDatabase, 
  FaArrowRight, FaGithub, FaLinkedin, 
  FaTwitter, FaEnvelope, FaQuoteLeft, FaStar 
} from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { staggerContainer, fadeIn, textVariant, zoomIn } from '../utils/motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import MainLayout from '../components/MainLayout';
import { title } from 'framer-motion/client';

// Move data to separate constants for better organization
const sections = ['About', 'Projects', 'Skills', 'Testimonials', 'Contact'];

const projects = [
  {
    id: 1,
    title: "Anime E-Commerce Platform",
    description: "Client-Site anime solution with React and Tailwind",
    tags: ["React", "Tailwind CSS"],
    image: "https://uchi.imgix.net/properties/anime2.png?crop=focalpoint&domain=uchi.imgix.net&fit=crop&fm=pjpg&fp-x=0.5&fp-y=0.5&h=558&ixlib=php-3.3.1&q=82&usm=20&w=992",
    github: "https://github.com/NaRong2006",
    live: "https://narong2006.github.io/Anime/"
  },
  {
    id: 2,
    title: "Cloth Shop E-Commerce Platform",
    description: "Client Site built with React and Tailwind CSS",
    tags: ["React", "Tailwind CSS"],
    image: "https://static.wixstatic.com/media/d9399c_7f70f26dd7064557bf7b4c5cd499b466~mv2.jpg/v1/fill/w_540,h_394,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_8567_edited.jpg",
    github: "https://github.com/NaRong2006",
    live: "https://narong2006.github.io/ClothShop/"
  },
  {
    id: 3,
    title: "LuxeMarket",
    description: "Your destination for premium quality products and exceptional shopping experience.",
    tags: ["React", "Tailwind CSS"],
    image: "https://static1.squarespace.com/static/63ea756a4fb0470550dfb221/t/63ea7f345d104d1b948f5a56/1676312372094/TRANSPARENT-01.png?format=1500w",
    github: "https://github.com/NaRong2006",
    live: "https://endearing-chimera-1eaba5.netlify.app/"
  },
  {
    id: 4,
    title: "Norton University",
    description: "Founded with a vision to transform higher education in Cambodia, Norton University stands as a beacon of academic excellence and innovation.",
    tags: ["React", "Tailwind CSS"],
    image: "https://cdn.norton-u.com/nu/public_file/images/about/new%20campus.jpg",
    github: "https://github.com/NaRong2006",
    live: "https://mellow-paprenjak-6b1f43.netlify.app/"
  },
   {
    id: 5,
    title: "Smart Technology Management",
    description: "At SmartTech Pro, we specialize in transforming spaces with cutting-edge smart technology solutions. Our team of certified experts brings together years of experience in IoT, home automation, and technology integration.",
    tags: ["React", "Tailwind CSS"],
    image: "https://networkedenergy.com/uploads/articles/490x405/Managing-the-Smart-Grid-Photo.png",
    github: "https://github.com/NaRong2006",
    live: "https://rad-mermaid-647df5.netlify.app/"
  },
  {
    id: 6,
    title: "Book Store",
    description: "Learning Change your life",
    tags: ["JavaScript, Bootstrap"],
    image: "https://img.freepik.com/premium-vector/bookstore-shop-exterior-woman_169241-6676.jpg",
    github: "https://github.com/NaRong2006",
    live:"https://narong2006.github.io/Book_ETEC/"
   }
];

const skills = [
  {
    id: 1,
    name: "Programming Languages",
    icon: <FaTerminal className="text-indigo-600" size={24} />,
    items: ["C/C++", "Python", "C#", "Java"]
  },
  { 
    id: 2,
    name: "Frontend Development", 
    icon: <FaCode className="text-indigo-600" size={24} />, 
    items: ["React", "HTML/CSS", "Bootstrap", "Tailwind CSS", "JavaScript"] 
  },
  { 
    id: 3,
    name: "Backend Development", 
    icon: <FaServer className="text-indigo-600" size={24} />, 
    items: ["PHP/Laravel", "REST APIs", "MySQL"] 
  },
  { 
    id: 4,
    name: "Database", 
    icon: <FaDatabase className="text-indigo-600" size={24} />, 
    items: ["MySQL", "MS Access"] 
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content: "Boeun delivered exceptional work on our e-commerce platform. His attention to detail and problem-solving skills were invaluable to our project's success.",
    rating: 5,
    image: "https://i.pinimg.com/280x280_RS/58/af/2d/58af2d0acba73cf4087c8f37fa94d195.jpg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupX",
    content: "Working with Boeun was a pleasure. He not only met all our requirements but also suggested improvements we hadn't considered. Highly recommended!",
    rating: 5,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDA9DRDu7Nk5A4neDAfhJGAllGEKoQXxptw&s"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Design Lead at CreativeStudio",
    content: "Boeun's technical expertise and collaborative approach made our design-to-development workflow seamless. Will definitely work with him again.",
    rating: 4,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAsFHBeIWXlUo7WelttJMfcXzojC9pahz0dA&s"
  }
];

const socialLinks = [
  {
    id: 1,
    icon: <FaGithub size={24} />,
    url: "https://github.com/NaRong2006",
    label: "GitHub"
  },
  {
    id: 2,
    icon: <FaLinkedin size={24} />,
    url: "https://linkedin.com/in/yourprofile",
    label: "LinkedIn"
  },
  {
    id: 3,
    icon: <FaTwitter size={24} />,
    url: "https://twitter.com/yourhandle",
    label: "Twitter"
  },
  {
    id: 4,
    icon: <FaEnvelope size={24} />,
    url: "mailto:your.email@example.com",
    label: "Email"
  }
];

// Reusable Section Component
const Section = ({ id, children, bg = '', className = '' }) => (
  <motion.section 
    id={id}
    className={`py-20 md:py-24 ${bg} ${className}`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.25 }}
    variants={staggerContainer}
  >
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </motion.section>
);

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, highlight, className = '' }) => (
  <motion.div 
    className={`mb-12 text-center ${className}`}
    variants={staggerContainer}
  >
    <motion.h2 
      className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800"
      variants={textVariant(0.1)}
    >
      {title} {highlight && (
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {highlight}
        </span>
      )}
    </motion.h2>
    {subtitle && (
      <motion.p 
        className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
        variants={textVariant(0.2)}
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);
const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const hoverCard = {
  hover: {
    y: -10,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const rotateAnimation = {
  rotate: [0, 5, -5, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatDelay: 3
  }
};

const gradientAnimation = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear"
  }
};

const HomePage = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null
  });
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });
    
    try {
      // Replace with your actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Simulate successful submission
      setFormStatus({ submitting: false, submitted: true, error: null });
      formRef.current.reset();
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({ submitting: false, submitted: false, error: 'Failed to send message. Please try again.' });
    }
  };

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <MainLayout>
      {/* Particle Background */}
      <div className="fixed inset-0 -z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                onHover: {
                  enable: true,
                  mode: "repulse",
                  parallax: { enable: false, force: 60, smooth: 10 },
                },
                resize: true,
              },
              modes: {
                push: { quantity: 4 },
                repulse: { distance: 150, duration: 0.4 },
              },
            },
            particles: {
              color: { value: "#6366f1" },
              move: {
                direction: "none",
                enable: true,
                outModes: "out",
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: { enable: true, area: 1000 },
                value: 80,
              },
              opacity: {
                animation: { enable: true, speed: 1, sync: false },
                value: { min: 0.05, max: 0.2 },
              },
              shape: {
                type: ["circle", "triangle", "star"],
                options: {
                  polygon: { sides: 6 },
                },
              },
              size: {
                animation: { enable: true, speed: 3, minimumValue: 0.1 },
                value: { min: 1, max: 4 },
              },
            },
            detectRetina: true,
            themes: [
              {
                name: "light",
                default: {
                  value: true,
                  mode: "light",
                },
                options: {
                  background: {
                    color: "#f9fafb",
                  },
                  particles: {
                    color: {
                      value: ["#6366f1", "#8b5cf6", "#a855f7"],
                    },
                  },
                },
              },
            ],
          }}
        />
      </div>
      {/* Hero/About Section */}
      <Section id="about" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-12 md:mb-0"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
              offscreen: { opacity: 0, x: -50 },
              onscreen: {
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: 0.3,
                },
              },
            }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-800"
              animate={gradientAnimation}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I'm
              </motion.span>
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  y: { duration: 0.5, delay: 0.2 },
                  backgroundPosition: {
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                Boeun Narong
              </motion.span>
            </motion.h1>

            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Full Stack Developer
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-gray-700 max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              I build exceptional digital experiences with modern web
              technologies. Passionate about creating efficient, scalable, and
              user-friendly applications.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.a
                href="#contact"
                className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium transition-all duration-500"
                aria-label="Contact me"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  Contact Me{" "}
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>

              <motion.a
                href="#projects"
                className="relative overflow-hidden group border-2 border-indigo-600 text-indigo-600 hover:text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-medium transition-all duration-500"
                aria-label="View projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center">
                  View Projects{" "}
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            </motion.div>

            <motion.div
              className="flex space-x-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                  aria-label={social.label}
                  whileHover={{ y: -5, scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.5,
            }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-lg opacity-75"
                animate={pulseAnimation}
              />
              <motion.div
                className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-2 w-full h-full flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 2 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
                <motion.div
                  className="bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full w-full h-full flex items-center justify-center overflow-hidden"
                  animate={rotateAnimation}
                >
                  <motion.img
                    src="./images/photo.jpg"
                    alt="Boeun Narong"
                    className="w-full h-full object-cover rounded-full"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="mb-16">
        <SectionHeader
          title="Featured"
          highlight="Projects"
          subtitle="Here are some of my recent projects that showcase my skills and expertise."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover="hover"
              custom={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              {/* Project Image */}
              <motion.div
                className="h-56 sm:h-64 relative overflow-hidden rounded-t-2xl"
                variants={{
                  hover: { scale: 1.03 },
                }}
              >
                {project.image ? (
                  project.image.startsWith("http") ||
                  project.image.startsWith("/") ? (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/default-project.jpg";
                      }}
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className={`w-full h-full ${project.image} flex items-center justify-center`}
                    >
                      <span className="text-white font-medium">
                        Project Preview
                      </span>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>

              {/* Project Content */}
              <div className="p-6 relative">
                {/* Project Number Badge */}
                <motion.div
                  className="absolute -top-5 left-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold px-4 py-1 rounded-lg shadow-md"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  0{index + 1}
                </motion.div>

                {/* Project Title and Description */}
                <motion.h3
                  className="text-xl font-bold mb-2 text-gray-800 mt-1"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-gray-600 mb-4 line-clamp-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>

                {/* Project Tags */}
                <motion.div
                  className="flex flex-wrap gap-2 mb-5"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                  viewport={{ once: true }}
                >
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Project Links */}
                <motion.div
                  className="flex justify-between border-t pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group"
                    aria-label={`View ${project.title} code on GitHub`}
                    whileHover={{ x: 5 }}
                  >
                    <FaGithub className="mr-2 group-hover:scale-110 transition-transform" />
                    <span>Code</span>
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors group"
                    aria-label={`View ${project.title} live demo`}
                    whileHover={{ x: 5 }}
                  >
                    <span>Live Demo</span>
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
      {/* Skills Section */}
      <Section
        id="skills"
        className="mb-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl"
      >
        <SectionHeader
          title="My"
          highlight="Skills"
          subtitle="I've worked with a variety of technologies in the web development world."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              variants={fadeIn("up", "spring", index * 0.1, 1)}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <motion.div
                className="flex items-center mb-4"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="bg-indigo-100 p-3 rounded-lg"
                  animate={rotateAnimation}
                >
                  {skill.icon}
                </motion.div>
                <motion.h3
                  className="text-lg sm:text-xl font-bold ml-4 text-gray-800"
                  whileHover={{ x: 5 }}
                >
                  {skill.name}
                </motion.h3>
              </motion.div>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <motion.li
                    key={i}
                    className="text-gray-700 flex items-center text-sm sm:text-base"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.05 + index * 0.1,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span
                      className="w-2 h-2 bg-indigo-600 rounded-full mr-2"
                      animate={pulseAnimation}
                    />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Testimonials Section */}
      <Section
        id="testimonials"
        className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50"
      >
        <SectionHeader
          title="Client"
          highlight="Testimonials"
          subtitle="What people I've worked with say about my work"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={fadeIn("up", "spring", index * 0.2, 1)}
              whileHover={{
                y: -10,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                className="flex items-center mb-6"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full overflow-hidden mr-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                </motion.div>
                <div>
                  <motion.h4
                    className="text-lg font-bold text-gray-800"
                    whileHover={{ x: 3 }}
                  >
                    {testimonial.name}
                  </motion.h4>
                  <motion.p
                    className="text-gray-600 text-sm"
                    whileHover={{ x: 3 }}
                  >
                    {testimonial.role}
                  </motion.p>
                </div>
              </motion.div>
              <motion.div className="mb-4" whileHover={{ x: 3 }}>
                <motion.div animate={rotateAnimation}>
                  <FaQuoteLeft className="text-indigo-400 text-xl mb-2" />
                </motion.div>
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </motion.div>
              <motion.div className="flex" whileHover={{ x: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.3 }}>
                    <FaStar
                      className={`${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } text-lg`}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="mb-16">
        <motion.div
          className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-1"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white rounded-3xl p-8 sm:p-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              title="Get In"
              highlight="Touch"
              subtitle="Have a project in mind or want to discuss potential opportunities? Feel free to reach out!"
              className="text-left"
            />

            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {formStatus.submitted ? (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  variants={fadeIn("up", "tween", 0.2, 1)}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <p>Thank you for your message! I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <>
                  {formStatus.error && (
                    <motion.div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                      variants={fadeIn("up", "tween", 0.2, 1)}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ type: "spring" }}
                    >
                      <p>{formStatus.error}</p>
                    </motion.div>
                  )}

                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={fadeIn("up", "tween", 0.2, 1)}
                  >
                    <div>
                      <motion.label
                        htmlFor="name"
                        className="block text-gray-700 mb-2 text-sm sm:text-base"
                        whileHover={{ x: 3 }}
                      >
                        Name
                      </motion.label>
                      <motion.input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        whileFocus={{
                          boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
                          y: -3,
                        }}
                      />
                    </div>
                    <div>
                      <motion.label
                        htmlFor="email"
                        className="block text-gray-700 mb-2 text-sm sm:text-base"
                        whileHover={{ x: 3 }}
                      >
                        Email
                      </motion.label>
                      <motion.input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                        placeholder="your.email@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        whileFocus={{
                          boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
                          y: -3,
                        }}
                      />
                    </div>
                  </motion.div>
                  <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
                    <motion.label
                      htmlFor="subject"
                      className="block text-gray-700 mb-2 text-sm sm:text-base"
                      whileHover={{ x: 3 }}
                    >
                      Subject
                    </motion.label>
                    <motion.input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                      placeholder="Subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
                        y: -3,
                      }}
                    />
                  </motion.div>
                  <motion.div variants={fadeIn("up", "tween", 0.4, 1)}>
                    <motion.label
                      htmlFor="message"
                      className="block text-gray-700 mb-2 text-sm sm:text-base"
                      whileHover={{ x: 3 }}
                    >
                      Message
                    </motion.label>
                    <motion.textarea
                      id="message"
                      rows="5"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                      placeholder="Your message here..."
                      required
                      value={formData.message}
                      onChange={handleChange}
                      whileFocus={{
                        boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
                        y: -3,
                      }}
                    />
                  </motion.div>
                  <motion.div variants={fadeIn("up", "tween", 0.5, 1)}>
                    <motion.button
                      type="submit"
                      className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold text-sm sm:text-base transition-all duration-500 disabled:opacity-70"
                      disabled={formStatus.submitting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {formStatus.submitting ? (
                          <motion.span
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            Sending...
                          </motion.span>
                        ) : (
                          <>
                            Send Message
                            <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </motion.div>
                </>
              )}
            </motion.form>
          </motion.div>
        </motion.div>
      </Section>
    </MainLayout>
  );
};

export default HomePage;