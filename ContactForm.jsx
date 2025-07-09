import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
    const form = useRef();
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: false
    });

    const sendEmail = async (e) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus({ submitting: true, submitted: false, error: false });

        try {
            const result = await emailjs.sendForm(
                'service_pdbq6us',
                'template_9q1umvg',
                form.current,
                'v1OM16M9JXUDxSAzT'
            );

            console.log('Success:', result.text);
            setStatus({ submitting: false, submitted: true, error: false });
            alert('Message sent successfully! ✅');
            form.current.reset();
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, submitted: false }));
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setStatus({ submitting: false, submitted: false, error: true });
            alert('Failed to send message. Please try again. ❌');
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, error: false }));
            }, 5000);
        }
    };

    const getButtonText = () => {
        if (status.submitting) return '📨 Sending...';
        if (status.submitted) return '✅ Sent!';
        if (status.error) return '❌ Error';
        return '📧 Send Message';
    };

    return (
        <div className="contact-form-container">
            <h2>📧 Contact Me</h2>
            <form ref={form} onSubmit={sendEmail} noValidate>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="user_name" 
                        placeholder="Your Name" 
                        required 
                        aria-label="Your Name"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="user_email" 
                        placeholder="Your Email" 
                        required 
                        aria-label="Your Email"
                    />
                </div>
                <div className="form-group">
                    <textarea 
                        name="message" 
                        placeholder="Your Message" 
                        required 
                        aria-label="Your Message"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={status.submitting}
                    className={`submit-btn ${status.submitting ? 'submitting' : ''} ${status.submitted ? 'success' : ''} ${status.error ? 'error' : ''}`}
                >
                    {getButtonText()}
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 