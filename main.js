let testImage;
let flowerImages = [];

function preload() {
  testImage = loadImage('text.png'); // Ensure the main image is loaded
  for (let i = 1; i <= 9; i++) {
    flowerImages.push(loadImage(`imgs/Rectangle ${i}.png`)); // Load images into array
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  scaleTextImageToFitWidth(); // Scale test image to fit screen width
  testImage.loadPixels(); // Load pixel data only once
  background(255); // Set background color only once
  placeImagesOnBlackPixels(); // Draw images once
}

function scaleTextImageToFitWidth() {
  let aspectRatio = testImage.height / testImage.width;
  testImage.resize(windowWidth, windowWidth * aspectRatio); // Scale to fit width
}

function placeImagesOnBlackPixels() {
  let imgX = (width - testImage.width) / 2;
  let imgY = (height - testImage.height) / 2;

  for (let x = 0; x < testImage.width; x++) {
    for (let y = 0; y < testImage.height; y++) {
      const pixel = getQuick(testImage, x, y);
      const [r, g, b, a] = pixel;

      // Check if the pixel is black (adjust threshold if needed)
      if (r < 10 && g < 10 && b < 10 && a > 0) {
        // Draw on 50% of the black pixels
        if (random(1) < 0.055) {
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
  image(randomImage, x, y, randomImage.width / 35, randomImage.height / 35); // Adjust size if needed
}
