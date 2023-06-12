//link:https://storage.googleapis.com/tm-model/4-PwJD6C4/model.json
console.log("versão",ml5.version)
document.getElementById("foto").style.display = 'none';
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/4-PwJD6C4/model.json",modelLoaded)

function modelLoaded(){
    console.log("modelo pronto! :D")
}

var camera = document.getElementById("camera")
Webcam.attach(camera)

Webcam.set({
    width:400,height:300,
    image_format:'png',
    png_quality:90
})
function tirarFoto(){
    Webcam.snap(function(uri){
        document.getElementById("foto").innerHTML = "<img id='fotoCapturada' src="+uri+">";
        document.getElementById("foto").style.display = 'block';
    })
}
function check(){
    fotoCapturada =  document.getElementById("fotoCapturada");
    classifier.classify(fotoCapturada,gotResult)
}
function gotResult(error, result){
    if(error){
        console.error("erro no sistema");
    }
    else{
    console.log(result[0].label);
    console.log(Math.round(result[0].confidence.toFixed(2)* 100));
    document.getElementById("objeto").innerHTML =result[0].label
    document.getElementById("precisão").innerHTML = Math.round(result[0].confidence.toFixed(2)*100)
    }
}
