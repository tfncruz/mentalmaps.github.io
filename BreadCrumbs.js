class BreadCrumbs {
  constructor() {
    this.path = [];
  }

  display() {
    for (let i = 0; i < this.path.length; i++) {
      this.path[i].display();
    }
  }

  addToPath(s) {
    let x = 10;
    let y = 0;

    if (this.path.length > 0) {
      // Update all others to incorporate the new one
      for (let i = 0; i < this.path.length; i++) {
        this.path[i].posY -= settings.breadcrumbTypeLeading;
      }
      y = windowHeight - settings.breadcrumbTypeLeading;
    } else {
      y = windowHeight - settings.breadcrumbTypeLeading;
    }

    this.path.push(new PathItem(s, x, y));

    //console.log("Item added to path:");
    //this.printAllPath();
    //console.log("\n");
  }

  checkClick() {
    let clicked = -1;
    for (let i = 0; i < this.path.length; i++) {
      if (mouseX >= this.path[i].posX && mouseX <= this.path[i].posX + this.path[i].sizeW &&
        mouseY >= this.path[i].posY && mouseX <= this.path[i].posY + this.path[i].sizeH) {
        clicked = i;
      }
    }
    return clicked;
  }

  updatePath(i) {
    while (this.path.length > i + 1) {
      this.path.pop();
    }

    // Adjust positions
    let temp = this.path.length;
    for (let k = 0; k < this.path.length; k++) {
      this.path[k].posY = windowHeight - (temp * settings.breadcrumbTypeLeading);
      --temp;
    }

    //console.log("breadcrumbs path updated: ");
    this.printAllPath();
  }

  updatePosition() {
    for (let i = 0; i < this.path.length; i++) {
      this.path[i].posY = windowHeight - ((this.path.length-i) * settings.breadcrumbTypeLeading);
    }
  }

  printAllPath() {
    for (let i = 0; i < this.path.length; i++) {
      console.log("index:" + i + " " + this.path[i].text + " x:" + this.path[i].posX + " y:" + this.path[i].posY + " w:" + this.path[i].sizeW + " h:" + this.path[i].sizeH);
    }
  }
}