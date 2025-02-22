import React, { useState } from "react"
import { motion } from "framer-motion"

const projects = [
  {
    name: "Holistic Health Landing Page",
    profile: "/images/logo/holisticHealth.png",
    position: "React-Vite, Daisy UI, Express, Node.js",
    githubLink: "https://github.com/LXMachado/holistic-health-landing-page"
  },
  {
    name: "E-Commerce REST API",
    profile: "/images/logo/Api.svg",
    position: "Node.js, Express, Bcrypt, Passport.js, PostgreSQL, Swagger",
    githubLink: "https://github.com/LXMachado/e-commerce-REST-API"
  },
  {
    name: "Reddish",
    profile: "/images/logo/reddit.svg",
    position: "React, Reddit API, MUI",
    githubLink: "https://github.com/LXMachado/Reddit-client"
  },
  {
    name: "Jamming",
    profile: "/images/logo/Spotify.svg",
    position: "Spotify API, React, Redux, CSS Modules",
    githubLink: "https://github.com/LXMachado/jamming"
  },
  {
    name: "Responsive Portfolio Website",
     profile: "/images/logo/Portfolio.svg",
    position: "Javascript, HTML, CSS, boxicons, scrollreveal",
    githubLink: "https://github.com/LXMachado/Alexandre-s-Portfolio-Website"
  },
  {
    name: "Role Playing Game",
    profile: "/images/logo/monster.svg",
    position: "Javascript, HTML, CSS",
    githubLink: "https://github.com/LXMachado/role-playing-game"
  },
]

const ProjectCard = ({ project }) => {
  return (
    <div 
      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <figure className="px-6 pt-6">
        <motion.img 
          src={project.profile} 
          alt={project.name} 
          className="h-32 w-32 rounded-full object-cover"
          loading="lazy"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h3 className="font-SUSE card-title font-bold text-lg">{project.name}</h3>
        <p className="font-SUSE text-sm opacity-70">{project.position}</p>
        <a 
          href={project.githubLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-neutral px-6 py-3 text-sm font-medium capitalize font-SUSE mt-4"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3)

  const loadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 3, projects.length))
  }

  return (
    <section id="projects" className="mt-8 md:mt-16 px-4 md:px-8">
      <h2 className="font-SUSE text-center text-2xl font-semibold md:text-5xl mb-2 md:mb-4">
        My latest projects
      </h2>
      <p className="text-md font-SUSE text-center mb-6 md:mb-8">
        Explore my recent work and innovative solutions.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visibleProjects).map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      {visibleProjects < projects.length && (
        <div className="text-center mt-6">
          <button onClick={loadMore} className="btn btn-outline px-6 py-3 text-sm font-medium capitalize font-SUSE">
            Load More
          </button>
        </div>
      )}
    </section>
  )
}

export default Projects
