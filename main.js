song="";
status="";
objects=[];
function preload(){
    song=loadSound("maan_meri_jaan.mp3");
}
function setup(){
canvas=createCanvas(640,420);
canvas.center();

video=createCapture(VIDEO);
video.hide();
objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}


function draw(){
image(video,0,0,640,420);
if(status!=""){
    objectdetector.detect(video,gotResults);
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="status: object detected";
        
        fill("red");
        percent=floor(objects[i].confidence*100);
text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
noFill();
stroke("red");
rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
if(objects[i].label=="person"){
    document.getElementById("numberofobjects").innerHTML="baby found";
    song.stop();
}
else{
    document.getElementById("numberofobjects").innerHTML="baby not found";
    song.play(); 
}
    }
    
}

}
function modelloaded(){
    console.log("model is loaded");
status=true;

}
function gotResults(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
