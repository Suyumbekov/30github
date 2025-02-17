let video = document.querySelector(".player__video");
let play = document.querySelector(".toggle");
let progressBar = document.querySelector(".progress");
let progress = document.querySelector(".progress__filled");
let skipButtons = document.querySelectorAll("[data-skip]");
let ranges = document.querySelectorAll(".player__slider");
let fullscreen = document.querySelector(".fullscreen");

const fullscreenHandler = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  }
};

const seekHandler = (e) => {
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percent = clickX / rect.width;
  video.currentTime = percent * video.duration;
};

const rangeHandler = (e) => {
  video[e.target.name] = e.target.value;
};

const handleSkip = (e) => {
  if (e.target.classList.contains("toggle")) return;
  video.currentTime += Number(e.target.dataset.skip);
};

const togglePlay = () => {
  if (video.paused) {
    video.play();
    play.textContent = "❚ ❚";
  } else {
    video.pause();
    play.textContent = "►";
  }
};

const handleProgress = () => {
  if (!video.duration || isNaN(video.duration)) return;
  const time = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = time + "%";
};

play.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
skipButtons.forEach((skip) => {
  skip.addEventListener("click", handleSkip);
});
fullscreen.addEventListener("click", fullscreenHandler);
ranges.forEach((range) => range.addEventListener("change", rangeHandler));
ranges.forEach((range) => range.addEventListener("mousemove", rangeHandler));

let mousedown = false;
progressBar.addEventListener("click", seekHandler);
progressBar.addEventListener("mousemove", (e) => mousedown && seekHandler(e));
progressBar.addEventListener("mousedown", () => (mousedown = true));
progressBar.addEventListener("mouseup", () => (mousedown = false));
