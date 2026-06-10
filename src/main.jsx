import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Writing from './pages/Writing.jsx'
import Post from './pages/Post.jsx'
import Projects from './pages/Projects.jsx'
import Project from './pages/Project.jsx'
import Lab from './pages/Lab.jsx'
import CostCalculator from './pages/CostCalculator.jsx'
import Now from './pages/Now.jsx'
import About from './pages/About.jsx'
import Hire from './pages/Hire.jsx'
import Support from './pages/Support.jsx'
import NotFound from './pages/NotFound.jsx'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Home />} />
          <Route path="writing" element={<Writing />} />
          <Route path="writing/:slug" element={<Post />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<Project />} />
          <Route path="lab" element={<Lab />} />
          <Route path="lab/ai-coding-cost-calculator" element={<CostCalculator />} />
          <Route path="now" element={<Now />} />
          <Route path="about" element={<About />} />
          <Route path="hire" element={<Hire />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
