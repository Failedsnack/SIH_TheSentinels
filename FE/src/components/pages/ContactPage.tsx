import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Navigation, Send, Clock, MessageSquare, User, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // TODO: Implement actual contact form submission
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: [
        'Amritanshu Aditya: 8797760111',
        'Dhruv Pratap Singh: 9513731600',
        'Available 24/7'
      ],
      color: 'bg-primary'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: [
        'nabhasehatmitr@gmail.com',
        'Response within 24 hours'
      ],
      color: 'bg-soft-gold'
    },
    {
      icon: Navigation,
      title: 'Office Address',
      details: [
        'S.R.M UNIVERSITY -K.T.R Campus',
        'Kattankulathur, Kanchipuram',
        'Tamil Nadu- 603203'
      ],
      color: 'bg-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-[120rem] mx-auto px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-5xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="font-paragraph text-lg text-secondary max-w-3xl mx-auto">
            Get in touch with our support team. We're here to help you with any questions, 
            feedback, or technical assistance you may need.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="border-light-grey">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-bold text-foreground flex items-center">
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <motion.div 
                    className="text-center py-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="font-paragraph text-secondary mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => setSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5" />
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Category
                      </label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="complaint">Complaint</SelectItem>
                          <SelectItem value="suggestion">Suggestion</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-paragraph text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        placeholder="Please describe your inquiry or feedback in detail..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        rows={5}
                        className="resize-none"
                        required
                      />
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="font-paragraph text-sm text-red-700">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit"
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
              Get in Touch
            </h2>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className="border-light-grey hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${info.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                          {info.title}
                        </h3>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="font-paragraph text-sm text-secondary">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-light-grey">
                <CardHeader>
                  <CardTitle className="font-heading text-lg font-semibold text-foreground">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-paragraph font-semibold text-foreground mb-1">
                      How do I book an appointment?
                    </h4>
                    <p className="font-paragraph text-sm text-secondary">
                      Visit our "Find Doctors" page, select a doctor, and click "Book Appointment" to schedule your visit.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-paragraph font-semibold text-foreground mb-1">
                      How can I access my medical reports?
                    </h4>
                    <p className="font-paragraph text-sm text-secondary">
                      Sign in to your account and visit the "Reports" section to view and download your medical documents.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-paragraph font-semibold text-foreground mb-1">
                      Is my personal information secure?
                    </h4>
                    <p className="font-paragraph text-sm text-secondary">
                      Yes, we follow strict security protocols and comply with healthcare data protection standards.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Support */}
        <motion.div 
          className="mt-12 bg-light-grey/30 rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center">
            <Building className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
              Additional Support Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Technical Support
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  For technical issues with the platform, app functionality, or account access problems.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Medical Inquiries
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  For questions about medical services, doctor availability, or health-related information.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  Feedback & Suggestions
                </h3>
                <p className="font-paragraph text-sm text-secondary">
                  Share your experience and help us improve our services for better healthcare delivery.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}