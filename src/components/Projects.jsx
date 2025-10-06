import React, { useState } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    name: "Tinnie House Records",
    profile: "/images/logo/Tinnie House Records.png",
    position: "Next.js 14, React 18, Tailwind CSS, Soundcloud API and Widget",
    githubLink: "https://github.com/LXMachado/tinnie-house-records"
  },
  {
    name: "Holistic Health Landing Page",
    profile: "/images/logo/holisticHealth.png",
    position: "React-Vite, Express, Node.js, Styled Components",
    githubLink: "https://github.com/LXMachado/holistic-health-landing-page"
  },
  {
    name: "E-Commerce REST API",
    profile: "/images/logo/Api.svg",
    position: "Node.js, Express, Bcrypt, Passport.js, PostgreSQL, Swagger",
    githubLink: "https://github.com/LXMachado/e-commerce-REST-API"
  },
  {
    name: "tRPC Job Management System",
    profile: "/images/logo/tRPC.png",
    position: "Remix, Prisma, Typescript, React, ZenStack, Ant Design, PostgreSQL",
    githubLink: "https://github.com/LXMachado/ynK0sI-acab"
  },
  {
    name: "MERN E-Commerce",
    profile: "/images/logo/MERN.png",
    position: "MongoDB, Express, React, Node.js, Chakra UI, Vite",
    githubLink: "https://github.com/LXMachado/vite-chakra-mern-e-commerce"
  },
  {
    name: "Responsive Portfolio Website",
    profile: "/images/logo/Portfolio.png",
    position: "Javascript, HTML, CSS, boxicons, scrollreveal",
    githubLink: "https://github.com/LXMachado/Alexandre-s-Portfolio-Website"
  }
]

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <div className="project-image-ring">
      <motion.img
        src={project.profile}
        alt={project.name}
        className="project-avatar"
        loading="lazy"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 1 }}
      />
    </div>
    <div className="space-y-3 text-center">
      <h3 className="text-lg font-heading font-semibold text-slate-900 sm:text-xl dark:text-ink">{project.name}</h3>
      <p className="text-base leading-7 text-slate-600 dark:text-ink-muted/90">{project.position}</p>
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="button-primary mt-6 w-full justify-center"
      >
        View on GitHub
      </a>
    </div>
  </div>
)

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3)

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length))
  }

  return (
    <section id="projects" className="section-shell">
      <div className="section-header">
        <h2 className="section-title">My latest projects</h2>
        <p className="section-subtitle">Explore my recent work and innovative solutions.</p>
      </div>
      <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {visibleProjects < projects.length && (
        <div className="mt-8 flex justify-center">
          <button onClick={loadMore} className="button-secondary">
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects
