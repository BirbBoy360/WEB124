function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
}

// New function
function stopSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    if (!audio) return;

    audio.pause();
}

// New play sound function that supports modulation
function modulateSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const audioSrc = document.querySelector(`audio[data-key="${e.keyCode}"]`).getAttribute("src");
    let noteName;
    let octave;
    if (!audio) return;
    //audio file path is like sounds/X#.wav
    if (audioSrc.length == 13) {noteName = audioSrc.substring(7, 8);
        octave = audioSrc.substring(8, 9);
    }
    if (audioSrc.length == 14) {noteName = audioSrc.substring(7, 9);
        octave = audioSrc.substring(9, 11);
    }
    if (e.key === 'ShiftLeft') {
        audioSrc = `sounds/${noteName + (octave - 1)}.wav`;
        alert(audioSrc + " and " + noteName + octave);
        audio.play();
    }
    if (e.key === 'ShiftRight') {
        audioSrc = `sounds/${noteName + (octave + 1)}.wav`;
        alert(audioSrc + " and " + noteName + octave);
        audio.play();
    }
    else {
        audio.src = `sounds/${noteName + octave}.wav`;
        alert(audioSrc + " and " + noteName + octave);
        audio.play();
    }
}

const keys = Array.from(document.querySelectorAll('.all-keys'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', modulateSound);

// Need sound to only stop on keyup
window.addEventListener('keyup', stopSound);