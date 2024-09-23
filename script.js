// Countdown Timer
function updateCountdown() {
    const birthday = new Date("2025-09-22T00:00:00").getTime(); // Asegúrate de cambiar esta fecha al cumpleaños correcto
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("timer").innerHTML = "¡Feliz Cumpleaños!";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Llamar a updateCountdown inmediatamente para evitar el retraso inicial
updateCountdown();

// Birthday Card Animation
const card = document.querySelector('.birthday-card');
card.addEventListener('click', () => {
    card.classList.toggle('open');
});

// Share Button
document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Deseos de Cumpleaños',
            text: '¡Mira esta increíble página de cumpleaños!',
            url: window.location.href
        }).then(() => console.log('Compartido exitosamente'))
        .catch((error) => console.log('Error al compartir:', error));
    } else {
        alert('La API Web Share no está soportada en tu navegador');
    }
});

// Background Music Toggle
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.textContent = '🔊';
        }).catch((error) => {
            console.error('Error al reproducir el audio:', error);
            alert('No se pudo reproducir el audio. Por favor, verifica que el archivo exista y que tu navegador permita la reproducción automática.');
        });
    } else {
        bgMusic.pause();
        musicToggle.textContent = '🔇';
    }
});

// Intentar cargar el audio
bgMusic.load();

// Wave effect on touch (for mobile devices)
document.body.addEventListener('touchstart', function(e) {
    const touch = e.touches[0];
    const wave = document.createElement('div');
    wave.classList.add('wave');
    wave.style.left = `${touch.clientX}px`;
    wave.style.top = `${touch.clientY}px`;
    document.body.appendChild(wave);
    setTimeout(() => {
        wave.remove();
    }, 1000);
});

// Add this CSS for the wave effect
const style = document.createElement('style');
style.textContent = `
    .wave {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 1s linear;
        pointer-events: none;
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);