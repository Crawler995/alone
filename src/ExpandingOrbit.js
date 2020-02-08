// hard to understand for others ^^

class ExpandingOrbit {
  constructor({
    orbit,
    sphere,
  }) {
    this.radius = orbit.radius;
    this.pos = orbit.pos;
    this.dir = orbit.dir;
    this.weight = orbit.weight;
    this.color = orbit.color;
    this.alpha = 1;

    this.sphere = new Sphere({
      radius: sphere.radius,
      pos: createVector(0, 0, 0),
      color: sphere.color
    });

    this.orbitExpandV = orbit.expandV;
    this.orbitFadeV = orbit.fadeV;

    this.sphereSpinAngle = sphere.spinAngle;
    this.sphereSpinV = sphere.spinV;
    this.sphereFree = false;
    this.sphereFreeFlyV = undefined;

    this.isGrowing = true;
    this.isDead = false;
  }

  updateAlpha() {
    this.color.setAlpha(this.alpha);
    if(this.isGrowing) {
      this.sphere.alpha = this.alpha;

      this.alpha += this.orbitFadeV * 2;
      if(this.alpha >= 255) {
        this.alpha = 255;
        this.isGrowing = false;
      }
    } else {
      this.alpha -= this.orbitFadeV;
      if(this.alpha < 0) {
        this.alpha = 0;
      }
    }
  }

  draw() {
    push();

    translate(this.pos);
    rotateX(this.dir.x);
    rotateY(this.dir.y);
    rotateZ(this.dir.z);
    
    if(alpha(this.color) > 0) {
      noFill();
      
      this.updateAlpha();
      stroke(this.color);
      strokeWeight(this.weight);
      
      ellipse(0, 0, this.radius * 2, this.radius * 2, 48);

      this.radius += this.orbitExpandV;

      this.sphere.pos = createVector(this.radius * sin(this.sphereSpinAngle), 
        this.radius * cos(this.sphereSpinAngle), 0);
      this.sphereSpinAngle += this.sphereSpinV;

      this.sphere.draw();
    } else if(alpha(this.color) == 0) {
      this.radius += this.orbitExpandV;

      this.sphere.pos = createVector(this.radius * sin(this.sphereSpinAngle), 
        this.radius * cos(this.sphereSpinAngle), 0);
      this.sphereSpinAngle += this.sphereSpinV;

      this.sphere.alpha -= this.orbitFadeV;
      if(this.sphere.alpha <= 0) {
        this.sphere.alpha = 0;
        this.isDead = true;
      }
      this.sphere.draw();
    }

    pop();
  }
}