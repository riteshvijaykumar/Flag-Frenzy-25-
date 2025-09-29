// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll navigation
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.category-section');
        const navLinks = document.querySelectorAll('.nav-list a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveSection);
    
    // Challenge card animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply fade-in animation to challenge cards
    const challengeCards = document.querySelectorAll('.challenge-card');
    challengeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Category sections fade-in
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        observer.observe(section);
    });
    
    // Add typing effect to title
    const title = document.querySelector('.title');
    const originalText = title.textContent;
    title.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
    
    // Add hover effects for challenge cards
    challengeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effect to challenge cards
    challengeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 100);
        });
    });
    
    // Dynamic difficulty badge glow effect
    const difficultyBadges = document.querySelectorAll('.difficulty');
    difficultyBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
        });
    });
    
    // Dynamic points badge glow effect
    const pointsBadges = document.querySelectorAll('.points');
    pointsBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(155, 89, 182, 0.5)';
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add stats counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.challenge-count');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            let count = 0;
            const increment = target / 20;
            
            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.textContent = Math.ceil(count) + (target === 1 ? ' Challenge' : ' Challenges');
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target + (target === 1 ? ' Challenge' : ' Challenges');
                }
            };
            
            updateCount();
        });
    }
    
    // Start counter animation when page loads
    setTimeout(animateCounters, 1000);
    
    // Add tech stack hover effects
    const techTags = document.querySelectorAll('.tech');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'rgba(0, 123, 255, 0.4)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(0, 123, 255, 0.2)';
        });
    });
    
    // Add scroll-to-top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: linear-gradient(45deg, #00ffff, #0080ff);
        color: #000;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(0, 255, 255, 0.3);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 6px 25px rgba(0, 255, 255, 0.5)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.3)';
    });
});