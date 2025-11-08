import { useState, useRef } from 'react';
import { 
  Upload, 
  Loader2, 
  GraduationCap, 
  User, 
  Code, 
  Briefcase, 
  CreditCard, 
  Send,
  MessageCircle,
  Link2 as LinkIcon,
  Github,
  Globe
} from 'lucide-react';
import './register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeName: '',
    degree: '',
    yearOfStudy: '',
    course: '',
    linkedin: '',
    github: '',
    portfolio: '',
    codingSkills: '',
    cocurricularSkills: '',
    preferredDomain: '',
    otherDomain: '',
    experience: '',
    paymentProof: null,
    agreeToTerms: false
  });

  const requiredFields = [
    'fullName', 'email', 'phone', 'collegeName',
    'degree', 'yearOfStudy', 'course', 'linkedin',
    'codingSkills', 'cocurricularSkills', 'preferredDomain',
    'paymentProof'
  ];

  const domains = [
    'AI/ML', 'Robotics', 'Database & Analysis',
    'Full Stack Development', 'Frontend',
    'Designing', 'Media', 'Others'
  ];

  
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({
        ...prev,
        paymentProof: 'File size should be less than 5MB'
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      paymentProof: file
    }));
    
    // Clear any previous error
    setErrors(prev => ({
      ...prev,
      paymentProof: ''
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check all required fields
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = `${
          field === 'paymentProof' ? 'Payment proof' : 
          field === 'fullName' ? 'Full name' : 
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });
    
    // Additional validations
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (formData.phone && !/^\+?[0-9\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      const firstError = Object.keys(errors).find(key => errors[key]);
      if (firstError) {
        const element = document.getElementById(firstError);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields with correct field names expected by the backend
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('collegeName', formData.collegeName);
      formDataToSend.append('degree', formData.degree);
      formDataToSend.append('yearOfStudy', formData.yearOfStudy);
      formDataToSend.append('course', formData.course);
      formDataToSend.append('linkedin', formData.linkedin);
      formDataToSend.append('github', formData.github || '');
      formDataToSend.append('portfolio', formData.portfolio || '');
      formDataToSend.append('codingSkills', formData.codingSkills);
      formDataToSend.append('cocurricularSkills', formData.cocurricularSkills);
      formDataToSend.append('preferredDomain', formData.preferredDomain);
      formDataToSend.append('otherDomain', formData.otherDomain || '');
      formDataToSend.append('experience', formData.experience || '');
      
      // Add payment proof file if exists
      if (formData.paymentProof) {
        formDataToSend.append('paymentScreenshot', formData.paymentProof);
      }
      
      // Add terms agreement (convert boolean to string 'true'/'false')
      formDataToSend.append('terms', formData.agreeToTerms.toString());
      
      // Log form data for debugging (excluding files)
      const formDataObj = {};
      formDataToSend.forEach((value, key) => {
        formDataObj[key] = value instanceof File ? `${value.name} (${value.type})` : value;
      });
      console.log('Submitting form data:', formDataObj);
      
      console.log('Sending request to server...');
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        body: formDataToSend,
        // Don't set Content-Type header, let the browser set it with the correct boundary
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Redirect to success page with email
      window.location.href = `/success?email=${encodeURIComponent(formData.email)}`;
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (error.message.includes('already registered')) {
        errorMessage = 'This email is already registered.';
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered.'
        }));
      } else if (error.message.includes('payment')) {
        errorMessage = 'Please upload a valid payment screenshot.';
        setErrors(prev => ({
          ...prev,
          paymentProof: 'Please upload a valid payment screenshot.'
        }));
      } else if (error.message) {
        // Show the actual error message from the server
        errorMessage = error.message;
      }
      
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
      
      // Scroll to show error message
      setTimeout(() => {
        const errorElement = document.querySelector('.form-error') || 
                           document.querySelector('[class*="error"]');
        if (errorElement) {
          errorElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
        }
      }, 100);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register">
      <div className="register__container">
        <div className="register__card">
          <div className="register__header">
            <h1>🚀 HanuBell Recruitment</h1>
            <p>Join our community of innovators and creators</p>
          </div>
          
          <form onSubmit={handleSubmit} className="register__form">
            {errors.submit && (
              <div className="form-error">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.submit}
              </div>
            )}
            
            {/* Basic Details Section */}
            <div className="form-section">
              <h2><User size={20} className="section-icon" /> Basic Details</h2>
              
              <div className="form-group">
                <label htmlFor="fullName" className={!formData.fullName && errors.fullName ? 'required' : ''}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="Enter your full name"
                  aria-required="true"
                />
                {errors.fullName && (
                  <span className="error-message">{errors.fullName}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className={!formData.email && errors.email ? 'required' : ''}>
                  Email <span className="text-muted">(Gmail preferred)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="your.email@example.com"
                  aria-required="true"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className={!formData.phone && errors.phone ? 'required' : ''}>
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  placeholder="+91 12345 67890"
                  aria-required="true"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="linkedin" className={!formData.linkedin && errors.linkedin ? 'required' : ''}>
                  LinkedIn Profile
                </label>
                <div className="input-with-icon">
                  <LinkIcon size={18} className="input-icon" />
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`}
                    placeholder="https://linkedin.com/in/your-profile"
                    aria-required="true"
                  />
                </div>
                {errors.linkedin && (
                  <span className="error-message">{errors.linkedin}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="github">
                  GitHub Profile <span className="text-muted">(Optional)</span>
                </label>
                <div className="input-with-icon">
                  <Github size={18} className="input-icon" />
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://github.com/your-username"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="portfolio">
                  Portfolio/Website <span className="text-muted">(Optional)</span>
                </label>
                <div className="input-with-icon">
                  <Globe size={18} className="input-icon" />
                  <input
                    type="url"
                    id="portfolio"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>
            
            {/* Education Details Section */}
            <div className="form-section">
              <h2><GraduationCap size={20} className="section-icon" /> Education Details</h2>
              
              <div className="form-group">
                <label htmlFor="collegeName" className={!formData.collegeName && errors.collegeName ? 'required' : ''}>
                  College Name
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  className={`form-control ${errors.collegeName ? 'is-invalid' : ''}`}
                  placeholder="e.g., BBDU"
                  aria-required="true"
                />
                {errors.collegeName && (
                  <span className="error-message">{errors.collegeName}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="degree" className={!formData.degree && errors.degree ? 'required' : ''}>
                  Degree & Specialization
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className={`form-control ${errors.degree ? 'is-invalid' : ''}`}
                  placeholder="e.g., B.Tech CSE AI"
                  aria-required="true"
                />
                {errors.degree && (
                  <span className="error-message">{errors.degree}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="yearOfStudy" className={!formData.yearOfStudy && errors.yearOfStudy ? 'required' : ''}>
                  Year of Study
                </label>
                <select
                  id="yearOfStudy"
                  name="yearOfStudy"
                  value={formData.yearOfStudy}
                  onChange={handleChange}
                  className={`form-control ${errors.yearOfStudy ? 'is-invalid' : ''}`}
                  aria-required="true"
                >
                  <option value="">Select year of study</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                {errors.yearOfStudy && (
                  <span className="error-message">{errors.yearOfStudy}</span>
                )}
              </div>
            </div>
            
            {/* Skillset Section */}
            <div className="form-section">
              <h2><Code size={20} className="section-icon" /> Skillset</h2>
              
              <div className="form-group">
                <label htmlFor="codingSkills" className={!formData.codingSkills && errors.codingSkills ? 'required' : ''}>
                  Coding & Technical Skills
                </label>
                <textarea
                  id="codingSkills"
                  name="codingSkills"
                  value={formData.codingSkills}
                  onChange={handleChange}
                  className={`form-control ${errors.codingSkills ? 'is-invalid' : ''}`}
                  placeholder="List your programming languages, frameworks, and technical skills (e.g., Python, JavaScript, React, etc.)"
                  rows="3"
                  aria-required="true"
                />
                {errors.codingSkills && (
                  <span className="error-message">{errors.codingSkills}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="cocurricularSkills" className={!formData.cocurricularSkills && errors.cocurricularSkills ? 'required' : ''}>
                  Co-curricular Skills
                </label>
                <textarea
                  id="cocurricularSkills"
                  name="cocurricularSkills"
                  value={formData.cocurricularSkills}
                  onChange={handleChange}
                  className={`form-control ${errors.cocurricularSkills ? 'is-invalid' : ''}`}
                  placeholder="List your co-curricular skills (e.g., Leadership, Design, Management, etc.)"
                  rows="3"
                  aria-required="true"
                />
                {errors.cocurricularSkills && (
                  <span className="error-message">{errors.cocurricularSkills}</span>
                )}
              </div>
            </div>
            
            {/* Preferred Domain Section */}
            <div className="form-section">
              <h2><Briefcase size={20} className="section-icon" /> Preferred Domain</h2>
              
              <div className="form-group">
                <label htmlFor="preferredDomain" className={!formData.preferredDomain && errors.preferredDomain ? 'required' : ''}>
                  Select Your Preferred Domain
                </label>
                <select
                  id="preferredDomain"
                  name="preferredDomain"
                  value={formData.preferredDomain}
                  onChange={handleChange}
                  className={`form-control ${errors.preferredDomain ? 'is-invalid' : ''}`}
                  aria-required="true"
                >
                  <option value="">-- Select a domain --</option>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
                {errors.preferredDomain && (
                  <span className="error-message">{errors.preferredDomain}</span>
                )}
                
                {formData.preferredDomain === 'Others' && (
                  <div className="form-group" style={{ marginTop: '16px' }}>
                    <label htmlFor="otherDomain">
                      Please specify
                    </label>
                    <input
                      type="text"
                      id="otherDomain"
                      name="otherDomain"
                      value={formData.otherDomain}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter your preferred domain"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Payment Section */}
            <div className="form-section">
              <h2><CreditCard size={20} className="section-icon" /> Payment</h2>
              
              <div className="payment-info">
                <div className="payment-amount">
                  <span className="amount">₹115</span>
                  <span className="label">Registration Fee</span>
                </div>
                <div className="payment-details">
                  <p><strong>UPI ID:</strong> 6387860126@apl</p>
                  <p className="note">Please include your name in the payment note</p>
                </div>
              </div>
              
              <div className="form-group">
                <label className={!formData.paymentProof && errors.paymentProof ? 'required' : ''}>
                  Upload Payment Screenshot
                </label>
                <p className="hint">Upload a clear screenshot of your payment (JPG, PNG, or PDF, max 5MB)</p>
                
                <div className="file-upload">
                  <input
                    type="file"
                    id="paymentProof"
                    name="paymentProof"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="file-upload__input"
                    aria-required="true"
                  />
                  <label htmlFor="paymentProof" className="file-upload__label">
                    <Upload size={16} />
                    <span>Choose File</span>
                  </label>
                  
                  {formData.paymentProof && (
                    <div className="file-info">
                      <span>{formData.paymentProof.name}</span>
                      <span className="file-size">
                        {(formData.paymentProof.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  )}
                </div>
                
                {errors.paymentProof && (
                  <span className="error-message">{errors.paymentProof}</span>
                )}
              </div>
            </div>
            
            {/* Terms and Conditions */}
            <div className="form-group terms">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="checkbox-input"
                  aria-required="true"
                />
                <span className="checkmark"></span>
                <span className="label-text">
                  I agree to the <a href="#terms-modal" className="link" onClick={(e) => { e.preventDefault(); document.getElementById('terms-modal').showModal(); }}>Terms of Service</a> and 
                  <a href="#privacy-modal" className="link" onClick={(e) => { e.preventDefault(); document.getElementById('privacy-modal').showModal(); }}> Privacy Policy</a>
                </span>
              </label>
              {errors.terms && (
                <span className="error-message">{errors.terms}</span>
              )}
            </div>
            
            {/* Submit Button */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="spinner" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Footer */}
          <div className="form-footer">
            <p> 2026 HanuBell. All rights reserved.</p>
            <div className="links">
              <a href="#privacy-modal" className="link" onClick={(e) => { e.preventDefault(); document.getElementById('privacy-modal').showModal(); }}>Privacy Policy</a>
              <span className="divider">•</span>
              <a href="#terms-modal" className="link" onClick={(e) => { e.preventDefault(); document.getElementById('terms-modal').showModal(); }}>Terms of Service</a>
              <span className="divider">•</span>
              <a href="tel:6387860126" className="link">Call Us: +91 63878 60126</a>
            </div>
          </div>

          {/* Terms of Service Modal */}
          <dialog id="terms-modal" className="modal">
            <div className="modal-content">
              <h3>Terms of Service</h3>
              <div className="modal-body">
                <h4>1. Acceptance of Terms</h4>
                <p>By registering for HANUbell, you agree to be bound by these Terms of Service.</p>
                
                <h4>2. Registration</h4>
                <p>You must provide accurate and complete information during registration.</p>
                
                <h4>3. Code of Conduct</h4>
                <p>All participants must adhere to our community guidelines and respect others.</p>
                
                <h4>4. Intellectual Property</h4>
                <p>All content and materials provided remain the property of HANUbell.</p>
                
                <h4>5. Limitation of Liability</h4>
                <p>HanuBell is not responsible for any loss or damage arising from participation.</p>
              </div>
              <div className="modal-actions">
                <button onClick={() => document.getElementById('terms-modal').close()} className="btn">Close</button>
              </div>
            </div>
          </dialog>

          {/* Privacy Policy Modal */}
          <dialog id="privacy-modal" className="modal">
            <div className="modal-content">
              <h3>Privacy Policy</h3>
              <div className="modal-body">
                <h4>1. Information We Collect</h4>
                <p>We collect personal information including name, email, contact details, and educational background.</p>
                
                <h4>2. How We Use Your Information</h4>
                <p>Your information is used for registration, communication, and improving our services.</p>
                
                <h4>3. Data Protection</h4>
                <p>We implement appropriate security measures to protect your personal information.</p>
                
                <h4>4. Third-Party Services</h4>
                <p>We may use third-party services that have their own privacy policies.</p>
                
                <h4>5. Contact Us</h4>
                <p>For any privacy-related concerns, contact us at <a href="mailto:teamhanubell@gmail.com">teamhanubell@gmail.com</a> or call +91 63878 60126</p>
              </div>
              <div className="modal-actions">
                <button onClick={() => document.getElementById('privacy-modal').close()} className="btn">Close</button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </section>
  );
};

export default Register;
