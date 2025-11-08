import { motion } from 'framer-motion'
import '../styles/team.css'

const teamMembers = [
  {
    name: 'Dev Tiwari',
    role: 'Founder & AIML Engineer',
    avatar: 'https://i.pravatar.cc/220?img=17',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
  {
    name: 'Sarthak Singhaniya',
    role: 'Chairman , Platform Architect & AIML Engineer',
    avatar: 'https://i.pravatar.cc/220?img=12',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/sarthaksinghaniya',
  },
  {
    name: 'Vishal Verma',
    role: 'CIO & Frontend Developer',
    avatar: 'https://i.pravatar.cc/220?img=3',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
  {
    name: 'Yashraj Srivastava',
    role: 'Director of Technology & Backend Developer',
    avatar: 'https://i.pravatar.cc/220?img=22',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
  {
    name: 'Shubhang Mishra',
    role: 'CTO & Full Stack Developer',
    avatar: 'https://i.pravatar.cc/220?img=13',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
  {
    name: 'Vaishnavi Choudhary',
    role: 'Executive Coordinator & Backend Developer',
    avatar: 'https://i.pravatar.cc/220?img=5',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
  {
    name: 'Tanishq Shukla',
    role: 'CFO & CMO',
    avatar: 'https://i.pravatar.cc/220?img=54',
    linkedin: 'https://www.linkedin.com/in/hanu-bell-b97647381',
    github: 'https://github.com/teamhanubell',
  },
]

const MotionSection = motion.section
const MotionArticle = motion.article

const TeamSection = () => {
  return (
    <MotionSection
      id="team"
      className="team"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-120px' }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <div className="team__header">
        <h2>Meet the Core</h2>
        <p>Creators, engineers, designers, and community builders shaping HanuBell.</p>
      </div>
      <div className="team__grid">
        {teamMembers.map((member) => (
          <MotionArticle
            key={member.name}
            className="team__card"
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
            }}
          >
            <div className="team__avatar">
              <img src={member.avatar} alt={member.name} />
            </div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="team__links">
              <a href={member.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={member.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </MotionArticle>
        ))}
      </div>
    </MotionSection>
  )
}

export default TeamSection
