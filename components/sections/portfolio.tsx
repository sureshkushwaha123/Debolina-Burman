"use client";

import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

import {
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* =========================================================
   TYPES
========================================================= */

type ImageCollection = {
  name?: string;
  cover: string;
  images: string[];
};

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];

  coverImage?: string;

  imageCollections?: ImageCollection[];

  moodBoard: {
    text: string;
    images: string[];
  };

  inspiration: string;
};

/* =========================================================
   PROJECT DATA
========================================================= */

const projects = portfolioData.projects as Project[];

/*
  ONLY 9 PROJECTS WILL BE DISPLAYED

  01 → Large
  02 → Large
  03 → Large
  04 → Small
  05 → Small
  06 → Small
  07 → Small
  08 → Small
  09 → Small

  Projects 10, 11 and 12 are intentionally hidden.
*/
const visibleProjects = projects.slice(0, 9);

function PortfolioMoodboardBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <Image
        src="/experience_backgrounnd.png"
        alt=""
        fill
        sizes="100vw"
        className="scale-105 object-cover opacity-50 blur-sm"
      />
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export function PortfolioSection() {
  /* -------------------------------------------------------
     MAIN STATES
  ------------------------------------------------------- */

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [selectedCollection, setSelectedCollection] =
    useState<ImageCollection | null>(null);

  // Preserve the exact page position while an overlay is open.
  const lockedScrollY = useRef(0);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [isSlideshowPaused, setIsSlideshowPaused] = useState(false);

  const [modalType, setModalType] = useState<
    "gallery" | "image" | "moodBoard" | "inspiration" | null
  >(null);

  const [fullscreenImage, setFullscreenImage] =
    useState<string | null>(null);

  /* =========================================================
     IMAGE COLLECTION LOGIC
  ========================================================= */

  /*
    If imageCollections exists in portfolio.json,
    those collections are used.

    Example:

    imageCollections: [
      {
        cover: "/photos/model-front.jpg",
        images: [
          "/photos/model-front.jpg",
          "/photos/model-side.jpg",
          "/photos/model-back.jpg"
        ]
      }
    ]

    Otherwise every moodBoard image becomes its own
    one-image collection.
  */

  const getImageCollections = (
    project: Project
  ): ImageCollection[] => {
    if (
      project.imageCollections &&
      project.imageCollections.length > 0
    ) {
      return project.imageCollections;
    }

    return project.moodBoard.images.map((image) => ({
      cover: image,
      images: [image],
    }));
  };

  /* =========================================================
     OPEN PROJECT
  ========================================================= */

  const openProjectGallery = (project: Project) => {
    setSelectedProject(project);
    setSelectedCollection(null);
    setSelectedImageIndex(0);
    setFullscreenImage(null);
    setModalType("gallery");
  };

  /* =========================================================
     AUTOMATIC GARMENT SLIDESHOW

     ID 1–3 detail galleries automatically cycle through
     every garment/detail photo. Manual next/previous and
     thumbnail clicks still work normally.
  ========================================================= */

  useEffect(() => {
    if (
      modalType !== "image" ||
      !selectedCollection ||
      selectedCollection.images.length <= 1 ||
      isSlideshowPaused
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setSelectedImageIndex((current) =>
        (current + 1) %
        selectedCollection.images.length
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [
    modalType,
    selectedCollection,
    isSlideshowPaused,
  ]);

  /* =========================================================
     OPEN PHOTO COLLECTION
  ========================================================= */

  const openImageCollection = (
    collection: ImageCollection
  ) => {
    setSelectedCollection(collection);
    setSelectedImageIndex(0);
    setIsSlideshowPaused(false);
    setFullscreenImage(null);
    setModalType("image");
  };

  /* =========================================================
     CLOSE EVERYTHING
  ========================================================= */

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedCollection(null);
    setSelectedImageIndex(0);
    setFullscreenImage(null);
    setModalType(null);
  };

  /* =========================================================
     CLOSE PHOTO VIEWER
  ========================================================= */

  const closeImageViewer = () => {
    setSelectedCollection(null);
    setSelectedImageIndex(0);
    setFullscreenImage(null);
    setModalType("gallery");
  };

  /* =========================================================
     FULLSCREEN
  ========================================================= */

  const openFullscreen = (image: string) => {
    setFullscreenImage(image);
  };

  /* =========================================================
     PREVIOUS IMAGE
  ========================================================= */

  const showPreviousImage = () => {
    if (!selectedCollection) return;

    setSelectedImageIndex((currentIndex) => {
      if (currentIndex === 0) {
        return selectedCollection.images.length - 1;
      }

      return currentIndex - 1;
    });
  };

  /* =========================================================
     NEXT IMAGE
  ========================================================= */

  const showNextImage = () => {
    if (!selectedCollection) return;

    setSelectedImageIndex((currentIndex) => {
      if (
        currentIndex ===
        selectedCollection.images.length - 1
      ) {
        return 0;
      }

      return currentIndex + 1;
    });
  };

  /* =========================================================
     KEYBOARD CONTROLS
  ========================================================= */

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!modalType) return;

      /* ESC */

      if (event.key === "Escape") {
        if (fullscreenImage) {
          setFullscreenImage(null);
        } else if (modalType === "image") {
          closeImageViewer();
        } else {
          closeModal();
        }
      }

      /* LEFT */

      if (
        modalType === "image" &&
        !fullscreenImage &&
        event.key === "ArrowLeft"
      ) {
        showPreviousImage();
      }

      /* RIGHT */

      if (
        modalType === "image" &&
        !fullscreenImage &&
        event.key === "ArrowRight"
      ) {
        showNextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    modalType,
    fullscreenImage,
    selectedCollection,
  ]);

  /* =========================================================
     HARD-LOCK THE BACKGROUND WHILE ANY PORTFOLIO OVERLAY IS OPEN
  ========================================================= */

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (modalType || fullscreenImage) {
      lockedScrollY.current = window.scrollY;

      body.style.position = "fixed";
      body.style.top = `-${lockedScrollY.current}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";

      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "none";
    } else {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";

      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      window.scrollTo(0, lockedScrollY.current);
    }

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.overflow = "";
      body.style.overscrollBehavior = "";

      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      if (modalType || fullscreenImage) {
        window.scrollTo(0, lockedScrollY.current);
      }
    };
  }, [modalType, fullscreenImage]);

  /* =========================================================
     PREVENT TRACKPAD HORIZONTAL BROWSER NAVIGATION
  ========================================================= */

  const preventBrowserSwipe = (
    event: React.WheelEvent<HTMLDivElement>
  ) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  /* =========================================================
     CURRENT IMAGE
  ========================================================= */

  const currentImage = useMemo(() => {
    if (!selectedCollection) return null;

    return selectedCollection.images[
      selectedImageIndex
    ];
  }, [
    selectedCollection,
    selectedImageIndex,
  ]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      id="portfolio"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28"
    >
      {/* =====================================================
          CINEMATIC BACKGROUND
      ====================================================== */}

      <PortfolioMoodboardBackground />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/30" />

        {/* Floating light orbs */}
        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.18, 0.92, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-white/[0.045] blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.88, 1.15, 1],
          }}
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute right-[-120px] top-[30%] h-[28rem] w-[28rem] rounded-full bg-white/[0.035] blur-3xl"
        />

        {/* Moving scan line */}
        <motion.div
          animate={{ y: ["-10vh", "110vh"] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        />

        {/* Fine film grain */}
        <div
          className="absolute inset-0 opacity-[0.055] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.8) 0.6px, transparent 0.6px)",
            backgroundSize: "5px 5px",
          }}
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.8em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.45em" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15 }}
            className="mb-4 text-xs uppercase text-white/50"
          >
            Selected Works
          </motion.p>

          <div className="relative mx-auto mb-6 w-fit">
            <motion.h2
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-7xl"
            >
              Portfolio
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.55 }}
              className="absolute -bottom-2 left-1/2 h-px w-[120%] -translate-x-1/2 origin-center bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mx-auto max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            A curated collection of fashion design projects,
            handcrafted details, experimental silhouettes,
            and contemporary visual stories.
          </motion.p>
        </motion.div>

        {/* ===================================================
            FEATURED PROJECTS
            PROJECT 1 + PROJECT 2 + PROJECT 3
        ==================================================== */}

        <div className="space-y-10">

          {visibleProjects
            .slice(0, 3)
            .map((project, index) => {

              const projectCover =
                project.coverImage ||
                project.moodBoard?.images?.[0];

              return (
                <motion.article
                  key={project.id}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.008,
                  }}
                  whileTap={{ scale: 0.995 }}
                  onClick={() =>
                    openProjectGallery(project)
                  }
                  className="group cursor-pointer"
                >

                  <div
                    className="
                      relative
                      overflow-hidden
                      rounded-[28px]
                      border
                      border-white/10
                      bg-white/[0.03]
                      shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                      transition-all
                      duration-700
                      hover:border-white/25
                      hover:shadow-[0_35px_100px_rgba(0,0,0,0.65)]
                      hover:ring-1
                      hover:ring-white/10
                    "
                  >

                    {/* IMAGE */}

                    <div
                      className="
                        relative
                        aspect-[21/9]
                        min-h-[300px]
                        overflow-hidden
                        sm:min-h-[420px]
                        lg:min-h-[520px]
                      "
                    >

                      <Image
                        src={projectCover}
                        alt={project.title}
                        fill
                        priority={index === 0}
                        sizes="100vw"
                        className="
                          object-cover
                          transition-transform
                          duration-[1200ms]
                          ease-out
                          group-hover:scale-[1.035]
                        "
                      />

                      {/* MOVING LIGHT SWEEP */}
                      <motion.div
                        initial={{ x: "-120%" }}
                        whileHover={{ x: "120%" }}
                        transition={{ duration: 1.1, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-xl"
                      />

                      {/* DARK GRADIENT */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black
                          via-black/30
                          to-transparent
                          opacity-90
                        "
                      />

                      {/* LEFT GRADIENT */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-black/50
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* PROJECT NUMBER */}

                      <div
                        className="
                          absolute
                          left-6
                          top-6
                          rounded-full
                          border
                          border-white/20
                          bg-black/50
                          px-4
                          py-2
                          text-xs
                          tracking-[0.3em]
                          text-white
                          backdrop-blur-xl
                        "
                      >
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </div>

                      {/* VIEW BUTTON */}

                      <div
                        className="
                          absolute
                          right-6
                          top-6
                          flex
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-white/20
                          bg-black/50
                          px-4
                          py-2
                          text-xs
                          uppercase
                          tracking-[0.2em]
                          text-white
                          opacity-0
                          translate-y-2
                          backdrop-blur-xl
                          transition-all
                          duration-500
                          group-hover:translate-y-0
                          group-hover:opacity-100
                        "
                      >
                        View

                        <ArrowUpRight
                          size={15}
                        />
                      </div>

                      {/* PROJECT TEXT */}

                      <div
                        className="
                          absolute
                          bottom-0
                          left-0
                          right-0
                          p-6
                          sm:p-10
                          lg:p-12
                        "
                      >

                        <p
                          className="
                            mb-3
                            text-[10px]
                            uppercase
                            tracking-[0.35em]
                            text-white/60
                            sm:text-xs
                          "
                        >
                          {project.category}
                        </p>

                        <h3
                          className="
                            text-2xl
                            font-medium
                            tracking-wide
                            text-white
                            transition-transform
                            duration-500
                            group-hover:translate-x-2
                            sm:text-4xl
                            lg:text-5xl
                          "
                        >
                          {project.title}
                        </h3>

                        <p
                          className="
                            mt-4
                            max-w-2xl
                            text-sm
                            leading-relaxed
                            text-white/65
                            sm:text-base
                          "
                        >
                          {project.description}
                        </p>

                        <div
                          className="
                            mt-6
                            flex
                            items-center
                            gap-3
                            text-xs
                            uppercase
                            tracking-[0.25em]
                            text-white/60
                          "
                        >
                          <span>
                            Explore Collection
                          </span>

                          <span
                            className="
                              h-px
                              w-12
                              bg-white/40
                              transition-all
                              duration-500
                              group-hover:w-20
                            "
                          />
                        </div>

                      </div>

                    </div>

                  </div>

                </motion.article>
              );
            })}

        </div>

        {/* ===================================================
            SMALL PROJECTS
            PROJECT 4 → PROJECT 9
            EXACTLY 6 PROJECTS
        ==================================================== */}

        <div className="mt-16">

          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-8 flex items-center gap-5"
          >

            <motion.div
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="h-px flex-1 bg-white/20"
            />

            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-white/40
              "
            >
              More Projects
            </p>

            <motion.div
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
              className="h-px flex-1 bg-white/20"
            />

          </motion.div>

          <div
            className="
              grid
              grid-cols-1
              gap-7
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >

            {visibleProjects
              .slice(3, 9)
              .map((project, index) => {

                const projectCover =
                  project.coverImage ||
                  project.moodBoard?.images?.[0];

                const displayNumber = index + 4;

                return (
                  <motion.article
                    key={project.id}
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.1,
                    }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.025,
                      rotate: index % 2 === 0 ? -0.35 : 0.35,
                    }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() =>
                      openProjectGallery(project)
                    }
                    className="group cursor-pointer"
                  >

                    <Card
                      className="
                        overflow-hidden
                        rounded-[22px]
                        border
                        border-white/10
                        bg-white/[0.035]
                        text-white
                        shadow-2xl
                        backdrop-blur-md
                        transition-all
                        duration-500
                        hover:border-white/25
                        hover:bg-white/[0.07]
                      "
                    >

                      {/* IMAGE */}

                      <div
                        className="
                          relative
                          aspect-[4/5]
                          overflow-hidden
                          bg-black
                        "
                      >

                        <Image
                          src={projectCover}
                          alt={project.title}
                          fill
                          sizes="
                            (max-width: 640px) 100vw,
                            (max-width: 1024px) 50vw,
                            33vw
                          "
                          className="
                            object-cover
                            transition-all
                            duration-[900ms]
                            ease-out
                            group-hover:scale-[1.09]
                            group-hover:saturate-125
                            group-hover:contrast-110
                          "
                        />

                        <motion.div
                          initial={{ x: "-130%" }}
                          whileHover={{ x: "130%" }}
                          transition={{ duration: 0.9, ease: "easeInOut" }}
                          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent blur-lg"
                        />

                        {/* GRADIENT */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black
                            via-black/10
                            to-transparent
                            opacity-90
                          "
                        />

                        {/* NUMBER */}

                        <div
                          className="
                            absolute
                            left-4
                            top-4
                            rounded-full
                            border
                            border-white/20
                            bg-black/60
                            px-3
                            py-1.5
                            text-[10px]
                            tracking-[0.25em]
                            text-white
                            backdrop-blur-xl
                          "
                        >
                          {String(
                            displayNumber
                          ).padStart(2, "0")}
                        </div>

                        {/* OPEN ICON */}

                        <div
                          className="
                            absolute
                            right-4
                            top-4
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/20
                            bg-black/60
                            text-white
                            opacity-0
                            scale-90
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            group-hover:scale-100
                            group-hover:opacity-100
                          "
                        >
                          <ArrowUpRight
                            size={17}
                          />
                        </div>

                        {/* TEXT */}

                        <div
                          className="
                            absolute
                            bottom-0
                            left-0
                            right-0
                            p-5
                          "
                        >

                          <p
                            className="
                              mb-2
                              text-[9px]
                              uppercase
                              tracking-[0.3em]
                              text-white/55
                            "
                          >
                            {project.category}
                          </p>

                          <h3
                            className="
                              text-xl
                              font-medium
                              leading-tight
                              text-white
                            "
                          >
                            {project.title}
                          </h3>

                        </div>

                      </div>

                      {/* CARD CONTENT */}

                      <CardContent className="p-5">

                        <p
                          className="
                            mb-5
                            line-clamp-2
                            text-sm
                            leading-relaxed
                            text-white/55
                          "
                        >
                          {project.description}
                        </p>

                        {/* TAGS */}

                        <div
                          className="
                            mb-5
                            flex
                            flex-wrap
                            gap-2
                          "
                        >

                          {project.tags.map(
                            (tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="
                                  border
                                  border-white/10
                                  bg-white/[0.06]
                                  text-[10px]
                                  font-normal
                                  text-white/70
                                "
                              >
                                {tag}
                              </Badge>
                            )
                          )}

                        </div>

                        {/* EXPLORE */}

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            border-t
                            border-white/10
                            pt-4
                          "
                        >

                          <span
                            className="
                              text-[10px]
                              uppercase
                              tracking-[0.25em]
                              text-white/40
                            "
                          >
                            Explore
                          </span>

                          <ArrowUpRight
                            size={17}
                            className="
                              text-white/60
                              transition-transform
                              duration-300
                              group-hover:translate-x-1
                              group-hover:-translate-y-1
                            "
                          />

                        </div>

                      </CardContent>

                    </Card>

                  </motion.article>
                );
              })}

          </div>

        </div>

      </div>

      {/* =====================================================
          PROJECT GALLERY MODAL
      ====================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedProject &&
              modalType === "gallery" && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[99999]
              overflow-hidden
              overscroll-contain
              bg-black/95
              backdrop-blur-2xl
            "
            style={{
              overscrollBehavior: "none",
              overscrollBehaviorX: "none",
              touchAction: "pan-y",
            }}
            onWheel={preventBrowserSwipe}
            onClick={closeModal}
          >

            <PortfolioMoodboardBackground />

            <div

              className="relative z-10 h-full overflow-y-auto overscroll-contain px-4 py-4 sm:px-8 sm:py-8"

              style={{
                overscrollBehavior: "none",
                overscrollBehaviorX: "none",
                touchAction: "pan-y",
              }}
              onWheel={preventBrowserSwipe}

            >


            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 30,
              }}
              transition={{
                duration: 0.4,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                mx-auto
                max-w-7xl
              "
            >

              {/* HEADER */}

              <div
                className="
                  mb-8
                  flex
                  items-start
                  justify-between
                  border-b
                  border-white/10
                  pb-6
                "
              >

                <div>

                  <p
                    className="
                      mb-3
                      text-xs
                      uppercase
                      tracking-[0.35em]
                      text-white/50
                    "
                  >
                    Collection Gallery
                  </p>

                  <h2
                    className="
                      text-2xl
                      font-semibold
                      text-white
                      sm:text-4xl
                    "
                  >
                    {selectedProject.title}
                  </h2>

                  <p
                    className="
                      mt-3
                      max-w-3xl
                      text-sm
                      leading-relaxed
                      text-white/60
                      sm:text-base
                    "
                  >
                    {selectedProject.description}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close gallery"
                  className="ml-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white hover:text-black"
                >
                  <X size={22} />
                </button>

              </div>

              {/* GALLERY GRID */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {selectedProject.id === 3 || selectedProject.id >= 4
                  ? (selectedProject.id === 3
                      ? getImageCollections(selectedProject).flatMap(
                          (collection) => collection.images
                        )
                      : selectedProject.moodBoard.images.slice(1)
                    )
                      .map((image, index) => (
                        <motion.div
                          key={`${image}-${index}`}
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index * 0.05,
                            duration: 0.4,
                          }}
                          whileHover={{
                            y: -8,
                            scale: 1.015,
                          }}
                          whileTap={{ scale: 0.99 }}
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-black
                            shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                            transition-colors
                            duration-500
                            hover:border-white/30
                            hover:shadow-[0_25px_70px_rgba(0,0,0,0.55)]
                          "
                        >
                          <div
                            className="
                              relative
                              min-h-[300px]
                              aspect-[3/4]
                              overflow-hidden
                              bg-black
                            "
                          >
                            <Image
                              src={image}
                              alt={`${selectedProject.title} detail ${
                                index + 1
                              }`}
                              fill
                              sizes="
                                (max-width: 768px) 100vw,
                                33vw
                              "
                              className="
                                object-contain
                                transition-all
                                duration-[900ms]
                                ease-out
                                group-hover:scale-[1.06]
                                group-hover:brightness-110
                              "
                            />

                            {selectedProject.id !== 3 && <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/60
                                via-transparent
                                to-transparent
                                opacity-0
                                transition
                                duration-500
                                group-hover:opacity-100
                              "
                            />}

                            {selectedProject.id !== 3 && <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/50 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                              {String(index + 1).padStart(2, "0")}
                            </div>}

                            {selectedProject.id !== 3 && <motion.div
                              initial={{ opacity: 0, scale: 0.7 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md"
                            >
                              Detail
                            </motion.div>}
                          </div>
                        </motion.div>
                      ))
                  : getImageCollections(
                      selectedProject
                    ).map(
                      (collection, index) => (

                        <motion.button
                          key={`${collection.cover}-${index}`}
                          type="button"
                          initial={{
                            opacity: 0,
                            y: 20,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            delay:
                              index * 0.05,
                            duration: 0.4,
                          }}
                          onClick={() =>
                            openImageCollection(
                              collection
                            )
                          }
                          className="
                            group
                            relative
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            text-left
                            transition-all
                            duration-500
                            hover:border-white/30
                          "
                        >

                          <div
                            className="
                              relative
                              aspect-[3/4]
                              overflow-hidden
                              bg-black
                            "
                          >

                            <Image
                              src={
                                collection.cover
                              }
                              alt={`${selectedProject.title} image ${
                                index + 1
                              }`}
                              fill
                              sizes="
                                (max-width: 768px) 100vw,
                                33vw
                              "
                              className="
                                object-contain
                                transition
                                duration-700
                                group-hover:scale-105
                              "
                            />

                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-b
                                from-black/70
                                via-transparent
                                to-black/80
                                opacity-75
                                transition
                                duration-500
                                group-hover:opacity-90
                              "
                            />

                            {/* GARMENT NAME */}
                            <div
                              className="
                                absolute
                                left-4
                                right-4
                                top-4
                                z-10
                              "
                            >
                              <span
                                className="
                                  inline-block
                                  rounded-full
                                  border
                                  border-white/20
                                  bg-black/55
                                  px-4
                                  py-2
                                  text-[10px]
                                  font-medium
                                  uppercase
                                  tracking-[0.22em]
                                  text-white
                                  backdrop-blur-md
                                  transition-all
                                  duration-300
                                  group-hover:bg-white
                                  group-hover:text-black
                                "
                              >
                                {collection.name ||
                                  `Garment ${String(index + 1).padStart(2, "0")}`}
                              </span>
                            </div>

                            {/* NUMBER */}
                            <div
                              className="
                                absolute
                                bottom-4
                                left-4
                                z-10
                                rounded-full
                                bg-black/70
                                px-3
                                py-1
                                text-xs
                                text-white
                                backdrop-blur-md
                              "
                            >
                              {String(
                                index + 1
                              ).padStart(2, "0")}
                            </div>

                            {/* MAXIMIZE ICON */}
                            <div
                              className="
                                absolute
                                right-4
                                top-4
                                z-10
                                rounded-full
                                bg-black/70
                                p-3
                                text-white
                                opacity-0
                                backdrop-blur-md
                                transition
                                duration-300
                                group-hover:opacity-100
                              "
                            >
                              <Maximize2
                                size={18}
                              />
                            </div>

                            {/* VIEW */}
                            <div
                              className="
                                absolute
                                bottom-4
                                right-4
                                z-10
                                text-xs
                                uppercase
                                tracking-[0.25em]
                                text-white
                                opacity-0
                                transition-all
                                duration-300
                                group-hover:translate-x-0
                                group-hover:opacity-100
                              "
                            >
                              View
                            </div>

                          </div>

                        </motion.button>

                      )
                    )}

              </div>

              {/* DETAILS */}

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="
                  mt-10
                  grid
                  gap-6
                  border-t
                  border-white/10
                  pt-8
                  md:grid-cols-2
                "
              >

                <div>

                  <p
                    className="
                      mb-3
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-white/50
                    "
                  >
                    Concept
                  </p>

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      text-white/70
                    "
                  >
                    {
                      selectedProject
                        .moodBoard.text
                    }
                  </p>

                </div>

                <div>

                  <p
                    className="
                      mb-3
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-white/50
                    "
                  >
                    {selectedProject.id === 3 ? "Handcraft" : "Inspiration"}
                  </p>

                  <p
                    className="
                      text-sm
                      leading-relaxed
                      text-white/70
                    "
                  >
                    {selectedProject.id === 3
                      ? "Extra-weft technique, Dhalapathara, Odisha"
                      : selectedProject.inspiration}
                  </p>

                </div>

              </motion.div>

              {/* BUTTONS */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <Button
                  type="button"
                  onClick={() =>
                    setModalType(
                      "moodBoard"
                    )
                  }
                  className="
                    bg-white
                    text-black
                    hover:bg-white/80
                  "
                >
                  View Mood Board
                </Button>


              </motion.div>

            </motion.div>

                     </div>
</motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}

      {/* =====================================================
          INDIVIDUAL PHOTO COLLECTION MODAL
      ====================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
      <AnimatePresence>
        {selectedProject &&
          selectedCollection &&
          modalType === "image" && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[60]
              overflow-y-auto
              bg-black/98
              p-3
              backdrop-blur-2xl
            sm:p-6
            "
            onClick={closeImageViewer}
          >

            <PortfolioMoodboardBackground />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.97,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                z-10
                mx-auto
                max-w-7xl
                overflow-hidden
                rounded-3xl
                border
                border-white/15
                bg-white/[0.03]
                shadow-2xl
              "
            >

              {/* VIEWER HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  px-5
                  py-5
                  sm:px-8
                "
              >

                <div>

                  <p
                    className="
                      text-xs
                      uppercase
                      tracking-[0.35em]
                      text-white/50
                    "
                  >
                    {
                      selectedProject.title
                    }
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-white/60
                    "
                  >
                    Image{" "}
                    {selectedImageIndex + 1}{" "}
                    of{" "}
                    {
                      selectedCollection
                        .images.length
                    }
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <motion.span
                      animate={{ opacity: [0.45, 1, 0.45] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="h-1.5 w-1.5 rounded-full bg-white"
                    />
                    <span className="text-[9px] uppercase tracking-[0.28em] text-white/40">
                      Auto slideshow
                    </span>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={
                    closeImageViewer
                  }
                  aria-label="Close image viewer"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                    text-white
                    transition
                    hover:bg-white/15
                  "
                >
                  <X size={22} />
                </button>

              </div>

              {/* MAIN IMAGE */}

              <div
                className="
                  relative
                  flex
                  min-h-[55vh]
                  items-center
                  justify-center
                  bg-black
                  px-3
                  py-8
                  sm:min-h-[65vh]
                  sm:px-16
                  select-none
                "
                onMouseEnter={() => setIsSlideshowPaused(true)}
                onMouseLeave={() => setIsSlideshowPaused(false)}
                onTouchStart={() => setIsSlideshowPaused(true)}
                onTouchEnd={() => setIsSlideshowPaused(false)}
                onTouchCancel={() => setIsSlideshowPaused(false)}
                onPointerDown={(event) => {
                  if (event.pointerType !== "mouse") {
                    setIsSlideshowPaused(true);
                  }
                }}
                onPointerUp={(event) => {
                  if (event.pointerType !== "mouse") {
                    setIsSlideshowPaused(false);
                  }
                }}
                onPointerCancel={() => setIsSlideshowPaused(false)}
              >

                {currentImage && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="
                        pointer-events-none
                        absolute
                        right-6
                        top-5
                        z-20
                        rounded-full
                        border
                        border-white/10
                        bg-black/50
                        px-3
                        py-1.5
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-white/55
                        backdrop-blur-md
                      "
                    >
                      {isSlideshowPaused ? "Paused • Hover to Resume" : "Auto"}
                    </motion.div>

                    <motion.div
                      key={currentImage}
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      scale: [1, 1.018, 1],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      opacity: {
                        duration: 0.45,
                      },
                      scale: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      y: {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      scale: 1.035,
                    }}
                    className="
                      relative
                      h-[55vh]
                      w-full
                      sm:h-[65vh]
                    "
                  >

                    <Image
                      src={currentImage}
                      alt={`${selectedProject.title} ${
                        selectedImageIndex + 1
                      }`}
                      fill
                      sizes="100vw"
                      className="
                        object-contain
                        transition-[filter]
                        duration-700
                        hover:brightness-110
                      "
                      priority
                    />

                    {/* Cinematic glow that follows the image */}
                    <motion.div
                      animate={{
                        opacity: [0.05, 0.14, 0.05],
                        scale: [0.96, 1.02, 0.96],
                      }}
                      transition={{
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="
                        pointer-events-none
                        absolute
                        inset-8
                        rounded-[2rem]
                        bg-white/[0.08]
                        blur-3xl
                      "
                    />

                    </motion.div>
                  </>
                )}

                {/* PREVIOUS */}

                {selectedCollection
                  .images.length > 1 && (

                  <button
                    type="button"
                    onClick={
                      showPreviousImage
                    }
                    aria-label="Previous image"
                    className="
                      absolute
                      left-3
                      top-1/2
                      flex
                      h-12
                      w-12
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/70
                      text-white
                      transition
                      hover:bg-white
                      hover:text-black
                      sm:left-6
                    "
                  >
                    <ChevronLeft
                      size={25}
                    />
                  </button>

                )}

                {/* NEXT */}

                {selectedCollection
                  .images.length > 1 && (

                  <button
                    type="button"
                    onClick={
                      showNextImage
                    }
                    aria-label="Next image"
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-12
                      w-12
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/70
                      text-white
                      transition
                      hover:bg-white
                      hover:text-black
                      sm:right-6
                    "
                  >
                    <ChevronRight
                      size={25}
                    />
                  </button>

                )}

                {/* AUTO-SLIDESHOW PROGRESS */}
                {selectedCollection.images.length > 1 && (
                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0
                      z-20
                      h-[2px]
                      overflow-hidden
                      bg-white/10
                    "
                  >
                    <motion.div
                      key={`progress-${selectedImageIndex}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        ease: "linear",
                      }}
                      className="
                        h-full
                        origin-left
                        bg-white/70
                      "
                    />
                  </div>
                )}

                {/* FULLSCREEN */}

                {currentImage && (

                  <button
                    type="button"
                    onClick={() =>
                      openFullscreen(
                        currentImage
                      )
                    }
                    aria-label="Open fullscreen image"
                    className="
                      absolute
                      bottom-5
                      right-5
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/20
                      bg-black/70
                      text-white
                      transition
                      hover:bg-white
                      hover:text-black
                    "
                  >
                    <Maximize2
                      size={19}
                    />
                  </button>

                )}

              </div>

              {/* THUMBNAILS */}

              <div
                className="
                  border-t
                  border-white/10
                  bg-white/[0.02]
                  p-5
                  sm:p-8
                "
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15,
                  }}
                  className="
                    flex
                    gap-3
                    overflow-x-auto
                    pb-3
                  "
                >

                  {selectedCollection.images.map(
                    (image, index) => (

                      <motion.button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() =>
                          setSelectedImageIndex(
                            index
                          )
                        }
                        initial={{
                          opacity: 0,
                          y: 18,
                          scale: 0.94,
                        }}
                        animate={{
                          opacity:
                            selectedImageIndex === index
                              ? 1
                              : 0.72,
                          y:
                            selectedImageIndex === index
                              ? [0, -5, 0]
                              : [0, index % 2 === 0 ? -3 : 3, 0],
                          scale:
                            selectedImageIndex === index
                              ? [1, 1.035, 1]
                              : 1,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.35,
                          },
                          y: {
                            duration:
                              3.2 + (index % 4) * 0.45,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.08,
                          },
                          scale: {
                            duration: 2.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        whileHover={{
                          y: -10,
                          scale: 1.12,
                          rotate:
                            index % 2 === 0
                              ? -2
                              : 2,
                          opacity: 1,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className={`
                          relative
                          h-24
                          w-20
                          flex-shrink-0
                          overflow-hidden
                          rounded-xl
                          border-2
                          transition-all
                          sm:h-28
                          sm:w-24
                          ${
                            selectedImageIndex ===
                            index
                              ? "border-white opacity-100"
                              : "border-white/10 opacity-50 hover:opacity-100"
                          }
                        `}
                      >

                        <Image
                          src={image}
                          alt={`Thumbnail ${
                            index + 1
                          }`}
                          fill
                          sizes="100px"
                          className="
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-110
                          "
                        />

                        <motion.div
                          animate={{
                            x: ["-130%", "130%"],
                          }}
                          transition={{
                            duration: 3.8,
                            repeat: Infinity,
                            repeatDelay:
                              3 + (index % 3),
                            ease: "easeInOut",
                            delay: index * 0.25,
                          }}
                          className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            z-10
                            w-1/2
                            -skew-x-12
                            bg-gradient-to-r
                            from-transparent
                            via-white/20
                            to-transparent
                            blur-sm
                          "
                        />

                        <div
                          className="
                            absolute
                            bottom-1
                            left-1
                            rounded
                            bg-black/70
                            px-2
                            py-1
                            text-[10px]
                            text-white
                          "
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </div>

                      </motion.button>

                    )
                  )}

                </motion.div>

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}

      {/* =====================================================
          MOOD BOARD MODAL
      ====================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
      <AnimatePresence>
        {selectedProject &&
          modalType === "moodBoard" && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[70]
              overflow-y-auto
              bg-black/95
              p-4
              backdrop-blur-xl
              sm:p-8
            "
            onClick={() =>
              setModalType("gallery")
            }
          >

            <PortfolioMoodboardBackground />

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                z-10
                mx-auto
                max-w-6xl
                rounded-3xl
                border
                border-white/10
                bg-white/[0.03]
                p-5
                sm:p-8
              "
            >

              <div
                className="
                  mb-8
                  flex
                  items-start
                  justify-between
                "
              >

                <div>

                  <p
                    className="
                      mb-3
                      text-xs
                      uppercase
                      tracking-[0.3em]
                      text-white/50
                    "
                  >
                    Mood Board
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-semibold
                      text-white
                    "
                  >
                    {
                      selectedProject.title
                    }
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-3xl
                      text-white/70
                    "
                  >
                    {
                      selectedProject
                        .moodBoard.text
                    }
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setModalType("gallery")
                  }
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/20
                    text-white
                    hover:bg-white/10
                  "
                >
                  <X size={22} />
                </button>

              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {selectedProject.moodBoard.images.map(
                  (image, index) => (

                    <div
                      key={`${image}-${index}`}
                      className="
                        relative
                        min-h-[300px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-black
                      "
                    >

                      <Image
                        src={image}
                        alt={`Mood board image ${
                          index + 1
                        }`}
                        fill
                        sizes="
                          (max-width: 768px) 100vw,
                          33vw
                        "
                        className="object-contain"
                      />

                    </div>

                  )
                )}

              </div>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}

      {/* =====================================================
          INSPIRATION MODAL
      ====================================================== */}

      {typeof document !== "undefined" &&
        createPortal(
      <AnimatePresence>
        {selectedProject &&
          modalType === "inspiration" && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[70]
              flex
              items-center
              justify-center
              bg-black/95
              p-4
              backdrop-blur-xl
            "
            onClick={() =>
              setModalType("gallery")
            }
          >

            <PortfolioMoodboardBackground />

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 25,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                z-10
                w-full
                max-w-3xl
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-6
                sm:p-10
              "
            >

              <button
                type="button"
                onClick={() =>
                  setModalType("gallery")
                }
                className="
                  absolute
                  right-5
                  top-5
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  text-white
                  hover:bg-white/10
                "
              >
                <X size={21} />
              </button>

              <p
                className="
                  mb-3
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-white/50
                "
              >
                Concept and Inspiration
              </p>

              <h2
                className="
                  mb-6
                  pr-12
                  text-3xl
                  font-semibold
                  text-white
                "
              >
                {
                  selectedProject.title
                }
              </h2>

              <p
                className="
                  whitespace-pre-line
                  text-base
                  leading-relaxed
                  text-white/70
                "
              >
                {
                  selectedProject.inspiration
                }
              </p>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}

      {/* =====================================================
          FULLSCREEN IMAGE

          Render through a portal so the fullscreen viewer sits
          above the navbar and outside the Portfolio section's
          stacking context. The image is contained inside the
          viewport and never stretches or crops.
      ====================================================== */}

      {fullscreenImage &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black"
              style={{
                overscrollBehavior: "none",
                touchAction: "none",
              }}
              onWheel={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onTouchMove={(event) => {
                event.preventDefault();
                event.stopPropagation();
              }}
              onClick={() => setFullscreenImage(null)}
            >
              <PortfolioMoodboardBackground />
              {/* CLOSE */}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setFullscreenImage(null);
                }}
                aria-label="Close fullscreen image"
                className="absolute right-5 top-5 z-[100000] flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-xl transition hover:bg-white hover:text-black"
              >
                <X size={24} />
              </button>

              {/* IMAGE AREA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative flex h-[100dvh] w-full items-center justify-center p-4 sm:p-6"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={fullscreenImage}
                  alt="Fullscreen portfolio image"
                  draggable={false}
                  className="block max-h-full max-w-full select-none object-contain"
                  style={{
                    maxHeight: "calc(100dvh - 2rem)",
                    maxWidth: "calc(100vw - 2rem)",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}


    </section>
  );
}
