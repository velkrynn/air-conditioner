const slides = document.querySelectorAll(".carousel-slide");
const track = document.getElementById("track");
const dotsEl = document.getElementById("dots");
let cur = 0,
  timer,
  startX;

slides.forEach((_, i) => {
  const d = document.createElement("div");
  d.className = "dot" + (i === 0 ? " active" : "");
  d.onclick = () => go(i);
  dotsEl.appendChild(d);
});

function go(n) {
  cur = (n + slides.length) % slides.length;
  track.style.transform = `translateX(-${cur * 100}%)`;
  document
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i === cur));
  clearInterval(timer);
  timer = setInterval(() => go(cur + 1), 3500);
}

document.getElementById("prev").onclick = () => go(cur - 1);
document.getElementById("next").onclick = () => go(cur + 1);

const outer = document.querySelector(".carousel-outer");
outer.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true },
);
outer.addEventListener(
  "touchend",
  (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
  },
  { passive: true },
);

timer = setInterval(() => go(cur + 1), 3500);
