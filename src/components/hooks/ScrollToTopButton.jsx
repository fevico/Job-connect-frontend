import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa"; // Importing the arrow icon from react-icons

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    if (scrollTop + windowHeight >= docHeight - 10) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`p-3 rounded-full shadow-lg transition duration-300 ${
            isAtBottom ? "bg-white text-primary" : "bg-primary text-white"
          } hover:bg-blue-500`}
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
