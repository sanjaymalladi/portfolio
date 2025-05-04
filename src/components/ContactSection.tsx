import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

// Replace this with your actual SheetDB API endpoint
const SHEET_DB_API = 'https://sheetdb.io/api/v1/q5h2m18eheeb4';

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    "Phone Number": '',
    Message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(SHEET_DB_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [formData]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      setFormData({
        Name: '',
        Email: '',
        "Phone Number": '',
        Message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container">
        <h2 className="heading mb-4 text-center">Get In Touch</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to discuss AI solutions? Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card className="bg-secondary/30 border border-neon-purple/20 h-full">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="Name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <Input
                    id="Name"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="Email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    id="Email"
                    name="Email"
                    type="email"
                    value={formData.Email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className="bg-background border-border"
                  />
                </div>

                <div>
                  <label htmlFor="Phone Number" className="block text-sm font-medium mb-1">
                    Phone Number (Optional)
                  </label>
                  <Input
                    id="Phone Number"
                    name="Phone Number"
                    type="tel"
                    value={formData["Phone Number"]}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    className="bg-background border-border"
                  />
                </div>
                
                <div>
                  <label htmlFor="Message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <Textarea
                    id="Message"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry"
                    required
                    className="min-h-[150px] bg-background border-border"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-neon-purple hover:bg-neon-purple/80"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card className="bg-secondary/30 border border-neon-blue/20 hover:border-neon-blue/50 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-neon-blue">Connect With Me</h4>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">📧</div>
                    <div className="ml-3">
                      <h5 className="font-medium">Email</h5>
                      <p className="text-sm text-muted-foreground">malladisanjay29@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">🔗</div>
                    <div className="ml-3">
                      <h5 className="font-medium">LinkedIn</h5>
                      <p className="text-sm text-muted-foreground">linkedin.com/in/sanjaymalladi</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">📱</div>
                    <div className="ml-3">
                      <h5 className="font-medium">Phone</h5>
                      <p className="text-sm text-muted-foreground">+91 9642371883</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-neon-blue/20 flex items-center justify-center">📍</div>
                    <div className="ml-3">
                      <h5 className="font-medium">Location</h5>
                      <p className="text-sm text-muted-foreground">Tadepalligudem, Andhra Pradesh</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/30 border border-neon-pink/20 hover:border-neon-pink/50 transition-all duration-300">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-neon-pink">Research & Publications</h4>
                <p className="text-muted-foreground mb-4">
                  Published a book chapter on "Nanocomposites/Nanomaterials and the Risk Management of Biofuels Production" 
                  in Nanomaterials as a Catalyst for Biofuel Production, Springer Nature, 2025.
                </p>
                <Button className="w-full bg-neon-pink hover:bg-neon-pink/80">
                  <a href="https://link.springer.com/chapter/10.1007/978-981-96-1706-7_7" target="_blank" rel="noopener noreferrer">View Publication</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
