import { Github, Instagram, Linkedin, MessageCircle } from 'lucide-react'
import '../styles/footer.css'

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/hanu-bell-b97647381' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/teamhanubell' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/hanubell/' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://chat.whatsapp.com/FtYWQsRkt2v5yBd6a5Oxw0' },
]

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__branding">
          <p>© 2026 Team HanuBell. cherishing future youth talents.</p>
        </div>
        <div className="footer__socials">
          {socials.map(({ icon, label, href }) => {
            const IconComponent = icon
            return (
              <a key={label} className="footer__social" href={href} target="_blank" rel="noreferrer">
                <IconComponent size={20} />
                <span>{label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
