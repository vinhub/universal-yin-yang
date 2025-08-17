// Multi-section navigation logic
const sections = [
  {
    canvasId: 'canvas-classic',
    draw: (blend, r1, r2, ctx, rad) => drawYinYangColors(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white'),
    title: 'The Yin-Yang Model of Reality',
    animated: false,
    message: "The Yin-Yang represents the duality in nature — how seemingly opposite forces are " +
             "interconnected and interdependent. It illustrates that various aspects of reality such as light and dark, " +
             "male and female, order and chaos, etc. are not just opposites, but complementary, " +
             "each containing a seed of the other, and together creating balance and harmony." +
             "Going deeper into into this concept reveals some interesting insights. <br/>" +
             "Click on the Next button to continue."
  },
  {
    canvasId: 'canvas-dynamic',
    draw: (blend, r1, r2, ctx, rad) => drawYinYangColors(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: 'The Yin-Yang is Dynamic',
    animated: true,
    message: "This is the dynamic animated Yin-Yang."
  },
  {
    canvasId: 'canvas-political',
    draw: (blend, r1, r2, ctx, rad) => drawYinYangColors(blend, r1, r2, ctx, rad, 'red', 'blue'),
    title: 'The Yin-Yang of Politics',
    animated: true,
    message: "This is the political red/blue Yin-Yang."
  }
];

let currentSection = 0;
let animationFrameId = null; // Track current animation frame for section

function animateSection(sectionIdx, time = 0) {
  // Cancel previous animation if running
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  const section = sections[sectionIdx];
  const canvas = document.getElementById(section.canvasId);
  const ctx = canvas.getContext('2d');
  const minFactor = 0.5;
  const steps = 360;
  const angleStep = 2 * Math.PI / steps;
  let yinYangRadius;
  function resizeCanvas() {
    canvas.width = canvas.height = Math.round(canvas.getBoundingClientRect().width);
    yinYangRadius = 0.5 * canvas.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(yinYangRadius, yinYangRadius);
  }
  resizeCanvas();
  if (!section.animated) {
    // Draw static Yin-Yang
    section.draw(0.5, yinYangRadius * 0.75, yinYangRadius * 0.25, ctx, yinYangRadius);
    return;
  }
  function frame(t) {
    const blend = 0.5 * (1 + Math.sin(t * angleStep));
    const minRadius = minFactor * 0.5 * yinYangRadius;
    const maxRadius = yinYangRadius - minRadius;
    const circle1Radius = blend * minRadius + (1 - blend) * maxRadius;
    const circle2Radius = yinYangRadius - circle1Radius;
    section.draw(blend, circle1Radius, circle2Radius, ctx, yinYangRadius);
    animationFrameId = requestAnimationFrame(() => frame(t + 0.5));
  }
  frame(time);
  window.addEventListener('resize', resizeCanvas, false);
}

function showSection(idx) {
  sections.forEach((_, i) => {
    document.getElementById('section-' + i).style.display = (i === idx) ? 'flex' : 'none';
    document.getElementById(`arrow-left-${i}`).disabled = (idx === 0);
    document.getElementById(`arrow-right-${i}`).disabled = (idx === sections.length - 1);
  });
  document.getElementById('page-title').textContent = sections[idx].title;
  animateSection(idx); // Animate only the current section
  // Show message panel with section message immediately
  const panel = document.getElementById('message-panel');
  const msg = sections[idx].message;
  panel.innerHTML = msg ? msg : '';
}

for (let i = 0; i < sections.length; i++) {
  document.getElementById(`arrow-left-${i}`).addEventListener('click', () => {
    if (currentSection > 0) showSection(--currentSection);
  });
  document.getElementById(`arrow-right-${i}`).addEventListener('click', () => {
    if (currentSection < sections.length - 1) showSection(++currentSection);
  });
}

// Parameterized Yin-Yang drawing
function drawYinYangColors(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
  ctx.clearRect(-yinYangRadius, -yinYangRadius, yinYangRadius * 2, yinYangRadius * 2);
  ctx.save();
  ctx.rotate(Math.PI / 2);
  let dot1Radius, dot2Radius;
  if (circle1Radius <= circle2Radius) {
    dot2Radius = circle1Radius / 3;
    const dot1Area = (0.5 * Math.PI * circle2Radius * circle2Radius) + 
                            (Math.PI * dot2Radius * dot2Radius) -
                            (0.5 * Math.PI * circle1Radius * circle1Radius)
    dot1Radius = dot1Area > 0 ? Math.sqrt(dot1Area / Math.PI) : 0;
  } else {
    dot1Radius = circle2Radius / 3;
    const dot2Area = (0.5 * Math.PI * circle1Radius * circle1Radius) + 
                            (Math.PI * dot1Radius * dot1Radius) -
                            (0.5 * Math.PI * circle2Radius * circle2Radius);
    dot2Radius = dot2Area > 0 ? Math.sqrt(dot2Area / Math.PI) : 0;
  }
  ctx.fillStyle = colorA;
  ctx.beginPath();
  ctx.arc(0, 0, yinYangRadius, 0, Math.PI);
  ctx.arc(-circle1Radius, 0, circle2Radius, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = colorB;
  ctx.beginPath();
  ctx.arc(0, 0, yinYangRadius, -Math.PI, 0);
  ctx.arc(circle2Radius, 0, circle1Radius, 0, Math.PI);
  ctx.arc(-circle1Radius, 0, circle2Radius, 0, -Math.PI, true);
  ctx.arc(-circle1Radius, 0, dot1Radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = colorA;
  ctx.beginPath();
  ctx.arc(circle2Radius, 0, dot2Radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

// Initial setup: show first section and animate
showSection(currentSection);

// Dropdown menu logic
document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.getElementById('menu-button');
  const dropdownMenu = document.getElementById('dropdown-menu');

  function closeMenu() {
    dropdownMenu.classList.remove('open');
  }

  menuButton.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownMenu.classList.toggle('open');
  });

  document.addEventListener('click', function(e) {
    if (dropdownMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  dropdownMenu.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent closing when clicking inside menu
    if (e.target.classList.contains('dropdown-item')) {
      closeMenu();
    }
  });
});
