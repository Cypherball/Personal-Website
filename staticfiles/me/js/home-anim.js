gsap.registerPlugin(ScrollTrigger);

function startAnims() {
    $scrub_val = 2;

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
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#about .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:1.5,
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2600px 2600px",
        ease: Power1.easeInOut
    });
    gsap.to("#about", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#about",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, "background-image": "linear-gradient(to bottom, #30cfd0 0%, #330867 60%)", ease:Sine.easeInOut
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
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#education .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2200px 2200px", ease: Power1.easeInOut
    });
    gsap.to("#education", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#education",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, "background-image": "linear-gradient(to top, #7579ff 0%, #b224ef 100%)", ease:Sine.easeInOut
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
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#certifications .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#certifications",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2500px 2500px", ease: Power1.easeInOut
    });

    var certification_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#certifications', start: "top center"
        }, default: { duration: 0.2 }
    });
    certification_anim.from('.anim-certification-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-certification-row', { opacity: 0, y: 200, duration: 0.5 , stagger: 0.5});


    //Skills Section Animations-------------------------------------------
    gsap.to("#skills .svg-bg", {
        scrollTrigger: {
            trigger: "#skills",
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundSize: "2000px 2000px", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#skills", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#skills",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, "background-image":"linear-gradient( 250.8deg,  rgba(62,5,116,1) -5.2%, rgba(41,14,151,1) -5.2%, rgba(216,68,148,1) 103.3% )", ease:Sine.easeInOut
    });

    var skills_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#skills', start: "top center"
        }, default: { duration: 0.2 }
    });
    skills_anim.from('.anim-skills-title', { opacity: 0, y: 200, duration: 0.5 }).from('.anim-skills-category', { opacity: 0, x: -200, duration: 0.5 , stagger: 0.5}).from('.anim-skills-skillList', { opacity: 0, x: 200, duration: 0.1 , stagger: 0.05},"-=2.5");


    //Projects Section Animations-------------------------------------------
    gsap.to("#projects .svg-bg", {
        scrollTrigger: {
            trigger: "#projects",
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundSize: "4000px 4000px", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#projects", {
        repeat: -1,
        yoyo: true,
        duration:2,
        scrollTrigger: {
            trigger: "#projects",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient( -50.2deg,  rgba(0,40,70,1) -4.8%, rgba(255,115,115,1) 82.7%, rgba(255,175,123,1) 97.2% )", ease: Sine.easeInOut
    });

    var projects_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#projects', start: "top center"
        }, default: { duration: 0.2 }
    });
    projects_anim.from('.anim-projects-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-projects-proj', { opacity: 0, y: 200, duration: 0.5, stagger: 0.5 });


    //Contact Section Animations-------------------------------------------
    gsap.to("#contact .svg-bg", {
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            scrub: $scrub_val,
            ease: 'none',
            toggleActions: "restart complete reverse pause"
        }, backgroundPosition: "center 90%", ease: Linear.easeNone, duration: 1
    });
    gsap.to("#contact .svg-bg", {
        repeat: -1,
        yoyo: true,
        duration:4,
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundSize: "2800px 2800px", ease:Linear.easeInOut
    });
    gsap.to("#contact", {
        repeat: -1,
        yoyo: true,
        duration:3,
        scrollTrigger: {
            trigger: "#contact",
            start: bg_start,
            ease: 'none',
            toggleActions: "restart reset restart reset"
        }, backgroundImage: "linear-gradient( 0deg,  rgba(121,45,129,1) 3.6%, rgba(36,31,98,1) 90.4% )", ease: Sine.easeInOut
    });
    var contact_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact', start: "top center"
        }, default: { duration: 0.2 }
    });
    contact_anim.from('.anim-contact-title', { opacity: 0, x: -200, duration: 0.5 }).from('.anim-contact-animate', { opacity: 0, y: 200, duration: 0.5, stagger: 0.5 });

};

