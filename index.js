// Set the text of the message panel (does not change visibility)
function setMessagePanelText(message) {
  const panel = document.getElementById('message-panel');
  if (panel) {
    panel.textContent = message;
  }
}

window.setMessagePanelText = setMessagePanelText;

// Show the message panel with a given message
function showMessagePanel(message) {
  const panel = document.getElementById('message-panel');
  if (panel) {
    panel.textContent = message;
    panel.style.display = 'block';
  }
}

// Hide the message panel
function hideMessagePanel() {
  const panel = document.getElementById('message-panel');
  if (panel) {
    panel.style.display = 'none';
  }
}

// Optionally expose these methods globally for easy use in console or other scripts
window.showMessagePanel = showMessagePanel;
window.hideMessagePanel = hideMessagePanel;
// Get canvas and context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Animation and geometry parameters
const minFactor = 0.5; // Controls minimum size of the morphing heads
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
 * @param {number} circle1Radius - Radius of first morphing head (red)
 * @param {number} circle2Radius - Radius of second morphing head (blue)
 */
function drawYinYang(blend, circle1Radius, circle2Radius) {
  // Clear previous frame
  ctx.clearRect(-yinYangRadius, -yinYangRadius, canvas.width, canvas.width);

  // Rotate the drawing by 90 degrees to make the separation vertical (blue on top, red on bottom)
  ctx.save();
  ctx.rotate(Math.PI / 2);

  let dot1Radius, dot2Radius; // Radii for the small dots inside the heads
  // Calculate dot radii so total red and blue areas remain equal
  if (circle1Radius <= circle2Radius) {
    // Fix dot1Radius (red region) and solve for dot2Radius (blue region)
    dot2Radius = circle1Radius / 3;
    const dot1Area = (0.5 * Math.PI * circle2Radius * circle2Radius) + 
                            (Math.PI * dot2Radius * dot2Radius) -
                            (0.5 * Math.PI * circle1Radius * circle1Radius)

    // Prevent negative radius due to rounding
    dot1Radius = dot1Area > 0 ? Math.sqrt(dot1Area / Math.PI) : 0;
  } else {
    // Fix dot2Radius (blue region) and solve for dot1Radius (red region)
    dot1Radius = circle2Radius / 3;
    const dot2Area = (0.5 * Math.PI * circle1Radius * circle1Radius) + 
                            (Math.PI * dot1Radius * dot1Radius) -
                            (0.5 * Math.PI * circle2Radius * circle2Radius);

    // Prevent negative radius due to rounding
    dot2Radius = dot2Area > 0 ? Math.sqrt(dot2Area / Math.PI) : 0;
  }

  ctx.fillStyle = 'blue';
  ctx.beginPath();
  // Small dot inside the blue region (radius is fixed)
  ctx.arc(0, 0, yinYangRadius, 0, Math.PI);
  ctx.arc(-circle1Radius, 0, circle2Radius, Math.PI, 0);
  ctx.closePath();
  ctx.fill();

  // Draw the red region
  ctx.fillStyle = 'red';
  ctx.beginPath();
  // Main left semicircle
  ctx.arc(0, 0, yinYangRadius, -Math.PI, 0);
  // Top morphing head (red)
  ctx.arc(circle2Radius, 0, circle1Radius, 0, Math.PI);
  // Lower morphing head (blue)
  ctx.arc(-circle1Radius, 0, circle2Radius, 0, -Math.PI, true);
  // Small dot inside the red region (radius is calculated)
  ctx.arc(-circle1Radius, 0, dot1Radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  // Draw the blue region
  ctx.fillStyle = 'blue';
  ctx.beginPath();
  // Small dot inside the blue region (radius is fixed)
  ctx.arc(circle2Radius, 0, dot2Radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Animation loop for the Yin-Yang symbol.
 * @param {number} time - Current animation time/frame
 */
function animateYinYang(time = animationTime) {
  animationTime = time; // Store current time for pause/resume
  // Calculate blend factor for morphing heads (oscillates between 0 and 1)
  const blend = 0.5 * (1 + Math.sin(time * angleStep));
  // Calculate radii for morphing heads
  const circle1Radius = blend * minRadius + (1 - blend) * maxRadius; // red head
  const circle2Radius = yinYangRadius - circle1Radius;               // blue head

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
