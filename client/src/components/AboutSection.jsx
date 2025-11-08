import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import ParticleBackground from './ParticleBackground';
import '../styles/about.css';

const MotionSection = motion.section;
const MotionDiv = motion.div;

const AboutSection = () => {
  return (
    <MotionSection id="about" className="about" initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <MotionDiv
        className="about__inner"
        variants={{
          hidden: { opacity: 0, y: 32 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
        }}
      >
        <div className="about__media" aria-hidden="true">
          <ParticleBackground />
        </div>
        <div className="about__copy">
          <h2>Empowering Youth to Build the Future</h2>
          <p>
            HanuBell is a student-led innovation collective transforming ideas into real-world impact through
            multidisciplinary collaboration. From AI to design, we empower young creators with mentorship, resources,
            and a thriving community to launch projects that matter.
          </p>
          <p>
            Join us to collaborate on cutting-edge solutions, level up your skills, and become part of a supportive
            team that celebrates creativity, technology, and social impact.
          </p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/hanubell/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="social-icon" />
              <span>@hanubell</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/hanu-bell-b97647381" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
              aria-label="Connect with us on LinkedIn"
            >
              <FaLinkedin className="social-icon" />
              <span>Hanu Bell</span>
            </a>
            <a 
              href="https://github.com/teamhanubell" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link github"
              aria-label="Check our GitHub"
            >
              <FaGithub className="social-icon" />
              <span>teamhanubell</span>
            </a>
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  )
}

export default AboutSection
