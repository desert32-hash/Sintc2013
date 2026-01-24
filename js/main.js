// Main JavaScript
document.addEventListener('DOMContentLoaded', function () {
    console.log('SIntc Website Loaded');

    // Header Scroll Effect (Optional: Add shadow on scroll)
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }

    // Mobile Blog Link Override
    function updateBlogLinksForMobile() {
        if (window.innerWidth <= 768) {
            // Update navigation blog links
            const externalLinks = document.querySelectorAll('.external-link');
            externalLinks.forEach(link => {
                if (link.href.includes('blog.naver.com')) {
                    link.href = 'https://m.blog.naver.com/ymn10';
                }
            });

            // Update footer blog links
            const blogBtns = document.querySelectorAll('.blog-btn');
            blogBtns.forEach(link => {
                if (link.href.includes('blog.naver.com')) {
                    link.href = 'https://m.blog.naver.com/ymn10';
                }
            });
        }
    }

    // Run on load and resize
    updateBlogLinksForMobile();
    window.addEventListener('resize', updateBlogLinksForMobile);

    // Hero Image Slider
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    const slideIntervalTime = 3000; // 3 seconds
    let slideInterval;

    function showSlide(index) {
        // Handle wrap-around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Update classes
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, slideIntervalTime);
    }

    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    if (slides.length > 0) {
        // Initial start
        startSlider();

        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetSlider();
            });
        }
    }
    // Gallery Slider
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');
    let galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryTrack && galleryItems.length > 0) {
        // Clone items for infinite feel (append copy of list to end)
        galleryItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryTrack.appendChild(clone);
        });

        // Re-select items after cloning
        galleryItems = document.querySelectorAll('.gallery-item');

        let galleryIndex = 0;
        const totalItems = galleryItems.length;
        let galleryInterval;
        const gallerySpeed = 3000; // 3 seconds

        const getVisibleCount = () => {
            if (window.innerWidth > 992) return 6;
            if (window.innerWidth > 768) return 2;
            return 1;
        };

        const updateGalleryPosition = () => {
            const visibleCount = getVisibleCount();
            // Using percentages is safer for resize consistency
            const movePercent = (galleryIndex * (100 / visibleCount));
            galleryTrack.style.transform = `translateX(-${movePercent}%)`;
        };

        const moveNextGallery = () => {
            const visibleCount = getVisibleCount();
            // Since we cloned, we have 2x items. 
            // We scroll until the end of the first set (original length), then snap back or continue?
            // Simple loop for now:
            const maxIndex = totalItems - visibleCount;

            if (galleryIndex < maxIndex) {
                galleryIndex++;
            } else {
                galleryIndex = 0; // Loop back to start
            }
            updateGalleryPosition();
        };

        const movePrevGallery = () => {
            const visibleCount = getVisibleCount();
            const maxIndex = totalItems - visibleCount;

            if (galleryIndex > 0) {
                galleryIndex--;
            } else {
                galleryIndex = maxIndex; // Loop to end
            }
            updateGalleryPosition();
        };

        // Auto Play
        const startGalleryAuto = () => {
            galleryInterval = setInterval(moveNextGallery, gallerySpeed);
        };

        const stopGalleryAuto = () => {
            clearInterval(galleryInterval);
        };

        // Start Auto Play
        startGalleryAuto();

        // Pause on hover - DISABLED since auto-scroll is off
        // galleryTrack.addEventListener('mouseenter', stopGalleryAuto);
        // galleryTrack.addEventListener('mouseleave', startGalleryAuto);

        if (galleryNextBtn) {
            galleryNextBtn.addEventListener('click', () => {
                // stopGalleryAuto(); // Not needed since auto-scroll is disabled
                moveNextGallery();
                // startGalleryAuto(); // Not needed since auto-scroll is disabled
            });
        }

        if (galleryPrevBtn) {
            galleryPrevBtn.addEventListener('click', () => {
                // stopGalleryAuto(); // Not needed since auto-scroll is disabled
                movePrevGallery();
                // startGalleryAuto(); // Not needed since auto-scroll is disabled
            });
        }

        // Update on resize
        window.addEventListener('resize', () => {
            const visibleCount = getVisibleCount();
            const maxIndex = totalItems - visibleCount;
            if (galleryIndex > maxIndex) galleryIndex = maxIndex;
            updateGalleryPosition();
        });
    }
    
    // Open Kakao Talk function
    function openKakaoTalk() {
        // 카카오톡 실행
        window.open('https://pf.kakao.com/_xfPIhX/chat', '_blank');
    }
});
