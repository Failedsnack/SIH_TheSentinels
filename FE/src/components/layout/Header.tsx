import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useMember } from '@/integrations';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const { member, isAuthenticated, actions } = useMember();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Pharmacies', href: '/pharmacies' },
    { label: 'Emergency', href: '/emergency' },
    { label: 'Reports', href: '/reports' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleEmergency = () => {
    navigate('/emergency');
    setIsMenuOpen(false);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    // TODO: Implement i18n language switching
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header 
      className="bg-background border-b border-light-grey sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-[120rem] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Login/Emergency */}
          <div className="flex items-center space-x-4">
            {/* Login/Profile Button */}
            {isAuthenticated ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/profile')}
                className="hidden sm:flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span className="font-paragraph">
                  {member?.profile?.nickname || 'Profile'}
                </span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="hidden sm:flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span className="font-paragraph">Login / Sign up</span>
              </Button>
            )}

            <Button
              onClick={handleEmergency}
              variant="ghost"
              size="sm"
              className="hidden sm:flex items-center space-x-2 px-3 h-8 text-[#C62828] hover:bg-[#C62828]/10"
            >
              <div className="w-7 h-7">
                <Image
                  src="https://static.wixstatic.com/media/08e0c6_db220d55d54a4811856272edb67265d5~mv2.jpg"
                  alt="Emergency Siren"
                  width={28}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-paragraph text-sm font-medium">Emergency</span>
            </Button>
          {/* Emergency Icon */}
            </div>

          {/* Center - Logo and Text Block */}
          {!isHomepage && (
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src="https://static.wixstatic.com/media/08e0c6_604e4019c62a49b6a1be00eb019cbdb1~mv2.jpeg"
                  alt="NABHASEHATMITR Logo"
                  width={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="font-heading text-xl font-bold">
                <span style={{ color: '#14213D' }}>Nabha</span>
                <span style={{ color: '#2CA02C' }}>Sehat</span>
                <span style={{ color: '#C62828' }}>Mitr</span>
              </h1>
            </Link>
          )}

          {/* Right Side - Language and Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-32">
                <Globe className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="pa">ਪੰਜਾਬੀ</SelectItem>
              </SelectContent>
            </Select>

            {/* Burger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="relative w-10 h-10 p-0"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-light-grey mt-4"
            >
              <nav className="py-4 space-y-4">
                {/* Mobile Login/Emergency Buttons */}
                <div className="sm:hidden space-y-3">
                  {isAuthenticated ? (
                    <Link
                      to="/profile"
                      className="block font-paragraph text-lg text-foreground hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left font-paragraph text-lg text-foreground hover:text-primary transition-colors duration-300 py-2"
                    >
                      Login / Sign up
                    </button>
                  )}
                  
                  <Button
                    onClick={handleEmergency}
                    variant="destructive"
                    className="w-full flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="font-paragraph">Emergency</span>
                  </Button>
                </div>

                {/* Navigation Items */}
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block font-paragraph text-lg text-foreground hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* User Actions for Mobile */}
                {isAuthenticated && (
                  <div className="pt-4 border-t border-light-grey space-y-3">
                    <Link
                      to="/dashboard"
                      className="block font-paragraph text-lg text-foreground hover:text-primary transition-colors duration-300 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        actions.logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left font-paragraph text-lg text-foreground hover:text-primary transition-colors duration-300 py-2"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Indian Flag Strip */}
      <div className="w-full h-1 bg-gradient-to-r from-orange-400 via-white to-green-600"></div>
    </motion.header>
  );
}