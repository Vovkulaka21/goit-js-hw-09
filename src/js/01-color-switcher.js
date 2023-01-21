const ref = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

ref.start.addEventListener('click', startChangeColor);
ref.stop.addEventListener('click', stopChangeColor);

let timerId;

// -------------------------------функціонал змін--------------------------------------------------------

function startChangeColor() {
  timerId = setInterval(() => {
    ref.start.disabled = true;
    document.body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);
}

function stopChangeColor() {
  clearInterval(timerId);
  ref.start.disabled = false;
}

// --------зміна кольору -----------
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
