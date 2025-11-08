import { Link } from 'react-router-dom';
import { CheckCircle, MessageCircle, Mail, Clock, Home } from 'lucide-react';
import '../styles/success.css';

const Success = () => {
  // Get email from URL query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get('email') || 'your email';

  const whatsappLink = 'https://chat.whatsapp.com/FtYWQsRkt2v5yBd6a5Oxw0';
  const emailLink = `mailto:teamhanubell@gmail.com?subject=Query about my application`;

  return (
    <section className="success">
      <div className="success__card">
        <div className="success__header">
          <div className="success__icon">
            <CheckCircle size={64} />
          </div>
          <h1>Application Submitted Successfully!</h1>
          <p className="success__subtitle">
            Thank you for applying to HanuBell. We're excited to have you on board!
          </p>
        </div>

        <div className="success__content">
          <div className="success__step">
            <div className="step__icon">
              <Mail size={24} />
            </div>
            <div className="step__content">
              <h3>Check Your Email</h3>
              <p>We've sent a confirmation email to <strong>{email}</strong> with your application details.</p>
            </div>
          </div>

          <div className="success__step">
            <div className="step__icon">
              <MessageCircle size={24} />
            </div>
            <div className="step__content">
              <h3>Join Our Community</h3>
              <p>Connect with fellow applicants and stay updated by joining our WhatsApp group.</p>
              <a href={whatsappLink} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                <span>Join WhatsApp Group</span>
              </a>
            </div>
          </div>

          <div className="success__step">
            <div className="step__icon">
              <Clock size={24} />
            </div>
            <div className="step__content">
              <h3>What's Next?</h3>
              <ul className="next-steps">
                <li>Our team will review your application within 3-5 business days</li>
                <li>Shortlisted candidates will be contacted for the next steps</li>
                <li>For any queries, email us at <a href={emailLink}>teamhanubell@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="success__footer">
          <Link to="/" className="home-button">
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Success
