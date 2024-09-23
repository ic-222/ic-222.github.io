const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');
let waves = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('scroll', function() {
    const y = window.scrollY;
    createWave(window.innerWidth / 2, y + window.innerHeight / 2);
});

function createWave(x, y) {
    waves.push({ x: x, y: y, radius: 0 });
}

function animateWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - wave.radius / 200})`;
        ctx.stroke();
        wave.radius += 2;

        if (wave.radius > 200) {
            waves.splice(index, 1);
        }
    });
    requestAnimationFrame(animateWaves);
}

animateWaves();
