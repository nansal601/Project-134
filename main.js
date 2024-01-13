let img = "";
let status;
let objects = [];
let audio;

function preload() {
  
    audio=loadSound('alarm.alert.wav');
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
  

}

function modelLoaded() {

  console.log("Model Loaded!");
  status = true;

  

}




function gotResult(error, results) {
  if (error) {
    console.log(error);
    return
  }
  console.log(results);
  objects = results;
  
  
}

function draw() {
  image(video, 0, 0, 380, 380);
  objectDetector.detect(video, gotResult);

  for (let i = 0; i < objects.length; i++) {

  if (objects[i].label == 'person') {
    
    let r = random(255);
    let g = random(255);
    let b = random(255);
 
     
      document.getElementById("status").innerHTML = "Status: Object Detected";
      document.getElementById("number_of_objects").innerHTML = "Person Found: " + objects.length;
      audio.stop();

      fill(r, g, b);
      let percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
      
    
    else
       {
        document.getElementById("status").innerHTML = "Status: Object Not Detected";
        document.getElementById("number_of_objects").innerHTML = "Person Not Found: " + objects.length;
        audio.play();
      }
    }
  
}
