gsap.registerPlugin(ScrollTrigger);
$(document).ready(function () {
    //Header Animations
    var header_anim = gsap.timeline({default: {duration: 1}});
    header_anim.from('#intro-header', { opacity: 0, duration:3})
    .from('.anim-header-h1', { opacity: 0, y: -100 }, "-=2.5")
    .from('.anim-header-p', {opacity: 0, y: 100}, "-=2")
    .from('.anim-header-dp', {opacity: 0, y: -100, x:50}, "-=1.5");
    
    //Media Size Variable Adjustments for Animations
    about_start = "center bottom";
    about_delay = 1.5;
    if (window.matchMedia('(max-width: 768px)').matches){
        console.log('mobile');
        about_start = "top center";
        about_delay = 0;
    }
    
    //About Section Animations
    var about_anim = gsap.timeline({scrollTrigger: {
        trigger:'#about', start:about_start
    },default: {duration: 0.2}});
    about_anim.from('.anim-about-title', {opacity: 0, x: -200, duration: 0.5, delay:about_delay}).from('.anim-about-text', {opacity: 0, y: 200,stagger:0.2},)
    
    //Education Section Animations
    var education_anim = gsap.timeline({scrollTrigger: {
        trigger:'#education', start:"top center"
    },default: {duration: 0.2}});
    education_anim.from('.anim-education-title', {opacity: 0, x: -200, duration: 0.5}).from('.anim-education-logo', {opacity: 0, y: 200, duration: 0.5}).from('.anim-education-details', {opacity: 0, x: -100,stagger:0.1},)    
})

