window.onload = function() {
    init();
};

function init () {
    //Retreive the canvas element
    var stage = new createjs.Stage("demoCanvas");

    //Wrap the uploaded image
    var bitmap = new createjs.Bitmap("./images/blue_oxford_520_520.jpg");

    //When the image is loaded, add the image to canvas and update it.
    bitmap.image.onload = function() {
        console.log(bitmap);
        stage.addChild(bitmap);
        stage.update();
    };

}