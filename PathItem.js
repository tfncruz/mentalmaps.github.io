class PathItem {
  constructor(t, x, y) {
    this.text = " / " + t + " ";
    this.posX = x;
    this.posY = y;
    this.sizeW = textWidth(this.text);
    this.sizeH = settings.breadcrumbTypeSize;
    this.c = settings.breadcrumbTypeColor;
  }

  display() {
    textSize(this.sizeH);
    textAlign(LEFT, TOP);
    fill(this.c);
    text(this.text, this.posX, this.posY);
  }
}