//Ryan Blackwell 10/27/25
//My biggest issues were creating elements via JS. If I could do it over I'd just put them in the HTML as this runs slower and I think its because of this.
//I may have used the this keyword incorrectly or too much since I'm still learning how it works in JS.
//The run speed issue could also be the blur or my old laptop
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const imageBar = document.querySelector(".hero");
const miniBar = document.querySelector(".sliderBar");
const infoBar = document.querySelector(".infoBar");
let imageIndex = 0;
const imageUrls = ["4x5Neglect", "4x5Burn", "4x5Rot", "4x5CrystalSun", "CastleInTheReflection", "KCBankMidwest", "KCFence", "KCSkyline", "KCTheGrand", "KCStreets", "Crystal", "SelfPortrait", "SilentScream", "Grandma", "StillCandleHouse", "StillSwanCandle", "KemperRear", "KemperInterior", "WWIMuseumPool", "Sunset"];
const infoList = [
  "This image is of a house plant that has been around since I was a child, yet I've never seen anyone give it much attention. Its vines spill out from the pot down the edge of the table untrimmed, unkempt, unwanted.",
  "I made this image by taking a slow exposure of a fake flower that I set fire to and then having a flash go off. There's a faint ghost of the original plant while the flower burns in the main view. Why? I just thought it'd look cool.",
  "I completely messed up this image. I meant to take to separate photos but I must have reinserted a film slide that I already shot. The images are a macro of dead insects on a deer skull with a closeup shot of the antler and skull overlayed on top. I think the accidental double exposure is just what this image needed.",
  "For this image I was doing a whole set of these, I took a bunch of glass vases and bowls from my grandmother's collection placed them under harsh sunlight and let whatever happened happen.",
  "This is one of my favorite images that I've taken. Its just the JE Dunn Construction's office building and the KCMO City Hall, but on the curved wall the reflection doubles back on itself and turns the City Hall into a castle. I was lucky to be there on a good day since the plants where green and vibrant to contrast the aqua windows.",
  "",
  "This is just a normal rusted fence with some vines on it, but I wanted to play with the hue, saturation, and lightness of the colors.",
  "",
  "None of these buildings are particularly interesting like the ones in the West Bottoms are. But, they have a good visual weight balance and the reflection of The Grand is nice.",
  "If my fascination with larger cities isn't apparent, then this image should show that to you. It's nothing particularly special, but the reflections from various windows onto the street was really fun to walk around in. I've also seen this overhead walkway as a hero image in some news articles.",
  "This was the ultimate last minute image for my Intro to Photography final. Essentially it's just a sanded glass pebble, but I took a macro lens, placed a candle behind the glass, and placed the whole thing on a mirror to create an ambiguous image of a crystal emitting light.",
  "I usually hate being in pictures and this was no different. I was stuck waiting for people to clear out of the studio so I could use the backdrop and lights. So, duduring this time I tested some long exposures where I wrapped string lights around my head and tried to stay as still as I could while shaking my head. The result is a stream of stars melting from my face. It'd make a good emo or lofi indie album cover though.",
  "This image was the result of several hours of testing and getting nothing. I had five red led wires attached to each of my fingers and I sat there trying to get the dimmest flash possible to freeze just enough of my face and the scrape my nails against my cheek and drag my eyelid down. I could probably nail it now but I don't have lights.",
  "These items all belong to my late great grandma Betty French who lived to 99. I loved her a lot and she always brought a comforting, yet high-class vibe with her wherever she went. I was the only one of my mother's kids who got to meet with her frequently as a kid because apparently I was the only one with manners. We shared a lot of games of dominoes and rummikub together. I wanted to put some of my feelings for her into a still using various objects of hers.",
  "This is more of a process photo than a final product. I like to take things that interact with light, place them in the dark on various bases and backgrounds and play with lighting, distance, and perspective to make something interesting.",
  "I don't know what compelled me to make this image. Essentially it started with having a cool swan candle that I wanted a picture of. Over time, I just kept adding more things, started with a tray of water under, then one flash, then two flashes with different colors, then more candles, and eventually throwing some flowing branches in.",
  "",
  "",
  "",
  "Thanks for checking out my webpage!"
]
var allImages = [];
var allInfo = [];
var allMinis = [];
//Here I'm dynamically adding divs for images, minis, and info until there are no more urls to use
//It's this or 20 classes and elements for each type in html

//BG IMG Prop like: url("images/4x5Neglect.jpg")
function Slide(imageUrl, info, index) {
  const imageDiv = document.createElement("div");
  const infoDiv = document.createElement("div");
  const miniDiv = document.createElement("div");
  this.imageDiv = imageDiv;
  this.infoDiv = infoDiv;
  this.miniDiv = miniDiv;
  this.index = index;
  this.imageUrl = imageUrl;
  this.info = info ? info : "No information provided.";

  this.imageDiv.style.backgroundImage = "url(\'images/" + imageUrl + ".jpg\')";
  this.imageDiv.textContent = this.imageUrl;
  this.infoDiv.textContent = this.info;
  this.miniDiv.style.backgroundImage = this.imageDiv.style.backgroundImage;

  this.imageDiv.className = "image";
  this.infoDiv.className = "info";
  this.miniDiv.className = "mini";
}
//This creates all the slides
for (let i = 0; i < imageUrls.length; i++) {
  var newImage = new Slide(imageUrls[i], infoList[i], i);
  allImages.push(newImage.imageDiv);
  allInfo.push(newImage.infoDiv);
  allMinis.push(newImage.miniDiv);

  imageBar.appendChild(newImage.imageDiv);
  infoBar.appendChild(newImage.infoDiv);
  miniBar.appendChild(newImage.miniDiv);
}

function imageDisplay(n) {
  /* To display the images, I'm taking the index, 
   and using it to set css for the appropriate images and related info
   using a for loop based off of the length
   variables: images, minis, and infoList must all be the same length for this
   separate for loops could be used instead but I'm ensuring that the have the same length on page load 
  */

  console.log("Called imageDisplay with:", n, "Curr index", imageIndex);
  //if n is OOB loop again
  if (n > allImages.length - 1) {
    imageIndex = 0;
    console.log("New index", imageIndex);
  }
  if (n < 0) {
    imageIndex = allImages.length - 1;
    console.log("New index", imageIndex);
  }

  //make sure everything else is "off"
  for (let i = 0; i < allImages.length; i++) {
    allImages[i].style.display = "none";
    allInfo[i].style.display = "none";
    allMinis[i].classList.toggle('active', false);
  }
  console.log("Now displaying", imageIndex);
  allImages[imageIndex].style.display = "block";
  allInfo[imageIndex].style.display = "block";
  allMinis[imageIndex].classList.toggle('active', true);
}

//Initialize display
imageDisplay(imageIndex);

//This will be accessing the minis, but not like an object so the index prop doesn't work
allMinis.forEach(function(mini, index) {
  mini.addEventListener('click', () => {
    console.log("Hi! I'm index", index);
    imageIndex = index;
    imageDisplay(imageIndex);
    console.log("Hi! We're done here.");
  });
});
prevBtn.addEventListener('click', () => {
  imageDisplay(--imageIndex);
  console.log("Moving to image", imageIndex);
});
nextBtn.addEventListener('click', () => {
  imageDisplay(++imageIndex);
  console.log("Moving to image", imageIndex);
});


/* Ensure minis, infoList have the same # of elements as there are images
Not really necessary, but it felt like good practice? at least from my perspective of software dev
It could accidentally append a mini or info and mess up the elements matching the images
The image classes like image01 could be used with info and minis like info01 mini01 to find which is missing
 and fix it but that seems excessive */

/* if (miniBar.length !== images.length) {
 for (let miniLength = miniBar.length; miniLength < images.length; miniLength++) {
   const span = document.createElement("span");
   span.classList.add("mini");
   const sliderBar = document.querySelector("sliderBar");
   sliderBar.append(span);
   console.log("Added blank mini... please contact site admin about missing mini");
 }
 if (minis.length > images.length) { console.error("Too many minis... are you missing a hero image?") }
}
if (infoList.length !== images.length) {
 for (let infoLength = infoList.length; infoLength < infoList.length; infoLength++) {
   const div = document.createElement("div");
   const text = document.createTextNode("No info available.");
   div.append(text);
   div.classList.add("info");
   const infoBar = document.querySelector("infoBar");
   infoBar.append(div);
   console.log("Added placeholder info... please contact site admin about missing info");
 }
 if (infoList.length > images.length) { console.error("Too much info... are you missing a hero image?") }
} */

/* Old code
 //finding miniIndex
  let miniIndex;
  for (i = 0, n = 1; i < minisClass.length; i++, n++) {
    //Could be done with just i, but I wanted to keep i as a number only and only type cast n
    if (i < 10) { n = String("0" + n) }
    else { String(n) }
    if (mini.className.match("mini mini" + n)) { miniIndex = i }
    else { Number(n) }
  }
*/