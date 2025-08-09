// Get canvas and context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Animation and geometry parameters
const minFactor = 0.25; // Minimum radius factor for inner circles
const steps = 360;      // Number of steps for a full rotation
const angleStep = 2 * Math.PI / steps; // Angle increment per frame


let radius, maxRadius, minRadius;
let isPaused = false;
let animationTime = 0;
let animationFrameId = null;

/**
 * Resize canvas and recalculate radii for the 
 */
function resizeCanvas() {
  canvas.width = canvas.height = Math.round(canvas.getBoundingClientRect().width);
  radius = 0.5 * canvas.width;
  minRadius = minFactor * 0.5 * radius;
  maxRadius = radius - minRadius;
  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before translating
  ctx.translate(radius, radius);
}

/**
 * Draw the Yin-Yang symbol for the current animation state
 * @param {number} blend - Blend factor for morphing circles
 * @param {number} circle1 - Radius of first inner circle
 * @param {number} circle2 - Radius of second inner circle
 */
function drawYinYang(blend, circle1, circle2) {
  // Clear previous frame
  ctx.clearRect(-radius, -radius, canvas.width, canvas.width);
  
  // Rotate for animation
  ctx.rotate(angleStep);

  // Draw black part
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(0, 0, radius, -Math.PI, 0);
  ctx.arc(circle2, 0, circle1, 0, Math.PI);
  ctx.arc(-circle1, 0, circle2, 0, -Math.PI, true);
  ctx.arc(-circle1, 0, circle2 / 3, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Draw white part
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(circle2, 0, circle1 / 3, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

/**
 * Animation loop for the Yin-Yang symbol
 * @param {number} time - Animation time/frame
 */

/**
 * Animation loop for the Yin-Yang symbol
 * @param {number} time - Animation time/frame
 */
function animateYinYang(time = animationTime) {
  animationTime = time;
  // Calculate blend and Yin-Yang radii for morphing effect
  const blend = 0.5 * (1 + Math.cos(time * angleStep));
  const circle1 = blend * minRadius + (1 - blend) * maxRadius;
  const circle2 = radius - circle1;

  drawYinYang(blend, circle1, circle2);

  if (!isPaused) {
    animationFrameId = requestAnimationFrame(() => animateYinYang(time + 0.5));
  }
}

/**
 * Toggle pause/resume state of the animation
 */
function toggleAnimation() {
  isPaused = !isPaused;
  if (!isPaused) {
    animateYinYang(animationTime);
  } else if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}


// Initial setup
resizeCanvas();
animateYinYang();

// Handle window resize
addEventListener('resize', resizeCanvas, false);


// Toggle animation on canvas click (desktop) and touch (mobile)
canvas.addEventListener('click', toggleAnimation);
canvas.addEventListener('touchstart', function(e) {
  toggleAnimation();
  e.preventDefault();
}, { passive: false });

// Toggle animation on spacebar press
window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    toggleAnimation();
    e.preventDefault();
  }
});
