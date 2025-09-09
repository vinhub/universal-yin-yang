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
    title: '1. Yin-Yang model of reality',
    type: 'static',
    message: "Life is full of opposites that actually work together: light and shadow, joy and sorrow, work and rest, " +
             "giving and receiving. The Yin-Yang symbol shows us that these aren't really opposites fighting each other—" +
             "they're dance partners, each one making the other more meaningful. " +
             "Notice how each side contains a seed of the other, reminding us that within every challenge lies an opportunity, " +
             "and within every triumph, a lesson in humility. <br/><br/>" +
             "Ready to dig deeper? Swipe or click the arrow to continue this journey of discovery."
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
    title: '4. Politics: A perfect example',
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
    title: '6. The relationships evolve',
    type: 'evolution',
    message: "Sometimes a Yin-Yang relationship can evolve into a different form. " +
             "In some cases, new relationships may appear, or existing ones may cease to exist. " +
             "And yet, the basic principles of balance, interdependence, and complementarity remain."
  },
  {
    canvasId: 'canvas-everywhere',
    draw: (blend, r1, r2, ctx, rad) => YinYangDrawer.drawBasic(blend, r1, r2, ctx, rad, 'black', 'white'),
    title: '7. Yin-Yangs are everywhere',
    type: 'composite',
    message: "The Yin-Yang is one of life's most profound patterns. Now that you understand them, " +
             "you'll start noticing them everywhere: in relationships, in nature, in your daily rhythms, even in your own thoughts and emotions. " +
             "Every challenge contains opportunity, every ending enables a new beginning, every breath out makes the breath in possible. " +
             "This ancient wisdom isn't just philosophy—it's a practical tool for navigating life with more grace, balance, and understanding. " +
             "The dance continues, and now you're aware you're also a part of it. Welcome to seeing the world through Yin-Yang eyes! &#127775;"
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
  },

  drawComposite(ctx, yinYangRadius, time) {
    ctx.clearRect(-yinYangRadius * 2, -yinYangRadius * 2, yinYangRadius * 4, yinYangRadius * 4);
    
    const positions = this._generateCompositePositions();
    positions.forEach((pos, index) => this._drawCompositeYinYang(ctx, pos, index, yinYangRadius, time));
  },

  _generateCompositePositions() {
    return [
      { x: 0, y: 0, size: 0.40, colors: ['black', 'white'] },      // Center
      // Inner ring
      { x: -0.75, y: 0, size: 0.20, colors: ['darkblue', 'lightblue'] },
      { x: 0.75, y: 0, size: 0.20, colors: ['darkgreen', 'lightgreen'] },
      { x: 0, y: -0.75, size: 0.20, colors: ['purple', 'lavender'] },
      { x: 0, y: 0.75, size: 0.20, colors: ['brown', 'wheat'] },
      // Outer ring
      { x: -0.80, y: -0.65, size: 0.20, colors: ['navy', 'gold'] },
      { x: 0.80, y: -0.65, size: 0.20, colors: ['maroon', 'pink'] },
      { x: 0.80, y: 0.65, size: 0.20, colors: ['darkred', 'orange'] },
      { x: -0.80, y: 0.65, size: 0.20, colors: ['indigo', 'silver'] }
    ];
  },

  _drawCompositeYinYang(ctx, pos, index, yinYangRadius, time) {
    ctx.save();
    
    // Position with gentle drift
    const driftX = Math.sin(time * 0.0008 + index * 0.5) * 0.03;
    const driftY = Math.cos(time * 0.0006 + index * 0.8) * 0.025;
    ctx.translate((pos.x + driftX) * yinYangRadius, (pos.y + driftY) * yinYangRadius);
    
    // Rotation
    const rotationSpeed = 0.001 + (index * 0.0003);
    ctx.rotate(time * rotationSpeed + index * Math.PI / 4);
    
    const miniRadius = yinYangRadius * pos.size;
    const blend = 0.5 * (1 + Math.sin(time * 0.002 + index * 1.2));
    const r1 = miniRadius * (0.25 + 0.5 * blend);
    const r2 = miniRadius - r1;
    
    this.drawBasicNoClear(blend, r1, r2, ctx, miniRadius, pos.colors[0], pos.colors[1]);
    ctx.restore();
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

      if (section.type === 'evolution') {
        radiusFactor += Math.cosh(blend) * ANIMATION_CONFIG.evolutionSpeed;
        if (radiusFactor > 1) return;
        EvolutionDrawer.drawFlower(ctx, yinYangRadius * radiusFactor);
      }

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
      default:
        section.draw(blend, circle1Radius, circle2Radius, ctx, adjustedRadius);
    }
  }
};

// ============================
// NAVIGATION CONTROLLER MODULE
// ============================

const NavigationController = {
  showSection(idx) {
    // Only stop narration if not in auto-play mode (to prevent conflicts)
    if (NarratorController.isPlaying && !NarratorController.isAutoPlay) {
      NarratorController.stopNarration();
    }
    
    SECTION_DATA.forEach((_, i) => {
      document.getElementById('section-' + i).style.display = (i === idx) ? 'flex' : 'none';
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
    
    // Setup carousel indicators
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        AnimationController.currentSection = index;
        this.showSection(index);
      });
    });
    
    // Setup swipe gestures
    this.initializeSwipeGestures();
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
            this.showSection(AnimationController.currentSection);
          }
        } else {
          // Swipe left - go to next section
          if (AnimationController.currentSection < SECTION_DATA.length - 1) {
            AnimationController.currentSection++;
            this.showSection(AnimationController.currentSection);
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
  isAutoPlay: false,
  autoPlayTimer: null,
  isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
  audioContext: null,
  audioFiles: {
    0: 'audio/section-1.mp3', // Classic Yin-Yang
    1: 'audio/section-2.mp3', // Dynamic Yin-Yang
    2: 'audio/section-3.mp3', // Evolution
    3: 'audio/section-4.mp3', // Flower
    4: 'audio/section-5.mp3', // Fractal
    5: 'audio/section-6.mp3', // Modular
    6: 'audio/section-7.mp3'  // Composite
  },

  initialize() {
    const autoPlayButton = document.getElementById('autoplay-button');
    if (autoPlayButton) {
      autoPlayButton.addEventListener('click', () => this.toggleAutoPlay());
    }
    
    // Initialize audio context for iOS
    if (this.isIOS) {
      this.initializeIOSAudio();
    }
    
    // Preload all audio files for better performance
    this.preloadAudio();
  },

  initializeIOSAudio() {
    // Create a more aggressive iOS audio unlock
    const unlockAudio = () => {
      try {
        // Method 1: AudioContext unlock
        if (!this.audioContext) {
          this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
          
          // Create and play a silent buffer to unlock audio
          const buffer = this.audioContext.createBuffer(1, 1, 22050);
          const source = this.audioContext.createBufferSource();
          source.buffer = buffer;
          source.connect(this.audioContext.destination);
          source.start(0);
        }
        
        // Method 2: Create and play a dummy audio element
        const dummyAudio = new Audio();
        dummyAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTuX5PLKdSEFl2+Axsp6I8v7';
        dummyAudio.volume = 0.01; // Very quiet
        dummyAudio.play().then(() => {
          console.log('iOS audio unlocked with dummy audio');
        }).catch(e => {
          console.log('Dummy audio failed, but may still have unlocked iOS audio');
        });
        
        console.log('iOS audio unlock attempted');
        
      } catch (e) {
        console.error('Error unlocking iOS audio:', e);
      }
      
      // Remove the event listeners after first interaction
      document.removeEventListener('touchstart', unlockAudio, true);
      document.removeEventListener('touchend', unlockAudio, true);
      document.removeEventListener('click', unlockAudio, true);
    };
    
    // Add event listeners for first user interaction with capture=true
    document.addEventListener('touchstart', unlockAudio, true);
    document.addEventListener('touchend', unlockAudio, true);
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

  toggleAutoPlay() {
    if (this.isAutoPlay) {
      this.stopAutoPlay();
    } else {
      this.startAutoPlay();
    }
  },

  startAutoPlay() {
    this.isAutoPlay = true;
    this.updateAutoPlayButton();
    
    // Start from current section
    this.playCurrentSectionWithAutoAdvance();
  },

  stopAutoPlay() {
    this.isAutoPlay = false;
    if (this.autoPlayTimer) {
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    this.stopNarration();
    this.updateAutoPlayButton();
  },

  playCurrentSectionWithAutoAdvance() {
    if (!this.isAutoPlay) return;
    
    // Start narration for current section
    this.startNarration();
    
    // Don't set a timer - let the narration end events handle advancement
    // The advancement will be triggered by audio 'ended' or TTS 'onend' events
  },

  onNarrationEnd() {
    // Only trigger auto-advance if we're actually in auto-play mode
    if (this.isAutoPlay && !this.autoPlayTimer) {
      console.log('Narration ended, scheduling auto-advance...');
      // Add a small pause before advancing to next section
      this.autoPlayTimer = setTimeout(() => {
        if (this.isAutoPlay) { // Double-check we're still in auto-play
          this.advanceToNextSection();
        }
      }, 2000); // 2 second pause between sections
    }
  },

  advanceToNextSection() {
    if (!this.isAutoPlay) {
      console.log('Auto-advance cancelled - auto-play stopped');
      return;
    }
    
    const currentSection = AnimationController.currentSection;
    console.log(`Advancing from section ${currentSection}`);
    
    if (currentSection < SECTION_DATA.length - 1) {
      // Clear any existing timer
      if (this.autoPlayTimer) {
        clearTimeout(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
      
      // Move to next section
      AnimationController.currentSection++;
      NavigationController.showSection(AnimationController.currentSection);
      
      // Continue auto-play with next section after a brief pause
      setTimeout(() => {
        if (this.isAutoPlay) { // Check we're still in auto-play mode
          console.log(`Starting narration for section ${AnimationController.currentSection}`);
          this.playCurrentSectionWithAutoAdvance();
        }
      }, 500); // Brief 0.5 second pause to ensure section is loaded
    } else {
      // Reached the end, stop auto-play
      console.log('Auto-play journey completed!');
      this.stopAutoPlay();
    }
  },

  updateAutoPlayButton() {
    const autoPlayButton = document.getElementById('autoplay-button');
    if (autoPlayButton) {
      const svg = autoPlayButton.querySelector('svg');
      if (this.isAutoPlay) {
        autoPlayButton.classList.add('active');
        autoPlayButton.setAttribute('aria-label', 'Stop auto-play journey');
        autoPlayButton.setAttribute('title', 'Stop automatic journey');
        // Change icon to pause when playing
        if (svg) {
          svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>'; // Pause icon
        }
      } else {
        autoPlayButton.classList.remove('active');
        autoPlayButton.setAttribute('aria-label', 'Start auto-play journey');
        autoPlayButton.setAttribute('title', 'Start automatic journey');
        // Change icon to play when stopped
        if (svg) {
          svg.innerHTML = '<path d="M8 5v14l11-7z"/>'; // Play icon
        }
      }
    }
  },

  startNarration() {
    const currentSection = AnimationController.currentSection;
    const audioPath = this.audioFiles[currentSection];
    
    console.log(`Starting narration for section ${currentSection}, autoPlay: ${this.isAutoPlay}`);
    
    // Prevent multiple narrations from starting
    if (this.isPlaying || this.isUsingTTS) {
      console.log('Narration already playing, skipping...');
      return;
    }
    
    // On iOS or if no audio file, use TTS directly
    if (this.isIOS || !audioPath) {
      console.log('Using TTS (iOS or no audio file)');
      this.fallbackToTTS();
      return;
    }

    // Try audio file first
    this.currentAudio = new Audio(audioPath);
    
    // Configure audio settings
    this.currentAudio.volume = 0.8;
    this.currentAudio.preload = 'auto';

    // Set up event listeners
    this.currentAudio.addEventListener('loadstart', () => {
      console.log(`Loading audio: ${audioPath}`);
    });

    this.currentAudio.addEventListener('play', () => {
      console.log(`Audio started playing for section ${currentSection}`);
      this.isPlaying = true;
      this.updateButtonState();
    });

    this.currentAudio.addEventListener('ended', () => {
      console.log(`Audio ended for section ${currentSection}, autoPlay: ${this.isAutoPlay}`);
      this.isPlaying = false;
      this.updateButtonState();
      // Only trigger auto-advance if in auto-play mode and no timer already set
      if (this.isAutoPlay && !this.autoPlayTimer) {
        this.onNarrationEnd();
      }
    });

    this.currentAudio.addEventListener('error', (e) => {
      console.log(`Audio failed for section ${currentSection}, falling back to TTS`);
      this.isPlaying = false;
      this.updateButtonState();
      this.currentAudio = null;
      
      // Fallback to text-to-speech if audio fails
      this.fallbackToTTS();
    });

    // Start playing with proper error handling
    const playPromise = this.currentAudio.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.log(`Audio play failed for section ${currentSection}, falling back to TTS`);
        this.isPlaying = false;
        this.currentAudio = null;
        this.fallbackToTTS();
      });
    }
  },

  stopNarration() {
    console.log(`Stopping narration, autoPlay: ${this.isAutoPlay}, isPlaying: ${this.isPlaying}, isUsingTTS: ${this.isUsingTTS}`);
    
    // Stop audio playback
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    
    // Stop text-to-speech fallback
    if (this.isUsingTTS) {
      speechSynthesis.cancel();
      this.isUsingTTS = false;
    }
    
    // Clear auto-play timer only if we're not in auto-play mode (manual stop)
    if (this.autoPlayTimer && !this.isAutoPlay) {
      console.log('Clearing auto-play timer (manual stop)');
      clearTimeout(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    
    this.isPlaying = false;
    this.updateButtonState();
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
    // Prevent multiple TTS instances
    if (this.isUsingTTS) {
      console.log('TTS already running, skipping...');
      return;
    }
    
    if ('speechSynthesis' in window) {
      // Cancel any existing speech first
      speechSynthesis.cancel();
      
      const messagePanel = document.getElementById('message-panel');
      if (!messagePanel || !messagePanel.textContent.trim()) return;

      const textToRead = messagePanel.textContent.replace(/\s+/g, ' ').trim();
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;

      const currentSection = AnimationController.currentSection;
      console.log(`Starting TTS for section ${currentSection}, autoPlay: ${this.isAutoPlay}`);

      utterance.onstart = () => {
        console.log(`TTS started for section ${currentSection}`);
        this.isPlaying = true;
        this.isUsingTTS = true;
        this.updateButtonState();
      };

      utterance.onend = () => {
        console.log(`TTS ended for section ${currentSection}, autoPlay: ${this.isAutoPlay}`);
        this.isPlaying = false;
        this.isUsingTTS = false;
        this.updateButtonState();
        // Only trigger auto-advance if in auto-play mode and no timer already set
        if (this.isAutoPlay && !this.autoPlayTimer) {
          this.onNarrationEnd();
        }
      };

      utterance.onerror = () => {
        console.error(`TTS error for section ${currentSection}`);
        this.isPlaying = false;
        this.isUsingTTS = false;
        this.updateButtonState();
      };

      this.isUsingTTS = true; // Set flag before starting
      speechSynthesis.speak(utterance);
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
