import { Facebook, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-red-300 text-foreground py-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3 items-center">
        {/* Logo / Name */}
        <div className="text-2xl font-bold">
          NoteSummarize<span className="font-light">AI</span>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm font-medium">
          <Link href="#features" className="hover:underline">
            Features
          </Link>
          <Link href="#pricing" className="hover:underline">
            Pricing
          </Link>
          <Link href="#faq" className="hover:underline">
            FAQ
          </Link>
          <Link href="#contact" className="hover:underline">
            Contact
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end gap-4">
          <Link href="#" aria-label="Facebook">
            <Facebook className="w-5 h-5 hover:text-foreground/80" />
          </Link>
          <Link href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5 hover:text-foreground/80" />
          </Link>
          <Link href="#" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-foreground/80" />
          </Link>
        </div>
      </div>

      <div className="text-center text-xs text-foreground/80 mt-8">
        © {new Date().getFullYear()} NoteSummarizeAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
