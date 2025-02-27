<template>
  <div class="flex flex-col w-full pl-20 pr-5 py-5 relative">
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
    </div>

    <!-- Contenu principal du contact restructuré en trois colonnes -->
    <div class="flex flex-col mt-16" id="contact-content" ref="contactContent">
      <!-- Section à trois colonnes -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Colonne 1: Coordonnées -->
        <div class="coordinates-container backdrop-blur-md bg-white/40 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-2xl font-semibold mb-6">Mes coordonnées</h2>
          
          <div class="flex flex-col space-y-6">
            <div class="flex items-start">
              <div class="w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-1">Email</h3>
                <a href="mailto:contact@clangroth.fr" class="text-blue-600 hover:underline">contact@clangroth.fr</a>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-1">Téléphone</h3>
                <a href="tel:+33688144084" class="text-blue-600 hover:underline">06 88 14 40 84</a>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-1">Localisation</h3>
                <span>Rouen, France</span>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-8 h-8 flex items-center justify-center mr-4 mt-1">
                <NuxtImg src="/linkedin.png" alt="LinkedIn" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-700 mb-1">LinkedIn</h3>
                <a href="https://www.linkedin.com/in/clangroth/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">linkedin.com/in/clangroth</a>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Colonne 2: Formulaire de contact -->
        <div class="contact-form-container backdrop-blur-md bg-white/40 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-2xl font-semibold mb-6">Envoyez-moi un message</h2>
          <form @submit.prevent="submitForm" class="space-y-4" ref="contactForm">
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
                rows="6" 
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            
            <div class="form-group">
              <button 
                type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition duration-300"
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
        
        <!-- Colonne 3: Réservation Cal.com -->
        <div class="reservation-container backdrop-blur-md bg-white/30 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-2xl font-semibold mb-6">Réservez un appel découverte</h2>
          <div class="cal-button-container">
            <button 
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition duration-300 cursor-pointer"
              data-cal-link="clangroth/automatisation-rh"
              data-cal-namespace="automatisation-rh"
              data-cal-config='{"layout":"month_view"}'
            >
              Réserver un créneau
            </button>
            <div class="mt-6 space-y-4">
              <p class="text-gray-600">Cliquez sur le bouton ci-dessus pour ouvrir le calendrier et choisir un créneau qui vous convient.</p>
              <p class="text-gray-600">Cet appel découverte gratuit de 30 minutes nous permettra de :</p>
              <ul class="list-disc list-inside text-gray-600 space-y-2 pl-2">
                <li>Discuter de votre projet en détail</li>
                <li>Identifier vos besoins spécifiques</li>
                <li>Explorer les solutions adaptées</li>
                <li>Définir les prochaines étapes</li>
              </ul>
            </div>
          </div>
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

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

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
    (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
    Cal("init", "automatisation-rh", {origin:"https://cal.com"});
    
    Cal.ns["automatisation-rh"]("ui", {"hideEventTypeDetails":true,"layout":"column_view"});
  `;
  document.head.appendChild(calInitScript);
})
</script>

<style scoped>
/* Styles pour les conteneurs */
.coordinates-container, .form-container, .reservation-container {
  height: 100%;
}


/* Animation des éléments */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-group {
  margin-bottom: 1.5rem;
}

/* Styles pour Cal.com */
.cal-button-container {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Responsive */
@media (max-width: 768px) {
  .grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .coordinates-container, .form-container, .reservation-container {
    margin-bottom: 2rem;
  }
}
</style> 