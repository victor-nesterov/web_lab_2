var socket;
var isDrawing = true;
var cursorWidth = 4;
var drawingColor = [255, 0, 0];

function setup()
{
    var eraseButton = createButton('Turn ON/OFF Eraser');
    eraseButton.position(200, 5);
    eraseButton.mousePressed(toggleMode);

    var widthSlider = createSlider(1, 40, cursorWidth, 1);
    widthSlider.position(20, 10);
    widthSlider.input(updateCursorWidth);

    var colorPicker = createColorPicker(color(drawingColor[0], drawingColor[1], drawingColor[2]));
    colorPicker.position(20, 30);
    colorPicker.input(updateDrawingColor);

    createCanvas(2000, 2000);
    background(51);

    socket = io.connect('http://localhost:5500');
    socket.on('mouse_line', newDraw);

}

function newDraw(data) {
    if (!data.erase) {
        stroke(data.color[0], data.color[1], data.color[2]);
        strokeWeight(data.width);
        line(data.x, data.y, data.px, data.py);
        console.log('Hello')
    }
    else
    {
        stroke(51);
        strokeWeight(data.width);
        line(data.x, data.y, data.px, data.py);
    }
}


function draw() {
    stroke(drawingColor[0], drawingColor[1], drawingColor[2]);
    strokeWeight(cursorWidth);
    
    if (mouseIsPressed === true) {
        if (isDrawing) {
            line(mouseX, mouseY, pmouseX, pmouseY);
            var data = { x: mouseX, y: mouseY, px: pmouseX, py: pmouseY, erase: false, width: cursorWidth, color: drawingColor};
            socket.emit('mouse_line', data);
        } else {
            stroke(51);
            line(mouseX, mouseY, pmouseX, pmouseY);
            var data = { x: mouseX, y: mouseY, px: pmouseX, py: pmouseY, erase: true , width: cursorWidth};
            socket.emit('mouse_line', data);
        }
    }
}


function toggleMode() {
    isDrawing = !isDrawing;
    if (isDrawing) {
        stroke(drawingColor[0], drawingColor[1], drawingColor[2]);
    } else {
        stroke(51);
    }
}

function updateCursorWidth() {
    cursorWidth = this.value();
}

function updateDrawingColor() {
    drawingColor = [red(this.color()), green(this.color()), blue(this.color())];
    stroke(drawingColor[0], drawingColor[1], drawingColor[2]);
}
