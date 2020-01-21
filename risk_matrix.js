const green = [0, 5, 10, 11, 15, 16, 17, 20, 21, 22, 23];
const yellow = [1, 6, 7, 12, 13, 18, 19, 24]
const red = [2, 3, 4, 8, 9, 14];

const xMatrixPad = 50;
const yMatrixPad = 50;
const cellSize = 75;
const axisTitleFont = 'bold 28px OpenSans, sans-serif';
const axisLabelFont = '17px OpenSans, sans-serif';
const axisTitlePad = 49;
const axisLabelPad = 35;
const greenHue = 'green';
const yellowHue = 'yellow';
const redHue = 'red';
const xStart = xMatrixPad + axisTitlePad + axisLabelPad;
const yStart = yMatrixPad;

let canvas = document.createElement('canvas');
canvas.height = 650;
canvas.width = 900;
let container = document.querySelector('.body');
container.appendChild(canvas);

let pen = canvas.getContext('2d');

//drawing the matrix
for (i = 0; i < 5; i++) {
    y = yStart + (cellSize * i);
    for (j = 0; j < 5; j++) {
        let coord = (5 * i) + j;
        pen.fillStyle = getColor(coord);
        x = xStart + (75 * j)
        pen.fillRect(x, y, cellSize, cellSize);
        pen.fillStyle = 'black';
        pen.strokeRect(x, y, cellSize, cellSize);
    }

}

//axis titles
pen.font = axisTitleFont;
pen.rotate(-(Math.PI / 2));
let yAxisTitleWidth = pen.measureText('Probability of Occurence').width;
console.log(yAxisTitleWidth);
pen.fillText('Probability of Occurence', -(yMatrixPad + (2.5 * cellSize) + (0.5 * yAxisTitleWidth)), xStart - axisTitlePad - axisLabelPad);
pen.rotate(Math.PI / 2);
let xAxisTitleWidth = pen.measureText('Consequence of Occurence').width;
pen.fillText('Consequence of Occurence', xStart + (2.5 * cellSize) - (0.5 * xAxisTitleWidth), yStart + (5 * cellSize) + axisLabelPad + axisTitlePad);

//axis labels
pen.font = axisLabelFont;
//x axis
for (i = 0; i < 5; i++) {
    let label = getAxisLabel(i);
    let labelWidth = pen.measureText(label).width;
    pen.fillText(label, xStart + ((i + 0.5) * cellSize) - (labelWidth / 2), yStart + (5 * cellSize) + axisLabelPad);
}
//y axis
pen.rotate(-(Math.PI / 2));
for (i = 0; i < 5; i++) {
    let label = getAxisLabel(i);
    let labelWidth = pen.measureText(label).width;
    pen.fillText(label, -(yStart + ((4.5 - i) * cellSize) + (labelWidth / 2)), xStart - axisLabelPad);
}
pen.rotate(Math.PI / 2);

function getColor(coord) {
    if (green.includes(coord)) {
        return 'green';
    } else if (yellow.includes(coord)) {
        return 'yellow';
    } else {
        return 'red';
    }
}
function getAxisLabel(val) {
    switch (val) {
        case 0:
            return "Low (1)";
        case 1:
            return "Min (2)";
        case 2:
            return "Mod (3)";
        case 3:
            return "Sig (4)";
        case 4:
            return "High (5)";
    }
}