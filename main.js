/*=========================================
        PORTFOLIO MAIN JAVASCRIPT
=========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    }, 1800);

});

/*=========================================
        CUSTOM CURSOR
=========================================*/

const cursor = document.querySelector(".cursor");

const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", (e) => {

    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";

    cursor2.style.left = e.clientX - 15 + "px";

    cursor2.style.top = e.clientY - 15 + "px";

});

/*=========================================
        CURSOR HOVER EFFECT
=========================================*/

const links = document.querySelectorAll("a, button");

links.forEach(link => {

    link.addEventListener("mouseenter", () => {

        cursor2.style.transform = "scale(1.8)";

        cursor2.style.borderColor = "#00F5FF";

    });

    link.addEventListener("mouseleave", () => {

        cursor2.style.transform = "scale(1)";

        cursor2.style.borderColor = "#ffffff";

    });

});

/*=========================================
        NAVBAR SCROLL
=========================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        navbar.style.background = "rgba(5,8,22,.92)";

        navbar.style.backdropFilter = "blur(25px)";

        navbar.style.boxShadow = "0 15px 40px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background = "rgba(255,255,255,.05)";

        navbar.style.boxShadow = "none";

    }

});

/*=========================================
        SCROLL TO TOP
=========================================*/

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 500){

        scrollTopBtn.classList.add("show");

    }

    else{

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
        ACTIVE NAV LINK
=========================================*/

const sections = document.querySelectorAll("section");

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop = section.offsetTop-150;

        const sectionHeight = section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});

/*=========================================
        COUNTER ANIMATION
=========================================*/

const counters=document.querySelectorAll(".counter");

const speed=250;

const startCounter=()=>{

    counters.forEach(counter=>{

        const update=()=>{

            const target=+counter.getAttribute("data-target");

            const count=+counter.innerText;

            const inc=target/speed;

            if(count<target){

                counter.innerText=Math.ceil(count+inc);

                requestAnimationFrame(update);

            }

            else{

                counter.innerText=target;

            }

        }

        update();

    });

};

const statSection=document.querySelector(".stats");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

startCounter();

observer.unobserve(entry.target);

}

});

});

observer.observe(statSection);
/*=========================================
            GSAP HERO ANIMATION
=========================================*/

gsap.from(".navbar",{
    y:-100,
    duration:1,
    opacity:0,
    ease:"power4.out"
});

gsap.from(".subtitle",{
    x:-80,
    opacity:0,
    duration:1,
    delay:.3
});

gsap.from(".hero h1",{
    y:80,
    opacity:0,
    duration:1,
    delay:.5
});

gsap.from(".hero h3",{
    y:60,
    opacity:0,
    duration:1,
    delay:.7
});

gsap.from(".hero p",{
    y:40,
    opacity:0,
    duration:1,
    delay:.9
});

gsap.from(".hero-buttons",{
    y:40,
    opacity:0,
    duration:1,
    delay:1.1
});

gsap.from(".image-box",{
    scale:.5,
    opacity:0,
    duration:1.5,
    delay:.5,
    ease:"elastic.out(1,0.5)"
});

/*=========================================
        SCROLL REVEAL
=========================================*/

const sr = ScrollReveal({

    distance:"80px",

    duration:1400,

    delay:200,

    reset:false

});

sr.reveal(".section-title",{origin:"top"});

sr.reveal(".about-image",{origin:"left"});

sr.reveal(".about-content",{origin:"right"});

sr.reveal(".skill-card",{interval:100});

sr.reveal(".project-card",{interval:150});

sr.reveal(".experience-card",{interval:150});

sr.reveal(".achievement-card",{interval:100});

sr.reveal(".certificate-card",{interval:100});

sr.reveal(".github-card",{interval:100});

sr.reveal(".contact-info",{origin:"left"});

sr.reveal(".contact-form",{origin:"right"});

/*=========================================
            3D TILT CARDS
=========================================*/

const cards = document.querySelectorAll(

".skill-card,.project-card,.experience-card,.stat-card"

);

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const centerX=rect.width/2;

const centerY=rect.height/2;

const rotateX=((y-centerY)/18);

const rotateY=((centerX-x)/18);

card.style.transform=

`perspective(1000px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0)";

});

});

/*=========================================
        MAGNETIC BUTTON
=========================================*/

const buttons=document.querySelectorAll(".btn,.btn2");

buttons.forEach(btn=>{

btn.addEventListener("mousemove",(e)=>{

const rect=btn.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

btn.style.transform=

`translate(${x*.18}px,${y*.18}px)`;

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translate(0,0)";

});

});

/*=========================================
        FLOATING ICONS
=========================================*/

gsap.to(".social-icons",{

y:-20,

repeat:-1,

yoyo:true,

duration:2,

ease:"sine.inOut"

});

gsap.to(".image-box",{

y:-15,

repeat:-1,

yoyo:true,

duration:3,

ease:"power1.inOut"

});

/*=========================================
        PARALLAX HERO
=========================================*/

document.addEventListener("mousemove",(e)=>{

const hero=document.querySelector(".hero");

const img=document.querySelector(".image-box");

const moveX=(window.innerWidth/2-e.clientX)/40;

const moveY=(window.innerHeight/2-e.clientY)/40;

img.style.transform=

`translate(${moveX}px,${moveY}px)`;

});

/*=========================================
        HERO TEXT GLOW
=========================================*/

const title=document.querySelector(".hero h1");

setInterval(()=>{

title.style.textShadow=

"0 0 25px rgba(0,245,255,.6)";

setTimeout(()=>{

title.style.textShadow="none";

},500);

},3000);