class Settings {

  constructor() {
    this.defaultColor = color(0, 0, 100); // just a default, it is never used

    // ----------------------------
    // SETTINGS THAT CAN BE CHANGED
    // ----------------------------
    // Color are set in HSB - Hue / Saturation / Brightness / Apha (if needed)
    // their range is:
    // Hue: 0 - 360
    // Saturation: 0 - 100
    // Brightness: 0 - 100
    // Alpha: 0 -100

    // TO CHANGE THE FONT
    // change it inside the function preLoad(), inside the app.js file

    // TO CHANGE THE MENTAL MAP FILE (txt file)
    // change it inside the function preLoad(), inside the app.js file

    // background color
    this.bgHue = 0;
    this.bgSaturation = 0;
    this.bgBrightness = 0;
    
    // bubbles color
    this.bubbleBgHue = 0;
    this.bubbleBgSaturation = 0;
    this.bubbleBgBrightness = 100;
    this.bubbleBgAlpha = 50; // when the bubble is a link, the other two bubbles that float on the back use this alpha

    // bubbles type color
    this.bubbleTypeHue = 0;
    this.bubbleTypeSaturation = 0;
    this.bubbleTypeBrightness = 0;

    // bubbleTypeSizeFactor sets the size of the typeface
    // because this is responsive, the size of the typeface is a relative measure to the width of the window
    // 0.01 means 1%, 0.1 means 10%, 0.9 means 90%, etc...
    this.bubbleTypeSizeFactor = 0.012; 

    // the same goes for the background circle where the text is
    // in this case, this percentage is relative to the width of the text inside
    this.bubbleBgSizeFactor = 0.5;

    // Breadcrumbs type color
    this.breadcrumbTypeHue = 0;
    this.breadcrumbTypeSaturation = 0;
    this.breadcrumbTypeBrightness = 100;
    
    // The size of the typeface of the breadcrumbs is relative to the width of the window
    this.breadcrumbTypeSizeFactor = 0.01;

    // this the the leading applied in between the breadcrumbs (1.4 means 140% of body of the font)
    this.breadCrumbTypeLeadingFactor = 1.4;

    // ---------------------- END OF SETTINGS THAT CAN BE CHANGED

    
    this.backgroundColor = color(this.bgHue, this.bgSaturation, this.bgBrightness);
    this.parentBubbleColor = color(this.bubbleBgHue, this.bubbleBgSaturation, this.bubbleBgBrightness);
    this.childBubbleColor = color(this.bubbleBgHue, this.bubbleBgSaturation, this.bubbleBgBrightness);
    this.bubbleTypeColor = color(this.bubbleTypeHue, this.bubbleTypeSaturation, this.bubbleTypeBrightness);
    this.bubbleTypeSize = windowWidth * this.bubbleTypeSizeFactor;
    this.breadcrumbTypeColor = color(this.breadcrumbTypeHue, this.breadcrumbTypeSaturation, this.breadcrumbTypeBrightness);
    this.breadcrumbTypeSize = windowWidth * this.breadcrumbTypeSizeFactor;
    this.breadcrumbTypeLeading = this.breadcrumbTypeSize * this.breadCrumbTypeLeadingFactor;
  }
}