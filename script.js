document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

// Advanced Filtering Toggle (Updated IDs)
    const filterToggleBtn = document.getElementById('advancedToggle');
    const advancedFiltersDiv = document.getElementById('advancedFields');

    if (filterToggleBtn && advancedFiltersDiv) {
        filterToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = filterToggleBtn.getAttribute('aria-expanded') === 'true';
            
            filterToggleBtn.setAttribute('aria-expanded', !isExpanded);
            advancedFiltersDiv.classList.toggle('active');
        });
    }

    // Basic Form Prevention (Updated IDs)
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const minBudget = document.getElementById('budgetMin').value;
            const maxBudget = document.getElementById('budgetMax').value;
            
            if (minBudget && maxBudget && parseInt(minBudget) > parseInt(maxBudget)) {
                alert("Minimum budget cannot be greater than maximum budget.");
                return;
            }
            
            console.log("Search form submitted with parameters.");
        });
    }

    // Services Carousel Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        };

        const nextSlide = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        };

        // Start auto-play (5 seconds)
        slideInterval = setInterval(nextSlide, 5000); 

        // Manual dot controls
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Pause auto-play when user clicks
                currentSlide = index;
                showSlide(currentSlide);
                slideInterval = setInterval(nextSlide, 5000); // Resume auto-play
            });
        });
    }
    
// Gallery Slideshow Logic
    const gallerySlides = document.querySelectorAll('.gallery-slide');
    const galleryDots = document.querySelectorAll('.g-dot');
    let currentGallerySlide = 0;

    if (gallerySlides.length > 0) {
        const showGallerySlide = (index) => {
            gallerySlides.forEach(slide => slide.classList.remove('active'));
            galleryDots.forEach(dot => dot.classList.remove('active'));
            
            gallerySlides[index].classList.add('active');
            galleryDots[index].classList.add('active');
        };

        const nextGallerySlide = () => {
            currentGallerySlide = (currentGallerySlide + 1) % gallerySlides.length;
            showGallerySlide(currentGallerySlide);
        };

        let galleryInterval = setInterval(nextGallerySlide, 4000);

        galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(galleryInterval);
                currentGallerySlide = index;
                showGallerySlide(currentGallerySlide);
                galleryInterval = setInterval(nextGallerySlide, 4000);
            });
        });
    }
});