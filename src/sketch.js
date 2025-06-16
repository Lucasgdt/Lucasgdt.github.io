export function setup(p) {
  p.createCanvas(p.windowWidth, p.windowHeight);
  p.background(0);
}

export function draw(p) {
  p.noStroke();
  p.fill(255, 50);
  p.ellipse(p.mouseX, p.mouseY, 30, 30);
}

export function windowResized(p) {
  p.resizeCanvas(p.windowWidth, p.windowHeight);
}
