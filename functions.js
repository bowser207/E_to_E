prediction_I = "";
prediction_II = "";

Webcam.set({
width:350,
height:300,
image_format : 'png',
png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/qd405AAp1/model.json', modelLoaded);

function modelLoaded()
{
    console.log('Model loaded!')
}
function speak()
{
    var synth = window.speechSynthesis;
    speak_data_I = "The first prediction is " + prediction_I;
    speak_data_II = "And the second prediction is " + prediction_II;
    var utterThis = new SpeechSynthesisUtterance(speak_data_I + speak_data_II);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name_I").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_II").innerHTML = results[1].label;
        prediction_I = results[0].label;
        prediction_II = results[1].label;
        speak();
        if(results[0].label == "Happy")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x263B;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x2639;";
        }
        if(results[0].label == "Confused")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x2753;";
        }
        if(results[0].label == "Frustrated")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x1F616;";
        }
        if(results[0].label == "Proud")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x1F603;";
        }
        if(results[0].label == "Funny")
        {
            document.getElementById("update_emoji_I").innerHTML = "&#x1F61C;";
        }


        if(results[1].label == "Happy")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x263B;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x2639;";
        }
        if(results[1].label == "Confused")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x2753;";
        }
        if(results[1].label == "Frustrated")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x1F616;";
        }
        if(results[1].label == "Proud")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x1F603;";
        }
        if(results[1].label == "Funny")
        {
            document.getElementById("update_emoji_II").innerHTML = "&#x1F61C;";
        }
    }
}