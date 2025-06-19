"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {   Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Instagram, Mail, Target, Play, Camera, Video, CheckCircle } from "lucide-react"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"

export default function TrainerSections() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const mediaVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
            },
        },
    }

    // Legendary Performance Video Refs and State
    const legendaryVideoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [userInteracted, setUserInteracted] = useState(false)

    // Original video ref for highlights
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(err => {
                console.error("Failed to play:", err)
            })
        }
    }

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }

    // Legendary Performance Video Handlers
    const handleLegendaryMouseEnter = async () => {
        const video = legendaryVideoRef.current
        if (video && userInteracted) {
            try {
                video.currentTime = 0
                const playPromise = video.play()
                
                if (playPromise !== undefined) {
                    await playPromise
                    setIsPlaying(true)
                    console.log("Video started playing on hover")
                }
            } catch (err) {
                console.error("Autoplay failed:", err)
            }
        }
    }

    const handleLegendaryMouseLeave = () => {
        const video = legendaryVideoRef.current
        if (video && isPlaying) {
            video.pause()
            video.currentTime = 0
            setIsPlaying(false)
            console.log("Video paused and reset")
        }
    }

    // Handle user interaction to enable autoplay
    const handleVideoClick = async () => {
        const video = legendaryVideoRef.current
        if (video) {
            setUserInteracted(true)
            try {
                if (isPlaying) {
                    video.pause()
                    setIsPlaying(false)
                } else {
                    video.currentTime = 0
                    await video.play()
                    setIsPlaying(true)
                }
            } catch (err) {
                console.error("Manual play failed:", err)
            }
        }
    }

    // Enable autoplay after any user interaction on the page
    useEffect(() => {
        const handleUserInteraction = () => {
            setUserInteracted(true)
            // Remove listeners after first interaction
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
        }

        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('keydown', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)

        return () => {
            document.removeEventListener('click', handleUserInteraction)
            document.removeEventListener('keydown', handleUserInteraction)
            document.removeEventListener('touchstart', handleUserInteraction)
        }
    }, [])

    const highlights = [
        { type: "video", src: "/elite.mp4?height=400&width=600", title: "Elite Training Session" },
        { type: "image", src: "/actionshot.jpg?height=400&width=600", title: "Learning Every Swing" },
        { type: "video", src: "/drills.mp4?height=400&width=600", title: "Advanced Batting Techniques" },
        { type: "image", src: "/team.jpg?height=400&width=600", title: "Team Leadership Training" },
        { type: "video", src: "/v2.mp4?height=400&width=600", title: "Intense Training Session" },
        { type: "image", src: "/champion.jpg?height=400&width=600", title: "Championship Celebration" },
        { type: "video", src: "/v1.mp4?height=400&width=600", title: "Powerful Long Shots" },
        { type: "image", src: "/training.jpg?height=400&width=600", title: "Strategic Game Planning" },
        { type: "video", src: "/skills.mp4?height=400&width=600", title: "Fielding Made Simple" },
        { type: "image", src: "/dedication.jpg?height=400&width=600", title: "Passion Starts Early" },
        { type: "video", src: "/train.mp4?height=400&width=600", title: "Coaching Innovation" },
        { type: "image", src: "/team1.jpg?height=400&width=600", title: "Discipline Meets Fun" },
        { type: "image", src: "/private.jpg?height=400&width=600", title: "Skills Masterclass" },
        { type: "image", src: "/one.jpg?height=400&width=600", title: "Bond Through Baseball" },
        { type: "image", src: "/level.jpg?height=400&width=600", title: "Building Baseball Dreams" },
        { type: "image", src: "/p1.jpg?height=400&width=600", title: "Professional Excellence" },
    ]

    const MediaItem = ({ item, index }: { item: (typeof highlights)[0]; index: number }) => {
        const videoRef = useRef<HTMLVideoElement>(null)
        const [isHovered, setIsHovered] = useState(false)

        const handleMouseEnter = () => {
            setIsHovered(true)
            if (item.type === "video" && videoRef.current) {
                videoRef.current.currentTime = 0
                videoRef.current.play().catch(console.error)
            }
        }

        const handleMouseLeave = () => {
            setIsHovered(false)
            if (item.type === "video" && videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }
        }

        return (
            <motion.div
                key={index}
                variants={mediaVariants}
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="relative overflow-hidden aspect-[4/3]">
                    {item.type === "video" ? (
                        <video
                            ref={videoRef}
                            src={item.src}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <Image
                            src={item.src || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Play button for videos when not hovered */}
                    {item.type === "video" && !isHovered && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                                <Play className="w-8 h-8 text-red-500 ml-1" />
                            </div>
                        </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                        <Badge
                            className={`${item.type === "video" ? "bg-red-500" : "bg-orange-500"} text-white border-0 font-semibold`}
                        >
                            {item.type === "video" ? <Video className="w-3 h-3 mr-1" /> : <Camera className="w-3 h-3 mr-1" />}
                            {item.type.toUpperCase()}
                        </Badge>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.title}</h3>
                </div>
            </motion.div>
        )
    }

    return (
        <div className="min-h-screen bg-white font-['Inter']">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="container mx-auto px-4 py-8 space-y-12"
            >
                {/* Section 1: Kevin Saenz Jr Highlights */}
                <motion.section variants={itemVariants}>
                    {/* Hero Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative mb-12"
                        >
                            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 p-1 shadow-2xl">
                                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                                    <Image
                                        src="/coach1.jpg?height=160&width=160"
                                        alt="Kevin Saenz Jr"
                                        width={160}
                                        height={160}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight"
                            style={{
                                background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Kevin Saenz Jr
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-2xl md:text-3xl text-gray-700 mb-12 font-medium leading-relaxed max-w-3xl mx-auto"
                        >
                            Elite Baseball Training & Development Coach
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
                        >
                           
                           <a href="https://www.instagram.com/k_saenz_7/" target="_blank" rel="noopener noreferrer">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 font-bold px-10 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <Instagram className="w-6 h-6 mr-3" />
                                    @k_saenz_7
                                </Button>
                            </a>

                            <a href="https://www.instagram.com/stayhotbaseball" target="_blank" rel="noopener noreferrer">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500 font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <Instagram className="w-6 h-6 mr-3" />
                                    @stayhotbaseball
                                </Button>
                            </a>

                        </motion.div>
                    </div>

                    {/* Dynamic Highlights Grid */}
                    <motion.div variants={containerVariants} className="mb-8">
                        <motion.h2
                            variants={itemVariants}
                            className="text-2xl md:text-3xl font-medium text-center mb-8"
                            style={{
                                background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Training Highlights
                        </motion.h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {highlights.map((item, index) => (
                                <MediaItem key={index} item={item} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Professional Experience - Simple Trusted Companies Style */}
                    <motion.div variants={itemVariants} className="py-6">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-semibold text-gray-600 mb-8">Professional Experience</h3>
                        </div>
                        <div className="bg-gray-50 rounded-2xl py-8 px-6">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 flex-wrap">
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/pioneer.jpg?height=50&width=120"
                                        alt="Pioneer Baseball League"
                                        width={120}
                                        height={50}
                                        className="h-12 w-auto grayscale-0 transition-all duration-300"
                                    />
                                    <span className="text-gray-700 font-medium">Pioneer Baseball League</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/alpb.png?height=50&width=120"
                                        alt="Atlantic League"
                                        width={120}
                                        height={50}
                                        className="h-12 w-auto grayscale-0 transition-all duration-300"
                                    />
                                    <span className="text-gray-700 font-medium">Atlantic League</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/pribl.png?height=50&width=120"
                                        alt="Puerto Rico Pro League"
                                        width={120}
                                        height={50}
                                        className="h-12 w-auto grayscale-0 transition-all duration-300"
                                    />
                                    <span className="text-gray-700 font-medium">Puerto Rico Pro League</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Image
                                        src="/mlb.png?height=50&width=120"
                                        alt="MLB Draft League"
                                        width={120}
                                        height={50}
                                        className="h-12 w-auto grayscale-0 transition-all duration-300"
                                    />
                                    <span className="text-gray-700 font-medium">MLB Draft League</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </motion.section>

                {/* Legendary Performance Section */}
                <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
                    <div className="container px-4 md:px-6 mx-auto max-w-7xl">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase mb-4">
                                Elite Coaching Excellence
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Legendary Performance</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
                        </motion.div>

                        {/* Main Content */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                            {/* Video Section */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                    {/* Video Container */}
                                    <div
                                        className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-gray-900 cursor-pointer"
                                        onMouseEnter={handleLegendaryMouseEnter}
                                        onMouseLeave={handleLegendaryMouseLeave}
                                        onClick={handleVideoClick}
                                    >
                                        <video
                                            ref={legendaryVideoRef}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                            disablePictureInPicture
                                            controlsList="nodownload"
                                        >
                                            <source src="/puro.mp4" type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                        
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
                                        
                                        {/* Play/Pause Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-300">
                                            <div className={`bg-white/20 backdrop-blur-sm rounded-full p-4 transition-opacity duration-300 ${
                                                userInteracted && !isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                            }`}>
                                                {isPlaying ? (
                                                    <div className="h-12 w-12 flex items-center justify-center">
                                                        <div className="w-3 h-8 bg-white rounded-sm mr-1"></div>
                                                        <div className="w-3 h-8 bg-white rounded-sm"></div>
                                                    </div>
                                                ) : (
                                                    <Play className="h-12 w-12 text-white ml-1" />
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Interaction Prompt (shows before user interaction) */}
                                        {!userInteracted && (
                                            <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-2 rounded-lg text-sm backdrop-blur-sm z-30">
                                                Click to enable video interactions
                                            </div>
                                        )}
                                        
                                        {/* Video Status Indicator */}
                                        <div className="absolute top-4 right-4 z-30">
                                            <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                                isPlaying 
                                                    ? 'bg-green-500/80 text-white' 
                                                    : 'bg-gray-500/80 text-white'
                                            }`}>
                                                {isPlaying ? 'Playing' : 'Paused'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Content Section */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8"
                            >
                                <div>
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kevin Saenz Jr</h3>
                                    <div className="text-xl text-red-600 font-semibold mb-6">Puerto Rico Pro League Veteran & Professional Baseball Coach</div>
                                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                        Kevin Saenz Jr brings exceptional professional baseball experience from his time competing in the 
                                        Puerto Rico Professional Baseball League, along with his performances in the Pioneer Baseball League, 
                                        Atlantic League, and MLB Draft League. His firsthand knowledge of professional-level competition 
                                        provides unmatched insights into what it takes to succeed at the highest levels.
                                    </p>
                                    <p className="text-lg text-gray-700 leading-relaxed">
                                        Having competed against top-tier talent across multiple professional leagues, Kevin understands the 
                                        nuances of advanced game strategy, mental preparation, and the physical demands of professional baseball. 
                                        This real-world experience translates directly into his coaching methodology.
                                    </p>
                                </div>

                                {/* Features */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-100"
                                    >
                                        <div>
                                            <div className="font-semibold text-gray-900">Professional Experience</div>
                                            <div className="text-sm text-gray-600">Multi-league veteran</div>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-100"
                                    >
                                        <div>
                                            <div className="font-semibold text-gray-900">Advanced Strategy</div>
                                            <div className="text-sm text-gray-600">Pro-level game knowledge</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Secondary Image & Contact Section */}
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                            {/* Contact Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="lg:order-2"
                            >
                                <Card className="border-2 border-gradient-to-r from-red-200 to-orange-200 shadow-xl">
                                    <CardContent className="p-8">
                                        <div className="text-center mb-8">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Professional Baseball Training</h4>
                                            <p className="text-gray-600 mb-6">
                                                Learn from a coach who has competed at the professional level in Puerto Rico Pro League, 
                                                Atlantic League, Pioneer Baseball League, and MLB Draft League. Get training that's based 
                                                on real professional experience.
                                            </p>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
                                                <Mail className="h-6 w-6 text-red-500" />
                                                <div className="text-center">
                                                    <div className="font-semibold text-gray-900">Professional Training</div>
                                                    <a
                                                        href="mailto:insaenztraining@gmail.com"
                                                        className="text-red-600 hover:text-red-700 font-medium transition-colors"
                                                    >
                                                        insaenztraining@gmail.com
                                                    </a>
                                                </div>
                                            </div>

                                            <Button
                                                className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                                onClick={() => (window.location.href = "mailto:insaenztraining@gmail.com")}
                                            >
                                                Unlock Your Potential
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Second Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="lg:order-1"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/puro.jpg"
                                        alt="Kevin Saenz Jr - Mastery in Action"
                                        width={600}
                                        height={500}
                                        className="w-full h-[500px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Section 2: College Showcase Information */}
                <motion.section variants={itemVariants} className="py-8 bg-gray-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <motion.div variants={itemVariants} className="text-center mb-12">
                            <h2
                                className="text-2xl md:text-3xl font-bold mb-4"
                                style={{
                                    background: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Want to attend a college showcase?
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                Submit your video and information to take your baseball career to the next level
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Card className="bg-white shadow-md border border-gray-200 overflow-hidden rounded-2xl">
                                <CardHeader className="text-center bg-gradient-to-r from-red-50 to-orange-50 py-4">
                                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                        How to Submit Your Showcase
                                    </CardTitle>
                                    <div className="flex items-center justify-center gap-3 bg-white rounded-lg px-6 py-3 shadow-sm max-w-fit mx-auto border">
                                        <Mail className="w-5 h-5 text-orange-600" />
                                        <span className="text-lg font-semibold text-gray-900">insaenztraining@gmail.com</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Required Information */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                                    <CheckCircle className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">Required Information</h3>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {[
                                                    "First and last name",
                                                    "Height",
                                                    "Weight",
                                                    "GPA",
                                                    "Class",
                                                    "Age / position",
                                                    "Home state",
                                                ].map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all duration-200"
                                                    >
                                                        <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex-shrink-0" />
                                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* What to Include */}
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                                    <Target className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">What to Include</h3>
                                            </div>

                                            <div className="space-y-3">
                                                {[
                                                    "Game highlight videos",
                                                    "Training session footage",
                                                    "Batting practice clips",
                                                    "Fielding demonstrations",
                                                    "Recent performance stats",
                                                    "Academic achievements",
                                                ].map((item, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.1 }}
                                                        className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg hover:from-red-100 hover:to-orange-100 transition-all duration-200"
                                                    >
                                                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                            <CheckCircle className="w-3 h-3 text-white" />
                                                        </div>
                                                        <span className="text-sm font-mediumtext-gray-700">{item}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call to Action */}
                                    <motion.div variants={itemVariants} className="mt-6 text-center">
                                        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 border border-red-100">
                                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h4>
                                            <p className="text-base text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                                                Send your information and showcase materials to our email. We'll review your submission and
                                                connect you with college recruitment opportunities that match your potential.
                                            </p>
                                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>

                                                <a href="mailto:insaenztraining@gmail.com">
                                                    <Button
                                                        asChild
                                                        size="lg"
                                                        className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-200"
                                                    >
                                                        <span className="flex items-center">
                                                            <Mail className="w-5 h-5 mr-2" />
                                                            Submit Your Showcase
                                                        </span>
                                                    </Button>
                                                </a>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </motion.section>
            </motion.div>
        </div>
    )
}
