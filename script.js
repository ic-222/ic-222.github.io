// Countdown Timer
function updateCountdown() {
    const birthday = new Date("2023-12-31T00:00:00").getTime(); // Set your friend's birthday here
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        clearInterval(countdownTimer);
        document.getElementById("timer").innerHTML = "Happy Birthday!";
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);

// Birthday Card Animation
const card = document.querySelector('.birthday-card');
card.addEventListener('click', () => {
    card.classList.toggle('open');
});

// Share Button
document.getElementById('shareBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Birthday Wishes',
            text: 'Check out this awesome birthday page!',
            url: window.location.href
        }).then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Web Share API not supported in your browser');
    }
});

// Background Music Toggle
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        bgMusic.pause();
        musicToggle.textContent = '🔇';
    }
});

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