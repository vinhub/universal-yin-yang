// Multi-section navigation logic
const sections = [
  {
    canvasId: 'canvas-classic',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white'),
    title: 'The Yin-Yang model of reality',
    type: 'static',
    message: "The Yin-Yang represents how seemingly opposite phenomena in nature are, in fact, " +
             "interdependent, intertwined, and complementary. Some examples of such forces are day and night, summer and winter, " +
             "masculinity and femininity, order and chaos, etc. " +
             "Also, each member of such a pair contains a seed of the other. " +
             "Taken together, this structure creates balance and harmony.  " +
             "Let us see how digging deeper into this concept reveals many interesting insights. <br/><br/>" +
             "Click on the arrow button to continue."
  },
  {
    canvasId: 'canvas-dynamic',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: 'Yin-Yangs are dynamic',
    type: 'animated',
    message: "Yin-Yangs aren't static. " +
             "The two forces in them are constantly expanding and contracting and influencing each other. " +
             "Over the short term, one of them may appear to be gaining the upper hand. " +
             "But soon enough the process reverses, making the opposing force dominant."
  },
  {
    canvasId: 'canvas-cycles',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: 'The cycles are also dynamic',
    type: 'complex',
    message: "The expansion and contraction of the two forces may follow cycles of varying amplitides and lengths, " +
             "creating a complex dynamic. " +
             "If you watch the animation closely, you will see that the cycles keep changing from time to time. " +
             "This also means that it is hard to predict how long or how far a cycle may go before it reverses." 
  },
  {
    canvasId: 'canvas-political',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(blend, r1, r2, ctx, rad, 'red', 'blue'),
    title: 'Example: Political Yin-Yang',
    type: 'complex',
    message: "As a real-world example of a phenomenon that is near and dear to all of us &#128522;, let us take a look at politics. " +
             "Most political systems consist of two opposing forces at the highest level, represented by the blue and red colors here. " +
             "They demonstrate the same characteristic nature and dynamism of the Yin-Yang, " +
             "with the two sides constantly pushing against each other, while keeping each other in check over time. "
  },
  {
    canvasId: 'canvas-fractal',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: 'Yin-Yangs are fractal',
    type: 'fractal',
    message: "Yin-Yangs exhibit self-similarity at different scales, much like fractals. " +
             "No matter how closely you examine them, you will always find the same underlying patterns and structures. " +
             "It shows that these principles are not just applicable at one level, but are universal across all levels of existence."
  },
  {
    canvasId: 'canvas-evolution',
    draw: (blend, r1, r2, ctx, rad) => drawYinYang(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: 'Yin-Yangs can evolve',
    type: 'evolution',
    message: "Sometimes the structure of a Yin-Yang relationship can evolve into a different form. " +
             "In some cases, new structures may appear, or existing ones may cease to exist. " +
             "And yet, the basic principles of balance, interdependence, and complementarity remain the same."
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
  let minFactor = 0.5;
  const steps = 360;
  const angleStep = 2 * Math.PI / steps;
  let yinYangRadius;
  let radiusFactor = 0;
  function resizeCanvas() {
    canvas.width = canvas.height = Math.round(canvas.getBoundingClientRect().width);
    yinYangRadius = 0.5 * canvas.width;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(yinYangRadius, yinYangRadius);
  }
  resizeCanvas();
  if (section.type === 'static') {
    // Draw static Yin-Yang
    section.draw(0.5, yinYangRadius * 0.75, yinYangRadius * 0.25, ctx, yinYangRadius);
    return;
  }
  function drawFlower(ctx, rad) {
    ctx.save();
    ctx.rotate(Math.PI / 2);
    for (let i = 0; i < 8; i++) {
      ctx.save();
      ctx.rotate((Math.PI / 4) * i);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(rad * 0.25, rad * 0.25, rad * 1.0, rad * 0.25, rad * 1.0, 0);
      ctx.bezierCurveTo(rad * 1.0, -rad * 0.25, rad * 0.25, -rad * 0.25, 0, 0);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? 'black' : 'white';
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  function frame(t) {
    const blend = 0.5 * (1 + Math.sin(t * angleStep));
    if (section.type === 'complex' && (Math.abs(blend - 0.5) < 0.001)) {
      minFactor = Math.random();
    }

    const minRadius = minFactor * 0.5 * yinYangRadius * (1 - radiusFactor);
    const maxRadius = (yinYangRadius * (1 - radiusFactor)) - minRadius;
    const circle1Radius = blend * minRadius + (1 - blend) * maxRadius;
    const circle2Radius = (yinYangRadius * (1 - radiusFactor)) - circle1Radius;

    if (section.type === 'fractal') {
      drawFractalYinYang(blend, circle1Radius, circle2Radius, ctx, yinYangRadius * (1 - radiusFactor), 'black', 'white', t);
    } else {
      section.draw(blend, circle1Radius, circle2Radius, ctx, yinYangRadius * (1 - radiusFactor));
    }

    if (section.type === 'evolution') {
      // Shrink yinyang and expand flower
      radiusFactor += Math.cosh(blend) * 0.003;
      if (radiusFactor > 1) return;
      drawFlower(ctx, yinYangRadius * radiusFactor);
    }

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

// Fractal Yin-Yang drawing - replaces inner dots with small animated Yin-Yangs
function drawFractalYinYang(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB, time) {
  ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
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
  
  // Draw main Yin-Yang body (without dots)
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
  ctx.closePath();
  ctx.fill();
  
  // Draw fractal Yin-Yangs instead of dots
  const fractalBlend1 = 0.5 * (1 + Math.sin(time * 0.02));
  const fractalBlend2 = 0.5 * (1 + Math.sin(time * 0.03 + Math.PI));
  
  // First fractal Yin-Yang (in the white section)
  if (dot1Radius > 0) {
    ctx.save();
    ctx.translate(-circle1Radius, 0);
    const fractalR1_1 = dot1Radius * 0.4 * fractalBlend1 + dot1Radius * 0.1 * (1 - fractalBlend1);
    const fractalR1_2 = dot1Radius - fractalR1_1;
    drawMiniYinYang(fractalBlend1, fractalR1_1, fractalR1_2, ctx, dot1Radius, colorB, colorA);
    ctx.restore();
  }
  
  // Second fractal Yin-Yang (in the black section)
  if (dot2Radius > 0) {
    ctx.save();
    ctx.translate(circle2Radius, 0);
    const fractalR2_1 = dot2Radius * 0.4 * fractalBlend2 + dot2Radius * 0.1 * (1 - fractalBlend2);
    const fractalR2_2 = dot2Radius - fractalR2_1;
    drawMiniYinYang(fractalBlend2, fractalR2_1, fractalR2_2, ctx, dot2Radius, colorA, colorB);
    ctx.restore();
  }
  
  ctx.restore();
}

// Helper function to draw mini Yin-Yangs
function drawMiniYinYang(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
  ctx.save();
  ctx.rotate(Math.PI / 2);
  
  // Calculate mini dot sizes (keep them as regular dots to avoid infinite recursion)
  let dot1Radius = circle2Radius / 4;
  let dot2Radius = circle1Radius / 4;
  
  // Draw mini Yin-Yang body
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
  
  // Draw circular border around the mini Yin-Yang
  ctx.strokeStyle = colorA === 'black' ? 'black' : 'white'; // Use contrasting color for border
  ctx.lineWidth = yinYangRadius * 0.025;
  ctx.beginPath();
  ctx.arc(0, 0, yinYangRadius, 0, 2 * Math.PI);
  ctx.stroke();
  
  ctx.restore();
}

// Parameterized Yin-Yang drawing
function drawYinYang(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
  ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
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
