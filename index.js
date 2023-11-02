class App {

    constructor() {
        this.heroImages = [...document.querySelectorAll('.hero__images img')];
        this.texts = [...document.querySelectorAll('.text__effect')]
        this._initialize();
        this._render();
    }

    _initialize() {
        this._setInitialStates();
        this._createLenis();
        this._createIntro();
        this._createHero();
        this._createTextAnimation();
        this._createPinnedSection();
        this._createJoinSection();
    }

    _setInitialStates() {
        gsap.set('.hero__title span,.join-us__title span, .fullwidth-image__text', {
            y: 32,
            opacity: 0,
        })
        gsap.set('.hero__images img', {
            y: gsap.utils.random(100, 50),
            opacity: 0,
        })
        gsap.set('.fullwidth-image img', {
            scale: 1.3,
        })
    }

    _createLenis() {
        this.lenis = new Lenis({
            lerp: 0.1,
        });
    }

    _createIntro() {
        const tl = gsap.timeline();

        tl.to('.hero__title div', {
            opacity: 1,
        }).to('.hero__title span', {
            y: 0,
            opacity: 1,
            ease: 'expo.out',
            duration: 2,
            stagger: 0.01,
        }).to('.hero__images img', {
            opacity: 1,
            y: 0,
            ease: 'power3.out',
            duration: 2,
            stagger: 0.04
        }, 0.5)
    }

    _createHero() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });
        this.heroImages.forEach(Image => {
            tl.to(Image, {
                ease: 'none',
                yPercent: gsap.utils.random(-100, -50)
            }, 0)
        })

    }

    _createTextAnimation() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.text-block',
                start: 'top center',
                end: 'bottom top+=10%',
                scrub: true,
            }
        });

        this.texts.forEach((text, index) => {
            const overlay = text.querySelector('.text__overlay');
            const content = text.querySelector('p');

            tl.to(overlay, {
                scaleX: 0,

            })
            // .to(content, {
            //     y: 0,
            //     opacity: 1,
            //     ease: 'expo.out',
            //     duration: 2,
            //     delay: () => index * 0.1,
            // }, 0)
        })
    }

    _createPinnedSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.fullwidth-image',
                start: 'top top',
                end: '+=1500',
                scrub: true,
                pin: true
            }
        });

        tl.to('.fullwidth-image__overlay', {
            opacity: 0.4,
        }).to('.fullwidth-image', {
            "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }, 0).to('.fullwidth-image img', {
            scale: 1,
        }, 0).to('.fullwidth-image__text', {
            y: 0,
            opacity: 1
        }, 0)

    }

    _createJoinSection() {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.join-us',
                start: 'top center',
                end: 'top top',
            }
        });

        tl.to('.join-us__title span',{
            duration: 2,
            y: 0,
            opacity: 1,
            ease: 'expo.out',
            stagger: 0.01,
        })
    }

    _render(time) {
        this.lenis.raf(time);

        requestAnimationFrame(this._render.bind(this))
    }

}

new App();