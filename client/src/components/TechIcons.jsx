import { FaPython, FaReact, FaGithub, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiRedux, SiTailwindcss, SiNextdotjs, SiExpress, SiMongodb, SiMysql } from 'react-icons/si';

const TechIcons = () => {
  const icons = [
    // Backend
    { icon: <FaNodeJs className="tech-icon" />, name: 'Node.js' },
    { icon: <SiMongodb className="tech-icon" />, name: 'MongoDB' },
    { icon: <SiExpress className="tech-icon" />, name: 'Express' },
    { icon: <SiMysql className="tech-icon" />, name: 'MySQL' },
    
    // Frontend
    { icon: <SiTypescript className="tech-icon" />, name: 'TypeScript' },
    { icon: <SiRedux className="tech-icon" />, name: 'Redux' },
    { icon: <SiTailwindcss className="tech-icon" />, name: 'Tailwind CSS' },
    { icon: <SiNextdotjs className="tech-icon" />, name: 'Next.js' },
    
    // Dev Tools
    { icon: <FaGithub className="tech-icon" />, name: 'Git' },
    { icon: <FaDocker className="tech-icon" />, name: 'Docker' },
    
    // Additional technologies
    { icon: <FaPython className="tech-icon" />, name: 'Python' },
    { icon: <FaReact className="tech-icon" />, name: 'React' },
    { icon: <FaJs className="tech-icon" />, name: 'JavaScript' },
    { icon: <FaHtml5 className="tech-icon" />, name: 'HTML5' },
    { icon: <FaCss3Alt className="tech-icon" />, name: 'CSS3' },
  ];

  return (
    <div className="tech-icons-container">
      {icons.map((tech, index) => (
        <div 
          key={tech.name} 
          className="tech-icon-wrapper"
          style={{
            '--delay': `${index * 0.5}s`,
            '--x-start': `${Math.random() * 80 + 10}%`,
            '--y-start': `${Math.random() * 80 + 10}%`,
          }}
          aria-label={tech.name}
        >
          {tech.icon}
        </div>
      ))}
    </div>
  );
};

export default TechIcons;
