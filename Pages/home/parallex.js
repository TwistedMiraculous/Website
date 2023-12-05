let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const parallaxImages = document.querySelectorAll('.parallax-image');

    parallaxImages.forEach(function(image) {
        const imageTop = image.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (imageTop < windowHeight * 0.15 || imageTop > windowHeight * 0.75) {
            image.style.opacity = 0;
        } else {
            const scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';

            if (scrollDirection === 'up') {
                image.style.opacity = 0;
            } else {
                image.style.opacity = 1;
            }
        }
    });

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});
