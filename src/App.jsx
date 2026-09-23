import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Project from './pages/Project'
import Writing from './pages/Writing'
import Post from './pages/Post'
import Workflow from './pages/Workflow'
import Hire from './pages/Hire'
import Login from './pages/Login'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'

export default function App() {
  return <><Nav /><Routes><Route path="/" element={<Home/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<Project/>}/><Route path="/writing" element={<Writing/>}/><Route path="/writing/:slug" element={<Post/>}/><Route path="/workflow" element={<Workflow/>}/><Route path="/hire" element={<Hire/>}/><Route path="/login" element={<Login/>}/><Route path="/admin" element={<Admin/>}/><Route path="*" element={<NotFound/>}/></Routes><Footer /></>
}
