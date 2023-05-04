var liedje;
var liedje_2;
var liedje_3;
var spelen = false;
var knop;
var schuifjeVolume;
var schuifjeRate;
var schuifjeTijd;
var amp;

function preload(){
  liedje_2 = loadSound("gametrack.mp3");
  liedje_3 = loadSound("keypressed.mp3");
  liedje = loadSound("bel.mp3");
}

function setup() {
  createCanvas(400, 400);
  
  //knop
  knop = createButton("start");
  knop.position(200, 300);
  knop.mousePressed(speel_muziek);
  
  //schuifjes
  schuifjeVolume = createSlider(0, 2, 0.5, 0.01);
  schuifjeVolume.position(0,0);
  schuifjeRate = createSlider(0.5, 2.5, 1, 0.01);
  schuifjeRate.position(200, 0);
  schuifjeTijd = createSlider(0, liedje_2.duration(), 0, 0.1);
  schuifjeTijd.position(0, 380);
  schuifjeTijd.size(380, 25);

  //amplitude
  amp = new p5.Amplitude();
}

function draw() {
  background(0 ,255, 0);
  liedje_2.setVolume(schuifjeVolume.value());
  liedje_2.rate(schuifjeRate.value());
  schuifjeTijd.value(liedje_2.currentTime());
  var vol = amp.getLevel();
  var diameter = map(vol, 0, schuifjeVolume.value(), 50, 300)
  strokeWeight(5);
  //line(50, 200, diameter, diameter);
  circle(200, 200, diameter);
}
  


function speel_muziek(){
  if(!liedje_2.isPlaying())
  {liedje_2.play();
    knop.html("pauze");
  }
  else{
    liedje_2.pause();
    knop.html("start");
  }

}

function keyPressed(){
  if(keyCode === ENTER){
   
   liedje.play();
  }
  else{
    liedje_3.play();
  }
 }