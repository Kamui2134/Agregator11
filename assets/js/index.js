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
if (document.querySelector('.companies')) {
	addCompanies()
	if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		addAnimation()
	}
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

// BEST GAME IN GAMES

function toggleBestGames() {
	if (
		window.innerWidth <= 540 &&
		document.querySelector('.games__games').children.length === allCasinosCount
	) {
		const bestGames = document.querySelector('.best-games')
		const games = document.querySelector('.games__games')
		const bestCasino = games.firstElementChild.cloneNode(true)
		const bestGameLogo = bestGames.querySelector('.best-games__logo')
		const bestGameTitle = bestGames.querySelector('.best-games__game-title')
		const bestGameBonus = bestGames.querySelector('.best-games__game-bonus')

		const bestCasinoLogoClone = bestCasino.querySelector('.games__logo')
		bestCasinoLogoClone.src = bestGameLogo.src
		bestCasinoLogoClone.alt = bestGameLogo.alt
		bestCasino.querySelector('.games__game-title').textContent =
			bestGameTitle.textContent
		bestCasino.querySelector(
			'.games__game-text'
		).textContent = `${bestGameTitle.textContent.toLocaleLowerCase()}.com`
		bestCasino.querySelector('.games__bonus-text').textContent =
			bestGameBonus.textContent
		games.insertBefore(bestCasino, games.firstChild)
	} else if (
		window.innerWidth > 540 &&
		document.querySelector('.games__games').children.length > allCasinosCount
	) {
		const games = document.querySelector('.games__games')
		games.firstChild.remove()
	}
}
let allCasinosCount = null
if (document.querySelector('.games__games')) {
	allCasinosCount = document.querySelector('.games__games').children.length
	toggleBestGames()

	window.addEventListener('resize', () => {
		scrollerInner.innerHTML = ''
		addCompanies()
		addAnimation()
		toggleBestGames()
	})
}
