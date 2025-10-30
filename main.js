

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
function iniciarMusica() {
    const music = document.getElementById('backgroundMusic');
    
    if (music) {
        // Asegurar que el audio esté en bucle
        music.loop = true;
        music.volume = 0.5; // Volumen al 50% (ajusta entre 0.0 y 1.0)
        
        // Intentar reproducir automáticamente
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('🎵 Música iniciada automáticamente');
            }).catch(error => {

                
                // Reproducir al primer click, touch o tecla del usuario
                const iniciarConInteraccion = () => {
                    music.play().then(() => {
                        
                    }).catch(err => {
                        
                    });
                };
                
                // Múltiples eventos para asegurar que funcione
                document.body.addEventListener('click', iniciarConInteraccion, { once: true });
                document.body.addEventListener('touchstart', iniciarConInteraccion, { once: true });
                document.body.addEventListener('keydown', iniciarConInteraccion, { once: true });
            });
        }
    } 
      
}

// Forzar scroll al inicio al cargar la página
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
     iniciarMusica();
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
     iniciarMusica();
    
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