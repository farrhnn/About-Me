const cursor = document.getElementById('cursor');
const modal = document.getElementById('hobbyModal');
const modalBody = document.getElementById('modalBody');
const specialMusic = document.getElementById('specialMusic');
let isMusicPlaying = false;

// --- CURSOR LOGIC ---
document.addEventListener('mousemove', (e) => {
    cursor.style.opacity = '1';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Parallax Orbs
    const moveX = (e.clientX * 0.02);
    const moveY = (e.clientY * 0.02);
    document.querySelector('.orb-1').style.transform = `translate(${moveX}px, ${moveY}px)`;
    document.querySelector('.orb-2').style.transform = `translate(${-moveX}px, ${-moveY}px)`;
});

document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
document.addEventListener('mouseenter', () => cursor.style.opacity = '1');

// --- REVEAL ON SCROLL ---
function handleReveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementBottom = el.getBoundingClientRect().bottom;
        if (elementTop < windowHeight - 100 && elementBottom > 100) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

function updateGreeting() {
    const greetingElement = document.getElementById('dynamic-greeting');
    const hour = new Date().getHours();
    let greeting;

    if (hour >= 5 && hour < 12) {
        greeting = "✨ Good Morning! Ready to start the day?";
    } else if (hour >= 12 && hour < 17) {
        greeting = "☀️ Good Afternoon! Hope your day is productive.";
    } else if (hour >= 17 && hour < 21) {
        greeting = "🌆 Good Evening! Welcome to my creative space.";
    } else {
        greeting = "🌙 Burning the midnight oil? Let's explore.";
    }

    if (greetingElement) {
        greetingElement.innerText = greeting;
    }
}
window.addEventListener('DOMContentLoaded', updateGreeting);

function openSpotifyModal(playlistId) {
    const modal = document.getElementById('hobbyModal');
    const modalBody = document.getElementById('modalBody');
    
    // Tampilkan loading sebentar agar transisi smooth
    modalBody.innerHTML = '<p style="text-align:center; padding: 20px;">Loading Playlist...</p>';
    
    // Masukkan Iframe Spotify
    const spotifyEmbed = `
        <h2 class="text-gradient" style="margin-bottom: 20px; font-size: 1.5rem;">Spotify Selection</h2>
        <iframe 
            style="border-radius:15px; background: transparent;" 
            src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0" 
            width="100%" 
            height="450" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
        </iframe>
    `;
    
    modalBody.innerHTML = spotifyEmbed;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// --- VIDEO HOVER ---
const videoCards = document.querySelectorAll('.video-card');
videoCards.forEach(card => {
    const video = card.querySelector('video');
    card.addEventListener('mouseenter', () => {
        video.play();
        cursor.style.transform = 'scale(4)';
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
        cursor.style.transform = 'scale(1)';
    });
});

// --- SPECIAL MUSIC ---
function toggleSpecialMusic() {
    const indicator = document.querySelector('.music-indicator span');
    if (!isMusicPlaying) {
        specialMusic.play();
        indicator.innerText = "Now playing our favorite song...";
    } else {
        specialMusic.pause();
        indicator.innerText = "Click to Play Our Song";
    }
    isMusicPlaying = !isMusicPlaying;
}

// --- MODAL LOGIC ---
function openModal(type) {
    const modal = document.getElementById('hobbyModal');
    const modalBody = document.getElementById('modalBody');
    
    let content = "";

    if (type === 'photo') {
        content = `
            <div class="polaroid-container">
                <h2 class="modal-title">My Photography</h2>
                <div class="polaroid-scatter">
                    <div class="polaroid-card p-1">
                        <img src="moment/shot1.jpeg">
                        <div class="polaroid-caption">Street View</div>
                    </div>
                    <div class="polaroid-card p-2">
                        <img src="moment/shot2.jpeg">
                        <div class="polaroid-caption">Night Life</div>
                    </div>
                    <div class="polaroid-card p-3">
                        <img src="moment/shot5.jpeg">
                        <div class="polaroid-caption">Campus Moments</div>
                    </div>
                </div>
                <p class="modal-quote" style="text-align:center; margin-top:20px; font-style:italic;">
                    "Perjalanan seribu mil selalu dimulai dengan satu langkah pertama. — Lao Tzu"
                </p>
            </div>
        `;
    } else if (type === 'game') {
    content = `
        <div class="gaming-container">
            <h2 class="text-gradient gaming-title"><i class="fas fa-gamepad"></i> Library & Activity</h2>
            <div class="gaming-grid">
                <div class="game-card neon-blue">
                    <div class="game-badge">Open World</div>
                    <img src="foto/NTE.jpg" alt="NTE">
                    <div class="game-info">
                        <h4>Neverness to Everness</h4>
                        <div class="game-status"><span class="dot"></span> Active Player</div>
                    </div>
                </div>
                <div class="game-card neon-purple">
                    <div class="game-badge">Battle Royale</div>
                    <img src="foto/n.png" alt="Naraka Bladepoint">
                    <div class="game-info">
                        <h4>Naraka Bladepoint</h4>
                        <div class="game-status"><span class="dot"></span> Competitive</div>
                    </div>
                </div>
                <div class="game-card neon-cyan">
                    <div class="game-badge">Adventure</div>
                    <img src="foto/Hok world.jpeg" alt="HoK World">
                    <div class="game-info">
                        <h4>Honor of Kings World</h4>
                        <div class="game-status"><span class="dot"></span> Anticipated</div>
                    </div>
                </div>
            </div>
            <p class="gaming-footer">"Gamers don't die, they respawn."</p>
        </div>
    `;
} else {
        content = `<h2>Detail ${type}</h2><p>Informasi belum tersedia.</p>`;
    }

    modalBody.innerHTML = content;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// --- INITIALIZE ---
window.addEventListener("scroll", handleReveal);
window.onclick = (e) => { if (e.target == modal) closeModal(); };
setInterval(createComet, 2500);
handleReveal();
