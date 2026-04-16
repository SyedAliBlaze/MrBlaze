// --- Misty Cloud Background Simulation ---
function createClouds() {
    const container = document.createElement('div');
    container.className = 'clouds-container';
    document.body.appendChild(container);

    const numClouds = Math.floor(Math.random() * 6) + 12;

    for (let i = 0; i < numClouds; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';

        const size = Math.random() * 200 + 150;
        const squish = Math.random() * 0.4 + 0.2;
        const rot = Math.random() * 360;
        const startX = Math.random() * 100 - 10;
        const startY = Math.random() * 100 - 10;
        const duration = Math.random() * 30 + 30;
        const flickerDur = Math.random() * 2 + 1;
        const maxOpacity = Math.random() * 0.25 + 0.15;

        cloud.style.setProperty('--size', `${size}px`);
        cloud.style.setProperty('--squish', squish);
        cloud.style.setProperty('--rot', `${rot}deg`);
        cloud.style.setProperty('--start-x', `${startX}vw`);
        cloud.style.setProperty('--start-y', `${startY}vh`);
        cloud.style.setProperty('--duration', `${duration}s`);
        cloud.style.setProperty('--flicker-dur', `${flickerDur}s`);
        cloud.style.setProperty('--max-opacity', maxOpacity);

        cloud.style.setProperty('--move-x-1', `${Math.random() * 80 - 40}vw`);
        cloud.style.setProperty('--move-y-1', `${Math.random() * 80 - 40}vh`);
        cloud.style.setProperty('--scale-1', Math.random() * 0.4 + 0.8);

        cloud.style.setProperty('--move-x-2', `${Math.random() * 100 - 50}vw`);
        cloud.style.setProperty('--move-y-2', `${Math.random() * 100 - 50}vh`);
        cloud.style.setProperty('--scale-2', Math.random() * 0.6 + 1.2);

        cloud.style.setProperty('--move-x-3', `${Math.random() * 120 - 60}vw`);
        cloud.style.setProperty('--move-y-3', `${Math.random() * 120 - 60}vh`);
        cloud.style.setProperty('--scale-3', Math.random() * 0.3 + 0.9);

        cloud.style.setProperty('--move-x-4', `${Math.random() * 150 - 75}vw`);
        cloud.style.setProperty('--move-y-4', `${Math.random() * 150 - 75}vh`);

        cloud.style.animationDelay = `-${Math.random() * 40}s`;

        container.appendChild(cloud);
    }
}

// Initialize clouds and welcome modal on load
document.addEventListener('DOMContentLoaded', () => {
    createClouds();

    // Welcome Alert Logic
    if (!sessionStorage.getItem('welcomeShown')) {
        sessionStorage.setItem('welcomeShown', 'true');
        const overlay = document.getElementById('welcome-overlay');
        const modal = document.getElementById('welcome-modal');

        if (overlay && modal) {
            overlay.style.display = 'flex';
            modal.classList.add('welcome-appear');

            setTimeout(() => {
                modal.classList.remove('welcome-appear');
                modal.classList.add('welcome-disappear');

                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }, 1900);
        }
    }
});

// --- Level and Countdown Logic ---
const birthdayStr = "2003-03-03T00:00:00";
const birthday = new Date(birthdayStr);
const levelEl = document.getElementById("player-level");

const elMo = document.getElementById("cd-mo");
const elD = document.getElementById("cd-d");
const elH = document.getElementById("cd-h");
const elM = document.getElementById("cd-m");
const elS = document.getElementById("cd-s");

function updateLevelAndCountdown() {
    const now = new Date();

    let age = now.getFullYear() - birthday.getFullYear();
    const bdayThisYear = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

    if (now.getTime() < bdayThisYear.getTime()) {
        age--;
    }
    if (levelEl) levelEl.textContent = age;

    let nextBdayYear = now.getFullYear();
    if (now.getTime() >= bdayThisYear.getTime()) {
        nextBdayYear++;
    }
    const nextBirthday = new Date(nextBdayYear, birthday.getMonth(), birthday.getDate());

    let mStart = new Date(now);
    let months = 0;
    while (true) {
        let temp = new Date(mStart);
        temp.setMonth(temp.getMonth() + 1);
        if (temp.getTime() <= nextBirthday.getTime()) {
            months++;
            mStart = temp;
        } else {
            break;
        }
    }

    let diff = nextBirthday.getTime() - mStart.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);

    const secs = Math.floor(diff / 1000);

    const pad = n => n.toString().padStart(2, '0');

    if (elMo) elMo.textContent = pad(months);
    if (elD) elD.textContent = pad(days);
    if (elH) elH.textContent = pad(hours);
    if (elM) elM.textContent = pad(mins);
    if (elS) elS.textContent = pad(secs);
}

setInterval(updateLevelAndCountdown, 1000);
updateLevelAndCountdown();

// --- Unified Modal System ---
const modalTriggers = document.querySelectorAll('[data-target]');
const allModals = document.querySelectorAll('.modal');

// Close function for any modal
function closePortal(modalEl) {
    const content = modalEl.querySelector('.modal-content') || modalEl.querySelector('img');
    if (content) {
        content.classList.remove('welcome-appear');
        content.classList.add('welcome-disappear');
    }
    setTimeout(() => {
        modalEl.style.display = "none";
    }, 300);
}

// Open function
function openPortal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
        targetModal.style.display = "flex";
        const content = targetModal.querySelector('.modal-content') || targetModal.querySelector('img');
        if (content) {
            content.classList.remove('welcome-disappear');
            content.classList.add('welcome-appear');
            if (modalId === 'image-modal') {
                document.getElementById('expanded-img').src = document.getElementById('profile-photo').src;
                const hudAge = document.getElementById('hud-age');
                const playerLevel = document.getElementById('player-level');
                if (hudAge && playerLevel) {
                    hudAge.textContent = playerLevel.textContent;
                }
            }
        }
    }
}

// Trigger setup
modalTriggers.forEach(trigger => {
    trigger.onclick = function () {
        const targetId = this.getAttribute('data-target');
        openPortal(targetId);
    };
});

// Special case for profile photo
const profilePhoto = document.getElementById("profile-photo");
if (profilePhoto) {
    profilePhoto.onclick = () => openPortal('image-modal');
}

// Special case for Level trigger 
const levelTriggerBtn = document.getElementById("level-trigger");
if (levelTriggerBtn) {
    levelTriggerBtn.onclick = () => openPortal('countdown-modal');
}

// Close Button setup for regular × buttons
document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.onclick = function () {
        const modal = this.closest('.modal');
        closePortal(modal);
    };
});

// Special close handler for Image Modal glowing circle button
const imageCloseBtn = document.getElementById("close-modal");
const modalWrapper = document.getElementById("modal-wrapper");

if (imageCloseBtn && modalWrapper) {
    imageCloseBtn.onclick = function () {
        modalWrapper.classList.remove('welcome-appear');
        modalWrapper.classList.add('welcome-disappear');

        setTimeout(() => {
            const imageModal = document.getElementById("image-modal");
            if (imageModal) imageModal.style.display = "none";
        }, 300);
    };
}

// Window click setup (Click outside to close)
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        closePortal(event.target);
    }
};