import { Route, Routes } from 'react-router-dom'
import ChromeNav from './components/ChromeNav.jsx'
import Footer from './components/Footer.jsx'
import ScrollDirector from './components/ScrollDirector.jsx'
import ComicR3FScene from './components/ComicR3FScene.jsx'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Post from './pages/Post.jsx'
import Projects from './pages/Projects.jsx'
import Project from './pages/Project.jsx'
import CostCalculator from './pages/CostCalculator.jsx'
import Lab from './pages/Lab.jsx'
import Now from './pages/Now.jsx'
import About from './pages/About.jsx'
import Hire from './pages/Hire.jsx'
import Support from './pages/Support.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <>
      <ScrollDirector />
      <ComicR3FScene />
      <ChromeNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/field-notes" element={<Writing />} />
          <Route path="/writing/:slug" element={<Post />} />
          <Route path="/field-notes/:slug" element={<Post />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<Project />} />
          <Route path="/tools/ai-coding-cost-calculator" element={<CostCalculator />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/now" element={<Now />} />
          <Route path="/about" element={<About />} />
          <Route path="/hire" element={<Hire />} />
          <Route path="/support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
