// Advanced 3D Effects - TechVision Computers
// Modern Sky Color Theme Animated Background

class Sky3DBackground {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.stars = [];
        this.clouds = [];
        this.meteors = [];
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.time = 0;
        
        this.colors = {
            sky: ['#87CEEB', '#4A90E2', '#2E5CCC', '#1E3A8A'],
            aurora: ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B'],
            particles: ['#FFFFFF', '#87CEEB', '#4A90E2', '#8B5CF6']
        };
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.createStars();
        this.createClouds();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        window.addEventListener('scroll', () => {
            this.time += 0.02;
        });
    }
    
    createParticles() {
        const particleCount = Math.min(150, Math.floor(this.canvas.width * this.canvas.height / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                z: Math.random() * 1000,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                vz: Math.random() * 2 + 1,
                size: Math.random() * 3 + 1,
                color: this.colors.particles[Math.floor(Math.random() * this.colors.particles.length)],
                opacity: Math.random() * 0.8 + 0.2,
                life: Math.random() * 100 + 50
            });
        }
    }
    
    createStars() {
        const starCount = Math.min(200, Math.floor(this.canvas.width * this.canvas.height / 8000));
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.05 + 0.02,
                brightness: Math.random() * 0.8 + 0.2
            });
        }
    }
    
    createClouds() {
        const cloudCount = 8;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = {
                x: Math.random() * (this.canvas.width + 400) - 200,
                y: Math.random() * this.canvas.height * 0.6,
                size: Math.random() * 150 + 100,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                particles: []
            };
            
            // Create cloud particles
            const particleCount = Math.floor(cloud.size / 10);
            for (let j = 0; j < particleCount; j++) {
                cloud.particles.push({
                    x: Math.random() * cloud.size - cloud.size / 2,
                    y: Math.random() * cloud.size / 2 - cloud.size / 4,
                    size: Math.random() * 40 + 20,
                    offset: Math.random() * Math.PI * 2
                });
            }
            
            this.clouds.push(cloud);
        }
    }
    
    createMeteor() {
        if (Math.random() < 0.002) { // 0.2% chance per frame
            this.meteors.push({
                x: this.canvas.width + 100,
                y: Math.random() * this.canvas.height * 0.3,
                vx: -Math.random() * 8 - 4,
                vy: Math.random() * 4 + 2,
                size: Math.random() * 3 + 2,
                trail: [],
                life: 60
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx + Math.sin(this.time + particle.x * 0.001) * 0.5;
            particle.y += particle.vy + Math.cos(this.time + particle.y * 0.001) * 0.3;
            particle.z -= particle.vz;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= dx * force * 0.001;
                particle.vy -= dy * force * 0.001;
            }
            
            // Reset particle if it goes off screen or too far
            if (particle.x < -50 || particle.x > this.canvas.width + 50 || 
                particle.y < -50 || particle.y > this.canvas.height + 50 || 
                particle.z <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.z = 1000;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
            }
            
            // Update life
            particle.life--;
            if (particle.life <= 0) {
                particle.life = Math.random() * 100 + 50;
                particle.color = this.colors.particles[Math.floor(Math.random() * this.colors.particles.length)];
            }
        });
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.twinkle += star.twinkleSpeed;
        });
    }
    
    updateClouds() {
        this.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            
            if (cloud.x < -cloud.size - 200) {
                cloud.x = this.canvas.width + 200;
                cloud.y = Math.random() * this.canvas.height * 0.6;
            }
            
            // Animate cloud particles
            cloud.particles.forEach(particle => {
                particle.offset += 0.01;
            });
        });
    }
    
    updateMeteors() {
        this.meteors.forEach((meteor, index) => {
            // Add to trail
            meteor.trail.push({ x: meteor.x, y: meteor.y });
            if (meteor.trail.length > 10) {
                meteor.trail.shift();
            }
            
            // Update position
            meteor.x += meteor.vx;
            meteor.y += meteor.vy;
            meteor.life--;
            
            // Remove if off screen or life ended
            if (meteor.x < -100 || meteor.y > this.canvas.height + 100 || meteor.life <= 0) {
                this.meteors.splice(index, 1);
            }
        });
    }
    
    drawBackground() {
        // Create gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#0F172A');
        gradient.addColorStop(0.3, '#1E293B');
        gradient.addColorStop(0.7, '#334155');
        gradient.addColorStop(1, '#1E293B');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add aurora effect
        this.drawAurora();
    }
    
    drawAurora() {
        const auroraGradient = this.ctx.createRadialGradient(
            this.canvas.width / 2, this.canvas.height * 0.3, 0,
            this.canvas.width / 2, this.canvas.height * 0.3, this.canvas.width
        );
        
        const auroraOpacity = 0.1 + Math.sin(this.time * 0.02) * 0.05;
        auroraGradient.addColorStop(0, `rgba(139, 92, 246, ${auroraOpacity})`);
        auroraGradient.addColorStop(0.5, `rgba(74, 144, 226, ${auroraOpacity * 0.5})`);
        auroraGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        
        this.ctx.fillStyle = auroraGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawStars() {
        this.stars.forEach(star => {
            const brightness = star.brightness * (0.5 + Math.sin(star.twinkle) * 0.5);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow
            if (brightness > 0.7) {
                this.ctx.fillStyle = `rgba(135, 206, 235, ${brightness * 0.3})`;
                this.ctx.beginPath();
                this.ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
                this.ctx.fill();
            }
        });
    }
    
    drawClouds() {
        this.clouds.forEach(cloud => {
            this.ctx.save();
            this.ctx.globalAlpha = cloud.opacity;
            
            cloud.particles.forEach(particle => {
                const x = cloud.x + particle.x + Math.sin(particle.offset) * 10;
                const y = cloud.y + particle.y + Math.cos(particle.offset * 0.7) * 5;
                
                const gradient = this.ctx.createRadialGradient(
                    x, y, 0,
                    x, y, particle.size
                );
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
                gradient.addColorStop(0.5, 'rgba(135, 206, 235, 0.4)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
            
            this.ctx.restore();
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            // 3D perspective calculation
            const scale = 1000 / (1000 - particle.z);
            const x2d = particle.x * scale;
            const y2d = particle.y * scale;
            const size = particle.size * scale;
            
            if (scale > 0.1 && scale < 10) {
                this.ctx.save();
                this.ctx.globalAlpha = particle.opacity * Math.min(scale, 1);
                
                // Create particle gradient
                const gradient = this.ctx.createRadialGradient(
                    x2d, y2d, 0,
                    x2d, y2d, size * 2
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'transparent');
                
                this.ctx.fillStyle = gradient;
                this.ctx.beginPath();
                this.ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.restore();
            }
        });
    }
    
    drawMeteors() {
        this.meteors.forEach(meteor => {
            // Draw trail
            if (meteor.trail.length > 1) {
                this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                this.ctx.lineWidth = meteor.size;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(meteor.trail[0].x, meteor.trail[0].y);
                
                for (let i = 1; i < meteor.trail.length; i++) {
                    this.ctx.lineWidth = meteor.size * (i / meteor.trail.length);
                    this.ctx.globalAlpha = i / meteor.trail.length;
                    this.ctx.lineTo(meteor.trail[i].x, meteor.trail[i].y);
                    this.ctx.stroke();
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(meteor.trail[i].x, meteor.trail[i].y);
                }
            }
            
            // Draw meteor head
            this.ctx.globalAlpha = 1;
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.beginPath();
            this.ctx.arc(meteor.x, meteor.y, meteor.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow
            const gradient = this.ctx.createRadialGradient(
                meteor.x, meteor.y, 0,
                meteor.x, meteor.y, meteor.size * 3
            );
            gradient.addColorStop(0, 'rgba(135, 206, 235, 0.8)');
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(meteor.x, meteor.y, meteor.size * 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.time += 0.01;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.drawBackground();
        
        // Update and draw elements
        this.updateStars();
        this.drawStars();
        
        this.updateClouds();
        this.drawClouds();
        
        this.createMeteor();
        this.updateMeteors();
        this.drawMeteors();
        
        this.updateParticles();
        this.drawParticles();
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// 3D Card Effects
class Card3DEffects {
    constructor() {
        this.init();
    }
    
    init() {
        const cards = document.querySelectorAll('.product-card, .blog-post, .video-card');
        
        cards.forEach(card => {
            this.addTiltEffect(card);
        });
    }
    
    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateX = (mouseY / rect.height) * 30;
            const rotateY = (mouseX / rect.width) * -30;
            
            element.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
            
            element.style.boxShadow = `
                ${mouseX * 0.1}px ${mouseY * 0.1}px 30px rgba(74, 144, 226, 0.3)
            `;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            element.style.boxShadow = '0 10px 30px rgba(74, 144, 226, 0.3)';
        });
    }
}

// Parallax Scrolling Effects
class ParallaxEffects {
    constructor() {
        this.elements = [];
        this.init();
    }
    
    init() {
        // Add parallax to floating icons
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach((icon, index) => {
            this.elements.push({
                element: icon,
                speed: 0.5 + (index * 0.1),
                direction: index % 2 === 0 ? 1 : -1
            });
        });
        
        // Add parallax to section backgrounds
        const sections = document.querySelectorAll('.products-section, .bulk-orders-section, .blog-section, .contact-section');
        sections.forEach((section, index) => {
            this.elements.push({
                element: section,
                speed: 0.2,
                direction: 1
            });
        });
        
        window.addEventListener('scroll', () => this.updateParallax());
    }
    
    updateParallax() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(item => {
            const { element, speed, direction } = item;
            const yPos = scrollY * speed * direction;
            
            if (element.classList.contains('floating-icon')) {
                element.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrollY * 0.1}deg)`;
            } else {
                element.style.transform = `translate3d(0, ${yPos * 0.5}px, 0)`;
            }
        });
    }
}

// Text Animation Effects
class TextAnimationEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.animateGradientText();
        this.addTypewriterEffect();
    }
    
    animateGradientText() {
        const gradientTexts = document.querySelectorAll('.gradient-text, .section-title');
        
        gradientTexts.forEach(text => {
            text.style.backgroundSize = '200% 200%';
            text.style.animation = 'shimmer 3s ease-in-out infinite';
        });
    }
    
    addTypewriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const originalText = subtitle.textContent;
            subtitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    subtitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Initialize all 3D effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D background
    new Sky3DBackground();
    
    // Initialize card effects
    new Card3DEffects();
    
    // Initialize parallax effects
    new ParallaxEffects();
    
    // Initialize text animations
    new TextAnimationEffects();
    
    console.log('3D Effects initialized successfully');
});
