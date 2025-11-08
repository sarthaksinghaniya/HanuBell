import { motion } from 'framer-motion'
import '../styles/hero.css'

const MotionSection = motion.section
const MotionDiv = motion.div

const Hero = () => {
  return (
    <MotionSection id="hero" className="hero">
      <MotionDiv
        className="hero__content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <p className="hero__eyebrow">HanuBell Recruitment 2025</p>
        <h1>Join the Revolution of Youth-Led Innovation</h1>
        <p className="hero__subtitle">
          Be part of HanuBell — where technology meets creativity.
        </p>
        <div className="hero__actions">
          <a href="#apply" className="hero__primary">
            Get Connected
          </a>
          <a
            href="https://chat.whatsapp.com/FtYWQsRkt2v5yBd6a5Oxw0"
            target="_blank"
            rel="noreferrer"
            className="hero__secondary"
          >
            Join WhatsApp Group
          </a>
        </div>
      </MotionDiv>
      <MotionDiv
        className="hero__glow"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
      />
    </MotionSection>
  )
}

export default Hero
