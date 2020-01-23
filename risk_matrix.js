const green = [0, 5, 10, 11, 15, 16, 17, 20, 21, 22, 23];
const yellow = [1, 6, 7, 12, 13, 18, 19, 24]
const red = [2, 3, 4, 8, 9, 14];

const xMatrixPad = 50;
const yMatrixPad = 50;
const cellSize = 75;
const axisTitleFont = 'bold 28px OpenSans, sans-serif';
const axisLabelFont = '17px OpenSans, sans-serif';
const legendTitleFont = 'bold 21px OpenSans, sans-serif';
const legendDataFont = '17px OpenSans, sans-serif';
const legendTitleUnderline = 4;
const legendTableWidth = 300;
const legendRowSpacing = 25;
const legendUnderlineSpacing = 7;
const legendDataHeaderUnderlineColor = '#77696C';
const legendDataHeaderUnderlineWeight = 3;
const legendDataRowUnderlineWeight = 1;
const legendDataRowsUnderlineWeight = 1;
const xLegendSecondDataCol = 100
const xLegendDataHeaderPad = 14;
const yLegendDataHeaderPad = 35;
const xLegendDataRowPad = 7;
const legendRowHeight = legendUnderlineSpacing + yLegendDataHeaderPad;
const axisTitlePad = 49;
const axisLabelPad = 35;
const matrixDataFontHeight = 28;
const legendPad = 35;
const greenHue = 'green';
const yellowHue = 'yellow';
const redHue = 'red';
const xStart = xMatrixPad + axisTitlePad + axisLabelPad;
const yStart = yMatrixPad;
const xLegendStart = xStart + (5 * cellSize) + legendPad;
const yLegendStart = yStart;

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

//legend
//pen.font = legendTitleFont;
//pen.fillText('Legend', xLegendStart, yLegendStart);
//pen.lineWidth = legendTitleUnderline;
//pen.beginPath();
//pen.moveTo(xLegendStart, yLegendStart + legendRowSpacing);
//pen.lineTo(xLegendStart + legendTableWidth, yLegendStart + legendRowSpacing);
//pen.stroke();

//legend column headers
pen.font = legendDataFont;
pen.fillText('Label', xLegendStart + xLegendDataHeaderPad, yLegendStart + yLegendDataHeaderPad);
pen.fillText('Risk Title', xLegendStart + xLegendSecondDataCol, yLegendStart + yLegendDataHeaderPad);
pen.strokeStyle = legendDataHeaderUnderlineColor;
pen.lineWidth = legendDataHeaderUnderlineWeight;
pen.beginPath();
pen.moveTo(xLegendStart, yLegendStart + yLegendDataHeaderPad + legendUnderlineSpacing);
pen.lineTo(xLegendStart + legendTableWidth, yLegendStart + yLegendDataHeaderPad + legendUnderlineSpacing);
pen.stroke();


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

function drawData(risks) {
    //given an array of risks, plot the data on the chart
    //and then on the legend
    risks.forEach(drawOnLegend);
    while (risks.length > 0) {
        coord = risks[0].coord;
        drawRisks = risks.filter(risk => risk.coord == coord);
        drawOnChart(drawRisks);
        risks = risks.filter(risk => risk.coord != coord);
    }
}

function drawOnChart(risks) {
    x = risks[0].cons - 1;
    y = 5 - risks[0].prob;
    if (risks.length == 1) {
        text = risks[0].marker;
    } else {
        text = risks.map(a => a.marker).join(", ");
    }
    pen.font = legendTitleFont;
    textWidth = pen.measureText(text).width;
    pen.fillText(text, xStart + ((x + 0.5) * cellSize) - (textWidth / 2), yStart + ((y + 0.5) * cellSize) + (matrixDataFontHeight / 3.25), cellSize);
}

function drawOnLegend(risk, index) {
    //drawing the data
    pen.font = legendDataFont;
    pen.fillText(risk.marker, xLegendStart + + xLegendDataRowPad + xLegendDataHeaderPad, yLegendStart + ((index + 1) * legendRowHeight) + yLegendDataHeaderPad);
    pen.fillText(risk.name, xLegendStart + xLegendSecondDataCol, yLegendStart + ((index + 1) * legendRowHeight) + yLegendDataHeaderPad);
    //drawing the underline for the row
    pen.strokeStyle = legendDataHeaderUnderlineColor;
    pen.lineWidth = legendDataRowUnderlineWeight;
    pen.beginPath();
    pen.moveTo(xLegendStart, yLegendStart + ((index + 1) * legendRowHeight) + yLegendDataHeaderPad + legendUnderlineSpacing);
    pen.lineTo(xLegendStart + legendTableWidth, yLegendStart + ((index + 1) * legendRowHeight) + yLegendDataHeaderPad + legendUnderlineSpacing);
    pen.stroke();
    pen.closePath();
}

function Risk(cons, prob, marker, name) {
    this.cons = cons;
    this.prob = prob;
    this.marker = marker;
    this.name = name;
    this.coord = (cons - 1) * 5 + (prob - 1);
}

let risk1 = new Risk(2, 2, 'A', 'Flight Hours');
let risk2 = new Risk(4, 5, 'B', 'Zirconium');
let risk3 = new Risk(1, 1, 'C', 'Gravitational Force');
let risk4 = new Risk(2, 2, 'D', 'Titanium');
let risks = [risk1, risk2, risk3, risk4];
drawData(risks);