'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { personalInfo, experiences, projects, skills, education } from './data'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isClient, setIsClient] = useState(false)

  const heroRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const projectRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const sectionRefs = [
    { id: 'hero', ref: heroRef },
    { id: 'work', ref: workRef },
    { id: 'projects', ref: projectRef },
    { id: 'skills', ref: skillsRef },
    { id: 'education', ref: educationRef },
    { id: 'contact', ref: contactRef }
  ]

  // Fixed smooth scroll function
  const scrollToSection = (id: string) => {
    const section = sectionRefs.find(s => s.id === id)?.ref.current
    if (section) {
      const offset = window.innerWidth < 768 ? 60 : 0
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    setIsClient(true) // Mark that we're on the client

    // Set up ScrollTrigger observers for active section
    sectionRefs.forEach(({ id, ref }) => {
      if (ref.current) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: 'top center',
          end: 'bottom center',
          onToggle: self => self.isActive && setActiveSection(id),
          markers: false
        })
      }
    })

    // Only run animations on client
    if (typeof window !== 'undefined') {
      // Initial fade-in for all sections
      gsap.utils.toArray(sectionRefs.map(({ ref }) => ref.current)).forEach((section: any) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 }
        )
      })

      // Item animations
      sectionRefs.forEach(({ ref }) => {
        const section = ref.current
        if (!section) return
        
        const items = section.querySelectorAll('.animate-item')
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none'
            }
          }
        )
      })

      // Hero animations
      if (heroRef.current) {
        // Profile image animation
        gsap.fromTo(heroRef.current.querySelector('img'),
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'elastic.out(1.1, 0.5)' }
        )

        // Text stagger animation
        const heroItems = heroRef.current.querySelectorAll('.hero-item')
        gsap.fromTo(heroItems,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.2, duration: 0.7 }
        )
      }

      // Card hover animations
      gsap.utils.toArray('.card').forEach((card: any) => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf('*')
    }
  }, [])

  return (
    <main className="font-sans text-gray-800 bg-[#36454F]">
      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#36454F] text-[#EAEAEA] hidden md:block shadow-xl z-20">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 text-white">{personalInfo.name}</h1>
          <nav className="space-y-2">
            {sectionRefs.map(({ id }) => (
              <a 
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block py-3 px-4 rounded-lg transition-all cursor-pointer ${
                  activeSection === id 
                    ? 'bg-[#617C58] text-white' 
                    : 'hover:bg-[#617C58]/50 hover:text-white'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* MOBILE NAV */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#36454F] text-[#EAEAEA] shadow-lg z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-lg font-bold text-white">{personalInfo.name}</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className={`bg-[#36454F] px-6 overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
          <nav className="space-y-3">
            {sectionRefs.map(({ id }) => (
              <a 
                key={id}
                onClick={() => scrollToSection(id)}
                className={`block py-3 px-4 rounded-lg transition cursor-pointer ${
                  activeSection === id 
                    ? 'bg-[#617C58] text-white' 
                    : 'hover:bg-[#617C58]/50 hover:text-white'
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </nav>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="md:ml-64 pt-16 md:pt-0">
        {/* HERO */}
        <section ref={heroRef} id="hero" className="pt-12 md:pt-24 pb-24 text-center bg-gradient-to-br from-[#617C58] to-[#36454F] px-6">
          <img src="/profile.jpg" alt="Profile" className="w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-2xl border-4 border-white/20" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-white hero-item">{personalInfo.name}</h1>
          <p className="text-xl text-[#EAEAEA] mb-2 hero-item">{personalInfo.title}</p>
          <p className="text-md text-[#cbd5e0] mb-6 hero-item">{personalInfo.location}</p>
          <div className="hero-item">
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="inline-block bg-[#617C58] hover:bg-[#4a6344] text-white px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
            >
              Contact Me
            </a>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section ref={workRef} className="py-20 max-w-4xl mx-auto px-6 bg-[#f0f5ec]" id="work">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#617C58] animate-item">Professional Experience</h2>
          <div className="space-y-12">
            {experiences.map((job, i) => (
              <div key={i} className="card bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-300 animate-item border border-[#617C58]/20 hover:border-[#617C58]/40">
                <h3 className="text-2xl font-semibold text-[#617C58]">{job.title}</h3>
                <p className="text-sm text-[#718096] mb-4">{job.date}</p>
                {job.desc && <p className="text-md text-gray-700 mb-6 italic border-l-4 border-[#617C58] pl-4 py-1">{job.desc}</p>}
                <ul className="space-y-3">
                  {job.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#617C58] mr-2 mt-1">•</span>
                      <span className="text-gray-700">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section ref={projectRef} className="py-20 bg-[#36454F] max-w-4xl mx-auto px-6" id="projects">
          <h2 className="text-3xl font-bold text-center mb-16 text-white animate-item">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((proj, i) => (
              <div key={i} className="card bg-[#617C58]/10 backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-300 animate-item border border-[#617C58]/30">
                <h3 className="text-xl font-semibold text-[#EAEAEA]">{proj.title}</h3>
                <p className="text-sm text-[#a0aec0] mb-4">{proj.date}</p>
                <ul className="space-y-3">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#617C58] mr-2 mt-1">•</span>
                      <span className="text-[#EAEAEA]">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section ref={skillsRef} className="py-20 max-w-4xl mx-auto px-6 bg-[#f0f5ec]" id="skills">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#617C58] animate-item">Technical Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="card bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 animate-item border border-[#617C58]/20 hover:border-[#617C58]/40">
                <h4 className="font-semibold text-lg text-[#617C58] mb-3">{skill.title}</h4>
                <p className="text-gray-700">{skill.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section ref={educationRef} className="py-20 bg-[#36454F] max-w-4xl mx-auto px-6" id="education">
          <h2 className="text-3xl font-bold text-center mb-16 text-white animate-item">Education</h2>
          <div className="space-y-8">
            {education.map((edu, i) => (
              <div key={i} className="card bg-[#617C58]/10 backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-300 animate-item border border-[#617C58]/30">
                <h4 className="font-semibold text-xl text-[#EAEAEA]">{edu.degree}</h4>
                <p className="text-[#a0aec0]">{edu.school}</p>
                <p className="text-sm text-[#cbd5e0] mt-2">{edu.year} | GPA: {edu.gpa}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactRef} className="py-20 text-center bg-gradient-to-tr from-[#617C58] to-[#36454F]" id="contact">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-white animate-item">Let's Connect</h2>
            <p className="text-xl text-[#EAEAEA] mb-6 animate-item">I'm always open to new opportunities and collaborations</p>
            
            <div className="bg-[#617C58]/20 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto animate-item border border-[#617C58]/30">
              <p className="text-lg text-[#EAEAEA] mb-4">
                <span className="font-medium">Location:</span> {personalInfo.location}
              </p>
              <p className="text-lg text-[#EAEAEA] mb-6">
                <span className="font-medium">Email:</span> {personalInfo.email}
              </p>
              
              <a 
                href={`mailto:${personalInfo.email}`} 
                className="inline-block bg-[#617C58] text-white hover:bg-[#4a6344] px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Send Message
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}