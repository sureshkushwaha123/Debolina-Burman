
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  const scrollToPortfolio = () => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Image */}
<div className="absolute inset-0 z-0">
  <Image
    src="/photos/heroBackgroundImage.jpg"
    alt="Hero Background"
    fill
    className="object-cover opacity-70"
    priority
  />

  <div className="absolute inset-0 bg-black/30" />
</div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl sm:max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-3xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            style={{ fontFamily: "Times New Roman, serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Debolina Burman
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl  text-white drop-shadow-lg mb-6 sm:mb-8 font-light leading-snug px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Fashion Designer | NIFT 2022-2026
          </motion.p>

          <motion.p
            className="text-base sm:text-lg lg:text-xl  text-white drop-shadow-lg mb-8 sm:mb-12 max-w-lg sm:max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Crafting contemporary fashion that bridges traditional artistry with
            modern aesthetics. Each piece tells a story of innovation,
            sustainability, and timeless elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={scrollToPortfolio}
              className="px-6 sm:px-8 py-3 text-base sm:text-lg font-medium"
            >
              View My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-6 sm:px-8 py-3 text-base sm:text-lg font-medium"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToPortfolio}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs sm:text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}