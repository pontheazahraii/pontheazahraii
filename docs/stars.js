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
    star.style.fontSize = `${randomBetween(0.5, 2)}em`; // Adjust the size range as needed
    return star;
}

// Function to generate stars and add them to the background
function generateStars() {
    const starsContainer = document.querySelector('.stars');
    starsContainer.innerHTML = ''; // Clear previous stars
    for (let i = 0; i < 100; i++) { // Adjust the number of stars as needed
        const star = createStar();
        starsContainer.appendChild(star);
    }
}

// Generate stars initially when the page loads
window.onload = function() {
    generateStars();
    // Set interval to regenerate stars every 2 seconds
    setInterval(generateStars, 2000);
};
