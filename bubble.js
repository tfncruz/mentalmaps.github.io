class Bubble {
  constructor(t, l, x, y) {
    this.hasChilds = 0;
    this.factorX = 0;
    this.factorY = 0;
    this.noiseTX = random(10);
    this.noiseTY = random(10);
    this.text = t;
    this.textSize = settings.bubbleTypeSize;
    this.level = l;
    this.bgBrightness = settings.bubbleBgBrightness;
    this.bgColor = settings.parentBubbleColor;
    this.textColor = settings.bubbleTypeColor;
    this.posX = x;
    this.posY = y;

    textSize(this.textSize);
    if (textWidth(this.text) <= windowWidth / 3) this.bgSize = textWidth(this.text) * 1.5;
    else this.bgSize = textWidth(this.text) * 0.5;

    this.visible = false;
  }

  display() {
    if (this.visible) {
      noStroke();

      if (this.hasChilds != 0) {
        fill(settings.bubbleBgHue,settings.bubbleBgSaturation,settings.bubbleBgBrightness,settings.bubbleBgAlpha);
        this.factorX = map(noise(this.noiseTX), 0, 1, this.posX - 15, this.posX + 15);
        this.factorY = map(noise(this.noiseTY), 0, 1, this.posY - 15, this.posY + 15);
        ellipse(this.factorX, this.factorY, this.bgSize * 1.1, this.bgSize * 1.1);
        this.noiseTX += 0.005;
        this.noiseTY += 0.005;
        this.factorX = map(noise(this.noiseTX), 0, 1, this.posX - 10, this.posX + 10);
        this.factorY = map(noise(this.noiseTY), 0, 1, this.posY - 10, this.posY + 10);
        ellipse(this.factorX, this.factorY, this.bgSize * 1.2, this.bgSize * 1.2);
        this.noiseTX += 0.01;
        this.noiseTY += 0.01;
      }

      fill(this.bgColor);
      ellipse(this.posX, this.posY, this.bgSize, this.bgSize);

      fill(this.textColor);

      textSize(this.textSize);
      if (textWidth(this.text) <= windowWidth / 3) this.bgSize = textWidth(this.text) * 1.5;
      else this.bgSize = textWidth(this.text) * 0.5;

      textAlign(CENTER, CENTER);
      text(this.text, this.posX, this.posY, this.bgSize * 0.8, this.bgSize * 0.8);
    }
  }

  setXY(x, y) {
    this.posX = x;
    this.posY = y;
  }
}