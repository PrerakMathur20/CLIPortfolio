export interface CareerItem {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  dirs?: string[];
}

export interface ProjectItem {
  name: string;
  period: string;
  description: string;
  tech: string[];
  link: string;
}

export interface EducationItem {
  title: string;
  institution: string;
  period: string;
  cgpa: string;
  coursework: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin?: string;
}

export interface PortfolioData {
  career: {
    type: 'timeline';
    items: CareerItem[];
  };
  projects: {
    type: 'tree';
    items: ProjectItem[];
  };
  education: {
    type: 'timeline';
    items: EducationItem[];
  };
  contact: {
    type: 'form';
    info: ContactInfo;
  };
}

export const portfolioData: PortfolioData = {
  career: {
    type: 'timeline',
    items: [
      {
        title: 'Software Development Engineer II',
        company: 'Walmart Global Tech',
        period: 'July 2023 – Present',
        achievements: [
          'Automated Re-ingestion & Verification Workflow on GCP: Spearheaded the automation of a previously manual bulk data re-ingestion and validation process on Google Cloud Platform (GCP), cutting down operational overhead and reducing manual effort by over 75%, enabling near real-time data accuracy and scalability.',
          'Drag-and-Drop SQL Dashboard for Customer Support: Designed and implemented an intuitive drag-and-drop interface to simulate and run SQL queries on support datasets, empowering the customer support team to resolve issues autonomously and reducing On-Call\'s engineering load by 40%.',
          'Kafka Utility Library for Reusable Messaging Logic: Engineered a robust, reusable Kafka utility, ensuring consistent message publishing, retry handling, and error logging—resulting in reduced development time and improved operational observability across teams.',
          'Rate Limiting & Discard Logic for Internal APIs: Integrated dynamic rate-limiting and discard logic mechanisms for Kafka producers linked to critical internal APIs, mitigating broker overload during peak load conditions and reducing downstream data spikes by over 40%, ensuring system reliability and smooth consumer experience.'
        ],
        dirs: ['walmart']
      },
      {
        title: 'Software Development Winter Intern',
        company: 'Walmart Global Tech',
        period: 'January 2024 – June 2024',
        achievements: [
          'Designed and implemented a high-performance dashboard to monitor the complete lifecycle of returned orders, significantly enhancing visibility and operational efficiency, using Node, ReactJS, and GraphQL',
          'Widely adopted by associates as a go-to tool for tracking and managing returns.'
        ]
      },
      {
        title: 'Software Development Summer Intern',
        company: 'Walmart Global Tech',
        period: 'May 2023 – December 2023',
        achievements: [
          'Enhanced Walmart\'s Internal Platform tool by implementing a comprehensive system for managing dependency versions, secure identity key generation for CI/CD pipelines, and supervision of streamlined access and module governance.',
          'Architected a backend gateway filter in Java Spring, reinforcing security measures and ensuring strict authorization protocols for sensitive APIs.'
        ]
      },
      {
        title: 'Frontend Development Intern',
        company: 'Zeko, formerly Qricle',
        period: 'January 2023 – March 2023',
        achievements: [
          'Developed a high-end Web app and Admin\'s dashboard with NextJS and cutting-edge frameworks, while promoting SEO.',
          'Elevated user engagement with responsive design and seamless interfaces, driving customer satisfaction.'
        ]
      }
    ]
  },
  projects: {
    type: 'tree',
    items: [
      {
        name: 'Self-Hosted Cloud Streaming & Storage',
        period: 'July 2025',
        description: 'Built a secure, self-hosted Plex streaming and file storage platform, enabling encrypted cross-device access. Deployed modular services using Docker and open-source modules for scalability and simplified management. Implemented Cloudflare Argo Tunnels for zero-trust, remote connectivity without exposing network ports.',
        tech: ['Plex', 'Docker', 'Cloudflare Tunnels'],
        link: '#'
      },
      {
        name: 'Drone Development and Data Classification',
        period: 'July 2022 – February 2023',
        description: 'Managed and led a government-funded project with a multidisciplinary team for the Ministry of Science and Technology and the Research Team of IIITL. Spearheaded the design and hardware assembly of an affordable, open-source Quad-copter(Drone) for agricultural data analysis using Machine Learning with Web App integration. [Patent Pending]',
        tech: ['Machine Learning', 'IoT', 'Hardware', 'Web Development'],
        link: '#'
      }
    ]
  },
  education: {
    type: 'timeline',
    items: [
      {
        title: 'Bachelor of Technology in Information Technology',
        institution: 'Indian Institute of Information Technology, Lucknow (IIIT-L)',
        period: '2020 - 2024',
        cgpa: '8.6/10.0',
        coursework: [
          'Advanced Programming Languages',
          'Business Analytics',
          'Cloud Computing',
          'Computer Networks',
          'Data Structures',
          'Database Management System',
          'Design and Analysis of Algorithms',
          'Distributed Systems',
          'Object-Oriented Methodology',
          'Operating System',
          'Probability and Statistics',
          'Software Engineering',
          'System Management'
        ]
      }
    ]
  },
  contact: {
    type: 'form',
    info: {
      email: 'mathur.prerak@gmail.com',
      phone: '+91 967 261 4863',
      website: 'prerak.tech',
      github: 'PrerakMathur20'
    }
  }
};

export const achievements = [
  'Accepted as Contributor in Google Summer of Code 2022 with ScoreLabs',
  'CodeForces Specialist (Rating 1411) — CodeChef 4 Star — Ranked 7 in Codeforces Round 826',
  'Innovator Award at Hack-o-Fiesta 2022, IIIT-L Hackathon'
];

export const positions = [
  'Core Member - Google\'s Developer Student Club, IIIT-L (July 2022 - December 2023)',
  'Senior Member - FOSS Wing, Axios - Technical Society, IIIT-L (March 2022 - June 2024)',
  'Technical Team Lead - WCARL, Research Team, IIIT-L (September 2022 - June 2024)'
];

export const openSourceContributions = [
  'InternetArchive: Improved frontend and backend workflows, and discussed future community plans.',
  'AppWrite: Enhanced user experience by actively contributing to AppWrite\'s Base and Supporting Projects.',
  'CircuitVerse: Elevated end-user experience by addressing bugs & issues and enhancing the Main primary codebase.',
  'HacktoberFest 2022: Advanced from Contributor in 2021 to Maintainer for HacktoberFest in 2022. Oversaw, assessed, and upheld code excellence and functionality in the world\'s largest open-source event.'
];
