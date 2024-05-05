
const swiper = new Swiper(".swiper", {
    speed:500,

    pagination: {
        el: ".swiper-pagination",
        clickable: true
    }
})

var clutter = "";

document
  .querySelector("#page4>h1")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector("#page4>h1").innerHTML = clutter;
  });

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#wrapper`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});


$(function () {

	'use strict';


	//Lenis Smooth scroll
	const lenis = new Lenis({
		duration: 1.2
	})

	lenis.on('scroll', (e) => {
		console.log(e)
	})
	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}
	requestAnimationFrame(raf)

	//Integration Lenis on GSAP ScrollTrigger
	lenis.on('scroll', ScrollTrigger.update)

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000)
	})

	//Create animation ScrollTrigger
	function scrollTrig() {

		gsap.registerPlugin(ScrollTrigger);

		let gsapBl = $('.gsap__bl').width();

		//On full width
		// $('.gsap__item').css('width', gsapBl + 'px');

		//Transform slider track
		let gsapTrack = $('.gsap__track').width();
		let scrollSliderTransform = gsapTrack - gsapBl

		//Create ScrollTrigger
		gsap.to('.gsap__track', {
			scrollTrigger: {
				trigger: '.gsap_slider',
				start: 'center center',
				end: () => '+=' + gsapTrack,
				pin: true,
				scrub: true
			},
			x: '-=' + scrollSliderTransform + 'px'
		});

	}
	scrollTrig();

	//resize window
	const debouncedResize = _.debounce(onWindowResize, 500);
	function onWindowResize() {
		console.log('Window resized!');
		location.reload();
	}
	$(window).on('resize', debouncedResize);
});

$(function () {

    'use strict';



    function setBarba() {

        function delay(n) {
            n = n || 2000;
            return new Promise((done) => {
                setTimeout(() => {
                    done();
                }, n);
            });
        }

        function loadSite() {

            $('.load-site').addClass("active");

            var tl = gsap.timeline();

            tl.to(".loading", .7, {
                opacity: 0,
                ease: "expo.out"
            })
            tl.to(".loading-completed", .7, {
                opacity: 1,
                translateY: "0px",
                ease: "expo.out"
            }, ".5")
            tl.to(".load-site__img img:nth-child(1), .load-site__img img:nth-child(3)", .7, {
                translateY: "0px",
                opacity: 1,
                ease: "expo.out"
            }, "-=.4")
            tl.to(".loading-completed", .7, {
                opacity: 0,
                ease: "expo.out"
            })
            tl.to(".loading-txt", .7, {
                opacity: 1,
                translateY: "0px",
                ease: "expo.out"
            }, "-=.6")
            tl.to(".load-site__bg", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .5
            })
            tl.to(".load-site", .7, {
                translateY: "100%",
                ease: "expo.out"
            }, "-=.4")
        }

        function pageTransition() {
            var tl = gsap.timeline();
            tl.to(".preloader", .7, {
                translateY: "0%",
                ease: "expo.out"
            })
            tl.to(".preloader__bg", .7, {
                translateY: "0%",
                ease: "expo.out"
            }, "-=.4")

            tl.to(".preloader__bg", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .2
            })
            tl.to(".preloader", .7, {
                translateY: "100%",
                ease: "expo.out",
                delay: .8
            }, "-=1.2")
            tl.set(".preloader, .preloader__bg", {
                translateY: "-100%"
            })
        }

        function contentAnimation() {
            var tl = gsap.timeline();
            tl.from(".title", 1.5, {
                translateY: 20,
                opacity: 0,
                ease: "expo.out",
                delay: .7
            })
            tl.from(".descript", 1.5, {
                translateY: 20,
                ease: "expo.out",
                opacity: 0
            }, "-=1.3")
            tl.to(".btn-link", {
                translateY: 0,
                opacity: 1
            }, "-=1.9")
            tl.to(".section__img", {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
            }, "-=1.4")
        }

        barba.init({
            sync: true,
            transitions: [{
                async leave() {
                    const done = this.async();
                    pageTransition();
                    await delay(1000);
                    done();
                },
                async enter() {
                    contentAnimation();
                },
                async once() {
                    $(document).ready(function () {
                        setTimeout(() => {
                            loadSite();
                            setTimeout(() => {
                                contentAnimation();
                                setTimeout(() => {
                                    $(".load-site").remove();
                                }, 3000);
                            }, 2500);
                        }, 2000);
                    });
                }
            }]
        });
    }

    function mouse() {
        $(window).on('mousemove', function (e) {
            let x = e.clientX / 7;
            let y = e.clientY / 14;
            console.log(x);
            $('.title__img').css('transform', 'translate(' + x + 'px,-' + y + 'px)');
        });
    }

    function gallery() {
        Fancybox.bind('[data-fancybox="gallery"]', {
            dragToClose: false,

            closeButton: "top",

            Image: {
                zoom: false,
            },

            on: {
                initCarousel: (fancybox) => {
                    const slide = fancybox.Carousel.slides[fancybox.Carousel.page];

                    fancybox.$container.style.setProperty(
                        "--bg-image",
                        `url("${slide.$thumb.src}")`
                    );
                },
                "Carousel.change": (fancybox, carousel, to, from) => {
                    const slide = carousel.slides[to];

                    fancybox.$container.style.setProperty(
                        "--bg-image",
                        `url("${slide.$thumb.src}")`
                    );
                },
            },
        });
    }

    setBarba();
    mouse();
    gallery();
});

var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  blur.style.left = dets.x - 250 + "px";
  blur.style.top = dets.y - 250 + "px";
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.h1, .p2`,{delay: 600})
sr.reveal(`.p`,{delay: 700})
sr.reveal(`.p1`,{delay: 900, origin: 'top'})

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`,{origin: 'top', interval: 100})
sr.reveal(`.specs__data, .discount__animate`,{origin: 'left', interval: 100})
sr.reveal(`.specs__img, .discount__img`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)



var clutter = "";

document
  .querySelector("#page4>h1")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector("#page4>h1").innerHTML = clutter;
  });

gsap.to("#page4>h1>span", {
  scrollTrigger: {
    trigger: `#page4>h1>span`,
    start: `top bottom`,
    end: `bottom top`,
    scroller: `#wrapper`,
    scrub: 0.5,
  },
  stagger: 0.2,
  color: `#fff`,
});




        


TweenMax.to('.first', 1.5, {
    delay: .2,
    left: '-100%',
    ease: Expo.easeInOut
})

TweenMax.to('.second', 1.5, {
    delay: .4,
    left: '-100%',
    ease: Expo.easeInOut
})

TweenMax.to('.third', 1.5, {
    delay: .6,
    left: '-100%',
    ease: Expo.easeInOut
})

TweenMax.from('.logo', 1, {
    delay: 1,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})
TweenMax.from('.menu', 1, {
    delay: 1.2,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.from('.search', .8, {
    delay: 1.6,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.from('.bag', 1, {
    delay: 1.6,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.staggerFrom('.media ul li', 1, {
    delay: 2,
    opacity: 0,
    x: -20,
    ease: Power3.easeInOut
}, 0.08)

TweenMax.from('.size', 1, {
    delay: 1.8,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})
TweenMax.staggerFrom('.size ul li', .3, {
    delay: 2,
    opacity: 0,
    y: 20,
    ease: Power3.easeInOut
}, 0.08)
TweenMax.from('.bottom-right ul li:first-child', .5, {
    delay: 2.4,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})
TweenMax.from('.bottom-right ul li:last-child', .6, {
    delay: 2.4,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})
TweenMax.from('.bottom-img', 1, {
    delay: 2.4,
    opacity: 0,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.from('.product-title', 3, {
    delay: 2.2,
    opacity: 0,
    y: 50,
    ease: Expo.easeInOut
})
TweenMax.from('.product-img', 1, {
    delay: 4.2,
    opacity: 0,
    y: -800,
    ease: Expo.easeInOut
})
TweenMax.from('.product-desc p', 3, {
    delay: 4.5,
    opacity: 0,
    y: -50,
    ease: Expo.easeInOut
})
TweenMax.from('.product-desc button', 3, {
    delay: 6,
    opacity: 0,
    y: -50,
    ease: Expo.easeInOut
})


gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.5,
    }
  );
  
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
  
  