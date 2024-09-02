import Contact from "./components/Contact"
import Hero from "./components/Hero"
import LogoClouds from "./components/LogoClouds"
import NavBar from "./components/NavBar"
import Services from "./components/Services"
import Projects from "./components/Projects"
{/* import Testimonial from "./components/Testimonial" */}

function App() {
  return (
    <div className="p-2 md:px-10">
      <NavBar />
      <Hero />
       <Services />
      <Projects />
      <LogoClouds />
      {/* <Testimonial /> */}
      <Contact />
    </div>
  )
}

export default App
