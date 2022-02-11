function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background('white');
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function draw() {
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotResults);
}

function clearCanvas() {
    background('white');
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    }

    console.log(results);

    document.getElementById('lblLabel').innerHTML = "Label:" + results[0].label;
    
    document.getElementById('lblConfidence').innerHTML = "Confidence: " + Math.random(results[0].confidence * 100) + "%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}