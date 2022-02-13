let loader, linkHover, closeBtn, reveal, allImg, isLoad, links, superBowl, arenaBtn, ramsBtn, aboutBtn, bengalsBtn, wTransition, transition, transform, appArena, appArenaHeight, appTeam, horizontalScroll, test, arenaImg, flex, teamHorizontalScroll, arenaLightboxImg, lightbox, lastScroll, siteLinks
function init() {
    let accY, accX, transform
    class Flowwwi {
        constructor(element) {
            this.element = element
        }
        /**
            * Calcule la position de l'élement par rapport au haut de l'élement document
            * @param {HTMLElement} element 
            * @return {Number}
        */
        offsetTop() {
            accY = 0
            if (this.element.offsetParent) {
                accY = offsetTop(this.element.offsetParent)
            }
            return this.element.offsetTop + accY
        }
        /**
         * Calcule la position de l'element par rapport à la gauche de l'élement document
         * @author la2spaille
         * @param {HTMLElement} element 
         * @return {Number}
         * @
         */
        offsetLeft() {
            accX = 0
            if (this.element.offsetParent) {
                accX = offsetLeft(this.element.offsetParent)
            }
            return this.element.offsetLeft + accX
        }
        /**
            * @author Grafikart
            * @returns {Parallax[]}
            */
        static bind() {
            return Array.from(document.querySelectorAll('*')).map(
                (element) => {
                    return new Flowwwi(element)
                }
            )
        }
    }
    Flowwwi.bind()

    //////////////////////////////////////////////////////////

    appArena = document.querySelector('#app.arena')
    if (appArena != undefined) {
        scrollTo(0, 0)
        appArena.style.height = `${3 * window.innerHeight}px`
        appArenaHeight = 3 * window.innerHeight
        window.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            window.requestAnimationFrame(() => {
                if (clientHeight + scrollTop >= scrollHeight - 200) {
                    appArenaHeight += 400
                    appArena.style.height = `${appArenaHeight}px`
                }
            })
        })
    }
    appTeam = document.querySelector('#app.team')
    flex = false
    lastScroll = 0
    if (appTeam != undefined) {
        scrollTo(0, -1 + window.innerHeight / 2)
        teamHorizontalScroll = document.querySelector('.l-wrapper.team')
        window.addEventListener('scroll', () => {
            lastScroll = window.scrollY
            if (!flex) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY < window.innerHeight / 2) {
                        teamHorizontalScroll.style.transform = `translateX(${0}px)`
                        scrollTo(0, -1 + window.innerHeight / 2)

                    }
                    if (window.scrollY > window.innerHeight / 2) {
                        teamHorizontalScroll.style.transform = `translateX(${-window.innerWidth}px)`
                        scrollTo(0, 1 + window.innerHeight / 2)
                    }
                    flex = false
                })
            }
            flex = true
        })
    }
    // function scrollSnap(element) {
    //     window.scrollTo(0, offsetTop(element))
    // }
    // let options = {
    //     root:'',
    //     threeshold:0.51
    // }

    // let observe = new IntersectionObserver(scrollSnap,options )
    // document.querySelectorAll('section').forEach(section => {
    //     observe(section)
    // })

    //////////////////////////////////////////////////////////

    linkHover = document.querySelectorAll('.link-hover')
    reveal = document.querySelectorAll('.transformation')
    links = document.querySelectorAll('a')
    siteLinks = document.querySelectorAll('.w-page-links')

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
            siteLinks.forEach(liiink => {
                liiink.style.transition = "1s 0s"
                liiink.classList.add('transformation')
            })
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
    if (arenaImg.length != 0) {
        arenaImg.forEach((img, index) => {
            img.addEventListener('click', () => {
                links.forEach(link => {
                    link.style.opacity = "0"
                    closeBtn.classList.remove('transformation')
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
    if (closeBtn != undefined) {
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
                    closeBtn.classList.add('transformation')
                }, 1000);
            })
        })
    }

    //////////////////////////////////////////////////////////

    // Parallax
    class Parallax extends Flowwwi {
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

            this.elementY = this.element.offsetTop() + (this.element.offsetHeight / 2);
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
                    this.elementY = this.element.offsetTop() + this.element.offsetHeight / 2;
                } else {
                    document.removeEventListener("scroll", this.parallaxTransform);
                    window.removeEventListener('resize', this.onResize);
                }
            }
        }
        onResize() {
            this.elementY = this.element.offsetTop() + this.element.offsetHeight / 2;
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
        if (arenaImg.length != 0) {
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
        }

        if (closeBtn != undefined) {
            closeBtn.addEventListener('mouseenter', (event) => {
                siteCursor.classList.add('site-cursor--close-hover')
                event.stopPropagation()
            })
            closeBtn.addEventListener('mouseleave', (event) => {
                siteCursor.classList.remove('site-cursor--close-hover')
                event.stopPropagation()
            })
        }


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
                siteLinks.forEach(liiink => {
                    liiink.style.transition = "1s 2s"
                })
                reveal.forEach(reveal => {
                    setTimeout(() => {
                        reveal.classList.remove('transformation')
                    }, 1500);
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


