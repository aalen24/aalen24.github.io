let counter = 0;

function tickUp() {
    counter++;
    document.getElementById('counter').textContent = counter;
}//end tickUp()

function tickDown() {
    counter--;
    document.getElementById('counter').textContent = counter;
}//end ticketDown()

function runForLoop() {
    let result = '';
    for (let i = 0; i <= counter; i++) {
        result += i + ' ';
    }
    document.getElementById('forLoopResult').textContent = result.trim();
}//end runForLoop()

function showOddNumbers() {
    let result = '';
    for (let i = 1; i <= counter; i += 2) {
        result += i + ' ';
    }
    document.getElementById('oddNumberResult').textContent = result.trim();
}//end showOddNumbers()

function addMultiplesToArray() {
    let multiples = [];
    for (let i = counter; i >= 5; i -= 5) {
        multiples.push(i);
    }
    console.log(multiples);
}//end addMultiplesToArray()

function printCarObject() {
    let carType = document.getElementById('carType').value;
    let carMPG = document.getElementById('carMPG').value;
    let carColor = document.getElementById('carColor').value;
    let carObject = {
        cType: carType,
        cMPG: carMPG,
        cColor: carColor
    };
    console.log(carObject);
}//end printCarObject()

function loadCar(carNumber) {
    let carObject;
    if (carNumber === 1) {
        carObject = carObject1;
    } else if (carNumber === 2) {
        carObject = carObject2;
    } else if (carNumber === 3) {
        carObject = carObject3;
    }
    document.getElementById('carType').value = carObject.cType;
    document.getElementById('carMPG').value = carObject.cMPG;
    document.getElementById('carColor').value = carObject.cColor;
}//end loadCar()

function changeColor(colorNumber) {
    let paragraph = document.getElementById('styleParagraph');
    if (colorNumber === 1) {
        paragraph.style.color = 'red';
    } else if (colorNumber === 2) {
        paragraph.style.color = 'green';
    } else if (colorNumber === 3) {
        paragraph.style.color = 'blue';
    }
}//end changeColor()
