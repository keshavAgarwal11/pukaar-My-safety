document.addEventListener("DOMContentLoaded", () => {
  // Loading screen
  const loadingScreen = document.getElementById("loading-screen")

  window.addEventListener("load", () => {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1500)
  })

  // Dark And Light Mode Toggle
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  const mobileThemeToggleBtn = document.getElementById("mobile-theme-toggle-btn")
  const body = document.body

  const savedTheme = localStorage.getItem("theme")
  if (savedTheme) {
    body.classList.toggle("dark-mode", savedTheme === "dark")
  } else {
    body.classList.add("dark-mode")
  }

  function toggleTheme() {
    body.classList.toggle("dark-mode")
    const theme = body.classList.contains("dark-mode") ? "dark" : "light"
    localStorage.setItem("theme", theme)
  }

  themeToggleBtn.addEventListener("click", toggleTheme)
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener("click", toggleTheme)
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileMenu = document.querySelector(".mobile-menu")

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking a link
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu a")
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  })

  // Discreet quick exit on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      window.location.href = "https://www.accuweather.com/"
    }
  })

  // Smooth scrolling for anchor links with offset for fixed header
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight - 20,
          behavior: "smooth",
        })
      }
    })
  })

  // Scroll to section function
  window.scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId)
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight - 20,
        behavior: "smooth",
      })
    }
  }

  // Progress bar animation


  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".feature-card, .reason-card, .stat-card, .about-text, .donate-text, .roadmap-item, .progress-stat",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial state for animation
  document
    .querySelectorAll(
      ".feature-card, .reason-card, .stat-card, .about-text, .donate-text, .roadmap-item, .progress-stat",
    )
    .forEach((element) => {
      element.style.opacity = "0"
      element.style.transform = "translateY(20px)"
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    })

  // Run animation on load and scroll
  window.addEventListener("load", animateOnScroll)
  window.addEventListener("scroll", animateOnScroll)

  // Counter animation for hero stats
  const animateCounters = () => {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
    })
  }

  // Trigger counter animation when hero section is visible
  const heroSection = document.querySelector(".hero")
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(animateCounters, 1000)
        heroObserver.unobserve(entry.target)
      }
    })
  })

  heroObserver.observe(heroSection)

  // Improve mobile experience by adjusting header on scroll
  // let lastScrollTop = 0
  // const header = document.querySelector("header")

  // window.addEventListener("scroll", () => {
  //   const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  //   if (scrollTop > lastScrollTop && scrollTop > 100) {
  //     header.style.transform = "translateY(-100%)"
  //   } else {
  //     header.style.transform = "translateY(0)"
  //   }

  //   lastScrollTop = scrollTop
  // })

  // Feature Modal Functionality
  const modal = document.getElementById("feature-modal")
  const modalOverlay = document.getElementById("modal-overlay")
  const closeModal = document.querySelector(".close-modal")
  const modalTitle = document.getElementById("modal-title")
  const modalDescription = document.getElementById("modal-description")
  const modalSteps = document.getElementById("modal-steps")
  const modalBenefitsList = document.getElementById("modal-benefits-list")
  const modalIcon = document.querySelector(".modal-icon i")

  // Feature data
  const featureData = {
    "quick-exit": {
      title: "Quick Exit",
      icon: "fas fa-door-open",
      description:
        "The Quick Exit feature is your instant escape route when you need to quickly hide the app. With just one tap, PUKAAR transforms into a weather app, protecting your privacy and ensuring your safety.",
      steps: [
        "Tap the Quick Exit button anywhere in the app",
        "App instantly switches to weather interface",
        "Your session is securely saved",
        "Return safely when ready",
      ],
      benefits: ["Instant Privacy", "Secure", "Discreet", "Always Available"],
    },
    emergency: {
      title: "Emergency Help",
      icon: "fas fa-phone-alt",
      description:
        "Get immediate help when you need it most. Our Emergency Help feature provides instant access to emergency contacts, helplines, and emergency services with just one tap.",
      steps: [
        "Tap the Emergency Help button",
        "Choose from pre-configured emergency contacts",
        "Call is placed immediately",
        "Location is automatically shared if enabled",
      ],
      benefits: ["Instant Access", "Pre-configured", "Location Sharing", "24/7 Available"],
    },
    "voice-trigger": {
      title: "Voice Trigger",
      icon: "fas fa-microphone",
      description:
        "A discreet way to call for help. Simply type 'help' anywhere in the app to instantly alert your emergency contacts with your location and a distress message.",
      steps: [
        "Type 'help' in any text field within the app",
        "System recognizes the trigger word",
        "Emergency contacts are notified immediately",
        "Your location and distress message are sent",
      ],
      benefits: ["Discreet", "Quick Activation", "Auto Location", "Silent Alert"],
    },
    "police-stations": {
      title: "Police Stations",
      icon: "fas fa-user-shield",
      description:
        "Find nearby police stations instantly with contact details, directions, and real-time information. Get the help you need from law enforcement when every second counts.",
      steps: [
        "Open the Police Stations feature",
        "View nearby stations on the map",
        "Get contact details and directions",
        "Call directly or navigate to the station",
      ],
      benefits: ["Real-time Data", "Contact Info", "Navigation", "Emergency Ready"],
    },
    "abuse-quiz": {
      title: "Abuse Quiz",
      icon: "fas fa-clipboard-list",
      description:
        "An interactive questionnaire designed to help you identify signs of abuse and understand your situation better. Get personalized resources and support based on your responses.",
      steps: [
        "Take the confidential questionnaire",
        "Answer questions about your situation",
        "Receive personalized assessment",
        "Get recommended resources and support",
      ],
      benefits: ["Confidential", "Personalized", "Educational", "Resource Matching"],
    },
    articles: {
      title: "Latest Articles",
      icon: "fas fa-newspaper",
      description:
        "Stay informed with regularly updated articles on safety, legal rights, support options, and empowerment. Knowledge is power, and we keep you informed.",
      steps: [
        "Browse the latest articles",
        "Read about safety and legal rights",
        "Bookmark important information",
        "Share helpful articles with others",
      ],
      benefits: ["Up-to-date", "Expert Content", "Educational", "Shareable"],
    },
    "mental-health": {
      title: "Mental Health Support",
      icon: "fas fa-heart",
      description:
        "Access compassionate AI-powered mental health support whenever you need it. Our chatbot provides emotional support, coping strategies, and connects you with professional resources.",
      steps: [
        "Start a conversation with our AI support",
        "Share your feelings and concerns",
        "Receive personalized coping strategies",
        "Get connected to professional help if needed",
      ],
      benefits: ["24/7 Available", "Confidential", "Personalized", "Professional Backup"],
    },
    community: {
      title: "Community Chat",
      icon: "fas fa-users",
      description:
        "Connect with survivors and support groups in a safe, moderated environment. Share experiences, find support, and build connections with others who understand your journey.",
      steps: [
        "Join moderated support groups",
        "Share your experiences safely",
        "Connect with other survivors",
        "Access peer support and encouragement",
      ],
      benefits: ["Peer Support", "Moderated", "Safe Space", "Anonymous Option"],
    },
    websites: {
      title: "Important Websites",
      icon: "fas fa-globe",
      description:
        "Access a curated directory of trusted organizations and resources for domestic violence support, legal aid, and emergency services. All resources are verified and regularly updated.",
      steps: [
        "Browse categorized resource directory",
        "Find organizations by location or service type",
        "Access contact information and websites",
        "Save important resources for quick access",
      ],
      benefits: ["Verified Resources", "Categorized", "Location-based", "Quick Access"],
    },
    "legal-advisor": {
      title: "AI Legal Advisor",
      icon: "fas fa-balance-scale",
      description:
        "Get legal insights and guidance based on your specific situation with our AI-powered legal advisor. Understand your rights and options with clear, accessible explanations.",
      steps: [
        "Describe your legal situation",
        "Receive AI-powered legal insights",
        "Understand your rights and options",
        "Get referrals to legal professionals",
      ],
      benefits: ["Personalized Advice", "Rights Education", "Professional Referrals", "Confidential"],
    },
    resources: {
      title: "Legal Resources",
      icon: "fas fa-gavel",
      description:
        "Stay informed about women's safety laws with AI-powered explanations that are clear, accessible, and designed to empower you with knowledge about your legal rights.",
      steps: [
        "Browse legal topics and laws",
        "Get AI-powered explanations",
        "Understand your legal rights",
        "Access relevant legal documents",
      ],
      benefits: ["Clear Explanations", "Rights Education", "Updated Laws", "Empowering"],
    },
    "safety-planner": {
      title: "AI Safety Planner",
      icon: "fas fa-shield-alt",
      description:
        "Create a personalized safety plan with our AI-powered planner. Get step-by-step guidance on how to safely leave dangerous situations and protect yourself.",
      steps: [
        "Answer questions about your situation",
        "Receive a personalized safety plan",
        "Get step-by-step guidance",
        "Update your plan as needed",
      ],
      benefits: ["Personalized", "Step-by-step", "Updateable", "Expert-backed"],
    },
  }

  // Add click event listeners to feature cards
  document.querySelectorAll(".feature-card").forEach((card) => {
    const learnMoreBtn = card.querySelector(".learn-more-btn")
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const featureKey = card.getAttribute("data-feature")
        openFeatureModal(featureKey)
      })
    }
  })

  function openFeatureModal(featureKey) {
    const feature = featureData[featureKey]
    if (!feature) return

    // Update modal content
    modalTitle.textContent = feature.title
    modalIcon.className = feature.icon
    modalDescription.textContent = feature.description

    // Update steps
    modalSteps.innerHTML = ""
    feature.steps.forEach((step) => {
      const li = document.createElement("li")
      li.textContent = step
      modalSteps.appendChild(li)
    })

    // Update benefits
    modalBenefitsList.innerHTML = ""
    feature.benefits.forEach((benefit) => {
      const span = document.createElement("span")
      span.className = "benefit-tag"
      span.textContent = benefit
      modalBenefitsList.appendChild(span)
    })

    // Show modal
    modal.style.display = "block"
    modalOverlay.style.display = "block"
    document.body.style.overflow = "hidden"
  }

  function closeFeatureModal() {
    modal.style.display = "none"
    modalOverlay.style.display = "none"
    document.body.style.overflow = "auto"
  }

  // Close modal event listeners
  closeModal.addEventListener("click", closeFeatureModal)
  modalOverlay.addEventListener("click", closeFeatureModal)

  // Also close when clicking on the modal background (not the content)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeFeatureModal()
    }
  })

  // Close modal on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeFeatureModal()
    }
  })

  // Enhanced feature card interactions
  document.querySelectorAll(".feature-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.03)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroContent = document.querySelector(".hero-content")
    const heroImage = document.querySelector(".hero-image")

    if (heroContent && heroImage && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.1}px)`
      heroImage.style.transform = `translateY(${scrolled * 0.05}px)`
    }
  })

  // Add typing effect to hashtag
  const hashtag = document.querySelector(".hashtag")
  if (hashtag) {
    const text = hashtag.textContent
    hashtag.textContent = ""

    setTimeout(() => {
      let i = 0
      const typeWriter = () => {
        if (i < text.length) {
          hashtag.textContent += text.charAt(i)
          i++
          setTimeout(typeWriter, 100)
        }
      }
      typeWriter()
    }, 2000)
  }

  // Animate reason cards on scroll
  const reasonCards = document.querySelectorAll(".reason-card")
  const reasonObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0) scale(1)"
          }, index * 150)
        }
      })
    },
    { threshold: 0.1 },
  )

  reasonCards.forEach((card) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px) scale(0.95)"
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    reasonObserver.observe(card)
  })

  // Timeline animation
  const roadmapItems = document.querySelectorAll(".roadmap-item")
  const roadmapObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 200)
        }
      })
    },
    { threshold: 0.1 },
  )

  roadmapItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    roadmapObserver.observe(item)
  })
})