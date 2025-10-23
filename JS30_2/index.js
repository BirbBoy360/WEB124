let isKeyDown = false; 

// Play sound function
function playSound(e) {

  //Something weird I noticed, e.keycode exists and I can select the audio to play using it, but cant console.log it
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyElement = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) {
    console.log("Audio element was null, returning...")
    return;
  }
  //Prevents duplicating play event repeatedly on keyhold
  if (isKeyDown) {
    return;
  }
  keyElement.classList.add('playing');
  
  audio.currentTime = 0;
  audio.play();
  console.log("Playing: " + audio.getAttribute("src"))
  isKeyDown = true;
}
function stopSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyElement = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) {
    console.log("Audio element was null, returning...")
    return;
  }
  console.log(keyElement);
  keyElement.classList.remove('playing');
  audio.pause();
  isKeyDown = false;
}

window.addEventListener('keydown', playSound);
window.addEventListener('keyup', stopSound)