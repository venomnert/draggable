window.onload = function() {
    init();
};

function init () {
    var rangeInput = document.getElementById('brushSize');

    var c = createjs, stage, art, testImg, cont;
    var x, y, listener, color, hue=0;
    var cropBrush;
    var brushSize = parseInt(document.getElementById('brushSize').value, 10);

    //Get the canvas and wrap it
    stage = new c.Stage('cropCanvas');

    //Add a Container into canvas
    cont = stage.addChild(new c.Container());
    cropBrush =  new c.Shape();
    cropBrush.graphics.s("black").f("black").dc(50, 550, 3);
    stage.addChild(cropBrush);

    //Create a new shape and create an image
    art = new c.Shape();
    testImg = new c.Bitmap('./images/blue_oxford_520_520.jpg');

    //Add the image and shape into the container as a child
    cont.addChild(testImg, art);

    //Cache(save) the displayed objects(image and art) in an area that is 600px X 400px
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
    rangeInput.addEventListener('change', function (e) {
        brushSize = parseInt(e.target.value, 10);
        setBrushSize(brushSize);
    });

    function setBrushSize() {
        console.log('size', brushSize*0.45);
        cropBrush.graphics.clear();
        cropBrush.graphics.s("black").f("black").dc(50, 550, brushSize * 0.45);
        stage.update();
    }
    function startDraw(evt) {
        //When the mouse starts moving over the canvas, call the draw function
        //??What is 'this'?
        listener = stage.on("stagemousemove", draw, this);

        //When the mouse click is released, call the endDraw function
        //??What is 'this'?
        stage.on("stagemouseup", endDraw, this);

        color = c.Graphics.getHSL(hue+=85, 50, 50);
        x = evt.stageX-0.001; // This prevents the connecting dot effect
        y = evt.stageY-0.001;
        draw(evt); // draw the initial dot
    }
    function draw(evt) {

        art.graphics
            .ss(brushSize, 1) //this controls the drawing lines width and shape
            .s(color) //this sets the color for the 'draw' line
            .mt(x,y)  //Moves the drawing point to certain x , y coordinate
            .lt(evt.stageX, evt.stageY);  //Moves the point from the starting point to the given x , y coordinate.
                                             //When the left mouse is clicked the point will be drawn from mt(x,y) to lt(x,y).
                                             //As you continue to move the mouse the the above pattern will start again from where the mouse is


        // the composite operation is the secret sauce.
        // we'll either draw or erase what the user drew.
        cont.updateCache(erase.checked ? "destination-out" : "source-over");

        art.graphics.clear(); //Reset the drawing instance
        x = evt.stageX; //The x now become the last place the mouse is. So when the mouse mt(x) is where the mouse was.
        y = evt.stageY; //Same us above but for y
        stage.update(); //Re-render the canvas, so the above changes can take effect
    }
    function endDraw(evt) {
        //Remove the mouse event listener when the moust is lifted off the canvas
        //?? What is the difference between stage.off and evt.remove()
        stage.off("stagemousemove", listener);

        //Remove the mouse up event listener
        //??I don't know why this is necessary
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
