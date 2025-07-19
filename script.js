// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const landingPage = document.querySelector('.landing-page');
    const journeyContainer = document.querySelector('.journey-container');
    const treeMessage = document.querySelector('.tree-message');
    const backgroundMusic = document.getElementById('background-music');
    const pages = document.querySelectorAll('.journey-page');
    const nextButtons = document.querySelectorAll('.next-button');
    const giftBox = document.querySelector('.gift-box');
    const letter = document.querySelector('.letter');
    const blowCandlesBtn = document.querySelector('.blow-candles');
    const birthdayMessage = document.querySelector('.birthday-message');
    const candles = document.querySelectorAll('.candle');
    const fallingHeart = document.querySelector('.falling-heart');
    
    // Add event listener to detect when the heart animation ends
    fallingHeart.addEventListener('animationend', function() {
        // Redirect to birth1.html when the heart animation completes
        window.location.href = 'birthday-main.html';
    });
    
    // Create placeholder images for the gallery
    createPlaceholderImages();

    // Start background music (will only play after user interaction due to browser policies)
    function playBackgroundMusic() {
        backgroundMusic.volume = 0.3;
        backgroundMusic.play().catch(error => {
            console.log('Auto-play prevented by browser:', error);
        });
    }

    // Add hover effect for tree message - petals floating from cursor
    treeMessage.addEventListener('mousemove', function(e) {
        createPetal(e.clientX, e.clientY);
    });

    // Click on tree message to start the journey
    treeMessage.addEventListener('click', function() {
        playBackgroundMusic();
        landingPage.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            landingPage.classList.add('hidden');
            journeyContainer.classList.remove('hidden');
            pages[0].style.opacity = 1;
        }, 1000);
    });

    // Next button functionality
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // Hide current page
            pages[index].style.animation = 'fadeOut 0.5s forwards';
            
            setTimeout(() => {
                pages[index].classList.add('hidden');
                // Show next page
                pages[index + 1].classList.remove('hidden');
                pages[index + 1].style.animation = 'fadeIn 0.5s forwards';
            }, 500);
        });
    });

    // Gift box click event
    giftBox.addEventListener('click', function() {
        this.classList.add('open');
        
        setTimeout(() => {
            letter.classList.remove('hidden');
            setTimeout(() => {
                letter.classList.add('show');
                setTimeout(() => {
                    document.querySelector('#page-three .next-button').classList.remove('hidden');
                }, 2000);
            }, 500);
        }, 1000);
    });

    // Blow candles button click event
    blowCandlesBtn.addEventListener('click', function() {
        // Extinguish candles
        candles.forEach(candle => {
            candle.querySelector(':before').style.display = 'none';
        });
        
        // Show birthday message with fireworks
        setTimeout(() => {
            birthdayMessage.classList.remove('hidden');
            birthdayMessage.classList.add('show');
            createFireworks();
        }, 1000);
    });

    // Helper Functions
    function createPetal(x, y) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = x + 'px';
        petal.style.top = y + 'px';
        document.body.appendChild(petal);
        
        // Random petal styling
        const size = Math.random() * 10 + 5;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 3 + 2;
        
        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style.transform = `rotate(${rotation}deg)`;
        petal.style.background = `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,192,230,0.8) 100%)`;
        petal.style.borderRadius = '50%';
        petal.style.position = 'absolute';
        petal.style.zIndex = '100';
        petal.style.boxShadow = '0 0 5px rgba(255,255,255,0.8)';
        petal.style.animation = `floatPetal ${duration}s forwards`;
        
        // Remove petal after animation completes
        setTimeout(() => {
            petal.remove();
        }, duration * 1000);
    }

    function createFireworks() {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createFirework();
            }, i * 300);
        }
    }

    function createFirework() {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        
        // Random position at the top of the screen
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight / 2);
        
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        document.body.appendChild(firework);
        
        // Create explosion particles
        setTimeout(() => {
            createExplosion(x, y);
            firework.remove();
        }, 1000);
    }

    function createExplosion(x, y) {
        const colors = ['#ff3e6f', '#ffc8e6', '#5eaefd', '#f3a953', '#a5d8ff'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            const size = Math.random() * 5 + 3;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 50 + 30;
            const duration = Math.random() * 1 + 1;
            
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.zIndex = '100';
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            const destinationX = x + Math.cos(angle) * speed;
            const destinationY = y + Math.sin(angle) * speed;
            
            particle.style.animation = `moveParticle ${duration}s forwards`;
            particle.style.transform = `translate(${destinationX - x}px, ${destinationY - y}px)`;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    }

    function createPlaceholderImages() {
        // This function would normally load actual images
        // For now, we'll use placeholder colors
        const photos = document.querySelectorAll('.photo');
        const colors = ['#ff9eb6', '#a5d8ff', '#f9c58d'];
        
        photos.forEach((photo, index) => {
            photo.style.backgroundColor = colors[index % colors.length];
            // Add a heart icon to represent a photo
            photo.innerHTML = '<div style="font-size: 50px; display: flex; justify-content: center; align-items: center; height: 100%;">❤️</div>';
        });
    }

    // Add additional animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        
        @keyframes floatPetal {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0;
            }
        }
        
        .firework {
            position: absolute;
            width: 5px;
            height: 5px;
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff;
            animation: riseUp 1s ease-out;
        }
        
        @keyframes riseUp {
            0% {
                transform: translateY(100vh);
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                transform: translateY(0);
                opacity: 0;
            }
        }
        
        @keyframes moveParticle {
            0% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});