let isKeyDown = false; 
let isCtrlDown = false;
let isShiftDown = false;

// Function from original drum kit js
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// New play sound function that supports modulation
function modulateSound(e) {
  if (e.code === "ControlLeft" && e.code === "ShiftLeft") {
    alert("Please release either shift or ctrl, not both.")
    return;
  }
  
  //Something weird I noticed, e.keycode exists and I can select the audio to play using it, but cant console.log it
  console.log("Key Code: " + e.code, e.keycode + "\nNow Handling Mods...")
  if (e.code === "ControlLeft" || "ControlRight") isCtrlDown = true;
  if (e.code === "ShiftLeft" || "ShiftRight") isShiftDown = true;

  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) {
    console.log("Audio element was null, returning...")
    return;
  }
  if (isKeyDown && (!isCtrlDown && !isShiftDown)) {
    console.log("Already playing")
    return;
  } //prevents play from bugging out by holding key
  audio.currentTime = 0;
  let audioSrc = audio.getAttribute("src");
  let noteName, octave;
  isKeyDown = true;
  if (audioSrc.length != 13 && audioSrc.length != 14) {
  console.log("Error: Src String & length: " + audioSrc + " " + audioSrc.length + 
    "\nE Code: " + e + "\nShift Status L & R: " + e.shiftkey + " " + e.ctrlkey
  + "\nAudio Check: " + audio)}
    
  //audio file path is like sounds/X(S)N.wav
  if (audioSrc.length === 13) {
    noteName = audioSrc.substring(7, 8);
    octave = audioSrc.substring(8, 9);
  }
  else if (audioSrc.length === 14) { //includes S in note name
    noteName = audioSrc.substring(7, 9);
    octave = audioSrc.substring(9, 10);
  }
  else {alert("Audio Src String Length Incorrect. Size was " + audioSrc.length)}

  

  if (isShiftDown) { 
    console.log("Shift was down")
    audioSrc = `sounds/${noteName + (parseInt(octave) + 1)}.wav`;   
  }
  else if (isCtrlDown) { 
    console.log("Ctrl was down")
    audioSrc = `sounds/${noteName + (parseInt(octave) - 1)}.wav`; 
  }
  else { 
    console.log("No modifiers detected")  
    audioSrc = `sounds/${noteName + octave}.wav`; 
  }
  
  audio.src = audioSrc;
  audio.play();
  console.log("Playing: " + audioSrc + " and " + noteName + octave + " Shift?: " + e.shiftkey + " " + e.ctrlkey);

  isKeyDown = true;
}
/* - Create two booleans for leftShiftDown and rightShiftDown, equalling false.
- Reset the shift flag inside stopSound for when the keys are released
- Update the shift flags in modulateSound as the keys are pressed
- Reset your logic to say if (leftShiftDown && !rightShiftDown)/(!leftShiftDown && rightShiftDown)/etc. etc., do this thing.*/

const keys = Array.from(document.querySelectorAll('.all-keys'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', modulateSound);
window.addEventListener('keyup', function(e) {
  isKeyDown = false;
  if (e.code === "ControlLeft" || "ControlRight") isCtrlDown = false;
  if (e.code === "ShiftLeft" || "ShiftRight") isShiftDown = false;
});
