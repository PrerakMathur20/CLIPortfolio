import React from 'react';
import { Terminal } from './Terminal';
import { portfolioData, achievements, positions, openSourceContributions } from '../data/portfolioData';

interface CLIModeProps {
  currentPath: string;
  onPathChange: (path: string) => void;
}

export const CLIMode: React.FC<CLIModeProps> = ({ currentPath, onPathChange }) => {
  const renderContent = () => {
    const pathParts = currentPath.split('/').filter(p => p !== '');
    
    if (pathParts.length === 0) {
      // Root directory
      return (
        <div className="space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Prerak Mathur
          </h1>
          <p className="text-xl text-gray-400">Software Development Engineer II @ Walmart Global Tech</p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            {[
              { name: 'Career', icon: 'fas fa-briefcase', desc: 'cd career' },
              { name: 'Projects', icon: 'fas fa-code', desc: 'cd projects' },
              { name: 'Education', icon: 'fas fa-graduation-cap', desc: 'cd education' },
              { name: 'Contact', icon: 'fas fa-envelope', desc: 'cd contact' },
              { name: 'Skills', icon: 'fas fa-cogs', desc: 'cd skills' },
              { name: 'Achievements', icon: 'fas fa-trophy', desc: 'cd achievements' }
            ].map((item) => (
              <div key={item.name} className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <i className={`${item.icon} text-matrix-green text-2xl mb-3`}></i>
                <h3 className="text-lg font-semibold mb-2 text-white">{item.name}</h3>
                <p className="text-gray-400 text-sm font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    const section = pathParts[0];
    const subSection = pathParts[1];

    switch (section) {
      case 'career':
        if (subSection === 'walmart') {
          const walmartJobs = portfolioData.career.items.filter(item => 
            item.company === 'Walmart Global Tech'
          );
          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-matrix-green">Walmart Global Tech</h1>
              <div className="space-y-6">
                {walmartJobs.map((job, index) => (
                  <div key={index} className="glass-card rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{job.title}</h3>
                    <p className="text-blue-400 mb-2">{job.company}</p>
                    <p className="text-gray-400 text-sm mb-4">{job.period}</p>
                    <ul className="space-y-2 text-sm text-gray-300">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-matrix-green mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-matrix-green">Career Timeline</h1>
              <div className="space-y-6">
                {portfolioData.career.items.map((item, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                    <p className="text-blue-400 mb-2">{item.company}</p>
                    <p className="text-gray-400 text-sm mb-3">{item.period}</p>
                    {item.dirs && (
                      <p className="text-xs text-matrix-green font-mono">cd {item.dirs[0]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        }

      case 'projects':
        if (subSection) {
          const project = portfolioData.projects.items.find(p => 
            p.name.toLowerCase().replace(/\s+/g, '-') === subSection
          );
          if (project) {
            return (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-matrix-green">{project.name}</h1>
                <div className="glass-card rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-4">{project.period}</p>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-matrix-green">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="text-matrix-green text-sm hover:underline">
                    View Project →
                  </a>
                </div>
              </div>
            );
          }
        } else {
          return (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-matrix-green">Projects</h1>
              <div className="space-y-6">
                {portfolioData.projects.items.map((project, index) => (
                  <div key={index} className="glass-card rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-white">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-3">{project.period}</p>
                    <p className="text-sm mb-3 text-gray-300">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-matrix-green">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-matrix-green font-mono">
                      cd {project.name.toLowerCase().replace(/\s+/g, '-')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        break;

      case 'education':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-matrix-green">Education</h1>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-white">
                {portfolioData.education.items[0].title}
              </h3>
              <p className="text-blue-400 mb-2">{portfolioData.education.items[0].institution}</p>
              <p className="text-gray-400 text-sm mb-3">{portfolioData.education.items[0].period}</p>
              <p className="text-sm mb-3 text-matrix-green">CGPA: {portfolioData.education.items[0].cgpa}</p>
              <div className="text-sm">
                <p className="mb-2 text-white">Relevant Coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {portfolioData.education.items[0].coursework.map((course, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-matrix-green">Contact Information</h1>
            
            {/* Contact Form */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Send a Message</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <label className="text-gray-400 block mb-1">Name:</label>
                  <div className="bg-gray-800 p-2 rounded border border-gray-600 text-matrix-green font-mono">
                    [Enter your name] - Use: send-message command
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Email:</label>
                  <div className="bg-gray-800 p-2 rounded border border-gray-600 text-matrix-green font-mono">
                    [Enter your email] - Use: send-message command
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Subject:</label>
                  <div className="bg-gray-800 p-2 rounded border border-gray-600 text-matrix-green font-mono">
                    [Enter subject] - Use: send-message command
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Message:</label>
                  <div className="bg-gray-800 p-2 rounded border border-gray-600 text-matrix-green font-mono min-h-[80px] flex items-center">
                    [Enter your message] - Use: send-message command
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Use terminal command "send-message" to fill this form interactively
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="glass-card rounded-xl p-6 space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Direct Contact</h3>
              <div className="flex items-center text-white">
                <i className="fas fa-envelope text-matrix-green mr-3"></i>
                <span>{portfolioData.contact.info.email}</span>
              </div>
              <div className="flex items-center text-white">
                <i className="fas fa-phone text-matrix-green mr-3"></i>
                <span>{portfolioData.contact.info.phone}</span>
              </div>
              <div className="flex items-center text-white">
                <i className="fas fa-globe text-matrix-green mr-3"></i>
                <span>{portfolioData.contact.info.website}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Connect & Links</h3>
              <div className="space-y-2 text-sm">
                <div className="text-white">
                  <span className="text-matrix-green">GitHub:</span> https://github.com/{portfolioData.contact.info.github}
                </div>
                <div className="text-white">
                  <span className="text-matrix-green">LinkedIn:</span> https://linkedin.com/in/{portfolioData.contact.info.linkedin}
                </div>
                <div className="text-white">
                  <span className="text-matrix-green">Email:</span> mailto:{portfolioData.contact.info.email}
                </div>
                <div className="text-white">
                  <span className="text-matrix-green">Resume:</span> /attached_assets/PrerakMathurResume_1756000441188.pdf
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              <p>Terminal commands available:</p>
              <p className="text-matrix-green font-mono">• send-message - Start contact form</p>
              <p className="text-matrix-green font-mono">• schedule-call - Schedule a call</p>
            </div>
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-matrix-green">Achievements</h1>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fas fa-trophy text-matrix-green mr-3 mt-1"></i>
                    <span className="text-white">{achievement}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold text-matrix-green mt-8">Positions of Responsibility</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fas fa-users text-matrix-green mr-3 mt-1"></i>
                    <span className="text-white">{position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'contributions':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-matrix-green">Open Source Contributions</h1>
            <div className="space-y-4">
              {openSourceContributions.map((contribution, index) => (
                <div key={index} className="glass-card rounded-xl p-4">
                  <div className="flex items-start">
                    <i className="fab fa-github text-matrix-green mr-3 mt-1"></i>
                    <span className="text-white">{contribution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-matrix-green">Technical Skills</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'JavaScript', 'Python', 'TypeScript', 'C++'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-matrix-green">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Express', 'Spring Boot', 'GraphQL', 'NextJS'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-matrix-green">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Cloud & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {['GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Kafka', 'Cloudflare'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-matrix-green">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-white">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'MongoDB', 'BigQuery', 'Redis'].map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-matrix-green">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-400">
            <p>Directory not found: {currentPath}</p>
            <p className="text-sm mt-2">Use "cd" to navigate back or "ls" to see available directories</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-black">
      <div className="w-full md:w-2/5 h-1/2 md:h-full">
        <Terminal onPathChange={onPathChange} />
      </div>
      <div className="w-full md:w-3/5 p-4 md:p-8 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-matrix-green scrollbar-track-transparent">
        <div data-testid="cli-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
