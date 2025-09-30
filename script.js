$(document).ready(function(){
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
            var formData = $(this).serialize();
            $.ajax({
                url: "https://formsubmit.co/ajax/ethical.laxman@gmail.com",
                method: "POST",
                data: formData,
                dataType: "json",
                success: function(response) {
                    $('#form-message').text('Form submitted successfully. We will reach you soon.').addClass('text-green-600');
                    $('#contact-form')[0].reset();
                },
                error: function(xhr, status, error) {
                    $('#form-message').text('Error submitting form: ' + error).addClass('text-red-600');
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
});