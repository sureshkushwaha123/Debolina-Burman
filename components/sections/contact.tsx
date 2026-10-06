"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  FaInstagram,
  FaLinkedin,
  FaBehance,
  FaPinterest,
  FaEnvelope,
  FaPhone,
  FaMapPin,
} from "react-icons/fa";

// ----------------------------------------
// Contact Form Validation
// ----------------------------------------

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

// ----------------------------------------
// Social Media Links
// ----------------------------------------

const socialLinks = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/burman_debs?stkn=enhiZWgxN2FqMndr&utm_source=qr",
    label: "Instagram",
    color: "hover:text-pink-500",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/debolina-burman-a362b4360/",
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    icon: FaBehance,
    href: "https://www.behance.net/debolinaburman",
    label: "Behance",
    color: "hover:text-blue-600",
  },
  {
    icon: FaPinterest,
    href: "https://pin.it/3qN4IihvE",
    label: "Pinterest",
    color: "hover:text-red-500",
  },
];

// ----------------------------------------
// Contact Information
// ----------------------------------------

const contactInfo = [
  {
    icon: FaEnvelope,
    text: "debolinaburman86@gmail.com",
    href: "mailto:debolinaburman86@gmail.com",
  },
  {
    icon: FaPhone,
    text: "+91 8777747711",
    href: "tel:+918777747711",
  },
  {
    icon: FaMapPin,
    text: "Kolkata, India",
    href: "#",
  },
];

// ----------------------------------------
// Contact Section
// ----------------------------------------

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // ----------------------------------------
  // Submit Contact Form
  // ----------------------------------------

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "92859183-a764-41f0-ac74-8150ab35baab");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("message", data.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Message sent successfully!");
        reset();
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/experience_backgrounnd.png"
          alt="Background"
          className="w-full h-full object-cover opacity-50 blur-sm"
        />
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">
            Let's Connect
          </h2>

          <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your fashion vision to life? Let's create
            something extraordinary together.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* =====================================
              CONTACT FORM
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            <Card className="bg-card/60 backdrop-blur-sm border-0 shadow-lg">

              <CardContent className="p-6 sm:p-8">

                <h3 className="text-xl sm:text-2xl font-bold mb-6">
                  Send a Message
                </h3>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5"
                >

                  {/* Name */}
                  <div>
                    <Label htmlFor="name">
                      Name
                    </Label>

                    <Input
                      id="name"
                      {...register("name")}
                      className="mt-2"
                      placeholder="Your full name"
                    />

                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email">
                      Email
                    </Label>

                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-2"
                      placeholder="your.email@example.com"
                    />

                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">
                      Message
                    </Label>

                    <Textarea
                      id="message"
                      {...register("message")}
                      className="mt-2 min-h-[120px]"
                      placeholder="Tell me about your project..."
                    />

                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Sending..."
                      : "Send Message"}
                  </Button>

                </form>

              </CardContent>
            </Card>
          </motion.div>

          {/* =====================================
              CONTACT INFORMATION
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
            }}
            className="space-y-8"
          >

            {/* Introduction */}
            <div>

              <h3 className="text-xl sm:text-2xl font-bold mb-6">
                Get in Touch
              </h3>

              <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed mb-8">
                I&apos;m always excited to discuss new projects,
                creative collaborations, or opportunities in the
                fashion industry.
              </p>

            </div>

            {/* Contact Details */}
            <div className="space-y-4">

              {contactInfo.map((item, index) => {

                const Icon = item.icon;

                return (
                  <motion.a
                    key={index}
                    href={item.href}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                    }}
                    className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
                  >

                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">

                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

                    </div>

                    {/* Text */}
                    <span className="text-base sm:text-lg">
                      {item.text}
                    </span>

                  </motion.a>
                );

              })}

            </div>

            {/* =====================================
                SOCIAL MEDIA LINKS
            ===================================== */}

            <div>

              <h4 className="text-base sm:text-lg font-semibold mb-4">
                Follow My Work
              </h4>

              <div className="flex flex-wrap gap-3">

                {socialLinks.map((social, index) => {

                  const Icon = social.icon;

                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"

                      initial={{
                        opacity: 0,
                        y: 20,
                      }}

                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay: index * 0.1,
                        duration: 0.6,
                      }}

                      whileHover={{
                        scale: 1.1,
                        y: -2,
                      }}

                      whileTap={{
                        scale: 0.95,
                      }}

                      className={`w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full flex items-center justify-center text-muted-foreground ${social.color} transition-all duration-200`}

                      aria-label={social.label}
                    >

                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />

                    </motion.a>
                  );

                })}

              </div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
