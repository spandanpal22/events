var dialogNames = ["Main", "Wanderer", "Spyros", "Equilibris", "NevaArte", "Capella"];
if ("IntersectionObserver" in window) {
	var firstGap = document.getElementsByClassName("gap")[0],
		isSent = !1,
		options = {
			rootMargin: "0px",
			threshold: .5
		},
		sendEvent = function (e, n) {
			e.forEach(function (e) {
				e.intersectionRatio > 0 && !isSent && (gtag("event", "Scroll", {
					event_category: "Page",
					event_label: "Second block scrolled"
				}), isSent = !0)
			})
		},
		observer = new IntersectionObserver(sendEvent, options);
	observer.observe(firstGap)
}
const disableBodyScroll = bodyScrollLock.disableBodyScroll,
	enableBodyScroll = bodyScrollLock.enableBodyScroll;
var config = {
		boards: []
	},
	d = {
		num: void 0,
		board: void 0,
		dialog: void 0,
		main: document.getElementsByTagName("main")[0],
		isBgBlocked: !1,
		isLandscape: void 0
	};

function configurate() {
	let e = {
			isTouch: "ontouchstart" in window || navigator.maxTouchPoints,
			isLandscape: window.innerWidth / window.innerHeight > 1,
			isAnimate: !1,
			scrollNow: window.config.scrollNow || 0,
			delta: 0,
			boards: [],
			animation: 500,
			animStart: 0
		},
		n = Array.from(document.getElementsByClassName("dialog"));

	function o(e, n) {
		let o = window.config.boards.hasOwnProperty(n) && window.config.boards[n].current || 0;
		this.el = e, this.w = function (e) {
			let n = Array.from(e.children),
				o = window.innerWidth;
			return n.forEach(function (e) {
				o -= e.offsetWidth
			}), o
		}(e), this.prev = o, this.current = o
	}
	return n.unshift(document.getElementsByTagName("main")[0]), n.forEach(function (n, i) {
		e.boards.push(new o(n.children[0], i))
	}), e
}

function init() {
	!(config = configurate()).isTouch && config.isLandscape ? (document.body.classList.add("notouch"), attachScroll(), config.isAnimate = !0) : (detachScroll(), document.body.classList.remove("notouch"), config.isAnimate = !1, config.boards.forEach(function (e) {
		e.el.style = "", e.prev = 0, e.current = 0
	})), config.isLandscape && d.isBgBlocked && config.isLandscape != d.isLandscape && (enableBodyScroll(d.dialog), d.isBgBlocked = !1)
}

function attachScroll() {
	"onwheel" in document ? window.addEventListener("wheel", onWheel) : "onmousewheel" in document ? window.addEventListener("mousewheel", onWheel) : window.addEventListener("MozMousePixelScroll", onWheel)
}

function detachScroll() {
	"onwheel" in document ? window.removeEventListener("wheel", onWheel) : "onmousewheel" in document ? window.removeEventListener("mousewheel", onWheel) : window.removeEventListener("MozMousePixelScroll", onWheel)
}

function onWheel(e) {
	var n = (e = e || window.event).deltaY || e.detail || -e.wheelDelta;
	n *= 1 === e.deltaMode ? 16 : 1, config.delta = -.5 * n
}

function animate() {
	let e = performance.now(),
		n = config.animation + config.animStart <= e;
	config.isAnimate && n && drawFrame(), requestAnimationFrame(animate)
}

function drawFrame() {
	let e = config.boards[config.scrollNow];
	e.current > 0 ? e.current = .9 * e.current + config.delta / 4 : e.current < e.w ? e.current = e.w - .9 * (e.w - e.current) + config.delta / 4 : e.current = e.prev + config.delta, config.delta *= .9, e.el.style = "transform: translate3D(" + e.current + "px, 0, 0 );", e.prev = e.current
}

function openDialog(e) {
	d.num = e, d.board = config.boards[e], d.dialog = config.boards[e].el.parentNode, d.board.prev = 0, d.board.current = 0, d.board.el.style = "", d.dialog.scroll(0, 0), d.dialog.classList.add("dialog-visible"), d.dialog.classList.remove("dialog-hidden"), d.main.classList.add("main-hidden"), d.main.classList.remove("main-visible"), config.isLandscape || (disableBodyScroll(d.dialog), d.isBgBlocked = !0, d.isLandscape = config.isLandscape), config.animStart = performance.now(), config.scrollNow = e, gtag("event", "Open", {
		event_category: "Dialog",
		event_label: dialogNames[e]
	})
}

function closeDialog(e) {
	d.dialog.classList.remove("dialog-visible"), d.dialog.classList.add("dialog-hidden"), d.main.classList.remove("main-hidden"), d.main.classList.add("main-visible"), config.isLandscape || (enableBodyScroll(d.dialog), d.isBgBlocked = !1), config.animStart = performance.now();
	var n = dialogNames[config.scrollNow] + "-" + e;
	gtag("event", "Close", {
		event_category: "Dialog",
		event_label: n
	}), config.scrollNow = 0
}

function setVh() {
	let e = .01 * window.innerHeight;
	document.documentElement.style.setProperty("--vh", `${e}px`)
}
document.addEventListener("DOMContentLoaded", function () {
	setVh()
}), window.addEventListener("load", function () {
	init()
}), window.addEventListener("resize", function () {
	init(), setVh()
}), init(), animate();