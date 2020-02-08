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
  fft = new p5.FFT();

  centerSphere = new Sphere({
    radius: 20,
    pos: createVector(0, -30, 0),
    color: color(colorboard.sphere)
  });

  const title = document.getElementsByClassName('title')[0];
  music = loadSound('../assets/Can We Kiss Forever.mp3', () => {
    title.innerHTML = 'Where is my mind?';

    music.setLoop(true);
    music.play();

    addExpandingOrbit();

    setInterval(() => {
      if(time < 0.01) {
        return;
      }
      time -= 0.01;
    }, minDivideTime / 0.01);

  }, () => {
    title.innerHTML = 'Something is lost...';
  }, (p) => {
    title.innerHTML = 'Where is my mind? | Loading ' + p * 100 + '%';
  });

  
}

draw = () => {
  background(color(colorboard.background));

  fft.smooth();
  const spectrum = fft.analyze(16);
  centerSphere.pos.y = map(spectrum[3], 0, 255, 40, -100);
  if(spectrum[3] > 155 && time < 0.01) {
    addExpandingOrbit();
    time = minDivideTime;
  }

  smooth();
  orbits.forEach((orbit, i) => {
    orbit.draw();

    if(orbit.isDead) {
      orbits.splice(i, 1);
    }
  });

  centerSphere.draw();
}