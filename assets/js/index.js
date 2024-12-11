'use strict'

// INFINITE SCROLL

const scrollerInner = document.querySelector('.companies__scroller--inner')
const hrefs = [
	'https://www.gambleaware.org/',
	'https://www.gamcare.org.uk/',
	'https://www.gamstop.co.uk/',
]
const alts = ['begambleaware', 'gamcare', 'gamstop']
const srcs = [
	'./assets/images/icons/begambleaware1.svg',
	'./assets/images/icons/gamcare1.svg',
	'./assets/images/icons/gamstop1.svg',
]

function addCompanies() {
	const screenWidth = window.innerWidth
	let j = 0
	for (let i = 0; i <= screenWidth; i += 195) {
		const link = document.createElement('a')
		link.href = hrefs[j]
		const img = document.createElement('img')
		img.className = 'companies__company'
		img.src = srcs[j]
		img.alt = alts[j]
		link.appendChild(img)
		scrollerInner.appendChild(link)
		if (j < 2) {
			j++
		} else {
			j = 0
		}
	}
}
addCompanies()

window.addEventListener('resize', () => {
	scrollerInner.innerHTML = ''
	addCompanies()
	addAnimation()
})

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	addAnimation()
}

function addAnimation() {
	const scroller = document.querySelector('.companies__scroller')
	scroller.setAttribute('data-animated', true)

	const scrollerContent = Array.from(scrollerInner.children)
	scrollerContent.forEach(item => {
		const duplicatedItem = item.cloneNode(true)
		duplicatedItem.setAttribute('aria-hidden', true)
		scrollerInner.appendChild(duplicatedItem)
	})
}

// HEADER BTN
const headerBtn = document.querySelector('.header__btn')
const headerNav = document.querySelector('.header__nav')
const headerNavLinks = document.querySelectorAll('.header__nav-link')

headerBtn.addEventListener('click', function () {
	this.classList.toggle('active')
	headerNav.classList.toggle('active')
})
headerNavLinks.forEach(link => {
	link.addEventListener('click', () => {
		headerBtn.classList.toggle('active')
		headerNav.classList.toggle('active')
	})
})
