'use strict'

// INFINITE SCROLL
const screenWidth = window.innerWidth
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

for (let i = 0; i < screenWidth; i += 195 * 3) {
	for (let j = 0; j < 3; j++) {
		const link = document.createElement('a')
		link.href = hrefs[j]
		const img = document.createElement('img')
		img.className = 'companies__company'
		img.src = srcs[j]
		img.alt = alts[j]
		link.appendChild(img)
		scrollerInner.appendChild(link)
	}
}

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
