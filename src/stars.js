// Function to generate a random number between min and max
function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a star element
function createStar() {
    const star = document.createElement('span');
    star.textContent = '*';
    star.className = 'star';
    star.style.top = `${randomBetween(0, 100)}%`;
    star.style.left = `${randomBetween(0, 100)}%`;
    star.style.fontSize = `${randomBetween(0.4, 1.4)}em`;
    star.style.opacity = `${randomBetween(0.12, 0.45)}`;
    // Softer, slower twinkle
    star.style.animation = `twinkle ${randomBetween(3, 7)}s ease-in-out ${randomBetween(0, 3)}s infinite`;
    return star;
}

// Function to generate stars and add them to the background
let STARFIELD_GENERATED = false;
function generateStars() {
    if (STARFIELD_GENERATED) return; // keep positions fixed once created
    const starsContainer = document.querySelector('.stars');
    if (!starsContainer) return;
    starsContainer.innerHTML = '';
    for (let i = 0; i < 80; i++) {
        const star = createStar();
        starsContainer.appendChild(star);
    }
    STARFIELD_GENERATED = true;
}

// Generate stars once when the page is ready (no re-generation)
document.addEventListener('DOMContentLoaded', generateStars);
