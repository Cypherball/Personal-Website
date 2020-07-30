gsap.registerPlugin(ScrollTrigger);

async function startAnims() {
    $scrub_val = 2;
    
    //Media Size Variable Adjustments for Animations-------------------------------------------
    about_start = "center bottom";
    bg_start = "top bottom";
    about_delay = 0.5;
    if (window.matchMedia('(max-width: 768px)').matches) {
        console.log('mobile_view');
        about_start = "top center";
        about_delay = 0;
    }
    
    //Intro Section Animations-------------------------------------------
    gsap.to("#portfolio-intro .intro-welcome", {
        opacity: "100%", ease: Linear.easeOut, duration: 1.5
    },"+=1");
    var intro_anim = gsap.timeline({
        scrollTrigger: {
            trigger: '#portfolio-intro',
            //start: bg_start,
            scrub: 1,
            pin: true,
            snap: {
                snapTo: "labels", // snap to the closest label in the timeline
                //duration: {min: 0.2, max: 3},
                //delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            }
        }, default: { duration: 3 }
    });

    intro_anim.addLabel('start')
        .to("#portfolio-intro .intro-1", {
         width: "0%", ease: Linear.easeNone, duration: 3
        })
        .to("#portfolio-intro .intro-1", {
        autoAlpha: "0", ease: Linear.easeNone, duration: 3
        }, 0)
        .addLabel('1')
        .to("#portfolio-intro .intro-welcome", {
        backgroundColor: "#fafafa", color:"#202020", ease: Linear.easeNone, duration: 3
        }, '-=1')
        .addLabel('3')
        .to("#portfolio-intro .intro-welcome", {
        x: "-100%", ease: Linear.easeNone, duration: 3
        }, '+=1')
        .addLabel('4')
        .to(".intro-name", {
        opacity: "100%", ease: Linear.easeOut, duration: 1.5
        }, "+=1")
        .addLabel('5')/*to("#portfolio-intro .intro-name", {
        x: "-100%", ease: Linear.easeNone, duration: 3
    },'+=1').*/
        .to("#portfolio-intro .intro-2", {
        width: "100%", ease: Linear.easeNone, duration: 3
        }, '+=5')
        .addLabel('6')
        .to("#portfolio-intro .intro-heading", {
        opacity: "100%", ease: Linear.easeNone, duration: 5
        },'-=1');

};

