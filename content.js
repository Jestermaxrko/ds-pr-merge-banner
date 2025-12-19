const timers = {
  mergeTimer: null,
  intervalTimer: null,
}

const imageWidth = 1920;
const imageHeight = 1080;

const CONFIG = {
  delay: 50,
  displayDuration: 2000,
  fadeOutDuration: 2000,
  shrinkDelay: 100,
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const showBanner = async () => {
  const bannerIcon = chrome.runtime.getURL("assets/banner-ds-3.png");
  const sound = new Audio(chrome.runtime.getURL("assets/sound.mp3"));

  sound.play();

  const img1 = document.createElement("img");
  img1.classList.add('banner-image', 'bottom-image');
  img1.src = bannerIcon;

  const img2 = document.createElement("img");
  img2.classList.add('banner-image', 'top-image');
  img2.src = bannerIcon;

  const bannerContainer = document.createElement("div");
  bannerContainer.classList.add('banner-container');
  document.body.appendChild(bannerContainer);
  document.body.appendChild(img1);
  document.body.appendChild(img2);

  setTimeout(() => {
    img1.classList.add('show');
    img2.classList.add('show');
    bannerContainer.classList.add('show');
    
  }, CONFIG.delay);


  setTimeout(() => {
    img2.classList.add('fade-out');
  }, CONFIG.delay + CONFIG.displayDuration)

  setTimeout(() => {
    img2.classList.add('shrink');
  }, CONFIG.delay + CONFIG.displayDuration + CONFIG.shrinkDelay)

  setTimeout(() => {
    img1.classList.add('fade-out');
    bannerContainer.classList.add('fade-out');
  }, CONFIG.delay + CONFIG.displayDuration + CONFIG.shrinkDelay + CONFIG.fadeOutDuration)

  setTimeout(() => {
    img1.remove();
    img2.remove();
  }, CONFIG.delay + CONFIG.displayDuration + CONFIG.fadeOutDuration + CONFIG.shrinkDelay + CONFIG.fadeOutDuration)
};

const statusBadge = document.querySelector('[title^="Status"]');

document.addEventListener('click', event => {

  return showBanner();

  if (!timers.intervalTimer) {
    const buttonContent = event.target.textContent;
    const isMergeButton = buttonContent.toLowerCase().includes('merge')
      && !buttonContent.toLowerCase().includes('merged');

    if (!isMergeButton) return;

    timers.intervalTimer = setInterval(() => {
      const mergedStatus = document.querySelector('[aria-label="Merged"]');

      if (mergedStatus) {
        showBanner();
        clearInterval(timers.intervalTimer);
      }
    })
  }
})