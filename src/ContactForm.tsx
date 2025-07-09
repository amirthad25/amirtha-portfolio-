import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactForm.css';

const ContactForm = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState({
        submitting: false,
        submitted: false,
        error: false
    });

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setStatus({ submitting: true, submitted: false, error: false });

        try {
            const result = await emailjs.sendForm(
                'service_pdbq6us',
                'template_7ys3wmj',
                form.current,
                'v1OM16M9JXUDxSAzT'
            );

            console.log('Success:', result.text);
            setStatus({ submitting: false, submitted: true, error: false });
            form.current.reset();
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, submitted: false }));
            }, 5000);
        } catch (error) {
            console.error('Error:', error);
            setStatus({ submitting: false, submitted: false, error: true });
            
            setTimeout(() => {
                setStatus(prev => ({ ...prev, error: false }));
            }, 5000);
        }
    };

    return (
        <div className="contact-form-container">
            <form ref={form} onSubmit={sendEmail} className="contact-form" noValidate>
                <div className="form-group">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>E-Mail</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label>Message</label>
                    <textarea 
                        name="message" 
                        placeholder="Your Message" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={status.submitting}
                    className={`submit-btn ${status.submitting ? 'submitting' : ''} ${status.submitted ? 'success' : ''} ${status.error ? 'error' : ''}`}
                >
                    {status.submitting ? 'Sending...' : 
                     status.submitted ? 'Message Sent!' : 
                     status.error ? 'Failed to Send' : 
                     'Send Message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm; 