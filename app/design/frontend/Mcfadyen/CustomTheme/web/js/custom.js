require(['jquery'], function ($) {
    'use strict';
    $(document).ready(function() {
        $(".editor_note").click(function() {
            $('html,body').animate({
                scrollTop: $(".editor_note_sec").offset().top},
                'slow');
        });
        function checkWindowSize() {
            if (window.innerWidth < 767) {
                const galleryImages = document.querySelector('.gallery-images');
                const galleryImageCount = document.querySelectorAll('.gallery-image').length;
                const dotsContainer = document.querySelector('.dots-container');
                let currentIndex = 0;
                let startX = 0;
                let endX = 0;
    
                function showImage(index) {
                    galleryImages.style.transform = `translateX(-${index * 100}%)`;
                    updateDots();
                }
    
                function createDots() {
                    for (let i = 0; i < galleryImageCount; i++) {
                        const dot = document.createElement('div');
                        dot.classList.add('dot');
                        dot.addEventListener('click', () => {
                            currentIndex = i;
                            showImage(currentIndex);
                        });
                        dotsContainer.appendChild(dot);
                    }
                }
    
                function updateDots() {
                    const dots = document.querySelectorAll('.dot');
                    dots.forEach((dot, index) => {
                        if (index === currentIndex) {
                            dot.classList.add('active');
                        } else {
                            dot.classList.remove('active');
                        }
                    });
                }
    
                galleryImages.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                });
    
                galleryImages.addEventListener('touchmove', (e) => {
                    endX = e.touches[0].clientX;
                });
    
                galleryImages.addEventListener('touchend', () => {
                    if (startX > endX + 50 && currentIndex < galleryImageCount - 1) {
                        currentIndex++;
                    } else if (startX < endX - 50 && currentIndex > 0) {
                        currentIndex--;
                    }
                    showImage(currentIndex);
                });
                createDots();
                showImage(currentIndex);
            } else {
                document.addEventListener('scroll', () => {
                const divP = document.querySelector('.main-item-container');
                const divA = document.querySelector('.list-container1');
                const divB = document.querySelector('.list-container2');
                const divC = document.querySelector('.list-container3');
                const wishlistDiv = document.querySelector('.towishlist');
                    const divBRect = divB.getBoundingClientRect();
                    const divCRect = divC.getBoundingClientRect();
                    const divBLeft = parseInt(divBRect.left) + parseInt(window.scrollX);
                    const divBRight = parseInt(divBRect.right) + parseInt(window.scrollX);
                    const wishVal = divBRight-(divBLeft+80);
                    if (divBRect.top <= 0 && divBRect.bottom > window.innerHeight) {
                        divP.classList.add('pos-sticky');
                        divA.classList.add('sticky');
                        divC.classList.add('sticky'); 
                        wishlistDiv.classList.add('sticky');
                        document.querySelector('.action.towishlist').style.cssText = `
                        top: 10px;
                        right: ${wishVal}px; 
                        position: fixed;
                         `;
                    } else {
                        divA.classList.remove('sticky');
                        divC.classList.remove('sticky');
                        divP.classList.remove('pos-sticky');
                        wishlistDiv.classList.remove('sticky');
                        document.querySelector('.action.towishlist').style.cssText = `
                        position: absolute;
                         `;
                    }
                });
            }
        }
        checkWindowSize();
        window.addEventListener('resize', checkWindowSize);
    });
});
