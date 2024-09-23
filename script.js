// Countdown Timer
function updateCountdown() {
    const birthday = new Date("2023-12-31T00:00:00").getTime(); // Asegúrate de cambiar esta fecha al cumpleaños correcto
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

// ... (código anterior sin cambios) ...

// Audio Player
let audioContext;
let audioBuffer;
let audioSource;
let isPlaying = false;

const playPauseBtn = document.getElementById('playPauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

async function initAudio() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const response = await fetch('happy-birthday.mp3');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        console.log('Audio loaded successfully');
        playPauseBtn.disabled = false;
    } catch (error) {
        console.error('Error loading audio:', error);
        alert(`No se pudo cargar el audio. Error: ${error.message}\n\nPor favor, verifica que:\n1. El archivo "happy-birthday.mp3" existe en el mismo directorio que el archivo HTML.\n2. El nombre del archivo está escrito exactamente como "happy-birthday.mp3" (sensible a mayúsculas).\n3. Estás usando un servidor web local para servir los archivos.\n\nSi el problema persiste, abre la consola del navegador para ver más detalles del error.`);
    }
}

function playPauseAudio() {
    if (!audioContext) {
        playPauseBtn.disabled = true;
        initAudio().then(() => {
            playPauseBtn.disabled = false;
            playPauseAudio();
        });
        return;
    }

    if (isPlaying) {
        audioSource.stop();
        isPlaying = false;
        playPauseBtn.textContent = '▶️';
    } else {
        audioSource = audioContext.createBufferSource();
        audioSource.buffer = audioBuffer;
        const gainNode = audioContext.createGain();
        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);
        gainNode.gain.value = volumeSlider.value;
        audioSource.loop = true;
        audioSource.start();
        isPlaying = true;
        playPauseBtn.textContent = '⏸️';
    }
}

function updateVolume() {
    if (audioContext && isPlaying) {
        const gainNode = audioContext.createGain();
        gainNode.gain.value = volumeSlider.value;
        audioSource.disconnect();
        audioSource.connect(gainNode);
        gainNode.connect(audioContext.destination);
    }
}

playPauseBtn.addEventListener('click', playPauseAudio);
volumeSlider.addEventListener('input', updateVolume);

// Iniciar la carga del audio cuando se carga la página
window.addEventListener('load', initAudio);

// ... (resto del código sin cambios) ...