const root = document.documentElement;
const openButton = document.getElementById('open-envelope');
const invitation = document.querySelector('.invitation');
const card = document.querySelector('.gate__card');
const letterImage = document.querySelector('.gate__letter img');
const firstPage = invitation.querySelector('img');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const music = document.getElementById('wedding-music');
const musicToggle = document.getElementById('music-toggle');

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function showFrontPage() {
  window.scrollTo(0, 0);
}

function syncMusicToggle() {
  const playing = !music.paused && !music.ended;
  musicToggle.setAttribute('aria-pressed', String(playing));
  musicToggle.setAttribute('aria-label', playing ? 'Turn music off' : 'Turn music on');
  musicToggle.querySelector('.music-toggle__label').textContent = playing ? 'On' : 'Off';
}

music.addEventListener('play', syncMusicToggle);
music.addEventListener('pause', syncMusicToggle);
music.addEventListener('ended', syncMusicToggle);

musicToggle.addEventListener('click', () => {
  if (!music.paused) {
    music.pause();
    return;
  }

  if (music.ended) music.currentTime = 0;
  music.play().catch(syncMusicToggle);
});

async function expandInvitation() {
  showFrontPage();
  const source = letterImage.getBoundingClientRect();
  const cardBounds = card.getBoundingClientRect();
  const target = firstPage.getBoundingClientRect();
  const openingTop = cardBounds.top + cardBounds.height * .4415;
  const visibleHeight = Math.max(0, openingTop - source.top);
  const clippedBottom = Math.max(0, Math.min(100, 100 - visibleHeight / source.height * 100));
  const preview = letterImage.cloneNode(false);

  preview.className = 'invitation-preview';
  preview.setAttribute('aria-hidden', 'true');
  preview.style.left = `${source.left}px`;
  preview.style.top = `${source.top}px`;
  preview.style.width = `${source.width}px`;
  preview.style.clipPath = `inset(0 0 ${clippedBottom}% 0)`;
  document.body.appendChild(preview);
  root.classList.add('expanding');

  if (preview.animate) {
    const animation = preview.animate([
      {
        left: `${source.left}px`,
        top: `${source.top}px`,
        width: `${source.width}px`,
        clipPath: `inset(0 0 ${clippedBottom}% 0)`,
      },
      {
        left: `${target.left}px`,
        top: `${target.top}px`,
        width: `${target.width}px`,
        clipPath: 'inset(0 0 0 0)',
      },
    ], { duration: 1100, easing: 'cubic-bezier(.18,.76,.22,1)', fill: 'forwards' });

    await animation.finished.catch(() => {});
  }

  root.classList.add('opened');
  root.classList.remove('expanding');
  preview.remove();
  showFrontPage();
  invitation.focus({ preventScroll: true });
}

openButton.addEventListener('click', () => {
  if (root.classList.contains('opening') || root.classList.contains('opened')) return;

  showFrontPage();
  root.classList.add('opening');
  music.play().catch(syncMusicToggle);

  if (reducedMotion.matches) {
    root.classList.add('pulling');
    root.classList.add('opened');
    showFrontPage();
    invitation.focus({ preventScroll: true });
    return;
  }

  window.setTimeout(() => root.classList.add('pulling'), 1250);
  window.setTimeout(expandInvitation, 2300);
});

const leaves = [
  [12, 15, 0, 10, 18],
  [54, 19, -3, 13, -22],
  [81, 13, -8, 11, 15],
  [27, 22, -5, 16, -19],
  [69, 16, -11, 12, 24],
  [9, 18, -15, 14, -15],
  [88, 14, -18, 10, 12],
  [42, 20, -21, 15, -26],
  [73, 17, -26, 13, 20],
];

const flowers = [
  ['white', 4, 48, -1, 19, 15],
  ['white', 36, 43, -3, 22, -14],
  ['white', 19, 42, -5, 20, 18],
  ['white', 32, 46, -9, 23, 12],
  ['white', 8, 40, -11, 18, 19],
  ['white', 45, 52, -13, 26, -16],
  ['white', 6, 39, -17, 18, 20],
  ['white', 42, 48, -19, 25, -18],
  ['white', 28, 50, -21, 22, 14],
  ['white', 51, 44, -25, 24, 17],
  ['white', 34, 52, -27, 26, -15],
  ['white', 17, 47, -29, 21, 11],
  ['white', 40, 51, -33, 25, -13],
  ['white', 23, 46, -35, 23, 16],
];

document.querySelectorAll('.leaf-rail').forEach((rail, side) => {
  leaves.forEach(([x, size, delay, duration, drift]) => {
    const leaf = document.createElement('span');
    leaf.className = 'leaf';
    leaf.style.setProperty('--x', `${x}%`);
    leaf.style.setProperty('--size', `${size}px`);
    leaf.style.setProperty('--delay', `${delay - side * 1.5}s`);
    leaf.style.setProperty('--duration', `${duration + side * 2}s`);
    leaf.style.setProperty('--drift', `${drift * (side ? -1 : 1)}px`);
    rail.appendChild(leaf);
  });

  flowers.forEach(([type, x, size, delay, duration, drift]) => {
    const flower = document.createElement('span');
    flower.className = `flower flower--${type}`;
    flower.style.setProperty('--x', `${x}%`);
    flower.style.setProperty('--size', `${size}px`);
    flower.style.setProperty('--delay', `${delay - side * 2}s`);
    flower.style.setProperty('--duration', `${duration + side * 2}s`);
    flower.style.setProperty('--drift', `${drift * (side ? -1 : 1)}px`);
    rail.appendChild(flower);
  });
});
