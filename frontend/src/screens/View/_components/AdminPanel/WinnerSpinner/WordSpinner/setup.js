/* eslint-disable */

let biggestFontSize = 36;
const wordHeight = 48;
const canvasHeight = 240;
const centerMargin = 0;
const minimumOptions = 6;
const topMargin = 24;

const setup = (game, width) => {
  game.createCanvas(width, canvasHeight);

  const increasedFontSize = width / 15; // calculate biggest font size based on width

  if (increasedFontSize > biggestFontSize) {
    biggestFontSize = increasedFontSize;
  }

  game.wheel1 = new Wheel(game, game.words);

  game.textFont(
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
  );
  game.textAlign(game.CENTER);
  game.frameRate(30);
};

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Wheel {
  constructor(game, options) {
    this.options = options;
    this.spinning = false;
    this.adjusting = false;
    this.g = game;

    this.yCenter = this.g.height / 2 + centerMargin; // + margin
    this.xPos = this.g.width / 2; // centered

    while (this.options.length < minimumOptions) {
      this.options = [...this.options, ...options]; // duplicate options to meet the minimum requirement
    }

    this.yPositions = [];
    this.totalYHeight = 0;
    this.centerDistances = [];

    this.options.forEach((o, idx) => {
      this.yPositions[idx] = (idx + 1) * wordHeight - topMargin;
      this.totalYHeight = this.yPositions[idx];
    });
  }

  getWinnerIdx() {
    let winDist = this.yCenter;
    let winIdx = null;

    this.yPositions.forEach((yPos, idx) => {
      const pos = this.yCenter - yPos;

      if (pos < 0) {
        // skip negative
        // sometimes passed item is closer to the center
        return;
      }

      if (pos < winDist) {
        winDist = pos;
        winIdx = idx;
      }
    });

    return winIdx;
  }

  spin() {
    this.rollTimeout = generateRandomNumber(4500, 6500);
    this.speed = 16;
    this.speedDecreaseInterval = this.rollTimeout / this.speed;
    this.speedDecrease = this.spinning = true;

    const interval = setInterval(() => {
      this.speed -= 1;
    }, this.speedDecreaseInterval);

    setTimeout(() => {
      this.spinning = false;
      clearInterval(interval);
      this.adjusting = true;
    }, this.rollTimeout);
  }

  increatePositions(increase) {
    this.yPositions.forEach((yPos, idx) => {
      let newPos = yPos + increase;

      if (newPos >= this.totalYHeight) {
        newPos = newPos - this.totalYHeight - topMargin; // loop if exceeeds total height
      }

      this.yPositions[idx] = newPos;
    });
  }

  onDone() {
    this.g.onDone(this.options[this.getWinnerIdx()]);
  }

  update() {
    // Update positions if spinning
    if (this.spinning === true) {
      this.increatePositions(this.speed);
    } else if (this.adjusting === true) {
      // adjust element to the center on end
      const winYPos = this.yPositions[this.getWinnerIdx()];

      if (winYPos >= this.yCenter) {
        this.adjusting = false;
        this.onDone();
      } else {
        this.increatePositions(1);
      }
    }

    this.options.forEach((option, idx) => {
      const yPos = this.yPositions[idx];

      const distanceFromCenter = Math.abs(this.yCenter - yPos);

      // Calculate Font Size
      const fontSize = biggestFontSize - distanceFromCenter / 5;

      this.g.textSize(fontSize);
      this.g.textStyle(this.g.BOLD);

      // Calculate Font Color (base on font size)
      let fontColor = (biggestFontSize - fontSize) * 12;
      fontColor = fontColor < 30 ? 0 : fontColor;
      this.g.fill(fontColor);

      // Draw text
      this.g.text(option.username, this.xPos, yPos);
    });
  }
}

export default setup;
