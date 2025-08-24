import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData, achievements, positions } from '../data/portfolioData';

export const PortfolioGUI: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        
        <motion.div 
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-7xl font-light bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6"
            variants={fadeInUp}
            data-testid="hero-title"
          >
            Prerak Mathur
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-400 mb-8"
            variants={fadeInUp}
          >
            Software Development Engineer II
          </motion.p>
          <motion.div 
            className="flex items-center justify-center space-x-8 text-sm text-gray-400"
            variants={fadeInUp}
          >
            <div className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i>
              India
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope mr-2"></i>
              mathur.prerak@gmail.com
            </div>
            <div className="flex items-center">
              <i className="fas fa-phone mr-2"></i>
              +91 967 261 4863
            </div>
          </motion.div>
          
          <motion.div className="mt-12" variants={fadeInUp}>
            <a 
              href="#about" 
              className="inline-flex items-center text-blue-400 hover:text-white transition-colors duration-300"
              data-testid="explore-link"
            >
              <span className="mr-2">Explore My Work</span>
              <motion.i 
                className="fas fa-arrow-down"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="glass-card rounded-3xl p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                  I'm a Software Development Engineer II at Walmart Global Tech, passionate about building scalable solutions and automating complex workflows. With expertise in cloud computing, full-stack development, and system architecture.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-graduation-cap text-matrix-green mr-3"></i>
                    <span>B.Tech IT from IIIT Lucknow (CGPA: 8.6/10.0)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-award text-matrix-green mr-3"></i>
                    <span>Google Summer of Code 2022 Contributor</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-code text-matrix-green mr-3"></i>
                    <span>CodeForces Specialist • CodeChef 4 Star</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Core Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Java', 'JavaScript', 'Python', 'React', 'Node.js', 'GCP', 'Docker', 'Kafka'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Professional Experience
          </motion.h2>
          
          <motion.div 
            className="space-y-8"
            initial="initial"
            whileInView="animate"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            {portfolioData.career.items.map((job, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                variants={fadeInUp}
                data-testid={`experience-${index}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{job.title}</h3>
                    <p className="text-blue-400">{job.company}</p>
                  </div>
                  <span className="text-gray-400">{job.period}</span>
                </div>
                <ul className="space-y-3 text-gray-400">
                  {job.achievements.slice(0, 3).map((achievement, i) => (
                    <li key={i} className="flex items-start">
                      <i className="fas fa-check-circle text-matrix-green mr-3 mt-1"></i>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            {portfolioData.projects.items.map((project, index) => (
              <motion.div 
                key={index}
                className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300 hover:bg-white/10"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                data-testid={`project-${index}`}
              >
                <div className="mb-4">
                  <i className="fas fa-code text-matrix-green text-3xl mb-4"></i>
                  <h3 className="text-2xl font-semibold mb-2">{project.name}</h3>
                  <span className="text-gray-400 text-sm">{project.period}</span>
                </div>
                <p className="text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-800 rounded-full text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center text-matrix-green hover:text-blue-400 transition-colors"
                >
                  View Project <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-12 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Achievements & Recognition
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-matrix-green mb-4">Awards & Recognition</h3>
              {achievements.map((achievement, index) => (
                <div key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fas fa-trophy text-matrix-green mr-3 mt-1"></i>
                    <span>{achievement}</span>
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div className="space-y-6" variants={fadeInUp}>
              <h3 className="text-2xl font-semibold text-matrix-green mb-4">Leadership Roles</h3>
              {positions.map((position, index) => (
                <div key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fas fa-users text-matrix-green mr-3 mt-1"></i>
                    <span>{position}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-light mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Interested in collaborating or learning more about my work?
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            variants={staggerChildren}
            viewport={{ once: true }}
          >
            <motion.a 
              href={`mailto:${portfolioData.contact.info.email}`}
              className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group block"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              data-testid="contact-email"
            >
              <i className="fas fa-envelope text-matrix-green text-3xl mb-4 group-hover:text-blue-400 transition-colors"></i>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-400">{portfolioData.contact.info.email}</p>
            </motion.a>
            
            <motion.a 
              href={`https://${portfolioData.contact.info.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group block"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              data-testid="contact-website"
            >
              <i className="fas fa-globe text-matrix-green text-3xl mb-4 group-hover:text-blue-400 transition-colors"></i>
              <h3 className="text-xl font-semibold mb-2">Website</h3>
              <p className="text-gray-400">{portfolioData.contact.info.website}</p>
            </motion.a>
            
            <motion.a 
              href={`https://github.com/${portfolioData.contact.info.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 group block"
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              data-testid="contact-github"
            >
              <i className="fab fa-github text-matrix-green text-3xl mb-4 group-hover:text-blue-400 transition-colors"></i>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-gray-400">{portfolioData.contact.info.github}</p>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
