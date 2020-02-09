let orbits = [];
let music;
let fft;

let centerSphere;

let time = 0;
const minDivideTime = 0.4;


addExpandingOrbit = () => {
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
}

setup = () => {
  createCanvas(windowWidth, windowHeight, WEBGL);

  centerSphere = new Sphere({
    radius: 20,
    pos: createVector(0, -30, 0),
    color: color(colorboard.sphere)
  });

  // music = loadSound('../assets/Can We Kiss Forever.mp3', () => {
  //   title.innerHTML = 'Where is my mind?';

  //   music.setLoop(true);
  //   music.play();

  //   addExpandingOrbit();

    setInterval(() => {
      if(time < 0.01) {
        return;
      }
      time -= 0.01;
    }, minDivideTime / 0.01);

  // }, () => {
  //   title.innerHTML = 'Something is lost...';
  // }, (p) => {
  //   title.innerHTML = 'Where is my mind? | Loading ' + p * 100 + '%';
  // });

}

draw = () => {
  background(color(colorboard.background));
  smooth();
  centerSphere.draw();

  const frequency = analyseFrequency();
  if(frequency.length == 0) {
    return;
  }
  let level = 0;

  for(let i = 0; i < 32; i++) {
    level += frequency[i];
  }
  level /= 32;

  centerSphere.radius = map(level, 0, 255, 20, 50);
  if(level > 185 && time < 0.01) {
    addExpandingOrbit();
    time = minDivideTime;
  }

  orbits.forEach((orbit, i) => {
    orbit.draw();

    if(orbit.isDead) {
      orbits.splice(i, 1);
    }
  });
}