<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative min-h-full max-sm:min-h-dvh">
    <div class="flex space-between min-w-full">
      <div class="w-1/3 tracking-tight text-base flex flex-col gap-5">
        <p>
          Besoin d'un développeur qui comprend vos enjeux métier ou d'une formation sur mesure ?
        </p>
        <p>
          Contactez-moi via le formulaire, réservez un appel découverte gratuit, ou utilisez les coordonnées ci-dessous pour échanger sur votre projet.
        </p>
        <p>
          Je serai ravi de mettre mon expertise technique et ma compréhension des besoins business à votre service.
        </p>
      </div>
      <div class="ml-auto flex flex-col gap-0 menu">
        <button
            v-for="section in sections"
            :key="section.id"
            @click="scrollToSection(section.id)"
            class="text-right"
        >
          <h1 v-if="section.active" class="active"> {{ section.label.toUpperCase() }} </h1>
          <span v-else class="hover:italic">{{ section.label }}</span>
        </button>
      </div>
    </div>

    <!-- Contenu principal du contact -->
    <div class="flex flex-col mt-16 gap-12" id="contact-content" ref="contactContent">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <!-- Coordonnées et Cal.com à gauche -->
        <div class="contact-info-container">
          <h2 class="text-3xl font-semibold mb-6">Mes coordonnées</h2>
          
          <div class="contact-details mb-8">
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a href="mailto:contact@cedric-langroth.fr" class="text-blue-600 hover:underline">contact@cedric-langroth.fr</a>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a href="tel:+33600000000" class="text-blue-600 hover:underline">06 00 00 00 00</a>
            </div>
            
            <div class="flex items-center mb-4">
              <div class="w-8 h-8 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>Paris, France</span>
            </div>
            
            <div class="flex items-center">
              <div class="w-8 h-8 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                </svg>
              </div>
              <a href="https://www.linkedin.com/in/cedriclangroth/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">LinkedIn</a>
            </div>
          </div>
          
          <h2 class="text-3xl font-semibold mb-6">Réservez un appel découverte</h2>
          <div class="cal-embed rounded-xl overflow-hidden shadow-lg" style="height: 650px;">
            <!-- Intégration Cal.com -->
            <div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline"></div>
          </div>
        </div>
        
        <!-- Formulaire de contact à droite -->
        <div class="contact-form-container">
          <h2 class="text-3xl font-semibold mb-6">Envoyez-moi un message</h2>
          <form @submit.prevent="submitForm" class="space-y-6" ref="contactForm">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="form-group">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="form-group">
              <label for="subject" class="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            
            <div class="form-group">
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                rows="8" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div class="form-group">
              <button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 transform hover:scale-105"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer' }}
              </button>
            </div>
            
            <div v-if="formStatus.message" :class="['mt-4 p-4 rounded-md', formStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
              {{ formStatus.message }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { onMounted, ref } from "vue";

const sections = [
  { id: 'contact', label: 'Contact', active: true },
  { id: 'home', label: 'Accueil' },
  { id: 'code', label: 'Code' },
  { id: 'no-code', label: 'No-Code' },
  { id: 'formations', label: 'Formations' },
  { id: 'about', label: 'À propos' }
]

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

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

// Formulaire de contact
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formStatus = ref({
  success: false,
  message: ''
});

const contactContent = ref(null);
const contactForm = ref(null);

const submitForm = async () => {
  isSubmitting.value = true;
  
  try {
    // URL de votre webhook n8n
    const webhookUrl = 'https://votre-instance-n8n.com/webhook/contact-form';
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData.value)
    });
    
    if (response.ok) {
      formStatus.value = {
        success: true,
        message: 'Votre message a bien été envoyé. Je vous répondrai dans les meilleurs délais.'
      };
      
      // Réinitialiser le formulaire
      formData.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
    } else {
      throw new Error('Erreur lors de l\'envoi du formulaire');
    }
  } catch (error) {
    formStatus.value = {
      success: false,
      message: 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer ou me contacter directement par email.'
    };
    console.error('Erreur:', error);
  } finally {
    isSubmitting.value = false;
    
    // Scroll vers le message de statut
    setTimeout(() => {
      window.scrollTo({
        top: contactForm.value.offsetTop + contactForm.value.offsetHeight - 100,
        behavior: 'smooth'
      });
    }, 100);
  }
};

onMounted(() => {
  // Animations GSAP
  gsap.from(contactContent.value, {
    duration: 1,
    opacity: 0,
    y: 30,
    ease: "power3.out",
  });
  
  // Animation des éléments du formulaire avec stagger
  const formElements = contactForm.value.querySelectorAll('.form-group');
  gsap.from(formElements, {
    duration: 0.8,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.3
  });

  // Initialisation de Cal.com avec la méthode recommandée
  const calInitScript = document.createElement('script');
  calInitScript.innerHTML = `
    (function (C, A, L) { 
      let p = function (a, ar) { a.q.push(ar); }; 
      let d = C.document; 
      C.Cal = C.Cal || function () { 
        let cal = C.Cal; 
        let ar = arguments; 
        if (!cal.loaded) { 
          cal.ns = {}; 
          cal.q = cal.q || []; 
          d.head.appendChild(d.createElement("script")).src = A; 
          cal.loaded = true; 
        } 
        if (ar[0] === L) { 
          const api = function () { p(api, arguments); }; 
          const namespace = ar[1]; 
          api.q = api.q || []; 
          if(typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar); 
          return;
        } 
        p(cal, ar); 
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");
    
    Cal("init", "automatisation-rh", {origin:"https://cal.com"});
    
    Cal.ns["automatisation-rh"]("inline", {
      elementOrSelector:"#my-cal-inline",
      config: {"layout":"month_view"},
      calLink: "clangroth/automatisation-rh",
    });
    
    Cal.ns["automatisation-rh"]("ui", {"hideEventTypeDetails":true,"layout":"column_view"});
  `;
  document.head.appendChild(calInitScript);
})
</script>

<style scoped>
.menu {
  font-family: "Poppins", sans-serif;
  text-align: right;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.2px;
}

.menu button {
  cursor: pointer;
}

.menu .active {
  font-size: 128px;
  font-weight: 600;
  line-height: 70.853%;
  letter-spacing: -6.4px;
}

.form-group label {
  font-family: "Montserrat", sans-serif;
}

.contact-info-container, .contact-form-container {
  transition: transform 0.3s ease;
}

.contact-info-container:hover, .contact-form-container:hover {
  transform: translateY(-5px);
}

/* Styles responsifs pour mobile */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
  
  .menu .active {
    font-size: 64px;
  }
}
</style> 