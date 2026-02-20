// Navigation mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Animation du menu burger
function toggleNav() {
    // Basculer la navigation
    nav.classList.toggle('active');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animation du burger
    burger.classList.toggle('toggle');
}

// Écouteur d'événement pour le burger
burger.addEventListener('click', toggleNav);

// Fermer le menu mobile après avoir cliqué sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleNav();
        }
    });
});

// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observer);

// Observer les sections pour l'animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animation fluide du défilement pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Compensation pour la navbar fixe
                behavior: 'smooth'
            });
        }
    });
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Ici, vous pourriez ajouter le code pour envoyer les données à un serveur
        console.log('Formulaire soumis :', data);
        
        // Message de confirmation
        alert('Merci pour votre message ! Je vous répondrai dès que possible.');
        contactForm.reset();
    });
}

// Animation des compétences
function animateSkills() {
    const skills = document.querySelectorAll('.skill-level');
    skills.forEach(skill => {
        const width = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = width;
        }, 100);
    });
}

// Observer les compétences pour les animer au scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills').forEach(skillSection => {
    skillObserver.observe(skillSection);
});

// Gestion du mode sombre (optionnel)
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.title = 'Basculer en mode sombre';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.bottom = '20px';
darkModeToggle.style.right = '20px';
darkModeToggle.style.background = 'var(--secondary-color)';
darkModeToggle.style.color = 'white';
darkModeToggle.style.border = 'none';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.width = '50px';
darkModeToggle.style.height = '50px';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.fontSize = '1.2rem';
darkModeToggle.style.display = 'flex';
darkModeToggle.style.alignItems = 'center';
darkModeToggle.style.justifyContent = 'center';
darkModeToggle.style.zIndex = '1000';
darkModeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        darkModeToggle.title = 'Basculer en mode clair';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        darkModeToggle.title = 'Basculer en mode sombre';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Vérifier le mode préféré de l'utilisateur
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    const icon = darkModeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    darkModeToggle.title = 'Basculer en mode clair';
}

// Ajouter des styles pour le mode sombre
const style = document.createElement('style');
style.textContent = `
    .dark-mode {
        --background-color: #1a1a1a;
        --text-color: #f0f0f0;
        --light-color: #2d2d2d;
        --dark-color: #f0f0f0;
    }
    
    .dark-mode .rse-section,
    .dark-mode .project-card,
    .dark-mode .stat-card {
        background-color: #2d2d2d;
        color: #f0f0f0;
    }
    
    .dark-mode .rse-card,
    .dark-mode .project-card {
        background-color: #2d2d2d;
        border: 1px solid #444;
    }
    
    .dark-mode .rse-card h3,
    .dark-mode .project-card h3,
    .dark-mode .rse-section h2,
    .dark-mode .rse-card p,
    .dark-mode .project-card p,
    .dark-mode .stat-label,
    .dark-mode .gallery-caption {
        color: #f0f0f0;
    }
    
    .dark-mode .skill-tag,
    .dark-mode .interest {
        background-color: #444;
        color: #f0f0f0;
    }
    
    .dark-mode .skill-bar {
        background-color: #444;
    }
`;

document.head.appendChild(style);

// Animation au chargement de la page
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animation du titre
    const title = document.querySelector('.hero-content h1');
    if (title) {
        title.style.animation = 'fadeInDown 1s ease-out';
    }
    
    // Animation du sous-titre
    const subtitle = document.querySelector('.hero-content p');
    if (subtitle) {
        subtitle.style.animation = 'fadeInUp 1s ease-out 0.3s';
        subtitle.style.animationFillMode = 'both';
    }
    
    // Animation du bouton
    const button = document.querySelector('.cta-button');
    if (button) {
        button.style.animation = 'fadeInUp 1s ease-out 0.6s';
        button.style.animationFillMode = 'both';
    }
});

// Ajout des animations CSS
const animations = document.createElement('style');
animations.textContent = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-level {
        transition: width 1.5s ease-in-out;
    }
`;

document.head.appendChild(animations);

// Fonction pour télécharger une image
function downloadImage(imagePath, fileName) {
    const link = document.createElement('a');
    link.href = imagePath;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Gestion du chargement paresseux des images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
    
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
