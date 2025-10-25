function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function stopSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.pause();
}

function modulateSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return;

  let audioSrc = audio.getAttribute("src"); //changed this because it only grabs the source once. Also, you try to reassign it down below, but have it as a const, so it can't happen.

  let noteName, octave;

  // Parse the filename like "sounds/X#.wav" or "sounds/XX.wav"
  if (audioSrc.length === 13) { //used === here instead of == to make sure it's a matching number & type
    noteName = audioSrc.substring(7, 8);
    octave = audioSrc.substring(8, 9);
  }
  if (audioSrc.length === 14) { //used === here instead of == to make sure it's a matching number & type
    noteName = audioSrc.substring(7, 9);
    octave = audioSrc.substring(9, 11);
  }

  if (e.shiftKey) { //checks if any shift is down
    if (e.code === "ShiftLeft") { // this is not going to work-- see email 
      audioSrc = `sounds/${noteName + (octave - 1)}.wav`;
    } else if (e.code === "ShiftRight") { //this is also not going to work-- see email
      audioSrc = `sounds/${noteName + (parseInt(octave) + 1)}.wav`;
    } else {
      audioSrc = `sounds/${noteName + octave}.wav`;
    }
    alert(audioSrc + " and " + noteName + octave + " +SHIFT!");
  }
  else {
    audioSrc = `sounds/${noteName + octave}.wav`;
    alert(audioSrc + " and " + noteName + octave);
  }
  audio.src = audioSrc;
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.all-keys'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', modulateSound);
window.addEventListener('keyup', stopSound);
