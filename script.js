$(document).ready(function(){
    // Ensure we start at the top of the page
    if (window.location.hash) {
        // If there's a hash in the URL, clear it and scroll to top
        history.replaceState(null, null, ' ');
        $(window).scrollTop(0);
    } else {
        // Otherwise, just ensure we're at the top
        $(window).scrollTop(0);
    }
    
    try {
        // Typed.js for typing animation with single cursor
        var typed = new Typed(".typing", {
            strings: ["Developer", "Designer", "Freelancer", "Ethical Hacker"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
        var typed2 = new Typed(".typing-2", {
            strings: ["Developer", "Designer", "Freelancer", "Ethical Hacker"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    } catch (error) {
        console.error('Typed.js initialization failed:', error);
    }

    try {
        // Navbar toggle for mobile
        $('.menu-toggle').click(function(){
            $('.mobile-menu').slideToggle();
            $(this).find('i').toggleClass('fa-bars fa-times');
        });
    } catch (error) {
        console.error('Navbar toggle failed:', error);
    }

    try {
        // Scroll-up button show/hide and navbar scroll effect
        $(window).scroll(function(){
            // Scroll-up button show/hide
            if($(this).scrollTop() > 500){
                $('.scroll-up-btn').removeClass('hidden').addClass('block');
            } else {
                $('.scroll-up-btn').removeClass('block').addClass('hidden');
            }
            
            // Navbar scroll effect
            if($(this).scrollTop() > 100){
                $('.navbar').addClass('scrolled');
            } else {
                $('.navbar').removeClass('scrolled');
            }
            
            // Parallax effect
            const scrolled = $(window).scrollTop();
            const rate = scrolled * -0.5;
            const rate2 = scrolled * -0.3;
            const rate3 = scrolled * -0.1;
            
            // Apply different speeds to different layers
            $('.parallax-layer-1').css('transform', 'translate3d(0px, ' + rate + 'px, 0px)');
            $('.parallax-layer-2').css('transform', 'translate3d(0px, ' + rate2 + 'px, 0px)');
            $('.parallax-layer-3').css('transform', 'translate3d(0px, ' + rate3 + 'px, 0px)');
        });

        // Scroll to top
        $('.scroll-up-btn').click(function(){
            $('html, body').animate({scrollTop: 0}, 800);
            return false;
        });
    } catch (error) {
        console.error('Scroll effects failed:', error);
    }

    try {
        // Smooth scroll for menu links, adjust for navbar height
        $('.menu-btn').click(function(e){
            // Prevent default behavior for all menu buttons
            e.preventDefault();
            
            var target = $(this).attr('href');
            var navbarHeight = $('#navbar').outerHeight() || 60;
            
            $('html, body').animate({
                scrollTop: $(target).offset().top - navbarHeight
            }, 800);
            
            // If this is a mobile link, close the mobile menu
            if ($(this).hasClass('mobile-link')) {
                $('.mobile-menu').slideUp();
                $('.menu-toggle i').removeClass('fa-times').addClass('fa-bars');
            }
            
            return false;
        });
    } catch (error) {
        console.error('Smooth scroll failed:', error);
    }

    try {
        // Read more toggle
        $('#read-more-btn').click(function(){
            $('#extra-content').slideToggle();
            $(this).text($(this).text() === 'Read more' ? 'Read less' : 'Read more');
        });
    } catch (error) {
        console.error('Read more toggle failed:', error);
    }

    try {
        // Section fade-in animations on scroll
        $('section').waypoint(function(direction) {
            if (direction === 'down') {
                $(this.element).find('.animated').each(function(index) {
                    var $this = $(this);
                    setTimeout(function() {
                        $this.addClass('visible');
                    }, index * 200);
                });
            }
        }, { offset: '75%' });
    } catch (error) {
        console.error('Section animations failed:', error);
    }

    try {
        // AJAX Form Submission
        $('#contact-form').submit(function(e) {
            e.preventDefault();
            
            // Get form data
            var formData = $(this).serialize();
            var formMessage = $('#form-message');
            
            // Show loading state
            var submitBtn = $('.submit-btn');
            var originalText = submitBtn.html();
            submitBtn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin ml-2"></i>');
            submitBtn.prop('disabled', true);
            
            $.ajax({
                url: "https://formsubmit.co/ajax/ethical.laxman@gmail.com",
                method: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    // Show success animation
                    showSuccessAnimation();
                    $('#contact-form')[0].reset();
                },
                error: function(xhr, status, error) {
                    formMessage.removeClass('text-green-600 hidden').addClass('text-red-600').text('Error sending message. Please try again.');
                    // Hide message after 5 seconds
                    setTimeout(function() {
                        formMessage.addClass('hidden');
                    }, 5000);
                },
                complete: function() {
                    // Restore button state
                    submitBtn.html(originalText);
                    submitBtn.prop('disabled', false);
                }
            });
        });
    } catch (error) {
        console.error('Form submission failed:', error);
    }

    // Add hover effect to cards
    $('.card').hover(
        function() {
            $(this).addClass('shadow-2xl');
        },
        function() {
            $(this).removeClass('shadow-2xl');
        }
    );

    // Add animation to elements when they come into view
    $('.animated').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).addClass('visible');
        }
    }, { offset: '90%' });

    // Timeline animation
    $('.timeline-item').waypoint(function(direction) {
        if (direction === 'down') {
            $(this.element).find('.timeline-content').addClass('visible');
        }
    }, { offset: '75%' });

    // Set initial theme state based on system preference or local storage
    function setInitialTheme() {
        try {
            // Check if user has previously set a theme preference
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            console.log('Setting initial theme:', { savedTheme, prefersDark });
            
            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                // Apply dark theme
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                $('.theme-checkbox').prop('checked', false); // Inverted for correct visual representation
                console.log('Applied dark theme');
            } else {
                // Apply light theme
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                $('.theme-checkbox').prop('checked', true); // Inverted for correct visual representation
                console.log('Applied light theme');
            }
        } catch (error) {
            console.error('Error setting initial theme:', error);
        }
    }
    
    // Set initial theme
    setInitialTheme();

    // Theme Toggle Functionality - Updated for new switch design
    $('.theme-checkbox').change(function() {
        try {
            console.log('Theme checkbox changed');
            
            // Sync both checkboxes
            $('.theme-checkbox').prop('checked', $(this).prop('checked'));
            
            // Determine the new state (inverted logic for correct visual representation)
            const isLightMode = $(this).prop('checked');
            
            console.log('Is light mode:', isLightMode);
            
            // Apply or remove dark mode classes (inverted logic)
            if (!isLightMode) { // If NOT light mode, then it's dark mode
                $('body').addClass('dark-mode');
                $('html').addClass('dark');
                localStorage.setItem('theme', 'dark');
                console.log('Dark mode enabled');
            } else { // If light mode
                $('body').removeClass('dark-mode');
                $('html').removeClass('dark');
                localStorage.setItem('theme', 'light');
                console.log('Light mode enabled');
            }
            
            console.log('Dark mode classes:', {
                body: $('body').hasClass('dark-mode'),
                html: $('html').hasClass('dark')
            });
            
            // Force reflow to ensure styles are applied
            document.body.offsetHeight;
        } catch (error) {
            console.error('Error in theme toggle:', error);
        }
    });

    // Easter Egg Functionality
    $('#easter-egg-btn').click(function() {
        $('#easter-egg-modal').removeClass('hidden').addClass('flex');
    });

    $('#close-easter-egg').click(function() {
        $('#easter-egg-modal').removeClass('flex').addClass('hidden');
    });

    // Close modal when clicking outside
    $('#easter-egg-modal').click(function(e) {
        if (e.target === this) {
            $(this).removeClass('flex').addClass('hidden');
        }
    });

    // Custom cursor effect with glowing and ripple effects
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        // Create ripple effect container
        const rippleContainer = document.createElement('div');
        rippleContainer.classList.add('cursor-ripple');
        document.body.appendChild(rippleContainer);
        rippleContainer.style.display = 'none';

        window.addEventListener('mousemove', function(e) {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Delayed movement for outline
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
        
        // Scale effect on mouse down
        document.addEventListener('mousedown', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
            
            // Add ripple effect
            const posX = event.clientX;
            const posY = event.clientY;
            rippleContainer.style.left = `${posX}px`;
            rippleContainer.style.top = `${posY}px`;
            rippleContainer.style.display = 'block';
            
            // Remove ripple after animation
            setTimeout(() => {
                rippleContainer.style.display = 'none';
            }, 600);
        });
        
        document.addEventListener('mouseup', function() {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        // Change cursor on hover elements
        const hoverElements = document.querySelectorAll('a, button, .card, .skill-item, .project-btn, .hire-btn, .portfolio-btn, .cv-btn, .social-link, .nav-link, .mobile-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
        
        // Hide cursor on mobile devices
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            cursorDot.style.display = 'none';
            cursorOutline.style.display = 'none';
        }
    }

    // Improved 3D Portfolio Items - Better mobile detection
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 768);
    }

    function init3DEffects() {
        // Check if we're on a mobile device or small screen
        const isMobile = isMobileDevice();
        
        if (!isMobile) {
            // Only apply 3D effects on desktop devices
            $('.portfolio-3d-item').each(function() {
                const item = $(this);
                
                item.on('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateY = (x - centerX) / 10;
                    const rotateX = (centerY - y) / 10;
                    
                    item.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
                });
                
                item.on('mouseleave', function() {
                    item.css('transform', 'perspective(1000px) rotateX(0) rotateY(0) scale(1)');
                });
            });
        } else {
            // Remove 3D effects on mobile devices by removing the class
            $('.portfolio-3d-item').removeClass('portfolio-3d-item').addClass('portfolio-card');
        }
    }
    
    // Initialize 3D effects
    init3DEffects();
    
    // Re-initialize on window resize with debounce
    let resizeTimeout;
    $(window).resize(function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            init3DEffects();
        }, 250);
    });

    // Draggable Skills Implementation - Improved version
    // Removed dragging functionality as per user request - keeping only 3D hover effects

    // Add 3D hover effect to skill items
    function isMobileDevice() {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1) || (window.innerWidth <= 768);
    }

    // Only apply 3D effects on desktop devices
    if (!isMobileDevice()) {
        $('.skill-item').each(function() {
            const item = $(this);
            
            item.on('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 10;
                const rotateX = (centerY - y) / 10;
                
                item.find('.skill-icon').css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
            });
            
            item.on('mouseleave', function() {
                item.find('.skill-icon').css('transform', 'perspective(1000px) rotateX(0) rotateY(0)');
            });
        });
    }
    
    // Chatbot functionality - Completely rewritten to prevent duplication
    let chatbotState = {
        currentStep: 0,
        formData: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        chatSteps: [
            { question: "Hi! 👋 What's your name?", field: "name" },
            { question: "Nice to meet you! What's your email?", field: "email" },
            { question: "What's the subject of your message?", field: "subject" },
            { question: "Finally, what would you like to say?", field: "message" }
        ],
        isInitialized: false
    };
    
    // Initialize chatbot
    function initChatbot() {
        // Prevent multiple initializations
        if (chatbotState.isInitialized) return;
        
        // Clear any existing messages
        $('#chat-messages').empty();
        
        // Add the initial message
        addBotMessage(chatbotState.chatSteps[0].question);
        
        // Mark as initialized
        chatbotState.isInitialized = true;
    }
    
    // Add bot message to chat
    function addBotMessage(message) {
        const messageElement = `
            <div class="chat-message bot-message">
                <div class="message-content bg-indigo-100 dark:bg-indigo-900/30 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-none p-4 max-w-xs">
                    ${message}
                </div>
            </div>
        `;
        $('#chat-messages').append(messageElement);
        scrollToBottom();
    }
    
    // Add user message to chat
    function addUserMessage(message) {
        const messageElement = `
            <div class="chat-message user-message">
                <div class="message-content bg-indigo-600 text-white rounded-2xl rounded-tr-none p-4 max-w-xs">
                    ${message}
                </div>
            </div>
        `;
        $('#chat-messages').append(messageElement);
        scrollToBottom();
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Handle chat form submission
    $('#chatbot-form').submit(function(e) {
        e.preventDefault();
        const input = $('#chat-input');
        const message = input.val().trim();
        
        if (message) {
            // Validate email if this is the email step
            if (chatbotState.currentStep === 1) { // Email step
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(message)) {
                    addBotMessage("Please enter a valid email address.");
                    input.val('');
                    return;
                }
            }
            
            // Add user message
            addUserMessage(message);
            
            // Store in form data
            chatbotState.formData[chatbotState.chatSteps[chatbotState.currentStep].field] = message;
            
            // Clear input
            input.val('');
            
            // Move to next step
            chatbotState.currentStep++;
            
            if (chatbotState.currentStep < chatbotState.chatSteps.length) {
                // Ask next question
                setTimeout(() => {
                    addBotMessage(chatbotState.chatSteps[chatbotState.currentStep].question);
                }, 1000);
            } else {
                // Submit form
                setTimeout(() => {
                    submitChatForm();
                }, 1000);
            }
        }
    });
    
    // Submit chat form data
    function submitChatForm() {
        // Show loading message
        addBotMessage("Sending your message...");
        
        // Prepare form data for submission
        const formData = new FormData();
        formData.append('name', chatbotState.formData.name);
        formData.append('email', chatbotState.formData.email);
        formData.append('subject', chatbotState.formData.subject);
        formData.append('message', chatbotState.formData.message);
        
        // Submit to formsubmit.co
        $.ajax({
            url: "https://formsubmit.co/ajax/ethical.laxman@gmail.com",
            method: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Show success animation
                showSuccessAnimation();
            },
            error: function(xhr, status, error) {
                addBotMessage("Sorry, there was an error sending your message. Please try again.");
                // Still show success animation for user experience
                setTimeout(() => {
                    showSuccessAnimation();
                }, 1000);
            }
        });
    }
    
    // Show success animation
    function showSuccessAnimation() {
        // Hide chatbot UI
        $('#chatbot-ui').addClass('hidden');
        
        // Show success animation
        $('#success-animation').removeClass('hidden');
        
        // Create confetti effect
        createConfetti();
        
        // After 3 seconds, reset and show chatbot again
        setTimeout(() => {
            $('#success-animation').addClass('hidden');
            $('#chatbot-ui').removeClass('hidden');
            resetChatbot();
        }, 3000);
    }
    
    // Create confetti effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.position = 'fixed';
        confettiContainer.style.top = '0';
        confettiContainer.style.left = '0';
        confettiContainer.style.width = '100%';
        confettiContainer.style.height = '100%';
        confettiContainer.style.pointerEvents = 'none';
        confettiContainer.style.zIndex = '9999';
        document.body.appendChild(confettiContainer);
        
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confettiContainer.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
            });
            
            // Remove confetti after animation
            animation.onfinish = () => {
                confetti.remove();
            };
        }
        
        // Remove container after animations complete
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }
    
    // Reset chatbot
    function resetChatbot() {
        // Reset state
        chatbotState.currentStep = 0;
        chatbotState.formData = {
            name: "",
            email: "",
            subject: "",
            message: ""
        };
        
        // Clear messages
        $('#chat-messages').empty();
        
        // Reset initialization flag
        chatbotState.isInitialized = false;
        
        // Re-initialize chatbot
        initChatbot();
    }
    
    // Initialize chatbot when page loads
    $(document).ready(function() {
        // Small delay to ensure DOM is fully ready
        setTimeout(function() {
            initChatbot();
            // Ensure we're still at the top after chatbot initialization
            $(window).scrollTop(0);
        }, 100);
    });
    
    // Fallback icons for timeline items (Lottie animations were causing issues)
    $('.lottie-animation').each(function() {
        const animationType = $(this).data('animation');
        const icons = {
            'developer': 'laptop-code',
            'web-development': 'code',
            'education': 'graduation-cap',
            'design': 'paint-brush'
        };
        const icon = icons[animationType] || 'star';
        $(this).html('<i class="fas fa-' + icon + ' text-3xl text-indigo-500"></i>');
    });
});