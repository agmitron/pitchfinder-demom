import * as Pitchfinder from "pitchfinder";

async function init() {
  const audioContext = new window.AudioContext();
  const micStream = await window.navigator.mediaDevices.getUserMedia({
    audio: true
  });

  const analyserAudioNode = audioContext.createAnalyser();
  analyserAudioNode.fftSize = 2048;
  analyserAudioNode.minDecibels = -100;
  analyserAudioNode.maxDecibels = -10;
  analyserAudioNode.smoothingTimeConstant = 0.85;

  const sourceAudioNode = audioContext.createMediaStreamSource(micStream);
  sourceAudioNode.connect(analyserAudioNode); // See initialization in the AnalyserNode section of the demo.

  const buffer = new Float32Array(analyserAudioNode.fftSize);
  const detectPitch = Pitchfinder.YIN();

  function pitch() {
    analyserAudioNode.getFloatTimeDomainData(buffer);
    const freq = detectPitch(buffer);
    console.log({ freq });
  }

  setInterval(pitch, 1000);
}

init();
