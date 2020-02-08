let orbits = [];

setup = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);
  setInterval(() => {
    orbits.push(new ExpandingOrbit({
      orbit: {
        radius: 120,
        pos: createVector(0, -30, 0),
        dir: createVector(PI / 2 / 1.4, 0, 0),
        weight: 2,
        color: color(colorboard.orbit),
        expandV: 0.4,
        fadeV: 0.6
      },
      sphere: {
        radius: 4,
        color: color(colorboard.sphere),
        spinAngle: random(0, PI * 2),
        spinV: PI / 500
      }
    }));
  }, 2500);
}

draw = () => {
  background(color(colorboard.background));

  orbits.forEach((orbit, i) => {
    orbit.draw();

    if(orbit.isDead) {
      orbits.splice(i, 1);
    }
  });
}