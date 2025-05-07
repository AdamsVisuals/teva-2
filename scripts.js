document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));
    
    // Add transparent class initially
    header.classList.add('transparent');
    
    // Handle scroll effect
    function handleScroll() {
        if (window.scrollY > navHeight) {
            header.classList.add('scrolled');
            header.classList.remove('transparent');
        } else {
            header.classList.remove('scrolled');
            header.classList.add('transparent');
        }
    }
    
    // Initial check in case page loads with scroll
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change icon based on menu state
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Slideshow functionality
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Show slide
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reset animation classes
        const activeSlide = slides[currentSlide];
        const subtitle = activeSlide.querySelector('.slide-subtitle');
        const heading = activeSlide.querySelector('h1');
        const paragraph = activeSlide.querySelector('p');
        const cta = activeSlide.querySelector('.slide-cta');
        
        [subtitle, heading, paragraph, cta].forEach(el => {
            el.style.opacity = '0';
            el.style.animation = 'none';
            void el.offsetWidth; // Trigger reflow
            el.style.animation = '';
        });
    }
    
    // Next/previous controls
    function nextSlide() {
        showSlide(currentSlide + 1);
        resetSlideInterval();
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
        resetSlideInterval();
    }
    
    // Go to specific slide
    function goToSlide(n) {
        showSlide(n);
        resetSlideInterval();
    }
    
    // Reset auto-advance interval
    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 7000);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Start auto-advance
    resetSlideInterval();
    
    // Tab functionality
    const tabs = document.querySelectorAll('.cta-tab');
    const forms = document.querySelectorAll('.cta-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            const formId = tab.dataset.tab + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });
    
    // Toast Notification Function
    function showToast(type, title, message) {
        const toastContainer = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <div class="toast-close"><i class="fas fa-times"></i></div>
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto-remove toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 5000);
        
        // Close on click
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 500);
        });
    }
    
    // Form submission with toast notifications
    const safariForm = document.getElementById('safari-form');
    const newsletterForm = document.getElementById('newsletter-form');
    
    safariForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('.cta-button');
        button.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            button.classList.remove('loading');
            showToast('success', 'Request Received', 'Our safari experts will contact you shortly with availability.');
            this.reset();
        }, 1500);
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('.cta-button');
        button.classList.add('loading');
        
        // Simulate API call
        setTimeout(() => {
            button.classList.remove('loading');
            showToast('success', 'Thank You!', 'You have been subscribed to our newsletter.');
            this.reset();
        }, 1500);
    });
    
    // Initialize first form as active
    document.getElementById('book-form').classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab panes
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
  
    // Function to switch tabs
    function switchTab(targetTabId) {
      // Remove active class from all buttons and panes
      tabButtons.forEach(button => button.classList.remove('active'));
      tabPanes.forEach(pane => pane.classList.remove('active'));
  
      // Add active class to clicked button and corresponding pane
      const activeButton = document.querySelector(`.tab-btn[data-target="${targetTabId}"]`);
      const activePane = document.getElementById(targetTabId);
      
      if (activeButton && activePane) {
        activeButton.classList.add('active');
        activePane.classList.add('active');
      }
    }
  
    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetTabId = this.getAttribute('data-target');
        switchTab(targetTabId);
      });
    });
  
    // Initialize with the first tab active (in case it's not already set in HTML)
    if (tabButtons.length > 0 && tabPanes.length > 0) {
      const firstTabId = tabButtons[0].getAttribute('data-target');
      switchTab(firstTabId);
    }
  });

  document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const articlesContainer = document.querySelector('.articles-container');
    const articleCards = document.querySelectorAll('.article-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.control-btn');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const loadMoreBtn = document.querySelector('.load-btn');
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');

    // Initial setup
    let visibleArticles = 6; // Initial number of visible articles
    const totalArticles = articleCards.length;
    
    // Add data attributes for filtering/sorting
    articleCards.forEach((card, index) => {
        card.dataset.index = index;
        card.dataset.popularity = Math.floor(Math.random() * 100); // Simulate popularity
    });

    // Bookmark functionality
    bookmarkButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            
            // Toggle aria-label for accessibility
            const isBookmarked = icon.classList.contains('fas');
            this.setAttribute('aria-label', isBookmarked ? 'Remove bookmark' : 'Add bookmark');
            
            // Add visual feedback
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            
            // Here you would typically save to localStorage or make an API call
        });
    });

    // Filter articles by category
    function filterArticles(category) {
        articleCards.forEach(card => {
            const cardCategory = card.querySelector('.card-category').textContent.toLowerCase();
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset visible articles count when filtering
        visibleArticles = 6;
        updateLoadMoreButton();
    }

    // Sort articles (newest or popular)
    function sortArticles(sortBy) {
        const cardsArray = Array.from(articleCards);
        
        cardsArray.sort((a, b) => {
            if (sortBy === 'newest') {
                return parseInt(a.dataset.index) - parseInt(b.dataset.index);
            } else { // popular
                return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
            }
        });

        // Re-append sorted articles
        cardsArray.forEach(card => {
            articlesContainer.appendChild(card);
        });
    }

    // Search functionality
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        articleCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.card-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Reset visible articles count when searching
        visibleArticles = 6;
        updateLoadMoreButton();
    }

    // Load more articles
    function loadMoreArticles() {
        visibleArticles += 3;
        updateVisibleArticles();
        updateLoadMoreButton();
        
        // Smooth scroll to newly loaded articles
        setTimeout(() => {
            const newArticles = document.querySelectorAll(`.article-card:nth-child(n+${visibleArticles - 2})`);
            if (newArticles.length > 0) {
                newArticles[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }, 50);
    }

    // Update visible articles based on current count
    function updateVisibleArticles() {
        articleCards.forEach((card, index) => {
            if (index < visibleArticles) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Update load more button state
    function updateLoadMoreButton() {
        if (visibleArticles >= totalArticles) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter articles
            filterArticles(this.dataset.category);
        });
    });

    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            sortButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Sort articles
            sortArticles(this.textContent.toLowerCase());
        });
    });

    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchBtn.addEventListener('click', performSearch);
    loadMoreBtn.addEventListener('click', loadMoreArticles);

    // Initialize
    updateVisibleArticles();
    updateLoadMoreButton();

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    articleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(card);
    });
});