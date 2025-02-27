import { defineNuxtPlugin } from '#app'
import gsap from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

export default defineNuxtPlugin((nuxtApp) => {
  // Enregistrer le plugin GSAP
  gsap.registerPlugin(ScrollToPlugin)

  // Définir une variable globale pour suivre si une animation de défilement est en cours
  let isScrolling = false
  // Mémoriser la dernière section cible pour éviter les interruptions
  let lastTargetSection = null
  // Mémoriser le dernier timeline pour pouvoir l'annuler si nécessaire
  let lastScrollTimeline = null

  // Fonction pour faire défiler en douceur vers une section avec un ID spécifique
  const scrollToSection = (sectionId, options = {}) => {
    // Options par défaut
    const defaultOptions = {
      duration: 1.5,
      delay: 0,
      ease: 'power2.inOut',
      force: false,  // Forcer le défilement même si une animation est en cours
      onComplete: null
    }
    
    // Fusionner les options par défaut avec les options fournies
    const mergedOptions = { ...defaultOptions, ...options }
    
    // Obtenir la section cible
    const section = document.querySelector(`[data-section="${sectionId}"]`)
    
    if (!section) return false
    
    // Si déjà sur cette section et pas forcé, ne rien faire
    if (lastTargetSection === sectionId && !mergedOptions.force) {
      return true
    }
    
    // Si un défilement est déjà en cours et n'est pas forcé, ne pas l'interrompre
    if (isScrolling && !mergedOptions.force) {
      return false
    }
    
    // Récupérer la position de la section
    const offsetLeft = section.offsetLeft
    
    // Si une animation est en cours et qu'on force, annuler l'animation précédente
    if (isScrolling && mergedOptions.force && lastScrollTimeline) {
      lastScrollTimeline.kill()
    }
    
    // Cas spécial pour la section d'accueil (position 0)
    const isHomeSection = sectionId === 'home'
    
    // Marquer que le défilement est en cours
    isScrolling = true
    lastTargetSection = sectionId
    
    // Créer une nouvelle timeline pour le défilement
    lastScrollTimeline = gsap.to(window, {
      duration: mergedOptions.duration,
      delay: mergedOptions.delay,
      ease: mergedOptions.ease,
      scrollTo: {
        x: offsetLeft,
        autoKill: false
      },
      onComplete: () => {
        isScrolling = false
        
        // Pour la section home, vérifier explicitement que nous sommes bien à la position 0
        if (isHomeSection && window.scrollX > 10) {
          // Si nous ne sommes pas au début, forcer un défilement supplémentaire
          gsap.to(window, {
            duration: 0.5,
            scrollTo: { x: 0, autoKill: false },
            ease: 'power1.out'
          })
        }
        
        // Appeler le callback onComplete s'il est fourni
        if (typeof mergedOptions.onComplete === 'function') {
          mergedOptions.onComplete()
        }
      }
    })
    
    return true
  }
  
  // Fonction pour vérifier si un défilement est actuellement en cours
  const isScrollingInProgress = () => isScrolling
  
  // Fonction pour obtenir la section visible en fonction de la position de défilement
  const getVisibleSection = () => {
    const scrollPosition = window.scrollX
    const windowWidth = window.innerWidth
    const sections = document.querySelectorAll('.section')
    
    for (const section of sections) {
      const sectionLeft = section.offsetLeft
      const sectionWidth = section.offsetWidth

      if (
        scrollPosition >= sectionLeft - windowWidth / 2 &&
        scrollPosition < sectionLeft + sectionWidth - windowWidth / 2
      ) {
        return section.dataset.section
      }
    }
    
    return null
  }
  
  // Exposer les fonctions au reste de l'application
  nuxtApp.provide('scrollToSection', scrollToSection)
  nuxtApp.provide('isScrollingInProgress', isScrollingInProgress)
  nuxtApp.provide('getVisibleSection', getVisibleSection)
  
  // Variables pour tracker le défilement manuel de l'utilisateur
  let userScrolling = false
  let userScrollTimeout = null
  
  // Écouter le début du défilement manuel
  const handleScrollStart = () => {
    // Annuler toute animation GSAP en cours lors d'un défilement manuel
    if (isScrolling && lastScrollTimeline) {
      lastScrollTimeline.kill()
      isScrolling = false
    }
    
    userScrolling = true
    clearTimeout(userScrollTimeout)
  }
  
  // Écouter la fin du défilement manuel
  const handleScrollEnd = () => {
    clearTimeout(userScrollTimeout)
    userScrollTimeout = setTimeout(() => {
      userScrolling = false
    }, 150) // Délai pour détecter la fin du défilement
  }
  
  // Ajouter les écouteurs d'événements pour le défilement manuel
  window.addEventListener('wheel', handleScrollStart, { passive: true })
  window.addEventListener('touchstart', handleScrollStart, { passive: true })
  window.addEventListener('wheel', handleScrollEnd, { passive: true })
  window.addEventListener('touchend', handleScrollEnd, { passive: true })
  
  // Fonction spéciale pour gérer le chargement initial avec hash
  const handleInitialHashNavigation = () => {
    // Traiter le hash dans l'URL
    const hash = window.location.hash.substring(1)
    if (!hash) return
    
    // Pour le chargement initial, nous devons nous assurer que le DOM est prêt
    const checkDomAndScroll = () => {
      const section = document.querySelector(`[data-section="${hash}"]`)
      if (section) {
        // Délai de 50ms pour être sûr que tout est prêt
        setTimeout(() => {
          // Force le défilement même si une autre animation est en cours
          scrollToSection(hash, {
            force: true,
            delay: 0.1,
            // Tenter une seconde fois si nécessaire
            onComplete: () => {
              // Vérifier si nous sommes bien à la section cible
              setTimeout(() => {
                const currentSection = getVisibleSection()
                if (currentSection !== hash) {
                  scrollToSection(hash, { force: true, duration: 0.8 })
                }
              }, 300)
            }
          })
        }, 50)
        return true
      }
      return false
    }
    
    // Essayer de défiler immédiatement
    if (!checkDomAndScroll()) {
      // Si ça échoue, essayer après un court délai
      setTimeout(checkDomAndScroll, 100)
      // Et une dernière tentative avec un délai plus long
      setTimeout(checkDomAndScroll, 300)
    }
  }
  
  // Listener pour le chargement de la page
  if (process.client) {
    // Attendre que tout soit chargé avant de traiter le hash
    window.addEventListener('load', handleInitialHashNavigation)
    
    // Alternative à l'événement load, au cas où
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(handleInitialHashNavigation, 100)
    })
    
    // Essayer aussi après un court délai
    setTimeout(handleInitialHashNavigation, 200)
  }
}) 