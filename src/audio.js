const audio = document.getElementsByTagName('audio')[0];
let analyser = undefined;

analyseFrequency = () => {
  if(audio.paused || analyser === undefined) {
    return [];
  }
	const frequencyArray = new Uint8Array(analyser.frequencyBinCount);
	analyser.getByteFrequencyData(frequencyArray);
	return frequencyArray;
}

mouseClicked = () => {
  if(audio.paused) {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();

    const title = document.getElementsByClassName('title')[0];

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    audio.play();
    audio.loop = true;
    title.innerHTML = 'Where is my mind?';

    addExpandingOrbit();
  }
}