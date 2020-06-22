gsap.registerPlugin(ScrollTrigger);

$(document).ready(function () {
    //Header Animations-------------------------------------------
    var header_anim = gsap.timeline({ default: { duration: 1 } });
    header_anim.from('#intro-header', { opacity: 0, duration: 3 })
        .from('.anim-header-h1', { opacity: 0, y: -100 }, "-=2.5")
        .from('.anim-header-p', { opacity: 0, y: 100 }, "-=2")
        .from('.anim-header-dp', { opacity: 0, duration: 2, ease: Power2.easeOut, y: -100, x: 100, }, "-=1.5");
    
    //Media Size Variable Adjustments for Animations-------------------------------------------
    about_start = "center bottom";
    bg_start = "top bottom";
    about_delay = 0.5;
    if (window.matchMedia('(max-width: 768px)').matches) {
        console.log('mobile_view');
        about_start = "top center";
        about_delay = 0;
    }
    
    //About Section Animations-------------------------------------------
    //SVG Scroll
    gsap.to("#about .svg-bg", {
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            scrub: 1,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });

    var about_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#about', start: about_start
        }, default: { duration: 0.2 }
    });
    about_anim.from('.anim-about-title', { opacity: 0, x: -200, duration: 0.5, delay: about_delay }).from('.anim-about-text', { opacity: 0, y: 200, stagger: 0.2 },);
    
    //Education Section Animations-------------------------------------------
    gsap.to("#education .svg-bg", {
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            scrub: 1,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundSize: "4000px 4000px", ease: Linear.easeNone, duration: 1
    });
    var education_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#education', start: "top center"
        }, default: { duration: 0.2 }
    });
    education_anim.from('.anim-education-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-education-logo', { opacity: 0, y: 200, duration: 0.5 }).from('.anim-education-details', { opacity: 0, x: -100, stagger: 0.1 },);


     //Certification Section Animations-------------------------------------------
    gsap.to("#certifications .svg-bg", {
        scrollTrigger: {
            trigger: "#certifications",
            start: bg_start,
            scrub: 1,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    var certification_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#certifications', start: "top center"
        }, default: { duration: 0.2 }
    });
    certification_anim.from('.anim-certification-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-certification-row', { opacity: 0, y: 200, duration: 0.5 , stagger: 0.5});


});

