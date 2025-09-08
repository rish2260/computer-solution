// TechVision Computers - Main JavaScript File
// Modern Sky Color Theme Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initNavigation();
    initWhatsAppFloat();
    initForms();
    initPaymentGateway();
    initScrollEffects();
    initProductCards();
    initVideoCards();
    initMobileMenu();
    
    console.log('TechVision Computers - Website Loaded Successfully');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                scrollToSection(targetId);
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.backdropFilter = 'blur(25px)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// WhatsApp floating button functionality
function initWhatsAppFloat() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const phoneNumber = '+919919424955'; // Phone number from requirements
    
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function() {
            const message = encodeURIComponent('Hello! I am interested in your computer products. Can you help me?');
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
            window.open(whatsappUrl, '_blank');
        });
        
        // Animate WhatsApp button while scrolling
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            const rotation = (scrollY * 0.1) % 360;
            whatsappBtn.style.transform = `translateY(${Math.sin(scrollY * 0.01) * 5}px) rotate(${rotation}deg)`;
        });
    }
}

// Form handling
function initForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Bulk order form
    const bulkOrderForm = document.getElementById('bulk-order-form');
    if (bulkOrderForm) {
        bulkOrderForm.addEventListener('submit', handleBulkOrderForm);
    }
}

function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading animation
    showNotification('Sending your message...', 'info');
    
    // Simulate email sending (in real implementation, this would connect to a backend)
    setTimeout(() => {
        console.log('Contact Form Data:', data);
        
        // Store in localStorage for admin dashboard
        saveContactData(data);
        
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        e.target.reset();
        
        // Send to email (would require backend integration)
        sendEmailNotification('contact', data);
    }, 1500);
}

function handleBulkOrderForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    showNotification('Processing your bulk order request...', 'info');
    
    setTimeout(() => {
        console.log('Bulk Order Data:', data);
        
        // Store in localStorage for admin dashboard
        saveBulkOrderData(data);
        
        showNotification('Bulk order request submitted! Our team will contact you within 24 hours.', 'success');
        e.target.reset();
        
        // Send to email
        sendEmailNotification('bulk-order', data);
    }, 2000);
}

// Save data for admin dashboard
function saveContactData(data) {
    let contacts = JSON.parse(localStorage.getItem('contactData') || '[]');
    contacts.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    localStorage.setItem('contactData', JSON.stringify(contacts));
}

function saveBulkOrderData(data) {
    let orders = JSON.parse(localStorage.getItem('bulkOrderData') || '[]');
    orders.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now(),
        status: 'pending'
    });
    localStorage.setItem('bulkOrderData', JSON.stringify(orders));
}

// Email notification simulation (would require backend)
function sendEmailNotification(type, data) {
    // This would typically connect to a backend service
    // For demo purposes, we'll just log and show notification
    console.log(`Email notification sent for ${type}:`, data);
    
    // In real implementation, this would use EmailJS or backend API
    // Example: emailjs.send('service_id', 'template_id', data);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(15px);
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #10B981, #059669)',
        error: 'linear-gradient(135deg, #EF4444, #DC2626)',
        warning: 'linear-gradient(135deg, #F59E0B, #D97706)',
        info: 'linear-gradient(135deg, #4A90E2, #2E5CCC)'
    };
    return colors[type] || colors.info;
}

// Payment Gateway Integration
function initPaymentGateway() {
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    const paymentModal = document.getElementById('payment-modal');
    const closePaymentBtn = document.getElementById('close-payment');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const cardForm = document.getElementById('card-form');
    const upiForm = document.getElementById('upi-form');
    const upiApps = document.querySelectorAll('.upi-app');
    
    let currentProductPrice = 0;
    
    // Add to cart button clicks
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const priceElement = productCard.querySelector('.product-price');
            const productName = productCard.querySelector('h4').textContent;
            
            if (priceElement) {
                const priceText = priceElement.textContent.replace('₹', '').replace(',', '');
                currentProductPrice = parseInt(priceText);
                
                showPaymentModal(productName, currentProductPrice);
            }
        });
    });
    
    // Close payment modal
    if (closePaymentBtn) {
        closePaymentBtn.addEventListener('click', hidePaymentModal);
    }
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            // Add active class to clicked method
            this.classList.add('active');
            
            const selectedMethod = this.getAttribute('data-method');
            if (selectedMethod === 'card') {
                cardForm.style.display = 'block';
                upiForm.style.display = 'none';
            } else if (selectedMethod === 'upi') {
                cardForm.style.display = 'none';
                upiForm.style.display = 'block';
            }
        });
    });
    
    // UPI app selection
    upiApps.forEach(app => {
        app.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            processUPIPayment(appName, currentProductPrice);
        });
    });
    
    // Card payment form
    if (cardForm) {
        const cardPayBtn = cardForm.querySelector('.btn-primary');
        if (cardPayBtn) {
            cardPayBtn.addEventListener('click', function() {
                processCardPayment(currentProductPrice);
            });
        }
    }
    
    // UPI payment form
    if (upiForm) {
        const upiPayBtn = upiForm.querySelector('.btn-primary');
        if (upiPayBtn) {
            upiPayBtn.addEventListener('click', function() {
                const upiId = upiForm.querySelector('input[type="text"]').value;
                processUPIPayment('manual', currentProductPrice, upiId);
            });
        }
    }
}

function showPaymentModal(productName, price) {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'flex';
        
        // Update modal with product info
        const header = paymentModal.querySelector('h3');
        if (header) {
            header.textContent = `Payment for ${productName} - ₹${price.toLocaleString()}`;
        }
        
        // Reset forms
        const cardForm = document.getElementById('card-form');
        const upiForm = document.getElementById('upi-form');
        if (cardForm) cardForm.style.display = 'block';
        if (upiForm) upiForm.style.display = 'none';
        
        // Reset payment method selection
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('active');
        });
        document.querySelector('.payment-method[data-method="card"]').classList.add('active');
    }
}

function hidePaymentModal() {
    const paymentModal = document.getElementById('payment-modal');
    if (paymentModal) {
        paymentModal.style.display = 'none';
    }
}

function processCardPayment(amount) {
    showNotification('Processing card payment...', 'info');
    
    // Simulate payment processing
    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showNotification(`Payment of ₹${amount.toLocaleString()} successful!`, 'success');
            hidePaymentModal();
            
            // Save transaction data
            saveTransactionData({
                method: 'card',
                amount: amount,
                status: 'success',
                timestamp: new Date().toISOString()
            });
        } else {
            showNotification('Payment failed. Please try again.', 'error');
        }
    }, 3000);
}

function processUPIPayment(appName, amount, upiId = '') {
    showNotification(`Redirecting to ${appName} for payment...`, 'info');
    
    // In real implementation, this would redirect to the actual UPI app
    // For demo, we'll simulate the process
    setTimeout(() => {
        const success = Math.random() > 0.05; // 95% success rate for demo
        
        if (success) {
            showNotification(`UPI payment of ₹${amount.toLocaleString()} successful!`, 'success');
            hidePaymentModal();
            
            // Save transaction data
            saveTransactionData({
                method: 'upi',
                app: appName,
                amount: amount,
                upiId: upiId,
                status: 'success',
                timestamp: new Date().toISOString()
            });
        } else {
            showNotification('UPI payment failed. Please try again.', 'error');
        }
    }, 2000);
}

function saveTransactionData(data) {
    let transactions = JSON.parse(localStorage.getItem('transactionData') || '[]');
    transactions.push({
        ...data,
        id: Date.now()
    });
    localStorage.setItem('transactionData', JSON.stringify(transactions));
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('.product-category, .blog-post, .contact-item, .video-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Product cards interactive effects
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Video cards functionality
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    const youtubeChannelUrl = 'https://www.youtube.com/@computersolution.25';
    
    videoCards.forEach(card => {
        card.addEventListener('click', function() {
            window.open(youtubeChannelUrl, '_blank');
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = function() {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.7;
    }
    
    /* Mobile menu styles */
    @media (max-width: 968px) {
        .hamburger {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            padding: 5px;
        }
        
        .bar {
            width: 25px;
            height: 3px;
            background: #4A90E2;
            margin: 3px 0;
            transition: 0.3s;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        .nav-menu.active {
            display: flex !important;
            position: fixed;
            top: 80px;
            right: 0;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(15, 23, 42, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 50px;
            backdrop-filter: blur(20px);
        }
        
        .nav-menu.active .nav-item {
            margin: 10px 0;
        }
    }
`;
document.head.appendChild(style);
