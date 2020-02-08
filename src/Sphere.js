class Sphere {
  constructor({radius, pos, color}) {
    this.radius = radius;
    this.pos = pos;
    this.color = color;

    this.alpha = 255;
  }

  draw() {
    push();

    noStroke();
    this.color.setAlpha(parseInt(this.alpha));
    fill(this.color);
    translate(this.pos);
    sphere(this.radius);

    pop();
  }
}