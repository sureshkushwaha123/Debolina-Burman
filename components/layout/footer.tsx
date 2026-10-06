"use client"

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col items-center space-y-4 sm:space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-1">Let's Create Together</h3>
            <p className="text-muted-foreground">
              Bringing fashion dreams to life through innovative design
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>&copy; {new Date().getFullYear()} Fashion Portfolio. All rights reserved.</p>
            {/* <p className="mt-1">Designed & Developed with </p> */}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
