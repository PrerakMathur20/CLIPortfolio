import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, achievements, positions } from '../data/portfolioData';
import { EmailService } from '../services/emailService';

export const PortfolioGUI: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    subject: '',
    email: '',
    message: '',
    isSubmitted: false,
    isLoading: false,
    error: ''
  });

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.subject && contactForm.message) {
      setContactForm(prev => ({ ...prev, isLoading: true, error: '' }));
      
      try {
        const result = await EmailService.sendEmail({
          from_name: contactForm.name,
          from_email: contactForm.email,
          subject: contactForm.subject,
          message: contactForm.message
        });

        if (result.success) {
          setContactForm(prev => ({ ...prev, isSubmitted: true, isLoading: false }));
          setTimeout(() => {
            setContactForm({ name: '', subject: '', email: '', message: '', isSubmitted: false, isLoading: false, error: '' });
          }, 3000);
        } else {
          setContactForm(prev => ({ ...prev, isLoading: false, error: result.message }));
        }
      } catch (error) {
        setContactForm(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: 'Failed to send message. Please try again or contact directly via email.' 
        }));
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
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl font-light mb-8 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Let's Connect
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 mb-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Interested in collaborating or learning more about my work?
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="glass-card rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-matrix-green">Send a Message</h3>
              
              {contactForm.isSubmitted ? (
                <motion.div 
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <i className="fas fa-check-circle text-matrix-green text-4xl mb-4"></i>
                  <h4 className="text-xl font-semibold mb-2">Message Sent!</h4>
                  <p className="text-gray-400">Thank you for reaching out. I'll get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-matrix-green focus:outline-none focus:ring-1 focus:ring-matrix-green transition-colors text-white"
                      placeholder="Your full name"
                      required
                      data-testid="contact-form-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-matrix-green focus:outline-none focus:ring-1 focus:ring-matrix-green transition-colors text-white"
                      placeholder="your.email@example.com"
                      required
                      data-testid="contact-form-email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-matrix-green focus:outline-none focus:ring-1 focus:ring-matrix-green transition-colors text-white"
                      placeholder="What is this about?"
                      required
                      data-testid="contact-form-subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-matrix-green focus:outline-none focus:ring-1 focus:ring-matrix-green transition-colors text-white resize-none"
                      placeholder="Tell me about your project or just say hello..."
                      required
                      minLength={10}
                      data-testid="contact-form-message"
                    />
                  </div>
                  
                  {contactForm.error && (
                    <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-500/30">
                      {contactForm.error}
                    </div>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={contactForm.isLoading}
                    className="w-full bg-matrix-green text-black font-semibold py-3 px-6 rounded-lg hover:bg-blue-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={contactForm.isLoading ? {} : { scale: 1.02 }}
                    whileTap={contactForm.isLoading ? {} : { scale: 0.98 }}
                    data-testid="contact-form-submit"
                  >
                    {contactForm.isLoading ? (
                      <div className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            {/* Contact Links */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-matrix-green">Other Ways to Connect</h3>
              
              <motion.a 
                href={`mailto:${portfolioData.contact.info.email}`}
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group block"
                whileHover={{ y: -5 }}
                data-testid="contact-email"
              >
                <div className="flex items-center">
                  <i className="fas fa-envelope text-matrix-green text-2xl mr-4 group-hover:text-blue-400 transition-colors"></i>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-400 text-sm">{portfolioData.contact.info.email}</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a 
                href={`https://${portfolioData.contact.info.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group block"
                whileHover={{ y: -5 }}
                data-testid="contact-website"
              >
                <div className="flex items-center">
                  <i className="fas fa-globe text-matrix-green text-2xl mr-4 group-hover:text-blue-400 transition-colors"></i>
                  <div>
                    <h4 className="font-semibold">Website</h4>
                    <p className="text-gray-400 text-sm">{portfolioData.contact.info.website}</p>
                  </div>
                </div>
              </motion.a>
              
              <motion.a 
                href={`https://github.com/${portfolioData.contact.info.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group block"
                whileHover={{ y: -5 }}
                data-testid="contact-github"
              >
                <div className="flex items-center">
                  <i className="fab fa-github text-matrix-green text-2xl mr-4 group-hover:text-blue-400 transition-colors"></i>
                  <div>
                    <h4 className="font-semibold">GitHub</h4>
                    <p className="text-gray-400 text-sm">{portfolioData.contact.info.github}</p>
                  </div>
                </div>
              </motion.a>

              <motion.a 
                href={`https://linkedin.com/in/${portfolioData.contact.info.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group block"
                whileHover={{ y: -5 }}
                data-testid="contact-linkedin"
              >
                <div className="flex items-center">
                  <i className="fab fa-linkedin text-matrix-green text-2xl mr-4 group-hover:text-blue-400 transition-colors"></i>
                  <div>
                    <h4 className="font-semibold">LinkedIn</h4>
                    <p className="text-gray-400 text-sm">{portfolioData.contact.info.linkedin}</p>
                  </div>
                </div>
              </motion.a>

              <motion.a 
                href="/attached_assets/PrerakMathurResume_1756000441188.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-6 hover:scale-105 transition-all duration-300 group block"
                whileHover={{ y: -5 }}
                data-testid="contact-resume"
              >
                <div className="flex items-center">
                  <i className="fas fa-file-pdf text-matrix-green text-2xl mr-4 group-hover:text-blue-400 transition-colors"></i>
                  <div>
                    <h4 className="font-semibold">Download Resume</h4>
                    <p className="text-gray-400 text-sm">PDF Document</p>
                  </div>
                </div>
              </motion.a>

              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center">
                  <i className="fas fa-phone text-matrix-green text-2xl mr-4"></i>
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <p className="text-gray-400 text-sm">{portfolioData.contact.info.phone}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
