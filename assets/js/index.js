'use strict'

// INFINITE SCROLL
const scrollerInner = document.querySelector('.companies__scroller--inner')
const hrefs = [
	'https://www.gambleaware.org/',
	'https://www.gamcare.org.uk/',
	'https://www.gamstop.co.uk/',
]
const alts = ['visa', 'mastercard', 'paypal', 'google-pay']
const srcs = [
	'./assets/images/icons/visa.svg',
	'./assets/images/icons/mastercard.svg',
	'./assets/images/icons/paypal.svg',
	'./assets/images/icons/google-pay.svg',
]

function addCompanies() {
	let j = 0
	const screenWidth = window.innerWidth
	for (let i = 0; i <= screenWidth; i += 100 * 4) {
		for (let j = 0; j < 4; j++) {
			const link = document.createElement('a')
			link.href = ''
			const img = document.createElement('img')
			img.className = 'companies__company'
			img.src = srcs[j]
			img.alt = alts[j]
			link.appendChild(img)
			scrollerInner.appendChild(link)
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
	scrollerContent.forEach((item, index) => {
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
	if (window.innerWidth <= 540 && wasAdded === false) {
		const bestGames = document.querySelector('.best-games')
		const games = document.querySelector('.games__games')
		const bestCasino = games.firstElementChild.cloneNode(true)
		const bestGameLogo = bestGames.querySelector('.best-games__logo')
		const bestGameTitle = bestGames.querySelector('.best-games__game-title')
		const bestGameBonus = bestGames.querySelector('.best-games__game-bonus')
		const bestGameAdvantages = bestGames.querySelectorAll(
			'.best-games__advantage-text'
		)

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
		bestCasino.querySelectorAll('.games__advantage-text').forEach((advantage, index) => {
			advantage.textContent = bestGameAdvantages[index].textContent
		})
		games.insertBefore(bestCasino, games.firstChild)
		wasAdded = true
	} else if (window.innerWidth > 540 && wasAdded === true) {
		const games = document.querySelector('.games__games')
		games.firstChild.remove()
		wasAdded = false
		while (gamesContainer.children.length > allCasinosCount) {
			gamesContainer.removeChild(gamesContainer.lastChild)
		}
	}
}
let allCasinosCount = null
let wasAdded = false
if (document.querySelector('.games__games')) {
	allCasinosCount = document.querySelector('.games__games').children.length
	toggleBestGames()

	window.addEventListener('resize', () => {
		if (document.querySelector('.companies')) {
			scrollerInner.innerHTML = ''
			addCompanies()
			addAnimation()
		}
		toggleBestGames()
	})
}

// INFINITE SCROLL
let gamesContainer = null
let games = null
if (document.querySelector('.games__games')) {
	gamesContainer = document.querySelector('.games__games')
}
function checkScroll() {
	const scrollLeft = gamesContainer.scrollLeft
	const scrollWidth = gamesContainer.scrollWidth
	const clientWidth = gamesContainer.clientWidth
	games = Array.from(gamesContainer.children)
	if (scrollLeft + clientWidth >= scrollWidth - 10) {
		// 10 - это порог для добавления новых элементов
		games.forEach(game => {
			gamesContainer.appendChild(game.cloneNode(true))
		})
	}
}

if (document.querySelector('.games__games')) {
	gamesContainer.addEventListener('scroll', checkScroll)
}
