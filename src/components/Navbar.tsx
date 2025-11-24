import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session, signOut } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-2xl">🌾</span>
            </div>
            <span className="text-xl font-bold text-foreground">CropAI</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">Home</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">Features</a>
            <a href="#benefits" className="text-foreground hover:text-primary transition-colors font-medium">Benefits</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors font-medium">How It Works</a>
            <LanguageSwitcher compact />
            <Button variant="default" className="shadow-lg" onClick={() => (window.location.href = '/crop-suggestion')}>
              Try Crop Suggestion
            </Button>
            {session ? (
              <Button variant="outline" onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button variant="secondary" onClick={() => (window.location.href = '/auth')}>Login</Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a href="/" className="block text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#features" className="block text-foreground hover:text-primary transition-colors font-medium">
              Features
            </a>
            <a href="#benefits" className="block text-foreground hover:text-primary transition-colors font-medium">
              Benefits
            </a>
            <a href="#how-it-works" className="block text-foreground hover:text-primary transition-colors font-medium">
              How It Works
            </a>
            <Button variant="default" className="w-full shadow-lg" onClick={() => window.location.href = '/crop-suggestion'}>
              Try Crop Suggestion
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
