/* Ryan Blackwell 10/30/25
   For this one, I took the motivational flexboxes turned them into "panels" and added buttons to cycle content, as well as a hero image that appears first over everything 
   Let me know if I should be compressing files more than this. */
const panels = document.querySelectorAll('.panel');
const removeHeroBtn = document.querySelector('.removeHero');
const cycleHeroBtn = document.querySelector('.cycleHero');
const infoHeroBtn = document.querySelector('.infoHero');
const hero = document.querySelector('.heroPanel');

//Image URL arrays to iterate through code starts line 45-ish
function panel(selector, urls) {
  this.selector = selector;
  this.index = 0;
  this.urls = urls;
  document.querySelector('.' + selector).style.backgroundImage = this.urls[0];
}
let heroPanel = new panel("heroPanel", [
  'url(Birds/IFoundHim-2777.jpg)', //smiling bird
  'url(Birds/IFoundHim-2857.jpg)', //horiz smile
  'url(Birds/IFoundHim-2863.jpg)',  //horiz overexposed-smile
  'url(Birds/IFoundHim-2772.jpg)' //wink
]);
let panel1 = new panel("panel1", [
  'url(Birds/KingOfTheWest-4138.jpg)', //in-flight
  'url(Birds/KingOfTheWest-4920.jpg)', //wire
  'url(Birds/KingOfTheWest-3095.jpg)', // alt wire
  'url(Birds/KingOfTheWest-3464.jpg)' //tree
]);
let panel2 = new panel("panel2", [
  'url(Birds/FemaleCardinal-4692.jpg)',
  'url(Birds/NorthernCardinal-3403.jpg)' //wire
]);
let panel3 = new panel("panel3", [
  'url(Birds/BarnSwallow-4893.jpg)', //wire
  'url(Birds/BarnSwallow-3035.jpg)', //fence
]);
let panel4 = new panel("panel4", [
  'url(Birds/SpringDoves.jpg)',
  'url(Birds/WinterDove-7994.jpg)', //macro
  'url(Birds/WinterDove-7956.jpg)', //wood block
  'url(Birds/BabyDove-4603.jpg)',
  'url(Birds/WinterDove-7926.jpg)', //duo
  'url(Birds/WinterDove-7947.jpg)' //sandbucket
]);
let panel5 = new panel("panel5", [
  'url(Birds/GreatBlue-1496.jpg)',
  'url(Birds/GreatBlue-1515.jpg)',
  'url(Birds/GreatBlue-1543.jpg)',
  'url(Birds/GreatBlue-4335.jpg)' //flight
]);
let panel6 = new panel("panel6", [
  'url(Birds/TuftedBlueJay-2734.jpg)',
  'url(Birds/BlueJay-2737.jpg)', //alt spring url 
  'url(Birds/BlueJay-8032.jpg)', //alt winter url
  'url(Birds/BlueJay-8029.jpg)' //alt alt winter url
]);
let panelObjs = [panel1, panel2, panel3, panel4, panel5, panel6];

function toggleOpen(panelObj) {
  console.log('Opening/Closing');
  let thisPanel = document.querySelector("." + panelObj.selector);
  thisPanel.classList.toggle('open');
  let infoPanel = document.querySelector("." + panelObj.selector + ">*:last-child");
  infoPanel.classList.toggle('show', false);
  infoPanel.classList.toggle('hide', true);
}

function toggleActive(e) {
  console.log(e.propertyName);
  //probably need to change this
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

function cycleImage(panelObj) {
  if (panelObj.index < panelObj.urls.length - 1) { panelObj.index++ } else { panelObj.index = 0; }
  const panelX = document.querySelector('.' + panelObj.selector);
  panelX.style.backgroundImage = panelObj.urls[panelObj.index];
}

//Edit text to show information
function showInfo(panelObj) {
  console.log("Showing Info");
  let infoPanel = document.querySelector("." + panelObj.selector + ">*:last-child");
  infoPanel.classList.toggle('show');
  infoPanel.classList.toggle('hide');
  console.log(panelObj.selector);
  if (panelObj.selector !== "heroPanel") {
    let btns = document.querySelector("." + panelObj.selector + ">:nth-child(3)")
    btns.classList.toggle('down');
  }
}

removeHeroBtn.addEventListener('click', function () { hero.style.display = 'none'; });

//Add event listeners to each object
panelObjs.forEach(panelObj => {
  let cycleBtn = document.querySelector('.' + panelObj.selector + ' .cycle');
  let infoBtn = document.querySelector('.' + panelObj.selector + ' .info');
  let thePanel = document.querySelector('.' + panelObj.selector);
  thePanel.addEventListener('click', (event) => { toggleOpen(panelObj) });
  thePanel.addEventListener('transitionend', toggleActive);
  cycleBtn.addEventListener('click', function (event) {
    cycleImage(panelObj);
    event.stopPropagation(); //Wasn't super sure how this worked so I did have to research it
  });
  infoBtn.addEventListener('click', function (event) {
    showInfo(panelObj);
    event.stopPropagation();
  });

});

cycleHeroBtn.addEventListener('click', function (event) {
  cycleImage(heroPanel);
  event.stopPropagation(); //Wasn't super sure how this worked so I did have to research it
});
infoHeroBtn.addEventListener('click', function (event) {
  showInfo(heroPanel);
  event.stopPropagation();
});