function confirmarAsistencia() {
    const mensaje = "¡Hola! Confirmo mi asistencia al cumpleaños de Mia Arleth 🎉👸🏻";
    const telefono = "3112836863"; // Cambiar por el número real (sin guiones ni espacios)
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}

function crearConfetti() {
    const colors = ['#FF6B9D', '#FFD700', '#87CEEB', '#98FB98', '#FF9800'];
    const emojis = ['🎈', '🎉', '✨', '🍎', '👑', '🦋', '🌹'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            
            if (Math.random() > 0.5) {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (Math.random() * 10 + 5) + 'px';
                confetti.style.height = (Math.random() * 10 + 5) + 'px';
            } else {
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.background = 'transparent';
                confetti.style.fontSize = '20px';
            }
            
            confetti.style.animationDelay = Math.random() * 2 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 3) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 8000);
        }, i * 40);
    }
}

// Forzar scroll al inicio al cargar la página
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Scroll al inicio inmediatamente
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Confetti al cargar la página
window.addEventListener('load', () => {
    // Asegurar que inicie desde arriba
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    setTimeout(crearConfetti, 500);
    
    // Agregar animación al botón RSVP
    const rsvpButton = document.querySelector('.rsvp-button');
    if (rsvpButton) {
        rsvpButton.addEventListener('mouseenter', () => {
            rsvpButton.classList.add('animate__tada');
        });
        
        rsvpButton.addEventListener('animationend', () => {
            rsvpButton.classList.remove('animate__tada');
        });
    }
    
    // Agregar animaciones a elementos al hacer scroll
    observeElements();
});

// También forzar scroll al inicio cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// Confetti cada 15 segundos
setInterval(crearConfetti, 15000);

// Observer para animar elementos cuando aparecen en viewport
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar todos los detail-items
    document.querySelectorAll('.detail-item').forEach(item => {
        observer.observe(item);
    });
}