/**
 * Bu yerga bir nimalar yoziladi. 
 * Oddiy comment qoldiriladi
*/
let actSec = document.querySelector('.active-section');

let activeNav = document.querySelector('.active-nav');

let lastScrollY = 0;

const sections = document.querySelectorAll('section');

function menu() {
    const navBar = document.querySelector('#navbar__list');
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const manuNavButton = makeNavButton(section);
        fragment.appendChild(manuNavButton);
    }
    navBar.appendChild(fragment);
    addListeners(navBar);
}

function makeNavButton(section) {
    const manuNavButton = document.createElement('li');
    manuNavButton.classList.add('menu__link');
    manuNavButton.textContent = section.dataset.nav;
    manuNavButton.setAttribute('data-id', section.id);
    manuNavButton.id = `nav-${section.id}`;
    if (activeNav == null) {
        manuNavButton.classList.add('active-nav')
        activeNav = manuNavButton;
    }
    return manuNavButton;
}

function addListeners(navBar) {
    navBar.addEventListener('click', onNavClick);
    document.addEventListener('scroll', function() {scrollCheck()});
}

function onNavClick(event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({behavior: 'smooth'});
}

function scrollCheck() {
    const viewportHeight = window.innerHeight;
    let ratioForActive;
    if (window.scrollY > lastScrollY) {
        ratioForActive = viewportHeight/3;
    } else {
        ratioForActive = viewportHeight*2/3;
    }
    lastScrollY = window.scrollY;
    for (const section of sections) {
        const position = section.getBoundingClientRect();
        if (position.top < ratioForActive && position.bottom > ratioForActive && section !== actSec) {
            setActSec(section);
            setActiveNav(document.querySelector(`#nav-${section.id}`));
            break;
        }
    }
}

function setActSec(section) {
    actSec.classList.remove('active-section');
    section.classList.add('active-section');
    actSec = section;
}

function setActiveNav(nav) {
    activeNav.classList.remove('active-nav');
    nav.classList.add('active-nav')
    activeNav = nav;
}

menu();

