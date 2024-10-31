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

function placeImagesO