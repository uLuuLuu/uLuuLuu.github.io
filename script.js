const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("is-visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll("[data-reveal]").forEach((node) => revealObserver.observe(node));

const themeObserver = new IntersectionObserver((entries) => {
  const active = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (active) document.body.dataset.nav = active.target.dataset.nav || "night";
}, { threshold: [0.35, 0.55, 0.7] });
document.querySelectorAll("[data-nav]").forEach((section) => themeObserver.observe(section));

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-header nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "关闭" : "目录";
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "目录";
}));

const modal = document.querySelector(".modal");
const openStory = document.querySelector(".story-link");
const closeStory = document.querySelector(".close");
const showModal = () => { modal.hidden = false; closeStory.focus(); };
const hideModal = () => { modal.hidden = true; openStory.focus(); };
openStory.addEventListener("click", showModal);
closeStory.addEventListener("click", hideModal);
modal.addEventListener("mousedown", (event) => { if (event.target === modal) hideModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) hideModal(); });
