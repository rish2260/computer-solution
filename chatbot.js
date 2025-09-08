// AI Chatbot - TechVision Computers
// Computer Knowledge Base & Customer Support

class ComputerSolutionChatbot {
    constructor() {
        this.chatbotContainer = document.getElementById('chatbot');
        this.chatbotToggle = document.getElementById('chatbot-toggle');
        this.chatMessages = document.getElementById('chatbot-messages');
        this.chatInput = document.getElementById('chat-input');
        this.sendBtn = document.getElementById('send-btn');
        this.closeBtn = document.getElementById('close-chat');
        
        this.isOpen = false;
        this.conversationHistory = [];
        
        // Computer knowledge base
        this.knowledgeBase = {
            greetings: [
                'Hello! I\'m your AI assistant for Computer Solution.',
                'Hi there! How can I help you with computers today?',
                'Welcome to Computer Solution! I\'m here to assist you with all your computer needs.',
                'Greetings! I\'m your computer expert. What can I help you with?'
            ],
            products: {
                desktop: {
                    keywords: ['desktop', 'pc', 'computer', 'workstation', 'gaming pc'],
                    response: 'We offer a wide range of desktop computers including gaming PCs, workstations, and office computers. Our Gaming Desktop Pro starts at ₹85,999 with high-performance components, while our Workstation Elite is perfect for professionals at ₹1,25,999. What type of desktop are you looking for?'
                },
                components: {
                    keywords: ['processor', 'cpu', 'graphics card', 'gpu', 'ram', 'memory', 'motherboard', 'storage', 'ssd', 'hdd'],
                    response: 'We stock premium computer components from top brands. Our selection includes Intel Core i9 processors (₹45,999), RTX 4090 graphics cards (₹1,89,999), high-speed RAM, SSDs, and motherboards. Are you building a new PC or upgrading an existing one?'
                },
                peripherals: {
                    keywords: ['keyboard', 'mouse', 'monitor', 'headset', 'speakers', 'webcam'],
                    response: 'Our peripheral collection includes mechanical gaming keyboards (₹8,999), precision gaming mice (₹4,999), high-resolution monitors, and audio accessories. All our peripherals are carefully selected for quality and performance. What peripheral are you interested in?'
                }
            },
            services: {
                bulk: {
                    keywords: ['bulk', 'wholesale', 'business', 'enterprise', 'office', 'company'],
                    response: 'We offer excellent bulk pricing for businesses! Minimum 10 units qualify for up to 25% discount, free installation, extended warranty, and dedicated account management. You can fill out our bulk order form on the website or call us at +91 99194 24955.'
                },
                support: {
                    keywords: ['support', 'help', 'problem', 'issue', 'warranty', 'repair'],
                    response: 'Our technical support team is ready to help! For warranty claims, repairs, or technical issues, please contact us at +91 99194 24955 or email info@techvisioncomputers.com. We provide comprehensive support for all our products.'
                },
                payment: {
                    keywords: ['payment', 'price', 'cost', 'pay', 'card', 'upi'],
                    response: 'We accept multiple payment methods including credit cards, debit cards, and UPI payments (Google Pay, Paytm, PhonePe). All transactions are secure and processed instantly. You can pay directly through our website.'
                }
            },
            technical: {
                gaming: {
                    keywords: ['gaming', 'game', 'fps', 'graphics', 'performance'],
                    response: 'For gaming, I recommend our Gaming Desktop Pro with RTX graphics and high-refresh monitors. Key specs to consider: RTX 4090 for 4K gaming, Intel Core i9 for smooth performance, 32GB RAM, and fast SSD storage. What games do you primarily play?'
                },
                programming: {
                    keywords: ['programming', 'development', 'coding', 'software', 'developer'],
                    response: 'For programming and development, our Workstation Elite is ideal with powerful multi-core processors, ample RAM (32GB+), and fast storage. Perfect for IDEs, virtual machines, and compilation tasks. Are you working on specific development projects?'
                },
                design: {
                    keywords: ['design', 'graphics', 'photoshop', 'video editing', 'rendering'],
                    response: 'Creative work requires powerful hardware! Our workstations with high-end GPUs, color-accurate monitors, and fast processors are perfect for Photoshop, video editing, and 3D rendering. What design software do you primarily use?'
                }
            },
            specifications: {
                cpu: {
                    keywords: ['intel', 'amd', 'ryzen', 'core', 'processor specs'],
                    response: 'We carry both Intel and AMD processors. Intel Core i9-13900K offers excellent single-core performance for gaming, while AMD Ryzen 9 7950X provides superior multi-core performance for productivity. What\'s your primary use case?'
                },
                gpu: {
                    keywords: ['nvidia', 'rtx', 'gtx', 'radeon', 'graphics performance'],
                    response: 'Our graphics cards range from RTX 4060 for 1080p gaming to RTX 4090 for 4K gaming and professional work. NVIDIA RTX cards offer ray tracing and DLSS, while AMD Radeon cards provide excellent value. What resolution do you game at?'
                }
            }
        };
        
        this.fallbackResponses = [
            'That\'s an interesting question! For detailed technical specifications or specific product inquiries, I\'d recommend contacting our expert team at +91 99194 24955.',
            'I\'d be happy to help with that! For the most accurate information, please reach out to our specialists at +91 99194 24955 or visit our store.',
            'Great question! Our technical experts can provide detailed guidance. Please call us at +91 99194 24955 or fill out our contact form.',
            'Thanks for asking! For personalized recommendations based on your specific needs, please contact our team at +91 99194 24955.'
        ];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.addWelcomeMessage();
    }
    
    bindEvents() {
        // Toggle chatbot
        this.chatbotToggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        
        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Auto-focus on input when opened
        this.chatInput.addEventListener('focus', () => {
            this.chatInput.style.borderColor = '#4A90E2';
        });
        
        this.chatInput.addEventListener('blur', () => {
            this.chatInput.style.borderColor = 'rgba(74, 144, 226, 0.3)';
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.chatbotContainer.style.display = 'flex';
        this.isOpen = true;
        this.chatInput.focus();
        
        // Add opening animation
        this.chatbotContainer.style.animation = 'slideInUp 0.3s ease-out';
    }
    
    closeChat() {
        this.chatbotContainer.style.animation = 'slideOutDown 0.3s ease-in';
        setTimeout(() => {
            this.chatbotContainer.style.display = 'none';
            this.isOpen = false;
        }, 300);
    }
    
    addWelcomeMessage() {
        const welcomeMsg = this.knowledgeBase.greetings[Math.floor(Math.random() * this.knowledgeBase.greetings.length)];
        this.addMessage(welcomeMsg, 'bot');
    }
    
    sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (message === '') return;
        
        // Add user message
        this.addMessage(message, 'user');
        
        // Clear input
        this.chatInput.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Process message and respond
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.processMessage(message);
            this.addMessage(response, 'bot');
        }, 1500);
        
        // Store conversation
        this.conversationHistory.push({
            user: message,
            timestamp: new Date().toISOString()
        });
    }
    
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for greetings
        if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return this.knowledgeBase.greetings[Math.floor(Math.random() * this.knowledgeBase.greetings.length)];
        }
        
        // Check for thanks
        if (this.containsAny(lowerMessage, ['thank', 'thanks', 'appreciate'])) {
            return 'You\'re welcome! I\'m here to help with any computer-related questions. Is there anything else you\'d like to know?';
        }
        
        // Check for contact info
        if (this.containsAny(lowerMessage, ['contact', 'phone', 'number', 'address', 'location', 'whatsapp'])) {
            return 'You can reach us at +91 99194 24955 (call or WhatsApp), email us at info@computersolution.com, or visit our store at Naza Market, Lucknow, Uttar Pradesh. We\'re here to help!';
        }
        
        // Check product categories
        for (const [category, data] of Object.entries(this.knowledgeBase.products)) {
            if (this.containsAny(lowerMessage, data.keywords)) {
                return data.response;
            }
        }
        
        // Check services
        for (const [service, data] of Object.entries(this.knowledgeBase.services)) {
            if (this.containsAny(lowerMessage, data.keywords)) {
                return data.response;
            }
        }
        
        // Check technical categories
        for (const [tech, data] of Object.entries(this.knowledgeBase.technical)) {
            if (this.containsAny(lowerMessage, data.keywords)) {
                return data.response;
            }
        }
        
        // Check specifications
        for (const [spec, data] of Object.entries(this.knowledgeBase.specifications)) {
            if (this.containsAny(lowerMessage, data.keywords)) {
                return data.response;
            }
        }
        
        // Price inquiries
        if (this.containsAny(lowerMessage, ['price', 'cost', 'how much', 'rate'])) {
            return 'Our products have competitive pricing! Desktop computers start from ₹85,999, components vary by specification, and peripherals start from ₹4,999. For detailed pricing and current offers, please call us at +91 99194 24955.';
        }
        
        // Availability
        if (this.containsAny(lowerMessage, ['available', 'stock', 'in stock'])) {
            return 'We maintain good stock levels for most popular items. For real-time availability of specific products, please call us at +91 99194 24955 or visit our store. We can also arrange quick delivery if needed.';
        }
        
        // Return fallback response
        return this.fallbackResponses[Math.floor(Math.random() * this.fallbackResponses.length)];
    }
    
    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }
    
    addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const messageContent = document.createElement('p');
        messageContent.textContent = message;
        messageDiv.appendChild(messageContent);
        
        // Add timestamp for user messages
        if (sender === 'user') {
            const timestamp = document.createElement('small');
            timestamp.textContent = new Date().toLocaleTimeString();
            timestamp.style.opacity = '0.7';
            timestamp.style.fontSize = '0.8rem';
            messageDiv.appendChild(timestamp);
        }
        
        this.chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        
        // Add animation
        messageDiv.style.animation = 'fadeInUp 0.3s ease-out';
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator bot-message';
        typingDiv.id = 'typing-indicator';
        
        const typingContent = document.createElement('p');
        typingContent.innerHTML = 'Typing<span class="dots">...</span>';
        typingDiv.appendChild(typingContent);
        
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Save conversation for admin dashboard
    saveConversation() {
        const conversation = {
            messages: this.conversationHistory,
            timestamp: new Date().toISOString(),
            id: Date.now()
        };
        
        let conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
        conversations.push(conversation);
        localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
    }
}

// Advanced Chat Features
class ChatAnalytics {
    constructor(chatbot) {
        this.chatbot = chatbot;
        this.analytics = {
            totalMessages: 0,
            commonQueries: {},
            userSessions: 0
        };
        this.init();
    }
    
    init() {
        this.loadAnalytics();
        this.trackUserSession();
    }
    
    loadAnalytics() {
        const saved = localStorage.getItem('chatAnalytics');
        if (saved) {
            this.analytics = JSON.parse(saved);
        }
    }
    
    saveAnalytics() {
        localStorage.setItem('chatAnalytics', JSON.stringify(this.analytics));
    }
    
    trackUserSession() {
        this.analytics.userSessions++;
        this.saveAnalytics();
    }
    
    trackMessage(message) {
        this.analytics.totalMessages++;
        
        // Track common queries
        const words = message.toLowerCase().split(' ');
        words.forEach(word => {
            if (word.length > 3) {
                this.analytics.commonQueries[word] = (this.analytics.commonQueries[word] || 0) + 1;
            }
        });
        
        this.saveAnalytics();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const chatbot = new ComputerSolutionChatbot();
    const analytics = new ChatAnalytics(chatbot);
    
    // Override sendMessage to include analytics
    const originalSendMessage = chatbot.sendMessage;
    chatbot.sendMessage = function() {
        const message = this.chatInput.value.trim();
        if (message) {
            analytics.trackMessage(message);
        }
        return originalSendMessage.call(this);
    };
    
    console.log('Computer Solution AI Chatbot initialized');
});

// Add required CSS animations
const chatbotStyle = document.createElement('style');
chatbotStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .typing-indicator .dots {
        animation: typing 1.5s infinite;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            transform: initial;
        }
        30% {
            transform: translateY(-10px);
        }
    }
    
    .chatbot-messages {
        scrollbar-width: thin;
        scrollbar-color: #4A90E2 rgba(30, 41, 59, 0.5);
    }
    
    .chatbot-messages::-webkit-scrollbar {
        width: 6px;
    }
    
    .chatbot-messages::-webkit-scrollbar-track {
        background: rgba(30, 41, 59, 0.5);
        border-radius: 3px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb {
        background: #4A90E2;
        border-radius: 3px;
    }
    
    .chatbot-messages::-webkit-scrollbar-thumb:hover {
        background: #2E5CCC;
    }
`;
document.head.appendChild(chatbotStyle);
