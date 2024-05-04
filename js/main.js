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

sr.reveal(`.home__header, .section__title`,{delay: 600})
sr.reveal(`.home__footer`,{delay: 700})
sr.reveal(`.home__img`,{delay: 900, origin: 'top'})

sr.reveal(`.sponsor__img, .products__card, .footer__logo, .footer__content, .footer__copy`,{origin: 'top', interval: 100})
sr.reveal(`.specs__data, .discount__animate`,{origin: 'left', interval: 100})
sr.reveal(`.specs__img, .discount__img`,{origin: 'right'})
sr.reveal(`.case__img`,{origin: 'top'})
sr.reveal(`.case__data`)





