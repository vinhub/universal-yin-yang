// ============================
// CONFIGURATION & DATA MODULE
// ============================

const ANIMATION_CONFIG = {
  steps: 360,
  angleStep: 2 * Math.PI / 360,
  minFactor: 0.5,
  fractalSpeed1: 0.02,
  fractalSpeed2: 0.03,
  evolutionSpeed: 0.003,
  flowerPetalCount: 8,
  borderWidth: 0.025
};

const SECTION_DATA = [
  {
    canvasId: 'canvas-classic',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white'),
    title: '1. Yin-Yang model of reality',
    type: 'static',
    message: "Life is full of opposites that actually work together: light and shadow, joy and sorrow, work and rest, " +
             "giving and receiving. The Yin-Yang symbol shows us that these aren't really opposites fighting each other—" +
             "they're dance partners, each one making the other more meaningful. " +
             "Notice how each side contains a seed of the other, reminding us that within every challenge lies an opportunity, " +
             "and within every triumph, a lesson in humility. <br/><br/>" +
             "Ready to explore deeper? Click the arrow to continue this journey of discovery."
  },
  {
    canvasId: 'canvas-dynamic',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '2. Yin-Yangs are dynamic',
    type: 'animated',
    message: "Watch how the forces flow and shift—just like life itself! Nothing stays the same forever. " +
             "Sometimes you're on top of the world, sometimes you're learning hard lessons. " +
             "Sometimes you're giving your all, sometimes you need to receive and recharge. " +
             "This constant dance isn't chaos—it's the rhythm of growth, renewal, and wisdom. " +
             "Understanding this can bring peace to life's inevitable ups and downs."
  },
  {
    canvasId: 'canvas-cycles',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '3. Each cycle is different',
    type: 'complex',
    message: "Life doesn't follow a predictable script. Some seasons of challenge are brief, others stretch longer than expected. " +
             "Some moments of joy are fleeting, others become lasting foundations. Watch closely—you'll see the cycles " +
             "constantly changing in length and intensity. This unpredictability isn't a bug, it's a feature! " +
             "It keeps life interesting and teaches us to stay flexible, present, and open to whatever comes next."
  },
  {
    canvasId: 'canvas-political',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'red', 'blue'),
    title: '4. Example: Political Yin-Yang',
    type: 'complex',
    message: "Here's where it gets really interesting &#128522;—even in politics, the Yin-Yang principle shows up! " +
             "Different political viewpoints (represented here in red and blue) might seem like enemies, " +
             "but they actually serve an important purpose together. One side pushes for change and progress, " +
             "the other provides stability and caution. Neither is completely right or wrong—they balance each other, " +
             "preventing society from moving too fast or staying too still. Democracy works when both forces dance well together."
  },
  {
    canvasId: 'canvas-fractal',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '5. Yin-Yangs are fractal',
    type: 'fractal',
    message: "Yin-Yangs exhibit self-similarity at different scales, much like fractals. " +
             "No matter how closely you examine them, you will always find the same underlying patterns and structures. " +
             "It shows that these principles are not just applicable at one level, but are universal across all levels of existence."
  },
  {
    canvasId: 'canvas-evolution',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '6. Yin-Yangs can evolve',
    type: 'evolution',
    message: "Sometimes a Yin-Yang relationship can evolve into a different form. " +
             "In some cases, new relationships may appear, or existing ones may cease to exist. " +
             "And yet, the basic principles of balance, interdependence, and complementarity remain."
  }
];

// ============================
// YIN-YANG DRAWING MODULE
// ============================

const YinYangDrawer = {
  calculateDotRadii(circle1Radius, circle2Radius) {
    let dot1Radius, dot2Radius;
    if (circle1Radius <= circle2Radius) {
      dot2Radius = circle1Radius / 3;
      const dot1Area = (0.5 * Math.PI * circle2Radius * circle2Radius) + 
                      (Math.PI * dot2Radius * dot2Radius) -
                      (0.5 * Math.PI * circle1Radius * circle1Radius);
      dot1Radius = dot1Area > 0 ? Math.sqrt(dot1Area / Math.PI) : 0;
    } else {
      dot1Radius = circle2Radius / 3;
      const dot2Area = (0.5 * Math.PI * circle1Radius * circle1Radius) + 
                      (Math.PI * dot1Radius * dot1Radius) -
                      (0.5 * Math.PI * circle2Radius * circle2Radius);
      dot2Radius = dot2Area > 0 ? Math.sqrt(dot2Area / Math.PI) : 0;
    }
    return { dot1Radius, dot2Radius };
  },

  drawBasic(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    ctx.save();
    ctx.rotate(Math.PI / 2);
    
    const { dot1Radius, dot2Radius } = this.calculateDotRadii(circle1Radius, circle2Radius);
    
    // Draw main Yin-Yang shape
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
    
    // Draw dots
    ctx.fillStyle = colorA;
    ctx.beginPath();
    ctx.arc(circle2Radius, 0, dot2Radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  },

  drawFractal(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB, time) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    ctx.save();
    ctx.rotate(Math.PI / 2);
    
    const { dot1Radius, dot2Radius } = this.calculateDotRadii(circle1Radius, circle2Radius);
    
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
    const fractalBlend1 = 0.5 * (1 + Math.sin(time * ANIMATION_CONFIG.fractalSpeed1));
    const fractalBlend2 = 0.5 * (1 + Math.sin(time * ANIMATION_CONFIG.fractalSpeed2 + Math.PI));
    
    // First fractal Yin-Yang (in the white section)
    if (dot1Radius > 0) {
      ctx.save();
      ctx.translate(-circle1Radius, 0);
      const fractalR1_1 = dot1Radius * 0.4 * fractalBlend1 + dot1Radius * 0.1 * (1 - fractalBlend1);
      const fractalR1_2 = dot1Radius - fractalR1_1;
      this.drawMini(fractalBlend1, fractalR1_1, fractalR1_2, ctx, dot1Radius, colorB, colorA);
      ctx.restore();
    }
    
    // Second fractal Yin-Yang (in the black section)
    if (dot2Radius > 0) {
      ctx.save();
      ctx.translate(circle2Radius, 0);
      const fractalR2_1 = dot2Radius * 0.4 * fractalBlend2 + dot2Radius * 0.1 * (1 - fractalBlend2);
      const fractalR2_2 = dot2Radius - fractalR2_1;
      this.drawMini(fractalBlend2, fractalR2_1, fractalR2_2, ctx, dot2Radius, colorA, colorB);
      ctx.restore();
    }
    
    ctx.restore();
  },

  drawMini(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
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
    ctx.strokeStyle = colorA === 'black' ? 'black' : 'white';
    ctx.lineWidth = yinYangRadius * ANIMATION_CONFIG.borderWidth;
    ctx.beginPath();
    ctx.arc(0, 0, yinYangRadius, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.restore();
  }
};

// ============================
// EVOLUTION DRAWING MODULE
// ============================

const EvolutionDrawer = {
  drawFlower(ctx, rad) {
    ctx.save();
    ctx.rotate(Math.PI / 2);
    for (let i = 0; i < ANIMATION_CONFIG.flowerPetalCount; i++) {
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
};

// ============================
// ANIMATION CONTROLLER MODULE
// ============================

const AnimationController = {
  currentSection: 0,
  animationFrameId: null,

  animateSection(sectionIdx, time = 0) {
    // Cancel previous animation if running
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    const section = SECTION_DATA[sectionIdx];
    const canvas = document.getElementById(section.canvasId);
    const ctx = canvas.getContext('2d');
    let minFactor = ANIMATION_CONFIG.minFactor;
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

    const frame = (t) => {
      const blend = 0.5 * (1 + Math.sin(t * ANIMATION_CONFIG.angleStep));
      
      if (section.type === 'complex' && (Math.abs(blend - 0.5) < 0.001)) {
        minFactor = Math.random();
      }

      const minRadius = minFactor * 0.5 * yinYangRadius * (1 - radiusFactor);
      const maxRadius = (yinYangRadius * (1 - radiusFactor)) - minRadius;
      const circle1Radius = blend * minRadius + (1 - blend) * maxRadius;
      const circle2Radius = (yinYangRadius * (1 - radiusFactor)) - circle1Radius;

      if (section.type === 'fractal') {
        YinYangDrawer.drawFractal(blend, circle1Radius, circle2Radius, ctx, yinYangRadius * (1 - radiusFactor), 'black', 'white', t);
      } else {
        section.draw(blend, circle1Radius, circle2Radius, ctx, yinYangRadius * (1 - radiusFactor));
      }

      if (section.type === 'evolution') {
        // Shrink yinyang and expand flower
        radiusFactor += Math.cosh(blend) * ANIMATION_CONFIG.evolutionSpeed;
        if (radiusFactor > 1) return;
        EvolutionDrawer.drawFlower(ctx, yinYangRadius * radiusFactor);
      }

      this.animationFrameId = requestAnimationFrame(() => frame(t + 0.5));
    };
    
    frame(time);
    window.addEventListener('resize', resizeCanvas, false);
  }
};

// ============================
// NAVIGATION CONTROLLER MODULE
// ============================

const NavigationController = {
  showSection(idx) {
    SECTION_DATA.forEach((_, i) => {
      document.getElementById('section-' + i).style.display = (i === idx) ? 'flex' : 'none';
      document.getElementById(`arrow-left-${i}`).disabled = (idx === 0);
      document.getElementById(`arrow-right-${i}`).disabled = (idx === SECTION_DATA.length - 1);
    });
    document.getElementById('page-title').textContent = SECTION_DATA[idx].title;
    AnimationController.animateSection(idx);
    // Show message panel with section message immediately
    const panel = document.getElementById('message-panel');
    const msg = SECTION_DATA[idx].message;
    panel.innerHTML = msg ? msg : '';
  },

  initializeNavigation() {
    for (let i = 0; i < SECTION_DATA.length; i++) {
      document.getElementById(`arrow-left-${i}`).addEventListener('click', () => {
        if (AnimationController.currentSection > 0) {
          AnimationController.currentSection--;
          this.showSection(AnimationController.currentSection);
        }
      });
      document.getElementById(`arrow-right-${i}`).addEventListener('click', () => {
        if (AnimationController.currentSection < SECTION_DATA.length - 1) {
          AnimationController.currentSection++;
          this.showSection(AnimationController.currentSection);
        }
      });
    }
  }
};

// ============================
// MENU CONTROLLER MODULE
// ============================

const MenuController = {
  initialize() {
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
  }
};

// ============================
// APPLICATION INITIALIZATION
// ============================

// Initialize the application
NavigationController.initializeNavigation();
NavigationController.showSection(AnimationController.currentSection);
MenuController.initialize();
