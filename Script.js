let heartRate = 60;
let speed = 0;
let lives = 2;
let gameActive = false;
let invincible = false;
let score = 0;
let previousSpeed = 0;
let papersCollected = 0;
let collectedPaperIds = [];
let selectedCarColor = 'black';
let selectedCarFilter = 'none';

// Story documents - Add your own story here!
const storyDocuments = [
  {
    id: 1,
    title: "Document #001: Conceptual Summary",
    text: "Fuelborn takes place in a sci-fi future where cars have gained consciousness and form emotional bonds with people. This world has shifted away from fossil fuels and turned to something living. This is called Drive-loop, this makes movement, emotions and breath into energy. Cars are no longer machines but being that sense heartbeat, emotions and intention. Driving has become an act of connection, not control.\n\nThe Story focuses on a group called Fuelborn, people who reject this new harmony. They see fire as a purification, believing machines should serve humans, sense humans made them. Their attacks include burning cars and public events that support the connection between cars and humans. The project explores what it means to live in a world where cars become a central part of society and where rebellion is tied to fear of that change of losing control."
  },
  {
    id: 2,
    title: "Document #002: Aesthetic, Ethical, and Ecological Concerns",
    text: "I depict a world torn between evolution and collapse using imagery that blends the organic and the mechanical. The sound of engines breathing suggests a harmony between technology and emotion.\n\nThe project raises ethical questions about what happens when human emotion turns into fuel. What does it mean to own a car if it has feelings? Is it possible for something to be both functional and alive? In terms of ecology, FuelBorn envisions a world in which energy relies on empathy and harmony rather than destroying the planet, but the balance is still vulnerable. The FuelBorn attacks serve as a reminder that not everyone desires connection and that when people are left behind by systems, violence frequently resurfaces. The narrative attempts to raise the question of whether advancement is possible without exclusion."
  },
  {
    id: 3,
    title: "Document #003: Evolution from Earlier Work",
    text: "This project grew out of my ongoing interest in cars as living systems and my fascination with how humans build relationships with technology. Earlier works focused on the idea of cars having personalities and memories. FuelBorn expands that into a full mythology and expands the world where machines evolve beyond their function. It moves from describing the emotional bond between a driver and a car to imagining the societies, rituals, and conflicts that grow from that bond. The project became less about racing or performance and more about care, communication, and the cost of connection."
  }
];

const car = document.getElementById('car');
const heartSlider = document.getElementById('heartSlider');
const heartRateDisplay = document.getElementById('heartRateDisplay');
const speedDisplay = document.getElementById('speedDisplay');
const speedLines = document.getElementById('speedLines');
const wheels = document.querySelectorAll('.wheel');
const heartIcon = document.querySelector('.heart-icon');
const resetBtn = document.getElementById('resetBtn');
const topResetBtn = document.getElementById('topResetBtn');
const exhaust = document.getElementById('exhaust');
const gameArea = document.querySelector('.game-area');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const startSubtitle = document.getElementById('startSubtitle');
const life1 = document.getElementById('life1');
const life2 = document.getElementById('life2');
const scoreDisplay = document.getElementById('scoreDisplay');
const speechBubble = document.getElementById('speechBubble');
const paperCountDisplay = document.getElementById('paperCount');
const storyModal = document.getElementById('storyModal');
const storyTitle = document.getElementById('storyTitle');
const storyText = document.getElementById('storyText');
const continueBtn = document.getElementById('continueBtn');
const carImage = document.getElementById('carImage');
const fireOverlay = document.getElementById('fireOverlay');
const fireParticles = document.getElementById('fireParticles');

// Color picker elements
const colorOptions = document.querySelectorAll('.color-option');

// Color picker event listeners
colorOptions.forEach(option => {
  option.addEventListener('click', function() {
    // Remove selected class from all options
    colorOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Add selected class to clicked option
    this.classList.add('selected');
    
    // Get color and filter data
    selectedCarColor = this.dataset.color;
    selectedCarFilter = this.dataset.filter;
    
    // Apply filter to car image
    document.documentElement.style.setProperty('--car-filter', selectedCarFilter);
  });
});

// Fire animation function
function triggerFireAnimation() {
  // Show fire overlay
  fireOverlay.classList.add('active');
  
  // Clear previous flames and smoke
  fireParticles.innerHTML = '';
  
  // Create initial flash element
  const flash = document.createElement('div');
  flash.className = 'fire-flash';
  fireParticles.appendChild(flash);
  
  // Create burn edge effect
  const burnEdge = document.createElement('div');
  burnEdge.className = 'burn-edge';
  fireParticles.appendChild(burnEdge);
  
  // Create heat distortion
  const heat = document.createElement('div');
  heat.className = 'heat-distortion';
  fireParticles.appendChild(heat);
  
  // Spawn flames from bottom
  const flameCount = 40; // Number of flames
  for (let i = 0; i < flameCount; i++) {
    setTimeout(() => {
      createFlame();
    }, i * 50); // Stagger flame creation
  }
  
  // Spawn smoke
  const smokeCount = 20;
  for (let i = 0; i < smokeCount; i++) {
    setTimeout(() => {
      createSmoke();
    }, i * 100 + 500); // Start smoke after flames begin
  }
  
  // Remove fire overlay after animation completes
  setTimeout(() => {
    fireOverlay.classList.remove('active');
    fireParticles.innerHTML = '';
  }, 2500); // Match with animation duration
}

function createFlame() {
  const flame = document.createElement('div');
  flame.className = 'flame';
  
  // Random size
  const sizeClass = Math.random() > 0.7 ? 'large' : (Math.random() > 0.5 ? '' : 'small');
  if (sizeClass) flame.classList.add(sizeClass);
  
  // Random horizontal position
  const leftPos = Math.random() * 100;
  flame.style.left = leftPos + '%';
  
  // Random sway amount
  const sway = (Math.random() - 0.5) * 80;
  flame.style.setProperty('--sway', sway + 'px');
  
  // Random delay
  const delay = Math.random() * 0.3;
  flame.style.animationDelay = delay + 's';
  
  fireParticles.appendChild(flame);
  
  // Remove after animation
  setTimeout(() => {
    flame.remove();
  }, 2500 + delay * 1000);
}

function createSmoke() {
  const smoke = document.createElement('div');
  smoke.className = 'smoke';
  
  // Random horizontal position
  const leftPos = Math.random() * 100;
  smoke.style.left = leftPos + '%';
  
  // Random drift
  const drift = (Math.random() - 0.5) * 150;
  smoke.style.setProperty('--drift', drift + 'px');
  
  // Random delay
  const delay = Math.random() * 0.5;
  smoke.style.animationDelay = delay + 's';
  
  // Random size
  const size = 80 + Math.random() * 60;
  smoke.style.width = size + 'px';
  smoke.style.height = size + 'px';
  
  fireParticles.appendChild(smoke);
  
  // Remove after animation
  setTimeout(() => {
    smoke.remove();
  }, 3000 + delay * 1000);
}

// layers we scale by speed
const clouds = document.querySelector('.clouds');
const trees  = document.querySelector('.trees');
const road   = document.querySelector('.road');

let night = false;
let obstacles = [];
let papers = [];
let lastObstacleTime = 0;
let lastPaperTime = 0; // Will be set when game starts
let spawnInterval;
let collisionInterval;
let scoreInterval;
let nightDayInterval;
let randomMessageInterval;
let bubbleTimeout;

// Car speech messages - FuelBorn escape narrative
const randomMessages = [
  "Stay focused... FuelBorn could be anywhere",
  "I can feel your heartbeat... we're connected",
  "Those were cars like me once...",
  "The burned ones... they can't speak anymore",
  "Keep our bond strong... it's what keeps us alive",
  "They want to silence all of us...",
  "I won't let them take our connection",
  "Every car on this road had a driver once",
  "The Silence is spreading... we need to move",
  "Trust me... I'll guide you through this",
  "Our bond gives us power... use it",
  "Stay calm... I can feel your fear",
  "We're stronger together than apart",
  "Don't look at them too long... keep moving"
];

const speedUpMessages = [
  "Careful! Don't burn through our energy!",
  "Fast, but watch our connection!",
  "Speed helps, but don't lose control!",
  "Your heart's racing... I feel it too!",
  "Quick! But stay with me!",
  "Watch out ahead!",
  "Too fast and we'll break our bond!"
];

const slowDownMessages = [
  "Rest... we need to conserve energy",
  "Breathe... I'm here with you",
  "Take it easy... we'll survive this",
  "Slow is safe... steady your heart",
  "We can rest for a moment...",
  "Let our bond recharge..."
];

const nightMessages = [
  "Darkness... when FuelBorn strikes",
  "Night... they hide in the shadows",
  "Stay alert... The Silence loves the dark",
  "I'll light the way... trust me"
];

const dayMessages = [
  "Daylight... we're safer now",
  "Light returns... we made it",
  "The sun... I can feel it too",
  "Another day survived together"
];

// Speech bubble functions
function showSpeechBubble(message, duration = 3000) {
  // Clear any existing timeout
  if (bubbleTimeout) {
    clearTimeout(bubbleTimeout);
  }

  // Just set the message - CSS handles positioning automatically
  speechBubble.textContent = message;
  
  // Show bubble
  speechBubble.classList.add('show');
  speechBubble.style.animation = 'bubblePop 0.3s ease-out';

  // Hide after duration
  bubbleTimeout = setTimeout(() => {
    speechBubble.classList.remove('show');
  }, duration);
}

function updateBubblePosition() {
  // No longer needed - bubble follows car automatically via CSS
  // Keeping function for compatibility
}

function showRandomMessage() {
  if (!gameActive) return;
  const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  showSpeechBubble(message);
}

// Start button handler
startBtn.addEventListener('click', startGame);

function startGame(){
  startScreen.classList.add('hidden');
  gameActive = true;
  lives = 2;
  score = 0;
  previousSpeed = speed;
  updateLivesDisplay();
  updateScoreDisplay();
  
  // Reset car position
  car.style.left = '50%';
  car.style.bottom = '50px';
  
  // Clear any existing obstacles and papers
  obstacles.forEach(obs => obs.remove());
  obstacles = [];
  papers.forEach(paper => paper.remove());
  papers = [];
  
  // Reset paper spawn timer - set to past time to allow immediate first spawn
  lastPaperTime = Date.now() - 10000; // Start 10 seconds in the past to spawn immediately
  
  // Welcome messages - randomly select one
  const startMessages = [
    "Those burned cars... FuelBorn's work. Dodge them!",
    "We have to survive this together... avoid the wrecks!",
    "Every burned car was alive once... don't join them!",
    "FuelBorn wants to silence us... keep moving!",
    "Stay connected to me... it's how we stay alive!"
  ];
  showSpeechBubble(startMessages[Math.floor(Math.random() * startMessages.length)], 3000);
  
  // Start spawning obstacles and papers
  spawnInterval = setInterval(() => {
    if (speed > 0 && gameActive) {
      spawnObstacle();
      spawnPaper();
    }
  }, 400);

  // Start collision detection
  collisionInterval = setInterval(checkCollisions, 50);

  // Start score counter and day/night cycle with dynamic timing
  startDynamicTimers();

  // Start random messages every 10 seconds
  randomMessageInterval = setInterval(showRandomMessage, 10000);
}

function startDynamicTimers(){
  // Clear existing timers if any
  if (scoreInterval) clearInterval(scoreInterval);
  if (nightDayInterval) clearInterval(nightDayInterval);

  // Calculate interval based on heart rate
  // 60 BPM (min active) = 15000ms, 180 BPM (max) = 3000ms
  const intervalTime = Math.max(3000, 15000 - ((heartRate - 60) / (180 - 60)) * 12000);

  // Start score counter (add 10 points every interval)
  scoreInterval = setInterval(() => {
    if (gameActive) {
      score += 10;
      updateScoreDisplay();
    }
  }, intervalTime);

  // Start day/night cycle (toggle every interval)
  nightDayInterval = setInterval(() => {
    if (gameActive) {
      toggleNight();
    }
  }, intervalTime);
}

function gameOver(){
  gameActive = false;
  clearInterval(spawnInterval);
  clearInterval(collisionInterval);
  clearInterval(scoreInterval);
  clearInterval(nightDayInterval);
  clearInterval(randomMessageInterval);
  if (bubbleTimeout) clearTimeout(bubbleTimeout);
  
  // TRIGGER FIRE ANIMATION
  triggerFireAnimation();
  
  // Clear obstacles and papers
  obstacles.forEach(obs => obs.remove());
  obstacles = [];
  papers.forEach(paper => paper.remove());
  papers = [];
  
  // Reset paper collection progress
  papersCollected = 0;
  collectedPaperIds = [];
  paperCountDisplay.textContent = '0';
  
  // Close story modal if open
  storyModal.classList.remove('active');
  
  // Hide speech bubble
  speechBubble.classList.remove('show');
  
  // Show start screen with "Try Again" and final score AFTER fire animation
  setTimeout(() => {
    startSubtitle.textContent = `Game Over! Final Score: ${score} points. Try Again?`;
    startBtn.textContent = 'Try Again';
    startScreen.classList.remove('hidden');
  }, 2500); // Wait for fire animation to complete
  
  // Reset button text after a moment
  setTimeout(() => {
    startBtn.textContent = 'Start';
    startSubtitle.textContent = 'Control your speed with your heart rate!';
  }, 7500); // 2500 + 5000
}

function loseLife(){
  if (invincible || !gameActive) return;
  
  lives--;
  updateLivesDisplay();
  
  // Show different messages based on lives remaining
  const hitMessages = [
    "We share two lives... now only one remains!",
    "That hurt us both... our bond is fragile!",
    "One life left... we have to be more careful!"
  ];
  
  if (lives === 1) {
    showSpeechBubble(hitMessages[0], 2500);
  } else if (lives === 0) {
    showSpeechBubble("Our connection... it's fading...", 2000);
  } else {
    showSpeechBubble(hitMessages[Math.floor(Math.random() * hitMessages.length)], 2000);
  }
  
  // Make car flash
  car.style.animation = 'carHit 0.6s';
  setTimeout(() => {
    if (car.style.animation.includes('carShake')){
      car.style.animation = 'carShake .1s infinite';
    } else {
      car.style.animation = 'none';
    }
  }, 600);
  
  // Temporary invincibility
  invincible = true;
  setTimeout(() => {
    invincible = false;
  }, 1500);
  
  if (lives <= 0){
    gameOver();
  }
}

function updateLivesDisplay(){
  life1.classList.toggle('lost', lives < 2);
  life2.classList.toggle('lost', lives < 1);
}

function updateScoreDisplay(){
  scoreDisplay.textContent = score;
}

function checkCollisions(){
  if (!gameActive || invincible) return;
  
  const carRect = car.getBoundingClientRect();
  
  // Check obstacle collisions
  obstacles.forEach(obstacle => {
    const obsRect = obstacle.getBoundingClientRect();
    
    // Check if rectangles overlap
    if (!(carRect.right < obsRect.left || 
          carRect.left > obsRect.right || 
          carRect.bottom < obsRect.top || 
          carRect.top > obsRect.bottom)) {
      // Collision detected!
      loseLife();
      obstacle.remove();
      obstacles = obstacles.filter(o => o !== obstacle);
    }
  });

  // Check paper collisions (collection)
  papers.forEach(paper => {
    const paperRect = paper.getBoundingClientRect();
    
    // Check if rectangles overlap
    if (!(carRect.right < paperRect.left || 
          carRect.left > paperRect.right || 
          carRect.bottom < paperRect.top || 
          carRect.top > paperRect.bottom)) {
      // Paper collected!
      collectPaper(paper);
    }
  });
}

function toggleNight(){
  night = !night;
  document.documentElement.style.setProperty('--beamOpacity', night ? 0.9 : 0);
  document.documentElement.style.setProperty('--sceneDarken', night ? 0.35 : 0);
  document.documentElement.style.setProperty('--skyMix', night ? 1 : 0);
  
  // Show day/night message
  if (gameActive) {
    const message = night ? 
      nightMessages[Math.floor(Math.random() * nightMessages.length)] :
      dayMessages[Math.floor(Math.random() * dayMessages.length)];
    showSpeechBubble(message, 2500);
  }
}

// Reset button handlers
resetBtn.addEventListener('click', () => {
  if (gameActive) {
    gameOver();
  }
});

topResetBtn.addEventListener('click', () => {
  if (gameActive) {
    gameOver();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'r' || e.key === 'R') {
    if (gameActive) gameOver();
  }
});

heartSlider.addEventListener('input', (e) => {
  heartRate = parseInt(e.target.value, 10);
  updateHeartRate();
  
  // Update timers if game is active
  if (gameActive) {
    startDynamicTimers();
  }
});

function updateHeartRate(){
  heartRateDisplay.textContent = heartRate;

  // Map 40..180 BPM to 0..140 MPH
  const newSpeed = Math.max(0, Math.round(((heartRate - 40) / 140) * 140));
  
  // Check for speed changes and show messages
  if (gameActive) {
    if (newSpeed > previousSpeed + 20) {
      // Speeding up significantly
      const message = speedUpMessages[Math.floor(Math.random() * speedUpMessages.length)];
      showSpeechBubble(message, 2000);
    } else if (newSpeed < previousSpeed - 20) {
      // Slowing down significantly
      const message = slowDownMessages[Math.floor(Math.random() * slowDownMessages.length)];
      showSpeechBubble(message, 2000);
    }
  }
  
  previousSpeed = newSpeed;
  speed = newSpeed;
  speedDisplay.textContent = speed;

  // Scale parallax and dashes by speed
  const factor = (speed / 20 + 1);                // ~1..8+
  const cloudsDur = Math.max(8, 45 / factor);     // seconds
  const treesDur  = Math.max(4, 18 / factor);     // seconds
  const dashDur   = Math.max(0.35, 1.3 / (speed/60 + 0.4)); // seconds

  clouds.style.animationDuration = cloudsDur + 's';
  trees .style.animationDuration = treesDur  + 's';
  document.documentElement.style.setProperty('--dashDur', dashDur + 's');

  // Pause/Run by speed
  const play = speed > 0 ? 'running' : 'paused';
  clouds.style.animationPlayState = play;
  trees .style.animationPlayState = play;
  road  .style.animationPlayState = play;

  // Wheel spin rate
  wheels.forEach(w => {
    if (speed > 0){
      w.style.animationDuration = (0.5 / (speed / 60 + 0.1)) + 's';
      w.style.animationPlayState = 'running';
    } else {
      w.style.animationPlayState = 'paused';
    }
  });

  // Heartbeat tempo
  heartIcon.style.animationDuration = (60 / Math.max(heartRate, 1)) + 's';

  // Speed lines intensity
  speedLines.style.opacity = speed > 80 ? (speed - 80) / 60 : 0;

  // Exhaust smoke when > 70 mph
  if (speed > 70) spawnPuff();

  // Car vibration at high speed
  if (speed > 110){
    car.style.animation = 'carShake .1s infinite';
  } else {
    car.style.animation = 'none';
  }
}

function spawnPuff(){
  const count = speed > 120 ? 2 : 1;
  for (let i=0; i<count; i++){
    const p = document.createElement('div');
    p.className = 'puff';
    p.style.left = (Math.random()*6 - 3) + 'px';
    p.style.bottom = (Math.random()*4 - 2) + 'px';
    exhaust.appendChild(p);
    setTimeout(() => p.remove(), 600);
  }
}

function moveCar(direction){
  if (!gameActive) return;
  
  const currentLeft = parseInt((car.style.left || '50').replace('%',''), 10);
  const currentBottom = parseInt((car.style.bottom || '50').replace('px',''), 10);

  // Check if on mobile (screen width < 768px)
  const isMobile = window.innerWidth < 768;
  
  // Adjust limits based on screen size
  const maxBottom = isMobile ? 120 : 190;  // Lower max so car can't go into trees on mobile
  const minBottom = isMobile ? 15 : 20;    // Lower min so car can go to bottom of road
  const minLeft = isMobile ? 5 : 20;       // Full width road on mobile
  const maxLeft = isMobile ? 95 : 94;      // Full width road on mobile
  
  // Movement increments - larger on mobile for easier dodging
  const verticalMove = isMobile ? 35 : 20;   // Mobile: 30px, Desktop: 20px
  const horizontalMove = isMobile ? 9 : 5;   // Mobile: 8%, Desktop: 5%

  switch(direction){
    case 'up':    car.style.bottom = Math.min(maxBottom, currentBottom + verticalMove) + 'px'; break;
    case 'down':  car.style.bottom = Math.max(minBottom,  currentBottom - verticalMove) + 'px'; break;
    case 'left':  car.style.left   = Math.max(minLeft,  currentLeft - horizontalMove)  + '%';    break;
    case 'right': car.style.left   = Math.min(maxLeft,  currentLeft + horizontalMove)  + '%';    break;
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp')    moveCar('up');
  if (e.key === 'ArrowDown')  moveCar('down');
  if (e.key === 'ArrowLeft')  moveCar('left');
  if (e.key === 'ArrowRight') moveCar('right');
});

// Add touch support for mobile
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

// Add swipe support to game area
gameArea.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

gameArea.addEventListener('touchmove', (e) => {
  e.preventDefault(); // Prevent page scrolling during swipe
}, { passive: false });

gameArea.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, false);

// Add swipe support to control panel area too
const controlPanel = document.querySelector('.control-panel');
controlPanel.addEventListener('touchstart', (e) => {
  // Only handle swipes on the controls area, not on slider or buttons
  if (e.target.closest('.heart-slider') || e.target.closest('.toggle')) {
    return; // Let slider and reset button work normally
  }
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, false);

controlPanel.addEventListener('touchmove', (e) => {
  // Only prevent scrolling if not on slider
  if (!e.target.closest('.heart-slider') && !e.target.closest('.toggle')) {
    e.preventDefault(); // Prevent page scrolling during swipe
  }
}, { passive: false });

controlPanel.addEventListener('touchend', (e) => {
  // Only handle swipes on the controls area, not on slider or buttons
  if (e.target.closest('.heart-slider') || e.target.closest('.toggle')) {
    return; // Let slider and reset button work normally
  }
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
}, false);

function handleSwipe() {
  const diffX = touchEndX - touchStartX;
  const diffY = touchEndY - touchStartY;
  const minSwipeDistance = 30;

  // Determine if horizontal or vertical swipe
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // Horizontal swipe
    if (Math.abs(diffX) > minSwipeDistance) {
      if (diffX > 0) {
        moveCar('right');
      } else {
        moveCar('left');
      }
    }
  } else {
    // Vertical swipe
    if (Math.abs(diffY) > minSwipeDistance) {
      if (diffY > 0) {
        moveCar('down');
      } else {
        moveCar('up');
      }
    }
  }
}

// Initialize
updateHeartRate();

// === DESTROYED CAR IMAGES - REPLACE THESE URLS WITH YOUR ACTUAL IMAGES ===
const destroyedCarImages = [
  'destroyed-car-1.png',  // ← Replace with your first destroyed car image
  'destroyed-car-2.png',  // ← Replace with your second destroyed car image
  'destroyed-car-3.png',  // ← Replace with your third destroyed car image
  'destroyed-car-4.png'   // ← Replace with your fourth destroyed car image (optional)
];

// Obstacle spawning and movement
function spawnObstacle(){
  if (speed < 10 || !gameActive) return; // Only spawn when moving

  const now = Date.now();
  const spawnInterval = Math.max(800, 2500 - speed * 15); // Faster spawning at higher speeds
  
  if (now - lastObstacleTime < spawnInterval) return;
  lastObstacleTime = now;

  const obstacle = document.createElement('div');
  obstacle.className = 'obstacle';
  
  // Create image element for obstacle
  const obstacleImg = document.createElement('img');
  obstacleImg.className = 'obstacle-image';
  
  // Randomly select one of the destroyed car images
  const randomIndex = Math.floor(Math.random() * destroyedCarImages.length);
  obstacleImg.src = destroyedCarImages[randomIndex];
  obstacleImg.alt = 'Destroyed Car';
  
  obstacle.appendChild(obstacleImg);
  
  // Random lane position - adjust for mobile
  const isMobile = window.innerWidth < 768;
  const lanes = isMobile 
    ? [30, 45, 60, 75, 90, 105, 120] // Match car's movement range (25-120)
    : [10, 30, 50, 70, 90, 110, 130, 150]; // More lanes for desktop
  
  obstacle.style.bottom = lanes[Math.floor(Math.random() * lanes.length)] + 'px';
  
  gameArea.appendChild(obstacle);
  obstacles.push(obstacle);

  // Calculate duration to match road dash speed for consistency
  // Use the same timing as the road dashes so obstacles feel stationary
  const dashDur = Math.max(0.35, 1.3 / (speed/60 + 0.4)); // Same as road calculation
  const duration = dashDur * 1000 * 10; // Convert to ms and scale for screen width
  
  obstacle.style.animationDuration = duration + 'ms';

  // Remove after passing
  setTimeout(() => {
    if (obstacle.parentNode) {
      obstacle.remove();
      obstacles = obstacles.filter(o => o !== obstacle);
    }
  }, duration + 100);
}

// Paper spawning and collection - MODIFIED FOR 10 SECOND INTERVALS
function spawnPaper(){
  if (speed < 10 || !gameActive) return;
  if (papersCollected >= 3) return; // Max 3 papers

  const now = Date.now();
  
  // Enforce 10 second spawn interval
  const timeSinceLastSpawn = now - lastPaperTime;
  if (timeSinceLastSpawn < 15000) { // 10 seconds = 10000ms
    return; // Don't spawn yet, wait for 10 seconds
  }
  
  // Update last spawn time BEFORE spawning to prevent multiple spawns
  lastPaperTime = now;
  
  // Get next uncollected paper
  const availablePapers = storyDocuments.filter(doc => !collectedPaperIds.includes(doc.id));
  if (availablePapers.length === 0) return;

  const paper = document.createElement('div');
  paper.className = 'paper-collectible';
  paper.dataset.paperId = availablePapers[0].id;
  
  // Create paper box visual
  const paperBox = document.createElement('div');
  paperBox.className = 'paper-box';
  paper.appendChild(paperBox);
  
  // Random lane position - MUST MATCH obstacles exactly for mobile
  const isMobile = window.innerWidth < 768;
  const lanes = isMobile 
    ? [40, 55, 70, 85, 100] // UPDATED: Match car's actual road positions on mobile (40-100px range)
    : [50, 70, 90, 110, 130]; // Desktop: kept in middle of road
  
  // Get all obstacle lanes to avoid them completely
  const occupiedLanes = obstacles.map(obs => parseInt(obs.style.bottom));
  
  // Filter out lanes that are too close to any obstacle
  const safeLanes = lanes.filter(lane => {
    return !occupiedLanes.some(obsLane => Math.abs(obsLane - lane) < 50); // 50px minimum distance
  });
  
  // If no safe lanes available, still spawn but choose any lane
  const chosenLane = safeLanes.length > 0 
    ? safeLanes[Math.floor(Math.random() * safeLanes.length)]
    : lanes[Math.floor(Math.random() * lanes.length)];
  
  paper.style.bottom = chosenLane + 'px';
  
  gameArea.appendChild(paper);
  papers.push(paper);
  
  console.log('Paper spawned! Total papers collected:', papersCollected);

  // Calculate duration - make papers move MUCH SLOWER than obstacles for safety
  const dashDur = Math.max(0.35, 1.3 / (speed/60 + 0.4));
  const duration = dashDur * 1000 * 18; // 1.8x slower than obstacles (was 10, now 18)
  
  paper.style.animationDuration = duration + 'ms';

  // Remove after passing
  setTimeout(() => {
    if (paper.parentNode) {
      paper.remove();
      papers = papers.filter(p => p !== paper);
    }
  }, duration + 100);
}

function collectPaper(paperElement){
  const paperId = parseInt(paperElement.dataset.paperId);
  
  // Remove paper from DOM
  paperElement.remove();
  papers = papers.filter(p => p !== paperElement);
  
  // Mark as collected
  collectedPaperIds.push(paperId);
  papersCollected++;
  
  // Update counter
  paperCountDisplay.textContent = papersCollected;
  
  // Give extended invincibility to prevent instant death after modal
  invincible = true;
  
  // Add visual effect to show invincibility
  car.style.animation = 'invincibleFlash 1s ease-in-out infinite';
  
  setTimeout(() => {
    invincible = false;
    // Remove invincibility animation
    car.style.animation = speed > 110 ? 'carShake .1s infinite' : 'none';
  }, 5000); // 5 seconds of safety after resuming
  
  // Show story
  showStory(paperId);
}

function showStory(paperId){
  // Pause game
  gameActive = false;
  
  // Find the story document
  const story = storyDocuments.find(doc => doc.id === paperId);
  if (!story) return;
  
  // Update modal content
  storyTitle.textContent = story.title;
  storyText.textContent = story.text;
  
  // Show modal
  storyModal.classList.add('active');
  
  // Car says something encouraging
  const collectMessages = [
    "A piece of the truth... read it carefully.",
    "Another document. We're getting closer.",
    "This is important... what does it say?",
    "The story unfolds... FuelBorn's secrets revealed.",
    "Knowledge is our weapon. Read on."
  ];
  
  // Show message after modal closes
  setTimeout(() => {
    if (!storyModal.classList.contains('active')) {
      showSpeechBubble(collectMessages[Math.floor(Math.random() * collectMessages.length)], 3000);
    }
  }, 500);
}

function closeStoryModal(){
  storyModal.classList.remove('active');
  gameActive = true;
  
  // Show encouraging message
  const collectMessages = [
    "Now you know more... keep driving!",
    "The truth is heavy, but we carry it together.",
    "FuelBorn won't stop us. Not now.",
    "Every document brings us closer to freedom.",
    "Stay strong. We're in this together."
  ];
  showSpeechBubble(collectMessages[Math.floor(Math.random() * collectMessages.length)], 3000);
}

// Continue button handler
continueBtn.addEventListener('click', closeStoryModal);

// Allow closing modal with Enter or Space
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && storyModal.classList.contains('active')) {
    e.preventDefault();
    closeStoryModal();
  }
});