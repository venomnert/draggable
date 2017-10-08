window.onload = function() {
    init();
};

function init () {
    var c = createjs, stage, art, testImg, cont;
    var x, y, listener, color, hue=0;

    //Get the canvas and wrap it
    stage = new c.Stage('cropCanvas');

    //Add a Container into canvas
    cont = stage.addChild(new c.Container());

    //Create a new shape and create an image
    art = new c.Shape();
    testImg = new c.Bitmap('./images/blue_oxford_520_520.jpg');

    //Add the image and shape into the container as a child
    cont.addChild(testImg, art);

    //Cache the displayed objects(image and art) in an area that is 600px X 400px
    cont.cache(0,0,600,400);

    //Do the following when the image is loaded
    testImg.image.onload = function() {

        //Overwrite the existing cached with the current displayed object
        //?? Is only the image being overwritten or does the whole cache get overwritten?
        cont.updateCache("source-over");

        //Remove the img from Container
        cont.removeChild(testImg);

        //Re-render the canvas
        stage.update();
    };

    //When the left mouse button is clicked on the canvas call startDraw function
    //??What is 'this'?
    stage.on("stagemousedown", startDraw, this);

    function startDraw(evt) {
        //When the mouse starts moving over the canvas, call the draw function
        //??What is 'this'?
        listener = stage.on("stagemousemove", draw, this);

        //When the mouse click is released, call the endDraw function
        //??What is 'this'?
        stage.on("stagemouseup", endDraw, this);

        color = c.Graphics.getHSL(hue+=85, 50, 50);
        x = evt.stageX-0.001; // offset so we draw an initial dot
        y = evt.stageY-0.001;
        draw(evt); // draw the initial dot
    }
    function draw(evt) {
        art.graphics.ss(20,1).s(color).mt(x,y).lt(evt.stageX, evt.stageY);

        // the composite operation is the secret sauce.
        // we'll either draw or erase what the user drew.
        cont.updateCache(erase.checked ? "destination-out" : "source-over");

        art.graphics.clear();
        x = evt.stageX;
        y = evt.stageY;
        stage.update();
    }
    function endDraw(evt) {
        stage.off("stagemousemove", listener);
        evt.remove();
    }

    //Retreive the canvas element
    // var stage = new createjs.Stage("demoCanvas");
    //Wrap the uploaded image
    // var bitmap = new createjs.Bitmap("./images/blue_oxford_520_520.jpg");
    //When the image is loaded, add the image to canvas and update it.
    // bitmap.image.onload = function() {
    //     console.log(bitmap);
    //     stage.addChild(bitmap);
    //     stage.update();
    // };
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah')
                .attr('src', e.target.result)
                .width(350)
                .height(350);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
