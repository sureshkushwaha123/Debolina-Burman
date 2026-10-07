"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpenText, Layers3, PenTool, Scissors, SwatchBook } from "lucide-react";

export function AboutSection() {
  const skillCategories = [
    { title: "Design & Illustration", icon: PenTool, skills: ["Fashion Illustration", "Visual Storytelling"] },
    { title: "Textile & Surface", icon: SwatchBook, skills: ["Textile Innovation", "Surface Development", "Dyeing & Printing"] },
    { title: "Styling & Development", icon: Scissors, skills: ["Pattern Making", "Styling", "Adaptive Clothing"] },
    { title: "Fashion Technology", icon: Layers3, skills: ["Wearable Technology"] },
    { title: "Creative & Content", icon: BookOpenText, skills: ["Blogging", "Trend Forecasting", "Content Creation"] },
  ];

  return (
    <section
      id="about"
      className="relative py-16 sm:py-20 lg:py-24 bg-muted/30 overflow-hidden"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}
      <div className="absolute inset-0 z-0">
        <img
          src="/experience_backgrounnd.png"
          alt="Moodboard Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* =====================================================
          DECORATIVE BACKGROUND ELEMENTS
      ====================================================== */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-[-40px] w-32 h-32 rounded-full border border-white/10"
      />

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -4, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-[-50px] w-40 h-40 rounded-full border border-white/10"
      />

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            TITLE
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            About Me
          </h2>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 70 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-primary mx-auto mt-4"
          />
        </motion.div>

        {/* =====================================================
            ABOUT CONTENT
        ====================================================== */}
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-start">

          {/* =================================================
              PROFILE IMAGE
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative flex justify-center"
          >

            {/* Animated outer ring */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-[85%] h-[85%] rounded-full border border-white/10 border-dashed"
            />

            {/* Floating image */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 w-full max-w-xs sm:max-w-sm lg:max-w-md"
            >

              {/* Glow */}
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl" />

              {/* Image frame */}
              <motion.div
                whileHover={{
                  scale: 1.025,
                  y: -5,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  relative
                  aspect-square
                  rounded-2xl
                  overflow-hidden
                  bg-gradient-to-br
                  from-primary/20
                  to-secondary/20
                  p-2
                  shadow-2xl
                "
              >
                <Image
                  src="/photos/Profile.JPG.jpeg"
                  alt="Debolina Burman - Fashion Designer"
                  width={500}
                  height={500}
                  priority
                  className="
                    w-full
                    h-full
                    object-cover
                    rounded-xl
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Bottom decorative circle */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -bottom-5
                  -right-5
                  w-20
                  h-20
                  rounded-full
                  bg-primary/20
                  blur-xl
                "
              />

              {/* Top decorative circle */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -top-5
                  -left-5
                  w-24
                  h-24
                  rounded-full
                  bg-secondary/20
                  blur-xl
                "
              />
            </motion.div>
          </motion.div>

          {/* =================================================
              MY DESIGN LANGUAGE
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="space-y-6 sm:space-y-8"
          >
            <div>

              {/* Heading */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                My Design Language
              </h3>

              {/* Animated accent */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 55 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="h-[2px] bg-primary mt-3 mb-5"
              />

              {/* Paragraph 1 */}
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-5">
                Hello! I&apos;m Debolina, an aspiring Fashion Designer who&apos;s
                highly inclined towards Fashion and Aesthetics. One who
                believes in Kindness! Every design of mine has a reflection
                of stories which moulded me the way I am. How I see, feel,
                talk, and perceive things around me takes enormous
                observation skills. After brainstorming my life&apos;s design
                process, one thing that I have always been true to is my
                roots. I often try to incorporate the essence of my genesis
                in every piece I create.
              </p>

              {/* Paragraph 2 */}
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                
              </p>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            CORE SKILLS
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 sm:mt-20 lg:mt-24"
        >

          {/* Core Skills Heading */}
          <div className="text-center mb-10 sm:mb-12">

            <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
              Core Skills
            </h4>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-3 mt-4">

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-[1px] bg-white/30"
              />

              <span className="text-primary text-sm">✦</span>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-[1px] bg-white/30"
              />

            </div>
          </div>

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {skillCategories.map(({ title, icon: Icon, skills }, categoryIndex) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: categoryIndex * 0.06 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-background/65 p-5 shadow-sm backdrop-blur-sm transition-colors duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 sm:p-6"
              >
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-colors duration-300 group-hover:bg-primary/15" />
                <div className="relative flex items-center gap-3 border-b border-border/50 pb-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h5 className="text-sm font-semibold tracking-wide sm:text-base">{title}</h5>
                </div>
                <ul className="relative mt-4 flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.05 + skillIndex * 0.04 }}
                      className="rounded-full border border-border/60 bg-background/70 px-3 py-2 text-xs leading-tight text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground sm:text-sm"
                    >
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

