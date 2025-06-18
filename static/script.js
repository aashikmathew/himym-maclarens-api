const API_BASE_URL = 'http://localhost:8000';
const contentBox = document.getElementById('content');
const typeIndicator = document.querySelector('.type-indicator');
const themeAudio = document.getElementById('theme-audio');
const musicIcon = document.getElementById('music-icon');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const equalizer = document.getElementById('equalizer');
const musicNoteIcon = document.getElementById('music-note-icon');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;

async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { error: 'Failed to fetch data' };
    }
}

function updateContent(type, content) {
    // Add fade out animation
    contentBox.style.opacity = '0';
    
    setTimeout(() => {
        // Update content
        contentBox.textContent = content;
        typeIndicator.textContent = type;
        
        // Add fade in animation
        contentBox.style.opacity = '1';
        
        // Add pub themed effects
        if (type === 'Fun Fact') {
            createYellowUmbrella();
        } else if (type === 'HIMYM Joke') {
            createSuitUp();
        } else if (type === 'Show Quote') {
            createBlueFrenchHorn();
        } else {
            createRandomEffect();
        }

        // Add pub ambiance
        createPubAmbiance();
    }, 300);
}

async function getFunFact() {
    const data = await fetchData('/fun-fact');
    if (data.fun_fact) {
        updateContent('Fun Fact', data.fun_fact);
    }
}

async function getJoke() {
    const data = await fetchData('/joke');
    if (data.joke) {
        updateContent('HIMYM Joke', data.joke);
    }
}

async function getQuote() {
    const data = await fetchData('/quote');
    if (data.quote) {
        updateContent('Show Quote', data.quote);
    }
}

async function getRandom() {
    const data = await fetchData('/random');
    if (data.content) {
        updateContent(data.type.charAt(0).toUpperCase() + data.type.slice(1), data.content);
    }
}

function showLegenToast() {
    const toast = document.getElementById('legen-toast');
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}

async function getPickupLine() {
    const data = await fetchData('/pickup-line');
    if (data.pickup_line) {
        updateContent("Barney's Pickup Line", data.pickup_line);
        showLegenToast();
    }
}

// Pub themed effects
function createYellowUmbrella() {
    for (let i = 0; i < 5; i++) {
        const umbrella = document.createElement('div');
        umbrella.className = 'floating-umbrella';
        umbrella.textContent = '🌂';
        umbrella.style.left = Math.random() * 100 + 'vw';
        umbrella.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(umbrella);
        
        setTimeout(() => {
            umbrella.remove();
        }, 5000);
    }
}

function createSuitUp() {
    const suit = document.createElement('div');
    suit.className = 'suit-up';
    suit.textContent = '👔';
    document.body.appendChild(suit);
    
    setTimeout(() => {
        suit.remove();
    }, 2000);
}

function createBlueFrenchHorn() {
    const horn = document.createElement('div');
    horn.className = 'french-horn';
    horn.textContent = '🎸';
    document.body.appendChild(horn);
    
    setTimeout(() => {
        horn.remove();
    }, 2000);
}

function createRandomEffect() {
    const effects = [createYellowUmbrella, createSuitUp, createBlueFrenchHorn];
    const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    randomEffect();
}

function createPubAmbiance() {
    // Create beer foam effect
    const foam = document.createElement('div');
    foam.className = 'beer-foam';
    document.body.appendChild(foam);
    
    setTimeout(() => {
        foam.remove();
    }, 1000);
}

// Add pub themed styles
const style = document.createElement('style');
style.textContent = `
    .floating-umbrella {
        position: fixed;
        top: -10px;
        font-size: 2rem;
        pointer-events: none;
        animation: floatDown linear forwards;
    }
    
    .suit-up {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        pointer-events: none;
        animation: suitUp 2s ease-out forwards;
    }
    
    .french-horn {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        pointer-events: none;
        animation: frenchHorn 2s ease-out forwards;
    }

    .beer-foam {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 20px;
        background: rgba(255, 255, 255, 0.8);
        animation: foamRise 1s ease-out forwards;
        pointer-events: none;
    }
    
    @keyframes floatDown {
        to {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes suitUp {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
        }
    }
    
    @keyframes frenchHorn {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(1) rotate(360deg);
            opacity: 0;
        }
    }

    @keyframes foamRise {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translateY(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function playMusic() {
    if (!isPlaying) {
        themeAudio.currentTime = 0;
        themeAudio.play();
        isPlaying = true;
        musicNoteIcon.classList.add('spinning');
        musicBtn.classList.add('playing');
        equalizer.classList.remove('paused');
    }
}

function pauseMusic() {
    themeAudio.pause();
    isPlaying = false;
    musicNoteIcon.classList.remove('spinning');
    musicBtn.classList.remove('playing');
    equalizer.classList.add('paused');
}

function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

themeAudio.addEventListener('ended', () => {
    pauseMusic();
});

// Play music when any main button is clicked
['getFunFact', 'getJoke', 'getQuote', 'getPickupLine'].forEach(fnName => {
    const orig = window[fnName];
    window[fnName] = async function(...args) {
        playMusic();
        return orig.apply(this, args);
    }
}); 