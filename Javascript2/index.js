let isKeyDown = false; 

// Function from original drum kit js
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

// Play sound function
function playSound(e) {

  //Something weird I noticed, e.keycode exists and I can select the audio to play using it, but cant console.log it
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) {
    console.log("Audio element was null, returning...")
    return;
  }
  //Prevents duplicating play event repeatedly on keyhold
  if (isKeyDown) {
    return;
  }
  audio.currentTime = 0;
  audio.play();
  console.log("Playing: " + audio.getAttribute("src"))
  isKeyDown = true;
}
const keys = Array.from(document.querySelectorAll('.all-keys'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
window.addEventListener('keyup', function(e) {isKeyDown = false;} )