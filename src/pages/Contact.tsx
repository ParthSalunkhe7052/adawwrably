import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background relative overflow-hidden">
      {/* Aesthetic background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16 mt-12">
          <h1 className="text-5xl md:text-7xl font-display uppercase tracking-wider mb-6 text-white text-shadow-sm">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground font-sans max-w-xl mx-auto">
            Fill out our form and we will contact you within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-display uppercase tracking-wider">Customer Service</h2>
              </div>
              <a href="mailto:contact@adawwrably.com" className="text-lg font-sans text-muted-foreground hover:text-primary transition-colors ml-16 block">
                contact@adawwrably.com
              </a>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border/50 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                  <MapPin className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-display uppercase tracking-wider">Operational Address</h2>
              </div>
              <p className="text-lg font-sans text-muted-foreground leading-relaxed ml-16">
                2ND FLOOR, F-202, FRIENDS TOWER,<br />
                OPP JAWALA HERI MARKET,<br />
                PASCHIM VIHAR, West Delhi, Delhi,<br />
                110063
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 md:p-10 rounded-2xl border border-border/50 shadow-xl relative">
            <h2 className="text-3xl font-display uppercase tracking-wider mb-8 border-b border-border/50 pb-4">
              Send a Message
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-sans uppercase tracking-wider text-muted-foreground mb-2" htmlFor="name">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. Uzumaki Naruto"
                />
              </div>
              
              <div>
                <label className="block text-sm font-sans uppercase tracking-wider text-muted-foreground mb-2" htmlFor="email">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="e.g. naruto@konoha.com"
                />
              </div>

              <div>
                <label className="block text-sm font-sans uppercase tracking-wider text-muted-foreground mb-2" htmlFor="message">
                  Message
                </label>
                <textarea 
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background border border-border/50 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                  placeholder="How can we help you today?"
                ></textarea>
              </div>

              <Button type="submit" size="lg" className="w-full h-14 text-lg font-sans uppercase tracking-widest cursor-pointer" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
