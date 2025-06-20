"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { Instagram, Twitter, Facebook, ChevronRight, Calendar, User, MapPin, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { AnimatedCounter } from "@/components/animated-counter"
import { AnimatedText } from "@/components/animated-text"
import { FancyLogo } from "@/components/fancy-logo"
import { MobileMenu } from "@/components/mobile-menu"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TrainerSections from "@/components/trainer-section";
import PackageComponent from "@/components/package-section";
import { useState } from "react";
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});
interface FormData {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  subject?: string
  message?: string
}

interface ApiResponse {
  message?: string
  error?: string
  emailInfo?: {
    messageId: string
    accepted: string[]
    rejected: string[]
  }
}

type SubmitStatus = 'success' | 'error' | null

// Form validation function (add this outside your component)
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {}
  
  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required'
  }
  
  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required'
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address'
  }
  
  if (!data.subject.trim()) {
    errors.subject = 'Subject is required'
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required'
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  }
  
  return errors
}

// Button component (add this outside your component)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button 
    className={`bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
)
export default function Home() {
  const navItems = [
    { title: "About", href: "#about" },
    { title: "Training", href: "#training" },
    { title: "Success Stories", href: "#testimonials" },
    { title: "Gallery", href: "#gallery" },
    { title: "Contact", href: "#contact" },
  ]

  const router = useRouter();
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      window.open(
        'https://app.repcard.com/InSaenzTraining',
        '_blank'
      );
    }
  };
  const handleClickhero = () => {
    if (typeof window !== 'undefined') {
      window.open(
        'https://www.skool.com/stayhotbaseballnetwork/about?ref=e7a222800ed449049236361ae809cca0',
        '_blank'
      );
    }
  };


const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)

  // ADD THESE FUNCTIONS INSIDE YOUR Home() COMPONENT
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    console.log('Form submission started', formData) // Debug log
    
    // Validate form
    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      console.log('Validation errors:', validationErrors) // Debug log
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrors({}) // Clear any previous errors

    try {
      console.log('Sending request to /api/contact') // Debug log
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status) // Debug log
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('application/json') !== -1) {
        const result: ApiResponse = await response.json()
        console.log('Response data:', result) // Debug log

        if (response.ok) {
          setSubmitStatus('success')
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            subject: '',
            message: ''
          })
          setErrors({})
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setSubmitStatus(null)
          }, 5000)
        } else {
          setSubmitStatus('error')
          console.error('API Error:', result.error)
        }
      } else {
        // Non-JSON response, likely an error
        const textResponse = await response.text()
        console.error('Non-JSON response:', textResponse)
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network/Parse error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-bold text-xl"
          >
            <FancyLogo />
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                  {item.title}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button onClick={handleClick}>Sign up for Online Database
              </Button>
            </motion.div>
            <MobileMenu items={navItems} />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://assets.skool.com/f/63b0415f99d644b6ba4a55d28db87fa3/6def3f8f0b754fb7a1c1c3bb8a284f477f75efd6c3ef462c97a6b804b439f3fd-md.jpg"
              alt="Baseball training hero image"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="container relative z-10 py-16 md:py-24 lg:py-32 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl space-y-4"
            >
              <AnimatedText
                text="Stay Hot and Dominate the Game"
                tag="h1"
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                staggerChildren={0.05}
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg lg:text-xl"
              >
                Offering international opportunities to play for summer teams in Puerto Rico. Players will receive the full experience with development, housing, meal plans, and the opportunity to compete at a high level.
                Play against Puerto Rico’s top prospects.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    onClick={handleClickhero}
                   
                    className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                  >
                   Sign up for Online Database
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Button
                    onClick={() => router.push('/#training')}
                    
                    className="text-black border-white w-full sm:w-auto"
                  >
                    View Training Programs
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-10 md:py-12 bg-slate-50">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
              <div className="space-y-1 md:space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-red-600">5,000+</p>
                <p className="text-sm md:text-base text-muted-foreground">Players Trained</p>
              </div>
              <div className="space-y-1 md:space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-red-600">10+ Years</p>
                <p className="text-sm md:text-base text-muted-foreground">Collegiate / Professional Experience</p>
              </div>
              <div className="space-y-1 md:space-y-2">
                <p className="text-3xl md:text-4xl font-bold text-red-600">Active Pro</p>
                <p className="text-sm md:text-base text-muted-foreground">Current Professional Catcher</p>
              </div>
            </div>
          </div>
        </section>


        {/* About Section */}
        <section id="about" className="py-12 md:py-16 lg:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
              >
                <Image src="/Coach.jpg" alt="Kevin Saenz Jr training baseball players" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-4 md:space-y-6"
              >
                <div className="inline-block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
                  About Your Coach
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Meet Kevin Saenz Jr</h2>
                <p className="text-muted-foreground text-sm md:text-base">
                  Kevin Saenz Jr is a current active professional catcher with over 10 years of collegiate and professional experience. He has trained more than 5,000 players, helping athletes of all levels sharpen their skills and reach their potential. Kevin brings deep knowledge, passion, and a proven approach to developing elite baseball talent.
                </p>
                <ul className="space-y-2">
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm md:text-base">Personalized training plans tailored to each athlete</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm md:text-base">In-depth video analysis and real-time feedback</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm md:text-base">Mental performance and mindset coaching</span>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm md:text-base">College recruitment and advancement guidance</span>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Training Programs */}
        <section id="training" className="py-12 md:py-16 lg:py-24 bg-slate-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4">Training Programs</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Customized training programs designed to improve specific skills and overall performance. Choose the
                program that fits your goals and schedule.
              </p>
            </motion.div>

            <Tabs defaultValue="pitching" className="max-w-4xl mx-auto">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 md:mb-8 w-full">
                {["pitching", "hitting", "fielding / catching", "complete"].map((tab, i) => (
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                    className="w-full"
                  >
                    <TabsTrigger value={tab} className="w-full capitalize">
                      {tab}
                    </TabsTrigger>
                  </motion.div>
                ))}
              </TabsList>
              <TabsContent value="pitching" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                  <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                    <Image src="/pitch.jpg" alt="Pitching training" fill className="object-cover" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">Pitching Mastery</h3>
                    <p className="text-sm md:text-base">
                      Develop proper mechanics, increase velocity, and improve control with our specialized pitching
                      program. Learn different pitch types and when to use them effectively.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Mechanics refinement</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Velocity development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Control and command training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Pitch selection strategy</span>
                      </li>
                    </ul>
                    {/* <div className="pt-2 md:pt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button>Book Pitching Training</Button>
                      </motion.div>
                    </div> */}
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="hitting" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                  <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                    <Image src="hitting.jpg" alt="Hitting training" fill className="object-cover" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">Power Hitting</h3>
                    <p className="text-sm md:text-base">
                      Improve your batting average and power with our comprehensive hitting program. Focus on stance,
                      swing mechanics, timing, and mental approach at the plate.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Swing mechanics analysis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Power development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Plate discipline training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Situational hitting</span>
                      </li>
                    </ul>
                    {/* <div className="pt-2 md:pt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button>Book Hitting Training</Button>
                      </motion.div>
                    </div> */}
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="fielding / catching" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                  <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                    <Image src="/field.jpeg" alt="Fielding training" fill className="object-cover" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">Elite Fielding</h3>
                    <p className="text-sm md:text-base">
                      Enhance your defensive skills with our fielding program. Improve footwork, glove work, throwing
                      accuracy, and defensive positioning.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Footwork and positioning</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Glove work techniques</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Throwing mechanics</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Double play drills</span>
                      </li>
                    </ul>
                    {/* <div className="pt-2 md:pt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button>Book Fielding Training</Button>
                      </motion.div>
                    </div> */}
                  </div>
                </motion.div>
              </TabsContent>
              <TabsContent value="complete" className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid md:grid-cols-2 gap-6 md:gap-8"
                >
                  <div className="relative h-[200px] sm:h-[250px] md:h-[300px] rounded-lg overflow-hidden">
                    <Image src="complete.jpg" alt="Complete training" fill className="object-cover" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-bold">Complete Player Development</h3>
                    <p className="text-sm md:text-base">
                      Our most comprehensive program covers all aspects of baseball. Develop as a complete player with
                      training in pitching, hitting, fielding, and game strategy.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">All-around skill development</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Position-specific training</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Game strategy and baseball IQ</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <span className="text-sm md:text-base">Physical conditioning</span>
                      </li>
                    </ul>
                    {/* <div className="pt-2 md:pt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button>Book Complete Training</Button>
                      </motion.div>
                    </div> */}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
<PackageComponent/>
        <section className="py-8 md:py-12 bg-slate-50" id="packages">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Private Training Packages</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-8">
                Hour-long private lessons with a trainer. Choose the package that fits your goals and schedule.
              </p>

              {/* Centered Package Display */}
              <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8">
                  {[
                    { hours: 4, price: "$325" },
                    { hours: 6, price: "$425" },
                    { hours: 8, price: "$525" },
                  ].map((pkg, index) => (
                    <motion.div
                      key={pkg.hours}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center px-6 py-4 border-r border-gray-200 last:border-r-0 sm:border-r sm:last:border-r-0 border-b sm:border-b-0 last:border-b-0"
                    >
                      <div className="text-lg font-semibold text-red-600 mb-2">{pkg.hours} Hours</div>
                      <div className="text-2xl font-bold text-gray-900">{pkg.price}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Single Centered Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex justify-center"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      
                      className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-12 py-3 text-lg font-semibold"
                      onClick={() =>
                        window.open(
                          "https://www.skool.com/stayhotbaseballnetwork/about?ref=e7a222800ed449049236361ae809cca0",
                          "_blank",
                        )
                      }
                    >
                      Book Training Package
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        

        {/* Gallery */}
        <section id="gallery" className="py-12 md:py-16 lg:py-24 bg-slate-50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4">Training Gallery</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                See our training sessions and player development in action.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-mgbjv.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-lacn2.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-9kn23.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-ocrfc.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-rti5s.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="relative aspect-square rounded-lg overflow-hidden"
              >
                <Image src="/placeholder-j4v9e.png" alt="Training gallery" fill className="object-cover" />
              </motion.div>
            </div>

            {/* <div className="text-center mt-6 md:mt-8">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline">View More Photos</Button>
              </motion.div>
            </div> */}
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-r from-red-600 to-orange-500 text-white overflow-hidden relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container relative z-10"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4">
                Book a Clinic – $75 per Player
              </h2>
              <p className="text-sm md:text-base mb-6 md:mb-8">
                Hitting, catching, and infield clinic. A high-impact session led by Kevin Saenz Jr focused on elite development and team growth.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleClick}
                 
                  className="bg-white text-red-600 hover:bg-gray-100 w-full sm:w-auto"
                >
                  Sign up for team clinic
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Background animation elements */}
          <motion.div
            className="absolute -top-20 -right-20 w-48 md:w-64 h-48 md:h-64 rounded-full bg-red-500 opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-64 md:w-96 h-64 md:h-96 rounded-full bg-red-500 opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -10, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </section>
        <section>
          <TrainerSections />
        </section>
        <section id="testimonials" className="py-12 md:py-16 lg:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4">Success Stories</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Hear from parents and players whose baseball journey has been transformed through Kevin’s training.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                        <Image src="/placeholder-6ed76.png" alt="Parent testimonial" fill className="object-cover" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base text-muted-foreground italic">
                          "Kevin tailored the training to my son's skill level, skipping beginner steps and focusing on refining
                          his catching. We're excited for our upcoming hitting sessions!"
                        </p>
                        <h4 className="font-semibold text-sm md:text-base">Michael Simmons</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Parent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                        <Image src="/placeholder-mmy51.png" alt="Parent testimonial" fill className="object-cover" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base text-muted-foreground italic">
                          "Kevin is the most dedicated and genuine coach we’ve met. His passion shows in every session, and my
                          son’s progress has been incredible. We’re always excited for the next lesson!"
                        </p>
                        <h4 className="font-semibold text-sm md:text-base">Josh Weaver</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Parent</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="sm:col-span-2 lg:col-span-1"
              >
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden">
                        <Image src="/placeholder-jkqer.png" alt="Player testimonial" fill className="object-cover" />
                      </div>
                      <div className="space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base text-muted-foreground italic">
                          "I love training with Kevin! My fielding, pitching, and hitting have improved so much. His drills and
                          real-world tips make learning fun and effective."
                        </p>
                        <h4 className="font-semibold text-sm md:text-base">Zach Tristan</h4>
                        <p className="text-xs md:text-sm text-muted-foreground">Youth Player</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Contact */}
          <section id="contact" className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left side - contact info (unchanged) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 md:mb-4">Get in Touch</h2>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">
                Have questions about our training programs? Contact us for more information.
              </p>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-red-100 p-2 md:p-3 rounded-full">
                    <User className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base">Name</h3>
                    <p className="text-xs md:text-sm text-gray-600">Kevin Saenz</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-red-100 p-2 md:p-3 rounded-full">
                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base">Training Facility</h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      30803 Ruth ct, Tracy CA
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center gap-4"
                >
                  <div className="bg-red-100 p-2 md:p-3 rounded-full">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base">Training Hours</h3>
                    <p className="text-xs md:text-sm text-gray-600">Monday - Friday: 3PM - 9PM</p>
                    <p className="text-xs md:text-sm text-gray-600">Saturday: 9AM - 5PM</p>
                    <p className="text-xs md:text-sm text-gray-600">Sunday: By appointment only</p>
                  </div>
                </motion.div>
              </div>

              <div className="flex gap-4 mt-6 md:mt-8">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://instagram.com"
                    className="p-2 rounded-full text-red-600 transition-colors hover:bg-red-50 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://twitter.com"
                    className="p-2 rounded-full text-red-600 transition-colors hover:bg-red-50 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="https://facebook.com"
                    className="p-2 rounded-full text-red-600 transition-colors hover:bg-red-50 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - contact form (UPDATED) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 p-4 md:p-8 rounded-lg"
            >
              <h3 className="text-lg md:text-xl font-bold mb-4">Send us a Message</h3>
              
              {/* Success Message */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 text-sm">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-3"
                >
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm">
                    Sorry, there was an error sending your message. Please try again later.
                  </p>
                </motion.div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-2"
                  >
                    <label htmlFor="firstName" className="text-xs md:text-sm font-medium">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border bg-white px-3 py-2 text-xs md:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent ${
                        errors.firstName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <label htmlFor="lastName" className="text-xs md:text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full rounded-md border bg-white px-3 py-2 text-xs md:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent ${
                        errors.lastName ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-600">{errors.lastName}</p>
                    )}
                  </motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label htmlFor="email" className="text-xs md:text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border bg-white px-3 py-2 text-xs md:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <label htmlFor="subject" className="text-xs md:text-sm font-medium">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full rounded-md border bg-white px-3 py-2 text-xs md:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent ${
                      errors.subject ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Training Inquiry"
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-600">{errors.subject}</p>
                  )}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="space-y-2"
                >
                  <label htmlFor="message" className="text-xs md:text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full min-h-[100px] md:min-h-[120px] rounded-md border bg-white px-3 py-2 text-xs md:text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:border-transparent resize-vertical ${
                      errors.message ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="I'm interested in learning more about your training programs..."
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600">{errors.message}</p>
                  )}
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button 
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <FancyLogo />
              <p className="text-xs md:text-sm text-muted-foreground">
                Professional baseball training for players of all levels. Take your game to the next level.
              </p>
            </motion.div>

            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h3>
              <ul className="space-y-2">
                {["About", "Training Programs", "Success Stories", "Gallery", "Contact"].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <Link
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="text-xs md:text-sm text-muted-foreground hover:text-foreground"
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Training Programs</h3>
              <ul className="space-y-2">
                {[
                  "Pitching Mastery",
                  "Power Hitting",
                  "Elite Fielding",
                  "Complete Player Development",
                  "Team Training",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * i }}
                  >
                    <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:text-foreground">
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Follow Us</h3>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                    <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                    <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                    <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="border-t mt-6 md:mt-8 pt-6 md:pt-8 text-center text-xs md:text-sm text-muted-foreground"
          >
            <p>© {new Date().getFullYear()} Stay Hot Baseball. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
