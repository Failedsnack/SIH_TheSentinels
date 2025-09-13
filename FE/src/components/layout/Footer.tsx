import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';

export default function Footer() {
  return (
    <motion.footer 
      className="bg-foreground text-background mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[120rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                <Image
                  src="https://static.wixstatic.com/media/08e0c6_604e4019c62a49b6a1be00eb019cbdb1~mv2.jpeg"
                  alt="NabhaSehatMitr Logo"
                  width={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
              <h3 className="font-heading text-xl font-bold">
                <span style={{ color: '#14213D' }}>Nabha</span>
                <span style={{ color: '#2CA02C' }}>Sehat</span>
                <span style={{ color: '#C62828' }}>Mitr</span>
              </h3>
              <p className="text-sm text-secondary font-paragraph">Your Health, Our Priority</p>
            </div>
            </div>
            <p className="font-paragraph text-secondary leading-relaxed">
              A comprehensive government health portal providing access to medical resources, 
              emergency services, and healthcare professionals across the region.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link to="/doctors" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300">
                Find Doctors
              </Link>
              <Link to="/pharmacies" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300">
                Nearby Pharmacies
              </Link>
              <Link to="/emergency" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300">
                Emergency Services
              </Link>
              <Link to="/reports" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300">
                Medical Reports
              </Link>

            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-soft-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-paragraph text-secondary">Amritanshu Aditya: 8797760111</p>
                  <p className="font-paragraph text-secondary">Dhruv Pratap Singh: 9513731600</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-soft-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="font-paragraph text-secondary">nabhasehatmitr@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-soft-gold mt-1 flex-shrink-0" />
                <p className="font-paragraph text-secondary">{"S.R.M UNIVERSITY -K.T.R Campus,Kattankulathur, Kanchipuram,Tamil Nadu- 603203"}</p>
              </div>
            </div>
          </div>

          {/* About & Social */}
          <div className="space-y-6">
            <h4 className="font-heading text-lg font-semibold">About</h4>
            <div className="space-y-3">
              <Link to="/about" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 block">
                About <span style={{ color: '#14213D' }}>Nabha</span><span style={{ color: '#2CA02C' }}>Sehat</span><span style={{ color: '#C62828' }}>Mitr</span>
              </Link>
              <Link to="/privacy" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 block">
                Privacy Policy
              </Link>
              <Link to="/terms" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 block">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 block">
                Accessibility
              </Link>
            </div>
            
            {/* Social Media */}
            <div className="space-y-3">
              <h5 className="font-paragraph text-sm font-semibold">Follow Us</h5>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="text-secondary hover:text-soft-gold transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-secondary hover:text-soft-gold transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-secondary hover:text-soft-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-secondary hover:text-soft-gold transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-paragraph text-secondary text-sm">
              © 2024 <span style={{ color: '#14213D' }}>Nabha</span><span style={{ color: '#2CA02C' }}>Sehat</span><span style={{ color: '#C62828' }}>Mitr</span>. All rights reserved. Government of India.
            </p>
            <div className="flex items-center space-x-6">
              <Link to="/sitemap" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 text-sm">
                Sitemap
              </Link>
              <Link to="/feedback" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 text-sm">
                Feedback
              </Link>
              <Link to="/help" className="font-paragraph text-secondary hover:text-soft-gold transition-colors duration-300 text-sm">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}