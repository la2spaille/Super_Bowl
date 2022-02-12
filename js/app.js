let loader, linkHover, menuBtn, closeBtn, headerNav, reveal, allImg, isLoad, links, today, superBowl, arenaBtn, ramsBtn, aboutBtn, bengalsBtn, wTransition, transition, transform, app, appHeight, horizontalScroll, test, arenaImg, arenaLightboxImg, lightbox
function init() {
    app = document.querySelector('#app.arena')
    appHeight = 3 * window.innerHeight
    if(app != undefined) {
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            if (clientHeight + scrollTop >= scrollHeight - 200) {
                appHeight = appHeight + 400
                app.style.height = `${appHeight}px`
            }
        })
    }

    //////////////////////////////////////////////////////////

    linkHover = document.querySelectorAll('.link-hover')
    reveal = document.querySelectorAll('.transformation')
    links = document.querySelectorAll('a')

    //////////////////////////////////////////////////////////

    arenaBtn = document.querySelector('.w-page-links.arena a')
    ramsBtn = document.querySelector('.w-page-links.rams a')
    aboutBtn = document.querySelector('.w-page-links.about a')
    bengalsBtn = document.querySelector('.w-page-links.bengals a')
    wTransition = document.querySelector('.w-transition-overlay')
    transition = document.querySelector('.w-transition-overlay div')
    function pageLinks(link, x, y, x1, y1) {
        link.addEventListener('mouseover', (e) => {
            e.stopPropagation()
            wTransition.style.transform = `translateX(${x}) translateY(${y})`
            setTimeout(() => {
                transition.style.transform = "scale(1)"
                link.style.color
            }, 100);
        })
        link.addEventListener('mouseout', (e) => {
            e.stopPropagation()
            transition.style.transform = "scale(0.8)"

        })
        link.addEventListener('click', (e) => {
            e.stopPropagation()
            wTransition.style.transition = "1s"
            setTimeout(() => {
                wTransition.style.transform = `translateX(${x1}) translateY(${y1})`
                transition.style.opacity = "1"
                if (link == aboutBtn) {
                    transition.classList.add('index')
                }
                if (link == arenaBtn) {
                    transition.classList.add('stadium')
                }
                if (link == ramsBtn) {
                    transition.classList.add('rams')
                }
                if (link == bengalsBtn) {
                    transition.classList.add('bengals')
                }
                setTimeout(() => {
                    transition.style.transform = "scale(0.8)"
                    wTransition.style.transition = "0s"
                    transition.style.opacity = "0.3"
                    setTimeout(() => {
                        if (link == ramsBtn) {
                            transition.classList.remove('rams')
                        }
                        if (link == bengalsBtn) {
                            transition.classList.remove('bengals')
                        }
                        if (link == aboutBtn) {
                            transition.classList.remove('index')
                        }
                        if (link == arenaBtn) {
                            transition.classList.remove('stadium')
                        }
                    }, 200);

                }, 700);
            }, 100);
        })
    }
    pageLinks(ramsBtn, 'calc(100vw + 50% - 100px)', '50vh', 'calc(-50% + 100px)', '50vh')
    pageLinks(bengalsBtn, 'calc(-50% + 100px)', '50vh', 'calc(100vw + 50% - 100px)', '50vh')
    pageLinks(arenaBtn, '50vw', 'calc(-50% + 100px)', '50vw', 'calc(100vh + 50% - 100px)')
    pageLinks(aboutBtn, '50vw', 'calc(100vh + 50% - 100px)', '50vw', 'calc(-50% + 100px)')

    //////////////////////////////////////////////////////////

    lightbox = document.querySelector('.w-lightbox')
    arenaImg = document.querySelectorAll('.w-gallery img.arena')
    arenaLightboxImg = document.querySelectorAll('.w-lightbox img.arena')
    closeBtn = document.querySelector('.close')
    if(arenaImg.length !=0) {
        arenaImg.forEach((img, index) => {
            img.addEventListener('click', () => {
                links.forEach(link => {
                    link.style.opacity = "0"
                    setTimeout(() => {
                        link.style.visibility = "hidden"
                    }, 300);
                })
                lightbox.style.opacity = "1"
                lightbox.style.transition = "clip-path 2s cubic-bezier(0.19, 0.8, 0.02, 0.99), opacity 0s"
                setTimeout(() => {
                    lightbox.classList.remove('transformation--click')
    
                }, 200);
                setTimeout(() => {
                    arenaLightboxImg[index].classList.remove('transformation--click')
                }, 1000);
            })
        })
    }
    if(closeBtn !=undefined) {
        closeBtn.addEventListener('click', () => {
            links.forEach(link => {
                link.style.opacity = "1"
                link.style.visibility = "visible"
            })
            arenaImg.forEach((img, index) => {
                lightbox.style.transition = "clip-path 0s .35s cubic-bezier(0.19, 0.8, 0.02, 0.99), opacity .3s"
                lightbox.style.opacity = "0"
                setTimeout(() => {
                    lightbox.classList.add('transformation--click')
                    arenaLightboxImg[index].classList.add('transformation--click')
    
                }, 1000);
            })
        })    
    }

    //////////////////////////////////////////////////////////

    // Parallax
    let accY, accX, transform
    /**
    * Calcule la position de l'élement par rapport au haut de l'élement document
    * @param {HTMLElement} element 
    * @return {Number}
    */
    function offsetTop(element) {
        accY = 0
        if (element.offsetParent) {
            accY = offsetTop(element.offsetParent)
        }
        return element.offsetTop + accY
    }
    /**
     * Calcule la position de l'element par rapport à la gauche de l'élement document
     * @author la2spaille
     * @param {HTMLElement} element 
     * @return {Number}
     * @
     */
    function offsetLeft(element) {
        accX = 0
        if (element.offsetParent) {
            accX = offsetLeft(element.offsetParent)
        }
        return element.offsetLeft + accX
    }
    class Parallax {
        constructor(element) {
            this.element = element,
                this.para = this.element.attributes['data-parallax'].value;
            this.paraY = parseFloat(this.para.split('/')[0], 10);
            this.paraX = parseFloat(this.para.split('/')[1], 10) || 0;
            this.paraR = parseFloat(this.para.split('/')[2], 10) || 0;
            this.paraS = parseFloat(this.para.split('/')[3], 10) || 0;
            this.transition = "0s";
            this.element.style.setProperty('transition', this.transition);
            this.ratio = 1;

            this.parallaxTransform = this.parallaxTransform.bind(this);
            this.onIntersection = this.onIntersection.bind(this);
            this.onResize = this.onResize.bind(this);

            this.elementY = offsetTop(this.element) + (this.element.offsetHeight / 2);
            this.test = 0
            this.houm = 0
            const observer = new IntersectionObserver(this.onIntersection);
            observer.observe(element);
            this.parallaxTransform();
        }
        /**
         * 
         * @param {IntersectionObserverEntry[]} entries 
         */
        onIntersection(entries) {
            for (const entry of entries) {
                if (this.paraX != 0 || entry.isIntersecting) {
                    document.addEventListener("scroll", this.parallaxTransform);
                    window.addEventListener("resize", this.onResize);
                    this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
                } else {
                    document.removeEventListener("scroll", this.parallaxTransform);
                    window.removeEventListener('resize', this.onResize);
                }
            }
        }
        onResize() {
            this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
            this.parallaxTransform();
        }
        parallaxTransform() {
            window.requestAnimationFrame(() => {
                if (this.element.getBoundingClientRect().right < 0) {
                    this.test++
                    this.houm = this.element.offsetWidth
                }
                if (this.element.getBoundingClientRect().x > window.innerWidth) {
                    this.test--
                    this.houm = this.element.offsetWidth
                }
                transform = `translateX(${this.paraX * window.scrollY + (window.innerWidth + 90) * this.test + this.houm * this.test}px)`

                // }
                // console.log(this.element.getBoundingClientRect().right)
                this.element.style.setProperty('transform', transform)
            })
        }
        /**
         * @author Grafikart
         * @returns {Parallax[]}
         */
        static bind() {
            return Array.from(document.querySelectorAll('[data-parallax]')).map(
                (element) => {
                    return new Parallax(element)
                }
            )
        }
    }
    Parallax.bind()
}

// Loader
loader = document.querySelector('.loader')
window.addEventListener('load', () => {
    loader.classList.add('dom-loaded')
    reveal.forEach(reveal => {
        setTimeout(() => {
            reveal.classList.remove('transformation')
        }, 800);
    })
})

// Cursor
const siteCursor = document.querySelector('.w-site-cursor')
let mouseX, mouseY, transformMouse
document.addEventListener('mousemove', (e) => {
    window.requestAnimationFrame(() => {
        mouseY = `${e.clientY}px`
        mouseX = `${e.clientX}px`
        transformMouse = `translate(calc(${mouseX} - 50%),calc(${mouseY} - 50%))`
        siteCursor.style.setProperty('transform', transformMouse)
        siteCursor.style.setProperty(' -webkit-transform', transformMouse)
        links.forEach(link => {
            link.addEventListener('mouseenter', (event) => {
                siteCursor.classList.add('site-cursor--link-hover')
                event.stopPropagation()
            })
            link.addEventListener('mouseleave', (event) => {
                siteCursor.classList.remove('site-cursor--link-hover')
                event.stopPropagation()
            })
        })
        arenaImg.forEach(img => {
            img.addEventListener('mouseenter', (event) => {
                siteCursor.classList.add('site-cursor--img-hover')
                event.stopPropagation()
            })
            img.addEventListener('mouseleave', (event) => {
                siteCursor.classList.remove('site-cursor--img-hover')
                event.stopPropagation()
            })
        })

    })
})

// AJAX
let cuts, select, pageText
pageText = new Array(4)
let pageTransition = function () {
    let ajaxLinks = document.querySelectorAll('a')
    ajaxLinks.forEach((link, index) => {
        fetch(link.getAttribute('href')).then(function (response) {
            response.text().then(function (text) {
                pageText[index] = text
            })
        })
    })
    init()
    ajaxLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            cuts = pageText[index].split('<main>') //On récupère le DOM de la page appelé et on le découpe
            cuts = cuts[1].split('</main>')
            select = cuts[0]
            setTimeout(() => {
                document.querySelector("main").innerHTML = select // contient le résultat de la page
                pageTransition()
                reveal.forEach(reveal => {
                    setTimeout(() => {
                        reveal.classList.remove('transformation')
                    }, 700);
                })
            }, 300);
            if (e.target.getAttribute('href') != window.location) {
                window.history.pushState({ path: e.target.getAttribute('href') }, '', e.target.getAttribute('href'))
            }

        })
    })
}
pageTransition()
// Transion entre les page avec les bonton
// window.addEventListener('popstate', () => {
//     // Début de la transition (un bouton est cliqué)
//     transitionBefore()
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             if (xhr.status === 200) {
//                 transitionAfter()
//             } else {
//                 console.log("Pas bon, pas bon du tout...")
//                 // Le serveur a renvoyé un status d'erreur
//             }
//         }
//     }
//     xhr.open('GET', window.location.href, true)
//     xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
//     xhr.send()
// })


