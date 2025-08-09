// Get canvas and context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Animation and geometry parameters
const minFactor = 0.25; // Controls minimum size of the morphing heads
const steps = 360;      // Number of animation steps for a full rotation
const angleStep = 2 * Math.PI / steps; // Angle increment per animation frame

// Variables for geometry and animation state
let yinYangRadius, maxRadius, minRadius; // Main circle and morphing head radii
let isPaused = false;                    // Animation pause state
let animationTime = 0;                   // Current animation time/frame
let animationFrameId = null;             // ID for the animation frame (for pausing)

/**
 * Resize the canvas to fit its container and recalculate radii for the Yin-Yang symbol.
 */
function resizeCanvas() {
  // Set canvas to be square and match its displayed size
  canvas.width = canvas.height = Math.round(canvas.getBoundingClientRect().width);
  // Main radius is half the canvas width
  yinYangRadius = 0.5 * canvas.width;
  // Minimum and maximum radii for morphing heads
  minRadius = minFactor * 0.5 * yinYangRadius;
  maxRadius = yinYangRadius - minRadius;
  // Reset any previous transforms and center the drawing context
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(yinYangRadius, yinYangRadius);
}

/**
 * Draw the Yin-Yang symbol for the current animation state.
 * @param {number} blend - Blend factor for morphing heads (0 to 1)
 * @param {number} circle1 - Radius of first morphing head (black)
 * @param {number} circle2 - Radius of second morphing head (white)
 */
function drawYinYang(blend, circle1, circle2) {
  // Clear previous frame
  ctx.clearRect(-yinYangRadius, -yinYangRadius, canvas.width, canvas.width);

  // Rotate the entire drawing for animation effect
  ctx.rotate(angleStep);

  // Draw the black region (left side)
  ctx.fillStyle = 'black';
  ctx.beginPath();
  // Main left semicircle
  ctx.arc(0, 0, yinYangRadius, -Math.PI, 0);
  // Top morphing head (black)
  ctx.arc(circle2, 0, circle1, 0, Math.PI);
  // Lower morphing head (white)
  ctx.arc(-circle1, 0, circle2, 0, -Math.PI, true);
  ctx.arc(-circle1, 0, circle2 / 3, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Draw the white region (right side)
  ctx.fillStyle = 'white';
  ctx.beginPath();
  // Small dot inside the white region
  ctx.arc(circle2, 0, circle1 / 3, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

/**
 * Animation loop for the Yin-Yang symbol.
 * @param {number} time - Current animation time/frame
 */
function animateYinYang(time = animationTime) {
  animationTime = time; // Store current time for pause/resume
  // Calculate blend factor for morphing heads (oscillates between 0 and 1)
  const blend = 0.5 * (1 + Math.cos(time * angleStep));
  // Calculate radii for morphing heads
  const circle1Radius = blend * minRadius + (1 - blend) * maxRadius; // Black head
  const circle2Radius = yinYangRadius - circle1Radius;               // White head

  // Draw the current frame of the Yin-Yang symbol
  drawYinYang(blend, circle1Radius, circle2Radius);

  // Request the next animation frame unless paused
  if (!isPaused) {
    animationFrameId = requestAnimationFrame(() => animateYinYang(time + 0.5));
  }
}

/**
 * Toggle pause/resume state of the animation
 */
function toggleAnimation() {
  isPaused = !isPaused; // Flip pause state
  if (!isPaused) {
    // Resume animation from current frame
    animateYinYang(animationTime);
  } else if (animationFrameId) {
    // Pause animation by cancelling the next frame
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}



// Initial setup: size canvas and start animation
resizeCanvas();
animateYinYang();

// Recalculate geometry and redraw on window resize
addEventListener('resize', resizeCanvas, false);

// Toggle animation on canvas click (desktop)
canvas.addEventListener('click', toggleAnimation);
// Toggle animation on canvas touch (mobile)
canvas.addEventListener('touchstart', function(e) {
  toggleAnimation(); // Pause/resume on tap
  e.preventDefault(); // Prevent scrolling
}, { passive: false });

// Toggle animation on spacebar press
window.addEventListener('keydown', function(e) {
  if (e.code === 'Space') {
    toggleAnimation(); // Pause/resume on spacebar
    e.preventDefault(); // Prevent page scroll
  }
});
