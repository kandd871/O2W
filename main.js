let testImage;
let flowerImages = [];
let pixelDrawSlider; // Slider for controlling pixel drawing
let imageSizeSlider; // Slider for controlling image size
let imgInterval; // Variable to hold the interval function

function preload() {
  testImage = loadImage('text.png'); // Ensure the main image is loaded
  for (let i = 1; i <= 9; i++) {
    flowerImages.push(loadImage(`imgs/Rectangle ${i}.png`)); // Load images into array
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Slider for controlling the probability of drawing images
  pixelDrawSlider = createSlider(0, 100, 40); // Slider with range 0 to 100, starting at 40
  pixelDrawSlider.position(10, 10); // Position slider on the canvas
  
  // Slider for controlling image size scaling
  imageSizeSlider = createSlider(10, 100, 40); // Slider with range 10 to 100, starting at 35
  imageSizeSlider.position(10, 30); // Position slider below the first one
  
  scaleTextImageToFitWidth(); // Scale test image to fit screen width
  testImage.loadPixels(); // Load pixel data only once
  background(255); // Set background color only once

  // Call the function every 1.5 seconds
  imgInterval = setInterval(placeImagesOnBlackPixels, 1000);
}

function draw() {
  // Draw slider values on screen
  fill(0);
}

function scaleTextImageToFitWidth() {
  let aspectRatio = testImage.height / testImage.width;
  testImage.resize(windowWidth, windowWidth * aspectRatio); // Scale to fit width
}

function placeImagesOnBlackPixels() {
  background(255); // Clear the canvas

  let imgX = (width - testImage.width) / 2;
  let imgY = (height - testImage.height) / 2;
  let drawProbability = pixelDrawSlider.value() / 1000; // Convert slider value to a smaller probability

  for (let x = 0; x < testImage.width; x++) {
    for (let y = 0; y < testImage.height; y++) {
      const pixel = getQuick(testImage, x, y);
      const [r, g, b, a] = pixel;

      // Check if the pixel is black (adjust threshold if needed)
      if (r < 10 && g < 10 && b < 10 && a > 0) {
        // Draw based on the slider-controlled probability
        if (random(1) < drawProbability) {
          createImageInstance(x + imgX, y + imgY); // Place a random image
        }
      }
    }
  }
}

// Helper function to get pixel color quickly
function getQuick(img, x, y) {
  const i = (y * img.width + x) * 4;
  return [
    img.pixels[i],     // Red
    img.pixels[i + 1], // Green
    img.pixels[i + 2], // Blue
    img.pixels[i + 3]  // Alpha
  ];
}

// Function for displaying a random image at a given position
function createImageInstance(x, y) {
  let randomImage = random(flowerImages); // Select a random image from the array
  let scaleFactor = imageSizeSlider.value() / 1500; // Use slider value to set scale factor
  image(randomImage, x, y, randomImage.width * scaleFactor, randomImage.height * scaleFactor); // Scale image size
}
