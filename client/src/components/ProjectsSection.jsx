import { hover, motion } from 'framer-motion'
import '../styles/projects.css'

const projects = [
  {
    name: 'ReVibe-Lab',
    description: 'Turning e-waste into innovation with sustainable prototyping.',
    links: [
      { label: 'View Project', href: 'http://reviber.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/sarthaksinghaniya' },
    ],
  },
  {
    name: 'Hanu Planner',
    description: 'Smart Time Table manager designed for students and Teacher.',
    links: [
      { label: 'View Project', href: 'http://hanu-planner.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/teamhanubell' },
    ],
  },
  {
    name: 'Hanu Youth',
    description: 'Collaborate, connect, and co-create with the youth community.',
    links: [
      { label: 'View Project', href: 'https://68b572cc01f02e00082d1c34--hanuyouthapp.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/sarthaksinghaniya' },
    ],
  },
  {
    name: 'HanuBell Official',
    description: 'The official website of HanuBell, showcasing our mission and projects',
    links: [
      { label: 'View Project', href: 'https://teamhanu.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/teamhanubell' },
    ],
  },
  
]

const MotionSection = motion.section
const MotionArticle = motion.article

const ProjectsSection = () => {
  return (
    <MotionSection
      id="projects"
      className="projects"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
    >
      <div className="projects__header">
        <h2>Our Innovations</h2>
        <p>Project stories that showcase the power of student-led creativity.</p>
      </div>
      <div className="projects__grid">
        {projects.map((project) => (
          <MotionArticle
            key={project.name}
            className="projects__card"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
            }}
          >
            <div className="projects__badge" />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="projects__actions">
              {project.links.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          </MotionArticle>
        ))}
      </div>
    </MotionSection>
  )
}

export default ProjectsSection
