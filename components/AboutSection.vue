<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative">
    <div class="flex space-between min-w-full">
      <div class="w-1/3 tracking-tight text-base flex flex-col gap-5">
        <p>
          Ancien journaliste reconverti en développeur web et expert No-Code, j'apporte une perspective unique aux projets techniques grâce à ma compréhension approfondie des enjeux métier.
        </p>
        <p>
          Ma double expertise me permet de concevoir des solutions sur mesure, qu'il s'agisse d'applications web complexes ou d'automatisations No-Code efficaces.
        </p>
        <p>
          Je forme également les équipes à l'utilisation des outils techniques pour les rendre autonomes et plus productives face aux défis numériques.
        </p>
        <p>
          Mon approche : écoute bienveillante, adaptabilité technique et efficacité opérationnelle pour créer des outils qui vous servent vraiment.
        </p>
      </div>
    </div>

    <!-- Contenu principal avec bio et photo -->
    <div class="flex flex-col mt-16 gap-12" id="about-content" ref="aboutContent">
      <div class="grid grid-cols-3 gap-16">
        <!-- Photo à gauche -->
        <div class="col-span-1 about-photo-container">
          <div class="photo-frame rounded-xl overflow-hidden shadow-lg" ref="photoFrame">
            <NuxtImg src="/img/cedric-lang-roth.webp" alt="Cédric Lang-Roth" class="w-full h-full object-cover object-top" loading="lazy"/>
          </div>
        </div>
        
        <!-- Biographie à droite -->
        <div class="col-span-2 bio-content" ref="bioContent">
          <h2 class="text-3xl font-semibold mb-6">Qui suis-je ?</h2>
          <p class="mb-6">
            Ancien journaliste reconverti en développeur web et expert No-Code, j'apporte une perspective unique au monde du développement informatique. Après 15 ans de carrière à Radio France, dont plusieurs années comme rédacteur en chef de France Bleu Normandie (Rouen), j'ai fait le choix de transformer ma passion pour le code en profession.
          </p>
          
          <h2 class="text-3xl font-semibold mb-6">Mon expertise technique</h2>
          <p class="mb-4">
            Mon bagage technique s'est construit progressivement, d'abord en autodidacte puis validé par une certification RNCP 6 de Concepteur Développeur d'Applications obtenue suite à ma formation au Wagon. Je maîtrise aujourd'hui un large éventail de technologies :
          </p>
          <ul class="list-disc pl-5 mb-6 space-y-2">
            <li><strong>Langages & Frameworks backend</strong> : PHP, Symfony, Ruby, Ruby on Rails, AdonisJS</li>
            <li><strong>Technologies frontend</strong> : JavaScript, React, Vue.js, Nuxt.JS, TailwindCSS</li>
            <li><strong>Solutions No-Code</strong> : Airtable, Notion, Make.com, n8n et diverses intégrations IA</li>
          </ul>
          
          <h2 class="text-3xl font-semibold mb-6">Une approche centrée sur les besoins réels</h2>
          <p class="mb-4">
            Ce qui me distingue dans l'univers du développement, c'est ma compréhension approfondie des réalités métier. Mon parcours journalistique m'a appris l'importance de l'écoute active et de la traduction des besoins en solutions concrètes.
          </p>
          <p class="mb-4">
            Ma démarche repose sur trois piliers essentiels :
          </p>
          <ul class="list-disc pl-5 mb-6 space-y-2">
            <li><strong>L'écoute bienveillante</strong> des problématiques spécifiques de chaque client</li>
            <li><strong>L'adaptabilité technique</strong> pour proposer la solution la plus adéquate</li>
            <li><strong>L'efficacité opérationnelle</strong> héritée de mon expérience en gestion d'équipe</li>
          </ul>
          
          <h2 class="text-3xl font-semibold mb-6">Réalisations concrètes</h2>
          <p class="mb-6">
            Ma double expertise s'est déjà matérialisée dans plusieurs projets significatifs :
          </p>
          <ul class="list-disc pl-5 mb-6 space-y-2">
            <li>Conception et déploiement d'un système de gestion de pigistes en PHP/Symfony pour France Bleu Normandie</li>
            <li>Automatisation intelligente de la gestion des heures de nuit via Notion, Make.com et OpenAI</li>
            <li>Direction de projets médiatiques d'envergure (couverture électorale, événements spéciaux)</li>
          </ul>
          
          <h2 class="text-3xl font-semibold mb-6">Ma vision pour votre entreprise</h2>
          <p class="mb-6">
            Aujourd'hui, je mets mes compétences au service des TPE/PME avec une conviction forte : l'automatisation intelligente et les outils sur mesure sont des leviers de compétitivité accessibles à toutes les structures, quelle que soit leur taille.
          </p>
          <p class="mb-6">
            Face à l'évolution rapide des technologies, notamment l'IA, je vous accompagne pour :
          </p>
          <ul class="list-disc pl-5 mb-6 space-y-2">
            <li>Développer des solutions adaptées à vos besoins spécifiques</li>
            <li>Former vos équipes aux outils No-Code pour gagner en autonomie</li>
            <li>Optimiser vos processus métier grâce à des automatisations pertinentes</li>
          </ul>
          
          <div class="mt-10 mb-6 py-6 px-8 bg-blue-50 rounded-xl border-l-4 border-blue-500 quote-container" ref="quoteContainer">
            <p class="text-xl italic">
              "La technologie doit servir les humains, et non l'inverse. C'est cette philosophie qui guide chacune de mes interventions."
            </p>
          </div>
        </div>
      </div>
      
      <!-- Section "Travaillons ensemble" -->
      <div class="mt-10 text-center py-12" ref="contactCta">
        <h2 class="text-3xl font-semibold mb-6">Travaillons ensemble</h2>
        <p class="mb-6 max-w-3xl mx-auto">
          Vous cherchez un développeur qui comprend réellement vos enjeux métier ? Contactez-moi pour discuter de votre projet ou de vos besoins en automatisation.
        </p>
        <a @click="scrollToSection('contact')" class="cursor-pointer inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
          Me contacter
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from "vue";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

// Fonction pour défiler vers la section de contact
const scrollToSection = (sectionId) => {
  const section = document.querySelector(`[data-section="${sectionId}"]`)
  if (section) {
    const offsetLeft = section.offsetLeft
    const maxScroll = document.querySelector('.sections-wrapper').scrollWidth - window.innerWidth

    gsap.to(window, {
      duration: 1.5,
      ease: 'power2.inOut',
      scrollTo: {
        x: offsetLeft,
        autoKill: false
      }
    })
  }
}

const aboutContent = ref(null);
const photoFrame = ref(null);
const bioContent = ref(null);
const quoteContainer = ref(null);
const contactCta = ref(null);

onMounted(() => {
  // Animer la photo avec un effet de fade-in et léger zoom
  gsap.from(photoFrame.value, {
    duration: 1.2,
    opacity: 0,
    scale: 0.9,
    ease: "power2.out",
  });
  
  // Animer les sections de biographie avec un fade-in séquentiel
  const bioSections = bioContent.value.querySelectorAll('h2, p, ul');
  gsap.from(bioSections, {
    duration: 0.8,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out",
  });
  
  // Animation spéciale pour la citation
  gsap.from(quoteContainer.value, {
    duration: 1.5,
    opacity: 0,
    x: -30,
    delay: 1,
    ease: "power3.out",
  });
  
  // Animation du CTA final
  gsap.from(contactCta.value, {
    duration: 1,
    opacity: 0,
    y: 30,
    delay: 1.5,
    ease: "back.out(1.7)",
  });
})
</script>

<style scoped>
/* Styles pour la photo et la biographie */
.photo-frame {
  height: 400px;
  transition: transform 0.5s ease;
  position: sticky;
  top: 100px;
}

.photo-frame:hover {
  transform: scale(1.02);
}

.bio-content h2 {
  font-family: Poppins;
  font-weight: 500;
  letter-spacing: -1px;
  margin-top: 2rem;
}

.bio-content p, .bio-content li {
  font-family: "Montserrat", sans-serif;
  line-height: 1.6;
}

.quote-container {
  position: relative;
}

.quote-container::before {
  content: '"';
  position: absolute;
  top: -30px;
  left: 20px;
  font-size: 120px;
  color: rgba(59, 130, 246, 0.2);
  font-family: serif;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .col-span-1, .col-span-2 {
    grid-column: span 1;
  }
  
  .photo-frame {
    height: 300px;
    margin-bottom: 2rem;
    position: relative;
    top: 0;
  }
}
</style> 