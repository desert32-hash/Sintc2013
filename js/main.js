// Main JavaScript
document.addEventListener('DOMContentLoaded', function () {
    console.log('SIntc Website Loaded');

    // Force technical skills section padding on mobile
    if (window.innerWidth <= 768) {
        const techSection = document.querySelector('.technical-skills-section');
        if (techSection) {
            techSection.style.paddingTop = '0px';
        }
    }

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

    // Mobile Accordion Menu for Portfolio Dropdown - 모바일에서는 사용하지 않음
    // 포트폴리오는 design.html로 직접 링크됨
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function (e) {
            // 데스크톱에서만 드롭다운 동작 (화면 너비 769px 이상)
            if (window.innerWidth > 768) {
                e.preventDefault();
                dropdown.classList.toggle('expanded');
            }
            // 모바일에서는 기본 링크 동작 (design.html로 이동)
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
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroMain = document.getElementById('hero-main');
    const heroDescription = document.getElementById('hero-description');
    let currentSlide = 0;
    const slideIntervalTime = 6000; // 6 seconds
    let slideInterval;

    // Slide content data
    const slideContent = [
        {
            subtitle: "아이디어 기획부터 생산까지",
            main: "AI 융합 기술 · 스마트 하드웨어 개발",
            description: ""
        },
        {
            subtitle: "숙련된 노하우가 만드는 완성도",
            main: "최적화된 개발 및 설계",
            description: ""
        },
        {
            subtitle: "생산성을 설계하다",
            main: "스마트 자동화 솔루션",
            description: ""
        },
        {
            subtitle: "기술로 고객과 함께 그리는 내일",
            main: "신성테크가 약속합니다.",
            description: ""
        }
    ];

    function showSlide(index) {
        // Handle wrap-around
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Update classes
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update pagination
        updatePagination();

        // Update text content with animation
        updateHeroContent(currentSlide);
        
        // Reset timer with new timing
        resetSlider();
    }

    function updateHeroContent(slideIndex) {
        const content = slideContent[slideIndex];
        const heroMain = document.getElementById('hero-main');
        const heroSubtitle = document.getElementById('hero-subtitle');

        // 애니메이션 초기화
        heroSubtitle.classList.remove('show');
        heroMain.classList.remove('show');

        // 첫번째 슬라이드인지 확인 (단, 4번에서 1번으로 순환될 때만)
        const isFirstSlide = slideIndex === 0;
        const isFromLastToFirst = currentSlide === 0 && slideIndex === 0;
        const delayTime = isFromLastToFirst ? 600 : (isFirstSlide ? 200 : 600);
        const subtitleDelay = isFromLastToFirst ? 200 : (isFirstSlide ? 10 : 200);
        const mainDelay = isFromLastToFirst ? 400 : (isFirstSlide ? 50 : 400);

        // 텍스트 업데이트 후 애니메이션 적용
        setTimeout(() => {
            heroSubtitle.textContent = content.subtitle;
            heroMain.textContent = content.main;
            heroDescription.textContent = content.description;

            // 메인 텍스트가 비어있으면 박스 숨기기
            if (content.main === "") {
                heroMain.style.display = "none";
            } else {
                heroMain.style.display = "inline-block";
                // 애니메이션 적용
                setTimeout(() => {
                    heroMain.classList.add('show');
                }, mainDelay);
            }

            // 부제목 애니메이션 적용
            setTimeout(() => {
                heroSubtitle.classList.add('show');
            }, subtitleDelay);
        }, delayTime); // 슬라이드별 다른 딜레이
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Pagination functionality
    function goToSlide(slideIndex) {
        showSlide(slideIndex);
    }

    function updatePagination() {
        const dots = document.querySelectorAll('.pagination-dot');
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Play/Pause functionality
    let isPlaying = true;

    function togglePlayPause() {
        const playPauseBtn = document.querySelector('.play-pause-btn');
        
        if (isPlaying) {
            // Stop the slider
            clearInterval(slideInterval);
            if (playPauseBtn) {
                playPauseBtn.classList.remove('playing');
                playPauseBtn.classList.add('paused');
            }
        } else {
            // Start the slider
            startSlider();
            if (playPauseBtn) {
                playPauseBtn.classList.remove('paused');
                playPauseBtn.classList.add('playing');
            }
        }
        
        isPlaying = !isPlaying;
    }

    function updatePlayPauseButton() {
        const playPauseBtn = document.querySelector('.play-pause-btn');
        if (!playPauseBtn) return;
        
        if (isPlaying) {
            playPauseBtn.classList.remove('paused');
            playPauseBtn.classList.add('playing');
        } else {
            playPauseBtn.classList.remove('playing');
            playPauseBtn.classList.add('paused');
        }
    }

function startSlider() {
        // Check if current slide is the 4th slide (index 3)
        const currentIntervalTime = currentSlide === 3 ? 15000 : slideIntervalTime;
        slideInterval = setInterval(nextSlide, currentIntervalTime);
    }

    function resetSlider() {
        clearInterval(slideInterval);
        startSlider();
    }

    if (slides.length > 0) {
        // Initialize first slide content
        updateHeroContent(0);

        // Initial start
        startSlider();

        // Event listeners for buttons
if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
            });
        }

        // Pagination event listeners
        const paginationDots = document.querySelectorAll('.pagination-dot');
        console.log('Pagination dots found:', paginationDots.length);
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Dot clicked:', index);
                // Pause the slider when user clicks a dot
                if (isPlaying) {
                    togglePlayPause();
                }
                goToSlide(index);
            });
        });

        // Play/Pause button event listener
        const playPauseBtn = document.querySelector('.play-pause-btn');
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }
    }
    // Gallery Slider
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryPrevBtn = document.querySelector('.gallery-prev');
    const galleryNextBtn = document.querySelector('.gallery-next');
    let galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryTrack && galleryItems.length > 0) {
        // 랜덤으로 이미지 순서 섞기 (Fisher-Yates Shuffle)
        const originalItems = Array.from(galleryItems);
        
        // Fisher-Yates Shuffle 알고리즘으로 자연스러운 섞기
        function fisherYatesShuffle(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
        
        // 카테고리 정보 추출 (기계/디자인/기구설계 균등 분포를 위해)
        function getCategory(item) {
            const label = item.querySelector('.gallery-label')?.textContent || '';
            if (label.includes('기계')) return 'machine';
            if (label.includes('디자인')) return 'design';
            if (label.includes('기구')) return 'mechanical';
            return 'other';
        }
        
        // 카테고리 균등 분포를 고려한 섞기
        function balancedShuffle(array) {
            const categories = {
                machine: [],
                design: [],
                mechanical: [],
                other: []
            };
            
            // 카테고리별로 분류
            array.forEach(item => {
                const category = getCategory(item);
                categories[category].push(item);
            });
            
            // 각 카테고리 섞기
            Object.keys(categories).forEach(key => {
                categories[key] = fisherYatesShuffle(categories[key]);
            });
            
            // 교대로 배치하여 균등 분포
            const result = [];
            const categoryKeys = Object.keys(categories).filter(key => categories[key].length > 0);
            let categoryIndex = 0;
            
            while (result.length < array.length) {
                const currentCategory = categoryKeys[categoryIndex % categoryKeys.length];
                if (categories[currentCategory].length > 0) {
                    result.push(categories[currentCategory].shift());
                }
                categoryIndex++;
            }
            
            return result;
        }
        
        const shuffledItems = balancedShuffle(originalItems);
        
        // 기존 아이템 제거 및 랜덤 순서로 다시 추가
        galleryTrack.innerHTML = '';
        shuffledItems.forEach(item => {
            galleryTrack.appendChild(item);
        });
        
        // Clone items for infinite feel (append copy of list to end)
        shuffledItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryTrack.appendChild(clone);
        });

        // Re-select items after cloning
        galleryItems = document.querySelectorAll('.gallery-item');
        
        // 원래 아이템 개수 저장 (랜덤 섞기 전 개수)
        const originalItemCount = originalItems.length;
        
        // 인피니트 스크롤을 위한 변수
        let isTransitioning = false;

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
            
            if (!isTransitioning) {
                galleryTrack.style.transition = 'transform 0.3s ease';
            }
            galleryTrack.style.transform = `translateX(-${movePercent}%)`;
        };

        const moveNextGallery = () => {
            if (isTransitioning) return;
            
            const visibleCount = getVisibleCount();
            const maxIndex = originalItemCount - visibleCount;

            if (galleryIndex < maxIndex) {
                galleryIndex++;
            } else {
                // 마지막에서 첫 이미지 복제본으로 이동
                galleryIndex++;
                
                // 첫 이미지 복제본에 도달하면 실제 첫 이미지로 순간 이동
                setTimeout(() => {
                    if (galleryIndex >= originalItemCount) {
                        isTransitioning = true;
                        galleryTrack.style.transition = 'none';
                        galleryIndex = 0;
                        updateGalleryPosition();
                        
                        setTimeout(() => {
                            galleryTrack.style.transition = 'transform 0.3s ease';
                            isTransitioning = false;
                        }, 50);
                    }
                }, 300);
            }
            updateGalleryPosition();
        };

        const movePrevGallery = () => {
            if (isTransitioning) return;
            
            const visibleCount = getVisibleCount();
            const maxIndex = originalItemCount - visibleCount;

            if (galleryIndex > 0) {
                galleryIndex--;
            } else {
                // 첫 이미지에서 마지막 이미지로 바로 이동
                isTransitioning = true;
                galleryTrack.style.transition = 'none';
                galleryIndex = maxIndex;
                updateGalleryPosition();
                
                setTimeout(() => {
                    galleryTrack.style.transition = 'transform 0.3s ease';
                    isTransitioning = false;
                }, 50);
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
            const maxIndex = originalItemCount - visibleCount;
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
