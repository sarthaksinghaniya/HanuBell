import { Link } from 'react-router-dom'
import '../styles/apply.css'

const ApplySection = () => {
  return (
    <section id="apply" className="apply">
      <div className="apply__inner">
        <p className="apply__eyebrow">Ready to Begin?</p>
        <h2>Take the First Step into the HanuBell Experience</h2>
        <p>
          Show us your passion, skills, and drive. Complete your application, submit the payment proof, and join the
          exclusive WhatsApp interview group instantly.
        </p>
        <div className="apply__actions">
          <Link to="/register" className="apply__primary">
            Start Application
          </Link>
          <a
            href="https://chat.whatsapp.com/FtYWQsRkt2v5yBd6a5Oxw0"
            target="_blank"
            rel="noreferrer"
            className="apply__secondary"
          >
            WhatsApp Interview Group
          </a>
        </div>
      </div>
    </section>
  )
}

export default ApplySection
