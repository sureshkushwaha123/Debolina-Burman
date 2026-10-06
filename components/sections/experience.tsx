'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { GraduationCap, Briefcase, Award } from 'lucide-react'
import portfolioData from '@/data/portfolio.json'

const getIcon = (title: string) => {
  if (title.toLowerCase().includes('student') || title.toLowerCase().includes('nift')) {
    return GraduationCap
  }
  if (title.toLowerCase().includes('intern') || title.toLowerCase().includes('studio')) {
    return Briefcase
  }
  return Award
}

export function ExperienceSection() {
  return (
    <section id="experience" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Moodboard Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/experience_backgrounnd.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-50 blur-sm"
        />
        <div className="absolute inset-0 bg-background/25" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 lg:mb-20"
        >
          <h2 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl lg:text-5xl">Experience</h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            My journey in fashion design—from academic excellence to professional growth and industry recognition.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-primary to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {portfolioData.experience.map((item, index) => {
              const Icon = getIcon(item.title)
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative flex items-start md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary shadow-lg md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <Icon className="h-5 w-5 text-primary-foreground" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full min-w-0 pl-14 md:w-5/12 md:pl-0 ${isEven ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                    <Card className="border border-border bg-card/75 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl">
                      <CardContent className="space-y-3 p-4 sm:space-y-4 sm:p-6">
                        {/* Year Badge */}
                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                            {item.year}
                          </Badge>
                        </div>

                        {/* Title & Organization */}
                        <div>
                          <h3 className="break-words text-lg font-bold sm:text-xl">{item.title}</h3>
                          <h4 className="break-words font-semibold text-primary">{item.organization}</h4>
                        </div>

                        {/* Description */}
                        <p className="break-words text-sm leading-relaxed text-muted-foreground sm:text-base">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${className}`}>
      {children}
    </span>
  )
}
