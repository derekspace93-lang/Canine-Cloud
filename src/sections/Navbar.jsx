import { useState, useEffect } from "react";
import { motion } from "motion/react";

function Navigation({ onLinkClick }) {
  return (
    <ul className="nav-ul">
      <li className="nav-li">
        <a
          className="nav-link"
          href="#home"
          onClick={(e) => onLinkClick && onLinkClick(e, "#home")}
        >
          Home
        </a>
      </li>
      <li className="nav-li">
        <a
          className="nav-link"
          href="#breeds"
          onClick={(e) => onLinkClick && onLinkClick(e, "#breeds")}
        >
          Breeds
        </a>
      </li>
      <li className="nav-li">
        <a
          className="nav-link"
          href="#images"
          onClick={(e) => onLinkClick && onLinkClick(e, "#images")}
        >
          Images
        </a>
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, hash) => {
    if (e) e.preventDefault();
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const targetY = el.getBoundingClientRect().top + window.scrollY;
      setScrolled(targetY > 50);
    }
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-x-0 z-20 w-full backdrop-blur-lg transition-colors duration-300 ${scrolled ? "bg-primary/80 shadow-md" : "bg-primary/40"
        }`}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Canine-Cloud
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation onLinkClick={handleNavClick} />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onLinkClick={handleNavClick} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
