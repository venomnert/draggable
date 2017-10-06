window.onload = function() {
    init();
};

function init () {
    var c = createjs, stage, art, testImg;
    var x, y, listener, color, hue=0;

    stage = new c.Stage('cropCanvas');

    testImg = new c.Bitmap('./images/blue_oxford_520_520.jpg');

    var cont = stage.addChild(new c.Container());

    testImg.image.onload = function() {
        cont.updateCache("source-over");
        cont.removeChild(testImg);
        stage.update();
    };

    art = new c.Shape()
    cont.cache(0,0,600,400);
    cont.addChild(testImg, art);

    stage.on("stagemousedown", startDraw, this);

    function startDraw(evt) {
        listener = stage.on("stagemousemove", draw, this);
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
