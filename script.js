function handleClick() {
  alert("Redirecting to All Course...");
  window.location.href = "course.html";
}


const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;

    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = target + "+";
    }
  };

  updateCounter();
});

const btn = document.querySelector('[data-collapse-toggle]');
const menu = document.getElementById('navbar-solid');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

const topBtn = document.getElementById("topBtn");

// Show button on scroll
window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    topBtn.classList.remove("hidden");
  } else {
    topBtn.classList.add("hidden");
  }
};

// Scroll to top
topBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  // small delay for smooth feel
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);

  }, 900); // you can reduce to 300 if you want faster
});
