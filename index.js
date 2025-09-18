// ============================
// CONFIGURATION & DATA MODULE
// ============================

const ANIMATION_CONFIG = {
  steps: 360,
  angleStep: 2 * Math.PI / 360,
  minFactor: 0.5,
  fractalSpeed1: 0.02,
  fractalSpeed2: 0.03,
  borderWidth: 0.025,
  compositeCount: 6,
  compositeColors: [
    ['black', 'white'],
    ['red', 'blue'],
    ['green', 'orange'],
    ['purple', 'yellow'],
    ['navy', 'pink'],
    ['darkred', 'lightblue'],
    ['brown', 'cyan'],
    ['magenta', 'lime'],
    ['indigo', 'gold'],
    ['crimson', 'lightgreen'],
    ['teal', 'coral'],
    ['darkviolet', 'khaki']
  ]
};

const SECTION_DATA = [
  {
    canvasId: 'canvas-classic',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white'),
    title: '1. Introduction',
    type: 'static',
    message: "Life appears to be full of opposites, such as day and night, joy and sorrow, work and rest, giving and receiving. " +
             "But if you look closely, you'll find that such pairs are actually complementary and interdependent. " +
             "The ancient Chinese principle of Yin-Yang represents this idea with two interlocked shapes that make a whole. " +
             "Let us dig deeper into this fascinating concept."
  },
  {
    canvasId: 'canvas-seeds',
    draw: (blend, r1, r2, ctx, rad, colorA, colorB, time) => YinYangDrawer.drawPulsatingDots(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white', time),
    title: '2. Seeds of each other',
    type: 'pulsating',
    message: "Look at the two small circles within the yin-yang symbol. " +
             "They represent the profound truth that each side contains a 'seed' of its opposite. " +
             "They tell us that even in our darkest moments, there is potential for light and growth, " +
             "and even in our brightest times, there are opportunities for reflection and renewal. " +
             "Understanding this helps us find hope in difficulty, and humility in success."
  },
  {
    canvasId: 'canvas-dynamic',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '3. Yin-Yangs are dynamic',
    type: 'animated',
    message: "The two forces are constantly pushing against each other, taking turns leading or following. " +
             "This process can be frustrating if one takes a narrow, one-sided perspective. " +
             "But looking at the bigger picture makes one realize that the two forces are like dance partners, creating a more beautiful and meaningful whole. " +
             "It is this dance that provides the underlying rhythm for growth, renewal, and wisdom. " +
             "Seeing it in this manner can lead to peace and appreciation for life, instead of frustration."
  },
  {
    canvasId: 'canvas-cycles',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '4. Each cycle is different',
    type: 'complex',
    message: "Look closely: The pulsating cycles are constantly changing in length or intensity. " +
             "For example, some winters are brief, others stretch longer than expected. " +
             "Or some moments of success are fleeting, others transform lives. " +
             "This variability isn't a bug, it's a feature! " +
             "It keeps life interesting and teaches us to stay flexible, present, and open to whatever comes next."
  },
  {
    canvasId: 'canvas-political',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'red', 'blue'),
    title: '5. Politics: A perfect example',
    type: 'complex',
    message: "The Yin-Yang model applies extremely well to politics. " +
             "Opposing political movements might seem like enemies, " +
             "with each side trying to push society one way " +
             "while the other tries to pull it back. " +
             "But it is through this push and pull that we find the balance that allows us to move forward. " +
             "This struggle, despite its annoyances, is essential for a healthy society."
  },
  {
    canvasId: 'canvas-fractal',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '6. Yin-Yangs are fractal',
    type: 'fractal',
    message: "You may find Yin-Yang patterns coexisting at multiple levels. " +
             "For example, the same political ideas may be locked in Yin-Yang dances at the national, state, and local levels. " +
             "The pattern may even continue deeper, into families and even inside a single person's head! " +
             "This idea is symbolically depicted in the animation using smaller Yin-Yangs inside the bigger one."
  },
  {
    canvasId: 'canvas-everywhere',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '7. Yin-Yangs are everywhere',
    type: 'composite',
    message: "The Yin-Yang is one of life's most profound and persistent patterns. " +
             "They're everywhere: in relationships, in nature, in your daily rhythms, even in your own thoughts and emotions. " +
             "This isn't just abstract philosophy; it's a practical tool for navigating life with more grace, balance, and understanding. "
  },
  {
    canvasId: 'canvas-conclusion',
    draw: (blend, r1, r2, ctx, rad, colorA, colorB, time) => YinYangDrawer.drawRotating(0.5, rad * 0.5, rad * 0.5, ctx, rad, 'black', 'white', time),
    title: '8. The eternal dance',
    type: 'rotating',
    message: "The dance continues, reminding us that all of life is movement, change, and balance. " +
             "In every moment, forces are shifting, perspectives are evolving, and new harmonies are being found. " +
             "And you're a part of this dance, whether you realize it or not. " +
             "May you move through life with the wisdom of the Yin-Yang: embracing both sides, finding balance in motion, " +
             "and discovering the seeds of light within the darkness and the seeds of wisdom within the light."
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

  // Core Yin-Yang drawing method - all other methods build on this
  _drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB, includeDots = true) {
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
    if (includeDots) {
      ctx.arc(-circle1Radius, 0, dot1Radius, 0, 2 * Math.PI);
    }
    ctx.closePath();
    ctx.fill();
    
    // Draw dots if requested
    if (includeDots) {
      ctx.fillStyle = colorA;
      ctx.beginPath();
      ctx.arc(circle2Radius, 0, dot2Radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
    
    ctx.restore();
    return { dot1Radius, dot2Radius };
  },

  drawBasic(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    this._drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB);
  },

  drawBasicNoClear(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
    this._drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB);
  },

  drawRotating(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB, time) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    
    // Apply slow rotation
    ctx.save();
    ctx.rotate(time * 0.003); // Slow rotation
    
    // Draw the basic yin-yang with standard proportions
    this._drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB);
    
    ctx.restore();
  },

  drawPulsatingDots(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB, time) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    
    // First draw the main yin-yang shape without dots using existing core method
    const { dot1Radius, dot2Radius } = this._drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB, false);

    // Calculate alternating pulses
    const pulse1 = 1.0 + 0.4 * Math.sin(time * 0.025); // White dot pulse (much faster)
    const pulse2 = 1.0 + 0.4 * Math.sin(time * 0.025 + Math.PI); // Black dot pulse (opposite phase)
    
    // Draw pulsating dots using the rotated coordinate system from core method
    ctx.save();
    ctx.rotate(Math.PI / 2);
    
    // White dot in black area (dot1)
    ctx.fillStyle = colorA;
    ctx.beginPath();
    ctx.arc(circle2Radius, 0, dot2Radius * pulse1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    
    // Black dot in white area (dot2) 
    ctx.fillStyle = colorB;
    ctx.beginPath();
    ctx.arc(-circle1Radius, 0, dot1Radius * pulse2, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  },

  drawFractal(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB, time) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    
    // Draw main body without dots manually (without using _drawYinYangCore to avoid double rotation)
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
    
    // Draw fractal Yin-Yangs instead of dots - positioned in rotated coordinate system
    const fractalBlend1 = 0.5 * (1 + Math.sin(time * ANIMATION_CONFIG.fractalSpeed1));
    const fractalBlend2 = 0.5 * (1 + Math.sin(time * ANIMATION_CONFIG.fractalSpeed2 + Math.PI));
    
    // Position fractal Yin-Yangs at dot locations in the rotated coordinate system
    this._drawFractalYinYang(ctx, -circle1Radius, 0, dot1Radius, fractalBlend1, colorB, colorA);
    this._drawFractalYinYang(ctx, circle2Radius, 0, dot2Radius, fractalBlend2, colorA, colorB);
    
    ctx.restore();
  },

  _drawFractalYinYang(ctx, x, y, radius, blend, colorA, colorB) {
    if (radius <= 0) return;
    
    ctx.save();
    ctx.translate(x, y);
    const fractalR1 = radius * (0.4 * blend + 0.1 * (1 - blend));
    const fractalR2 = radius - fractalR1;
    this.drawMini(blend, fractalR1, fractalR2, ctx, radius, colorA, colorB);
    ctx.restore();
  },

  drawMini(blend, circle1Radius, circle2Radius, ctx, yinYangRadius, colorA, colorB) {
    // Calculate mini dot sizes (simpler calculation for mini version)
    const dot1Radius = circle2Radius / 4;
    const dot2Radius = circle1Radius / 4;
    
    // Use core drawing method
    this._drawYinYangCore(ctx, circle1Radius, circle2Radius, yinYangRadius, colorA, colorB);
    
    // Add border for mini Yin-Yangs
    ctx.save();
    ctx.strokeStyle = colorA === 'black' ? 'black' : 'white';
    ctx.lineWidth = yinYangRadius * ANIMATION_CONFIG.borderWidth;
    ctx.beginPath();
    ctx.arc(0, 0, yinYangRadius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  },

  drawComposite(ctx, yinYangRadius, time) {
    // Clear the entire canvas once at the beginning
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    
    // Create fewer positions but with much more varied sizes - keep within bounds
    const positions = [
      { x: 0, y: 0, size: 0.50, colors: ['darkblue', 'lightblue'] },
      
      // Inner ring - like planets around the sun (spread out to avoid overlap)
      { x: -0.75, y: 0, size: 0.20, colors: ['darkgreen', 'lightgreen'] },
      { x: 0.75, y: 0, size: 0.20, colors: ['darkgreen', 'lightgreen'] },
      { x: 0, y: -0.75, size: 0.20, colors: ['darkgreen', 'lightgreen'] },
      { x: 0, y: 0.75, size: 0.20, colors: ['darkgreen', 'lightgreen'] },
      
      // Outer ring - like a constellation or flower petals (same size as inner ring)
      { x: -0.75, y: -0.75, size: 0.20, colors: ['maroon', 'pink'] },
      { x: 0.75, y: -0.75, size: 0.20, colors: ['maroon', 'pink'] },
      { x: 0.75, y: 0.75, size: 0.20, colors: ['maroon', 'pink'] },
      { x: -0.75, y: 0.75, size: 0.20, colors: ['maroon', 'pink'] }
    ];
    
    // No random or edge positions - using the natural pattern above
    
    positions.forEach((pos, index) => {
      ctx.save();      
      ctx.translate((pos.x) * yinYangRadius, (pos.y) * yinYangRadius);
      
      ctx.rotate(time * 0.01);
      
      const miniRadius = yinYangRadius * pos.size;
      const blend = 0.5 * (1 + Math.sin(time * 0.002 + index * 1.2));
      const r1 = miniRadius * (0.25 + 0.5 * blend);
      const r2 = miniRadius - r1;
      
      // Use the colors specified for each position
      this.drawBasicNoClear(blend, r1, r2, ctx, miniRadius, pos.colors[0], pos.colors[1]);
      
      ctx.restore();
    });
  }
};

// ============================
// ANIMATION UTILITIES MODULE
// ============================

const AnimationUtils = {
  // Common animation calculations
  calculateBlend(time, speed = ANIMATION_CONFIG.angleStep) {
    return 0.5 * (1 + Math.sin(time * speed));
  },

  calculateRadii(yinYangRadius, minFactor, radiusFactor, blend) {
    const minRadius = minFactor * 0.5 * yinYangRadius * (1 - radiusFactor);
    const maxRadius = (yinYangRadius * (1 - radiusFactor)) - minRadius;
    const circle1Radius = blend * minRadius + (1 - blend) * maxRadius;
    const circle2Radius = (yinYangRadius * (1 - radiusFactor)) - circle1Radius;
    return { circle1Radius, circle2Radius };
  },

  shouldUpdateMinFactor(blend, threshold = 0.001) {
    return Math.abs(blend - 0.5) < threshold;
  },

  setupCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = canvas.height = Math.round(rect.width);
    const yinYangRadius = 0.5 * canvas.width;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(yinYangRadius, yinYangRadius);
    return { ctx, yinYangRadius };
  }
};

// ============================
// ANIMATION CONTROLLER MODULE
// ============================

const AnimationController = {
  currentSection: 0,
  animationFrameId: null,

  animateSection(sectionIdx, time = 0) {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    
    const section = SECTION_DATA[sectionIdx];
    const canvas = document.getElementById(section.canvasId);
    let minFactor = ANIMATION_CONFIG.minFactor;
    let radiusFactor = 0;

    const { ctx, yinYangRadius } = AnimationUtils.setupCanvas(canvas);
    
    if (section.type === 'static') {
      section.draw(0.5, yinYangRadius * 0.75, yinYangRadius * 0.25, ctx, yinYangRadius);
      return;
    }

    const frame = (t) => {
      const blend = AnimationUtils.calculateBlend(t);
      
      if (section.type === 'complex' && AnimationUtils.shouldUpdateMinFactor(blend)) {
        minFactor = Math.random();
      }

      const { circle1Radius, circle2Radius } = AnimationUtils.calculateRadii(yinYangRadius, minFactor, radiusFactor, blend);

      this._renderFrame(section, ctx, yinYangRadius, radiusFactor, blend, circle1Radius, circle2Radius, t);

      this.animationFrameId = requestAnimationFrame(() => frame(t + 0.5));
    };
    
    frame(time);
    window.addEventListener('resize', () => AnimationUtils.setupCanvas(canvas), false);
  },

  _renderFrame(section, ctx, yinYangRadius, radiusFactor, blend, circle1Radius, circle2Radius, time) {
    const adjustedRadius = yinYangRadius * (1 - radiusFactor);
    
    switch (section.type) {
      case 'fractal':
        YinYangDrawer.drawFractal(blend, circle1Radius, circle2Radius, ctx, adjustedRadius, 'black', 'white', time);
        break;
      case 'composite':
        YinYangDrawer.drawComposite(ctx, yinYangRadius, time);
        break;
      case 'pulsating':
        section.draw(blend, circle1Radius, circle2Radius, ctx, adjustedRadius, 'black', 'white', time);
        break;
      case 'rotating':
        section.draw(blend, circle1Radius, circle2Radius, ctx, adjustedRadius, 'black', 'white', time);
        break;
      default:
        section.draw(blend, circle1Radius, circle2Radius, ctx, adjustedRadius);
    }
  }
};

// ============================
// NAVIGATION CONTROLLER MODULE
// ============================

const NavigationController = {
  showSection(idx, withTransition = false) {
    // Stop narration when navigating to a new section
    if (NarratorController.isPlaying) {
      NarratorController.stopNarration();
    }
    
    if (withTransition) {
      this.showTransitionAnimation(idx);
    } else {
      this.performSectionSwitch(idx);
    }
  },

  showTransitionAnimation(idx) {
    const overlay = document.getElementById('transition-overlay');
    const transitionText = document.getElementById('transition-text');
    const nextSectionTitle = SECTION_DATA[idx].title;
    
    // Show transition overlay
    transitionText.textContent = nextSectionTitle;
    overlay.classList.add('active');
    
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Wait for transition animation, then switch sections
    setTimeout(() => {
      this.performSectionSwitch(idx);
      
      // Hide transition overlay after section is loaded
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 500);
    }, 1000);
  },

  performSectionSwitch(idx) {
    // Hide all sections first
    SECTION_DATA.forEach((_, i) => {
      const section = document.getElementById('section-' + i);
      section.style.display = 'none';
      section.classList.remove('visible');
    });
    
    // Show target section
    const targetSection = document.getElementById('section-' + idx);
    targetSection.style.display = 'flex';
    
    // Trigger animation after a brief delay to ensure display change has taken effect
    setTimeout(() => {
      targetSection.classList.add('visible');
      
      // Scroll to top after section is visible and positioned
      setTimeout(() => {
        // The main-content-wrapper is the actual scrollable container below the title bar
        const mainContentWrapper = document.getElementById('main-content-wrapper');
        if (mainContentWrapper) {
          // Force scroll to top of the content area
          mainContentWrapper.scrollTop = 0;
          mainContentWrapper.scrollTo({ top: 0, behavior: 'instant' });
        }
        
        // Also ensure document is at top (fallback for desktop where document might scroll)
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 50);
    }, 100);
    
    // Update navigation controls
    SECTION_DATA.forEach((_, i) => {
      document.getElementById(`arrow-left-${i}`).disabled = (idx === 0);
      document.getElementById(`arrow-right-${i}`).disabled = (idx === SECTION_DATA.length - 1);
    });
    
    // Update carousel indicators
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
      indicator.classList.toggle('active', i === idx);
    });
    
    document.getElementById('page-title').textContent = SECTION_DATA[idx].title;
    AnimationController.animateSection(idx);
    // Show message panel with section message immediately
    const panel = document.getElementById('message-panel');
    const msg = SECTION_DATA[idx].message;
    panel.innerHTML = msg ? msg : '';
  },

  initializeNavigation() {
    // Setup arrow buttons
    for (let i = 0; i < SECTION_DATA.length; i++) {
      document.getElementById(`arrow-left-${i}`).addEventListener('click', () => {
        if (AnimationController.currentSection > 0) {
          AnimationController.currentSection--;
          this.showSection(AnimationController.currentSection, true);
        }
      });
      document.getElementById(`arrow-right-${i}`).addEventListener('click', () => {
        if (AnimationController.currentSection < SECTION_DATA.length - 1) {
          AnimationController.currentSection++;
          this.showSection(AnimationController.currentSection, true);
        }
      });
    }
    
    // Setup carousel indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        if (AnimationController.currentSection !== index) {
          AnimationController.currentSection = index;
          this.showSection(index, true);
        }
      });
    });
    
    // Setup keyboard navigation
    this.initializeKeyboardNavigation();
    
    // Setup swipe gestures
    this.initializeSwipeGestures();
  },

  initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Only handle navigation if not in an input field
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      switch(e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          if (AnimationController.currentSection > 0) {
            AnimationController.currentSection--;
            this.showSection(AnimationController.currentSection, true);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (AnimationController.currentSection < SECTION_DATA.length - 1) {
            AnimationController.currentSection++;
            this.showSection(AnimationController.currentSection, true);
          }
          break;
        case 'Home':
          e.preventDefault();
          AnimationController.currentSection = 0;
          this.showSection(0, true);
          break;
        case 'End':
          e.preventDefault();
          AnimationController.currentSection = SECTION_DATA.length - 1;
          this.showSection(SECTION_DATA.length - 1, true);
          break;
      }
    });
  },

  initializeSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const minSwipeDistance = 50;
    const maxVerticalDistance = 100;
    
    const mainWrapper = document.getElementById('main-content-wrapper');
    
    mainWrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    mainWrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = endX - startX;
      const deltaY = Math.abs(endY - startY);
      
      // Only process horizontal swipes (not vertical scrolling)
      if (Math.abs(deltaX) > minSwipeDistance && deltaY < maxVerticalDistance) {
        if (deltaX > 0) {
          // Swipe right - go to previous section
          if (AnimationController.currentSection > 0) {
            AnimationController.currentSection--;
            this.showSection(AnimationController.currentSection, true);
          }
        } else {
          // Swipe left - go to next section
          if (AnimationController.currentSection < SECTION_DATA.length - 1) {
            AnimationController.currentSection++;
            this.showSection(AnimationController.currentSection, true);
          }
        }
      }
    }, { passive: true });
  }
};

// ============================
// AUDIO NARRATOR CONTROLLER MODULE
// ============================

const NarratorController = {
  currentAudio: null,
  isPlaying: false,
  isUsingTTS: false,
  currentNarrationSection: -1, // Track which section is currently being narrated
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  audioContext: null,
  audioFiles: {
    0: 'audio/section-1.mp3', // Classic Yin-Yang
    1: 'audio/section-2.mp3', // Seeds of each other
    2: 'audio/section-3.mp3', // Dynamic Yin-Yang
    3: 'audio/section-4.mp3', // Cycles
    4: 'audio/section-5.mp3', // Politics
    5: 'audio/section-6.mp3', // Fractal
    6: 'audio/section-7.mp3', // Everywhere
    7: 'audio/section-8.mp3'  // The eternal dance
  },

  initialize() {
    const playButton = document.getElementById('autoplay-button');
    if (playButton) {
      playButton.addEventListener('click', () => this.togglePlayPause());
    }
    
    // Simple iOS audio context initialization
    if (this.isIOS) {
      this.initializeIOSAudio();
    }
    
    // Preload all audio files for better performance
    this.preloadAudio();
  },

  initializeIOSAudio() {
    // Simple iOS audio unlock on first user interaction
    const unlockAudio = () => {
      try {
        // Create AudioContext if needed
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Resume AudioContext if suspended
        if (this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => {
            console.log('iOS AudioContext resumed');
          });
        }
        
        console.log('iOS audio unlocked on user interaction');
        
      } catch (e) {
        console.error('Error unlocking iOS audio:', e);
      }
      
      // Remove the event listeners after first interaction
      document.removeEventListener('touchstart', unlockAudio, true);
      document.removeEventListener('click', unlockAudio, true);
    };
    
    // Add event listeners for first user interaction
    document.addEventListener('touchstart', unlockAudio, true);
    document.addEventListener('click', unlockAudio, true);
  },

  preloadAudio() {
    Object.values(this.audioFiles).forEach(audioPath => {
      const audio = new Audio(audioPath);
      audio.preload = 'metadata'; // Preload metadata only to save bandwidth
      audio.addEventListener('error', (e) => {
        console.warn(`Failed to load audio file: ${audioPath}`);
      });
    });
  },

  togglePlayPause() {
    if (this.isPlaying) {
      this.stopNarration();
    } else {
      this.startNarration();
    }
  },

  startAutoPlay() {
    this.isAutoPlay = true;
    this.updatePlayButton();
    
    // For iOS, do additional audio preparation when autoplay starts
    if (this.isIOS) {
      console.log('iOS: Preparing audio system for autoplay');
      this.prepareIOSAudioForAutoplay().then(() => {
        console.log('iOS: Audio system prepared, starting autoplay');
        this.playCurrentSectionWithAutoAdvance();
      }).catch(() => {
        console.log('iOS: Audio preparation failed, starting anyway');
        this.playCurrentSectionWithAutoAdvance();
      });
    } else {
      // Start from current section
      this.playCurrentSectionWithAutoAdvance();
    }
  },

  stopAutoPlay(reason = 'manual') {
    if (this.isAutoPlay) {
      console.log(`Auto-play stopped: ${reason}`);
      this.isAutoPlay = false;
      
      // Always clear the timer when stopping autoplay
      if (this.autoPlayTimer) {
        clearTimeout(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
      
      this.stopNarration();
      this.updatePlayButton();
    }
  },

  playCurrentSectionWithAutoAdvance() {
    if (!this.isAutoPlay) return;
    
    // For iOS, ensure audio context is ready before starting narration
    if (this.isIOS) {
      this.ensureIOSAudioContext().then((success) => {
        if (success) {
          console.log('iOS: AudioContext ready, starting narration');
          this.startNarration();
        } else {
          console.log('iOS: AudioContext not ready, falling back to TTS');
          this.fallbackToTTS();
        }
      });
    } else {
      // Start narration for current section
      this.startNarration();
    }
    
    // Don't set a timer - let the narration end events handle advancement
    // The advancement will be triggered by audio 'ended' or TTS 'onend' events
  },

  onNarrationEnd() {
    // Only trigger auto-advance if we're actually in auto-play mode
    if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection >= 0) {
      console.log('Narration ended, scheduling auto-advance...');
      
      // Verify we're still on the section we finished narrating (avoid race conditions)
      if (this.currentNarrationSection !== AnimationController.currentSection) {
        console.log('Section changed during narration, skipping auto-advance');
        return;
      }
      
      // Add a small pause before advancing to next section
      this.autoPlayTimer = setTimeout(() => {
        // Clear the timer reference immediately to prevent double-execution
        this.autoPlayTimer = null;
        
        if (this.isAutoPlay) { // Double-check we're still in auto-play
          this.advanceToNextSection();
        }
      }, 2000); // 2 second pause between sections
    }
  },

  updatePlayButton() {
    const playButton = document.getElementById('autoplay-button');
    if (playButton) {
      const svg = playButton.querySelector('svg');
      if (this.isPlaying) {
        playButton.classList.add('active');
        playButton.setAttribute('aria-label', 'Pause narration');
        playButton.setAttribute('title', 'Pause narration');
        // Change icon to pause when playing
        if (svg) {
          svg.innerHTML = '<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>'; // Pause icon
        }
      } else {
        playButton.classList.remove('active');
        playButton.setAttribute('aria-label', 'Play narration');
        playButton.setAttribute('title', 'Play narration');
        // Change icon to speaker when stopped
        if (svg) {
          svg.innerHTML = '<path d="M3 9v6h4l5 5V4l-5 5H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>'; // Speaker icon
        }
      }
    }
  },

  startNarration() {
    const currentSection = AnimationController.currentSection;
    const audioPath = this.audioFiles[currentSection];
    
    console.log(`Starting narration for section ${currentSection}`);
    
    // ALWAYS stop any existing narration first and wait a moment for cleanup
    this.stopNarration();
    
    // Give a small delay to ensure all audio is fully stopped
    setTimeout(() => {
      // Double-check that we're still on the same section after the delay
      if (AnimationController.currentSection !== currentSection) {
        console.log('Section changed during audio setup, aborting');
        return;
      }
      
      // Store the section we're starting narration for
      this.currentNarrationSection = currentSection;
      
      // If no audio file exists, use TTS directly
      if (!audioPath) {
        console.log('No audio file found, using TTS');
        this.fallbackToTTS();
        return;
      }

      // Final check: ensure no audio is playing anywhere
      const playingAudio = Array.from(document.querySelectorAll('audio')).find(audio => !audio.paused);
      if (playingAudio) {
        console.log('Found audio still playing, stopping it first');
        playingAudio.pause();
        playingAudio.currentTime = 0;
        playingAudio.src = '';
      }

      // Try audio file first
      this.currentAudio = new Audio(audioPath);
      
      // Configure audio settings
      this.currentAudio.volume = 0.8;
      this.currentAudio.preload = 'auto';
      this.currentAudio.crossOrigin = 'anonymous';
      
      // Flag to prevent TTS fallback if audio actually starts
      let audioStarted = false;
      
      // Set up event listeners
      this.currentAudio.addEventListener('play', () => {
        console.log(`Audio started playing for section ${this.currentNarrationSection}`);
        audioStarted = true;
        this.isPlaying = true;
        this.updatePlayButton();
      });

      this.currentAudio.addEventListener('ended', () => {
        console.log(`Audio ended for section ${this.currentNarrationSection}`);
        this.isPlaying = false;
        this.updatePlayButton();
        // Clean up the audio element when it ends
        if (this.currentAudio) {
          this.currentAudio.src = '';
          this.currentAudio = null;
        }
      });

      this.currentAudio.addEventListener('error', (e) => {
        console.log(`Audio failed for section ${this.currentNarrationSection}:`, e);
        this.isPlaying = false;
        this.updatePlayButton();
        this.currentAudio = null;
        // Only fallback to TTS if audio never started playing
        if (!audioStarted) {
          this.fallbackToTTS();
        }
      });

      // Start playing
      const playPromise = this.currentAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log(`Audio play promise resolved for section ${this.currentNarrationSection}`);
        }).catch(error => {
          console.log(`Audio play failed:`, error.name);
          // Give a small delay to check if audio actually started despite promise rejection
          setTimeout(() => {
            if (!audioStarted && this.currentAudio && this.currentAudio.paused) {
              console.log('Audio definitely failed, falling back to TTS');
              this.isPlaying = false;
              this.currentAudio = null;
              this.fallbackToTTS();
            } else if (audioStarted) {
              console.log('Audio promise rejected but audio is playing - continuing with audio');
            }
          }, 100);
        });
      } else {
        // For very old browsers that don't return a promise
        setTimeout(() => {
          if (!audioStarted && this.currentAudio && this.currentAudio.paused) {
            console.log('Audio failed to start, falling back to TTS');
            this.isPlaying = false;
            this.currentAudio = null;
            this.fallbackToTTS();
          }
        }, 200);
      }
    }, 50); // Small delay to ensure cleanup is complete
  },

  stopNarration() {
    console.log(`Stopping narration, isPlaying: ${this.isPlaying}, isUsingTTS: ${this.isUsingTTS}`);
    
    // Stop all possible audio sources
    this.stopAllAudio();
    
    // Stop TTS if it's running
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    
    this.isPlaying = false;
    this.isUsingTTS = false;
    this.currentNarrationSection = -1;
    this.updatePlayButton();
  },

  stopAllAudio() {
    console.log('Stopping all audio sources...');
    
    // Stop current audio if playing
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.src = ''; // Clear source to fully stop
        this.currentAudio.removeEventListener('play', () => {});
        this.currentAudio.removeEventListener('ended', () => {});
        this.currentAudio.removeEventListener('error', () => {});
        this.currentAudio = null;
        console.log('Stopped and cleared currentAudio');
      } catch (e) {
        console.log('Error stopping current audio:', e);
        this.currentAudio = null;
      }
    }
    
    // Stop ALL Audio elements on the page aggressively
    const allAudioElements = document.querySelectorAll('audio');
    console.log(`Found ${allAudioElements.length} audio elements to stop`);
    allAudioElements.forEach((audio, index) => {
      try {
        if (!audio.paused) {
          console.log(`Stopping audio element ${index} that was playing`);
        }
        audio.pause();
        audio.currentTime = 0;
        audio.src = '';
        audio.load(); // Force reload to clear any cached state
        // Remove the element entirely if it's not the current one
        if (audio !== this.currentAudio) {
          audio.remove();
        }
      } catch (e) {
        console.log(`Error stopping audio element ${index}:`, e);
      }
    });
    
    // Stop text-to-speech
    if (this.isUsingTTS || speechSynthesis.speaking) {
      speechSynthesis.cancel();
      this.isUsingTTS = false;
      console.log('Stopped TTS');
    }
    
    // Reset audio context if needed
    if (this.audioContext && this.audioContext.state === 'running') {
      try {
        // Don't suspend the context as that might break future audio
        // Just ensure no audio is playing through it
        console.log('AudioContext state reset');
      } catch (e) {
        console.log('Error with AudioContext:', e);
      }
    }
  },

  async attemptIOSAudioUnlock() {
    return new Promise((resolve, reject) => {
      try {
        // Create a very short, quiet audio file to unlock iOS audio
        const silentAudio = new Audio();
        silentAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuX5PLKdSEFJHfD8N2QQQoUXrTp66hVFApGn+DyvmwhBTuX5PLKdSEFJHfD8N2QQA==';
        silentAudio.volume = 0.01;
        silentAudio.currentTime = 0;
        
        const playPromise = silentAudio.play();
        if (playPromise) {
          playPromise.then(() => {
            console.log('iOS audio unlock successful');
            resolve();
          }).catch(() => {
            console.log('iOS audio unlock failed');
            reject();
          });
        } else {
          reject();
        }
      } catch (e) {
        console.log('iOS audio unlock error:', e);
        reject();
      }
    });
  },

  // Enhanced iOS audio context management
  async ensureIOSAudioContext() {
    if (!this.isIOS || !this.audioContext) return true;
    
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
        console.log('iOS: AudioContext resumed successfully');
        return true;
      } catch (e) {
        console.log('iOS: AudioContext resume failed:', e);
        return false;
      }
    }
    return true;
  },

  // Prepare iOS audio system when autoplay starts
  async prepareIOSAudioForAutoplay() {
    return new Promise((resolve, reject) => {
      // Ensure audio context is ready
      this.ensureIOSAudioContext().then((contextReady) => {
        if (!contextReady) {
          reject();
          return;
        }
        
        // Create a test audio element to verify iOS audio is working
        const testAudio = new Audio();
        testAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuX5PLKdSEFJHfD8N2QQQoUXrTp66hVFApGn+DyvmwhBTuX5PLKdSEFJHfD8N2QQA==';
        testAudio.volume = 0.01;
        
        const playPromise = testAudio.play();
        if (playPromise) {
          playPromise.then(() => {
            console.log('iOS: Audio system verified for autoplay');
            testAudio.pause();
            resolve();
          }).catch(() => {
            console.log('iOS: Audio verification failed');
            reject();
          });
        } else {
          reject();
        }
      });
    });
  },

  // iOS-specific method to restart narration with multiple attempts
  startIOSNarrationWithRetry(attempt = 1, maxAttempts = 3) {
    console.log(`iOS: Starting narration attempt ${attempt}/${maxAttempts}`);
    
    if (!this.isAutoPlay || attempt > maxAttempts) {
      if (attempt > maxAttempts) {
        console.log('iOS: Max attempts reached, falling back to TTS');
        this.fallbackToTTS();
      }
      return;
    }
    
    // For transitions (maxAttempts > 3), use more aggressive timing
    const isTransition = maxAttempts > 3;
    const retryDelay = isTransition ? 100 : 500; // Faster retries for transitions
    
    // First, ensure audio context is ready
    this.ensureIOSAudioContext().then((contextReady) => {
      if (!contextReady) {
        console.log('iOS: AudioContext not ready, retrying...');
        setTimeout(() => {
          this.startIOSNarrationWithRetry(attempt + 1, maxAttempts);
        }, retryDelay);
        return;
      }
      
      // Try to start narration
      const currentSection = AnimationController.currentSection;
      const audioPath = this.audioFiles[currentSection];
      
      if (!audioPath) {
        console.log('iOS: No audio file, using TTS');
        this.fallbackToTTS();
        return;
      }
      
      // Create a fresh audio instance for iOS
      this.currentAudio = new Audio(audioPath);
      this.currentAudio.volume = 0.8;
      this.currentAudio.preload = 'auto';
      this.currentAudio.crossOrigin = 'anonymous';
      this.currentNarrationSection = currentSection;
      
      // Set up event listeners for iOS
      this.currentAudio.addEventListener('play', () => {
        console.log(`iOS: Audio started playing for section ${this.currentNarrationSection}`);
        this.isPlaying = true;
        this.updateButtonState();
      });
      
      this.currentAudio.addEventListener('ended', () => {
        console.log(`iOS: Audio ended for section ${this.currentNarrationSection}`);
        this.isPlaying = false;
        this.updateButtonState();
        if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
          this.onNarrationEnd();
        }
      });
      
      this.currentAudio.addEventListener('error', () => {
        console.log(`iOS: Audio error on attempt ${attempt}, retrying...`);
        this.isPlaying = false;
        this.currentAudio = null;
        
        if (attempt < maxAttempts) {
          setTimeout(() => {
            this.startIOSNarrationWithRetry(attempt + 1, maxAttempts);
          }, retryDelay);
        } else {
          this.fallbackToTTS();
        }
      });
      
      this.currentAudio.addEventListener('pause', () => {
        if (this.isAutoPlay && this.isPlaying && !this.currentAudio.ended) {
          console.log(`iOS: Audio paused unexpectedly on attempt ${attempt}, retrying...`);
          setTimeout(() => {
            if (this.currentAudio && this.isAutoPlay) {
              this.currentAudio.play().catch(() => {
                if (attempt < maxAttempts) {
                  this.startIOSNarrationWithRetry(attempt + 1, maxAttempts);
                } else {
                  this.fallbackToTTS();
                }
              });
            }
          }, 100); // Faster recovery for transitions
        }
      });
      
      // Attempt to play with retry logic
      const playPromise = this.currentAudio.play();
      if (playPromise) {
        playPromise.then(() => {
          console.log(`iOS: Audio play promise resolved on attempt ${attempt}`);
        }).catch((error) => {
          console.log(`iOS: Play failed on attempt ${attempt}:`, error.name);
          this.isPlaying = false;
          this.currentAudio = null;
          
          if (attempt < maxAttempts) {
            setTimeout(() => {
              this.startIOSNarrationWithRetry(attempt + 1, maxAttempts);
            }, retryDelay);
          } else {
            console.log('iOS: All audio attempts failed, using TTS');
            this.fallbackToTTS();
          }
        });
      }
    });
  },

  retryAudioPlayback(audioPath) {
    console.log(`Retrying audio playback: ${audioPath}`);
    
    // Make sure we stop any existing audio first
    this.stopAllAudio();
    
    // Double-check we should still be trying audio for this section
    if (this.currentNarrationSection !== AnimationController.currentSection) {
      console.log('Section changed during retry, aborting audio retry');
      return;
    }
    
    // Create new audio instance
    this.currentAudio = new Audio(audioPath);
    this.currentAudio.volume = 0.8;
    this.currentAudio.preload = 'auto';
    this.currentAudio.crossOrigin = 'anonymous';
    
    // Set up basic event listeners
    this.currentAudio.addEventListener('play', () => {
      console.log(`Retry audio started playing for section ${this.currentNarrationSection}`);
      this.isPlaying = true;
      this.updateButtonState();
    });

    this.currentAudio.addEventListener('ended', () => {
      console.log(`Retry audio ended for section ${this.currentNarrationSection}`);
      this.isPlaying = false;
      this.updateButtonState();
      if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
        this.onNarrationEnd();
      }
    });

    this.currentAudio.addEventListener('error', () => {
      console.log(`Retry audio failed, falling back to TTS`);
      this.isPlaying = false;
      // Clear the audio reference before falling back
      if (this.currentAudio) {
        this.currentAudio.src = '';
        this.currentAudio = null;
      }
      // Only start TTS if we're still on the same section and not already using TTS
      if (this.currentNarrationSection === AnimationController.currentSection && !this.isUsingTTS) {
        this.fallbackToTTS();
      }
    });

    // Attempt to play
    const playPromise = this.currentAudio.play();
    if (playPromise) {
      playPromise.catch(() => {
        console.log('Retry audio play failed, using TTS');
        // Clear audio reference
        if (this.currentAudio) {
          this.currentAudio.src = '';
          this.currentAudio = null;
        }
        // Only start TTS if we're still on the same section and not already using TTS
        if (this.currentNarrationSection === AnimationController.currentSection && !this.isUsingTTS) {
          this.fallbackToTTS();
        }
      });
    }
  },

  updateButtonState() {
    const narratorButton = document.getElementById('narrator-button');
    if (narratorButton) {
      if (this.isPlaying) {
        narratorButton.classList.add('speaking');
        narratorButton.setAttribute('aria-label', 'Stop audio');
        narratorButton.setAttribute('title', 'Stop audio narration');
      } else {
        narratorButton.classList.remove('speaking');
        narratorButton.setAttribute('aria-label', 'Play audio');
        narratorButton.setAttribute('title', 'Play audio narration');
      }
    }
  },

  // Fallback to text-to-speech if audio files are not available
  fallbackToTTS() {
    // Prevent multiple TTS instances and validate state
    if (this.isUsingTTS || this.isPlaying) {
      console.log('TTS already running or audio playing, skipping...');
      return;
    }
    
    // Additional check: if audio is currently playing anywhere, don't start TTS
    if (this.currentAudio && !this.currentAudio.paused) {
      console.log('Audio is currently playing, not starting TTS');
      return;
    }
    
    // Check for any audio elements on the page that might be playing
    const playingAudio = Array.from(document.querySelectorAll('audio')).some(audio => !audio.paused);
    if (playingAudio) {
      console.log('Found other audio playing, not starting TTS');
      return;
    }
    
    // Validate we have a valid section and it hasn't changed
    if (this.currentNarrationSection < 0 || 
        this.currentNarrationSection >= SECTION_DATA.length ||
        this.currentNarrationSection !== AnimationController.currentSection) {
      console.log('Invalid section or section changed, skipping TTS...');
      return;
    }
    
    // Clear any remaining audio reference before starting TTS
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.src = '';
        this.currentAudio = null;
      } catch (e) {
        console.log('Error clearing audio before TTS:', e);
        this.currentAudio = null;
      }
    }
    
    if ('speechSynthesis' in window) {
      // Cancel any existing speech first
      speechSynthesis.cancel();
      
      const messagePanel = document.getElementById('message-panel');
      if (!messagePanel || !messagePanel.textContent.trim()) {
        console.log('No text content found for TTS');
        // If no content, still try to advance if in autoplay
        if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
          this.onNarrationEnd();
        }
        return;
      }

      const textToRead = messagePanel.textContent.replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      console.log(`Starting TTS for section ${this.currentNarrationSection}, autoPlay: ${this.isAutoPlay}`);

      utterance.onstart = () => {
        console.log(`TTS started for section ${this.currentNarrationSection}`);
        this.isPlaying = true;
        this.isUsingTTS = true;
        this.updateButtonState();
      };

      utterance.onend = () => {
        console.log(`TTS ended for section ${this.currentNarrationSection}, autoPlay: ${this.isAutoPlay}`);
        this.isPlaying = false;
        this.isUsingTTS = false;
        this.updateButtonState();
        // Only trigger auto-advance if in auto-play mode and no timer already set
        // Also verify we're still on the same section we started narrating
        if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
          this.onNarrationEnd();
        }
      };

      utterance.onerror = (event) => {
        console.error(`TTS error for section ${this.currentNarrationSection}:`, event.error);
        this.isPlaying = false;
        this.isUsingTTS = false;
        this.updateButtonState();
        
        // If in autoplay mode and TTS fails, try to continue to next section
        if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
          console.log('TTS failed, but attempting to continue autoplay to next section');
          this.onNarrationEnd();
        }
      };

      this.isUsingTTS = true; // Set flag before starting
      speechSynthesis.speak(utterance);
    } else {
      console.log('Speech synthesis not available');
      // If speech synthesis not available and in autoplay, still try to advance
      if (this.isAutoPlay && !this.autoPlayTimer && this.currentNarrationSection === AnimationController.currentSection) {
        this.onNarrationEnd();
      }
    }
  }
};

// ============================
// APPLICATION INITIALIZATION
// ============================

// Initialize the application
NavigationController.initializeNavigation();
NavigationController.showSection(AnimationController.currentSection);
NarratorController.initialize();

// Initialize transition Yin-Yang canvases
function initializeTransitionYinYangs() {
  const transitionCanvas = document.getElementById('transition-canvas');
  const pageLoadCanvas = document.getElementById('page-load-canvas');
  
  if (transitionCanvas) {
    drawMiniYinYang(transitionCanvas);
  }
  
  if (pageLoadCanvas) {
    drawMiniYinYang(pageLoadCanvas);
  }
}

// Draw mini Yin-Yang using the main drawing code
function drawMiniYinYang(canvas) {
  const ctx = canvas.getContext('2d');
  const radius = 8; // Made smaller for less prominent transition animation
  
  // Enable high-quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Set up canvas with higher DPI for crisp rendering
  const dpr = window.devicePixelRatio || 1;
  const displayWidth = canvas.width;
  const displayHeight = canvas.height;
  
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  canvas.style.width = displayWidth + 'px';
  canvas.style.height = displayHeight + 'px';
  
  ctx.scale(dpr, dpr);
  
  // Set up canvas
  ctx.clearRect(0, 0, displayWidth, displayHeight);
  ctx.save();
  ctx.translate(displayWidth / 2, displayHeight / 2);
  
  // Enable anti-aliasing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // Use the same proportions as the main Yin-Yang
  const circle1Radius = radius * 0.5;
  const circle2Radius = radius * 0.5;
  const yinYangRadius = radius;
  
  // Draw using the existing core method
  YinYangDrawer._drawYinYangCore(
    ctx, 
    circle1Radius, 
    circle2Radius, 
    yinYangRadius, 
    '#000', // Black
    '#fff', // White
    true    // Include dots
  );
  
  ctx.restore();
}

// Handle initial page load with welcome transition
document.addEventListener('DOMContentLoaded', () => {
  const pageLoadOverlay = document.getElementById('page-load-overlay');
  const firstSection = document.getElementById('section-0');
  
  // Initialize the transition Yin-Yangs
  initializeTransitionYinYangs();
  
  // Show welcome screen for 2.5 seconds, then fade out
  setTimeout(() => {
    if (pageLoadOverlay) {
      pageLoadOverlay.classList.add('hidden');
    }
    
    // Show first section with animation after overlay starts fading
    setTimeout(() => {
      if (firstSection) {
        firstSection.classList.add('visible');
      }
    }, 500);
  }, 2500);
});
