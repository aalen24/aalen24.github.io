// Global counter variable
let counter = 0;

// Function to increment counter
function tickUp() {
    counter++;
    document.getElementById('counter').textContent = counter;
}

// Function to decrement counter
function tickDown() {
    counter--;
    document.getElementById('counter').textContent = counter;
}

// Function to run for loop and display numbers from 0 to counter
function runForLoop() {
    let result = '';
    for (let i = 0; i <= counter; i++) {
        result += i + ' ';
    }
    document.getElementById('forLoopResult').textContent = result.trim();
}

// Function to show odd numbers from 1 to counter
function showOddNumbers() {
    let result = '';
    for (let i = 1; i <= counter; i += 2) {
        result += i + ' ';
    }
    document.getElementById('oddNumberResult').textContent = result.trim();
}

// Function to add multiples of 5 up to counter in reverse order and print array
function addMultiplesToArray() {
    let multiples = [];
    for (let i = counter; i >= 5; i -= 5) {
        multiples.push(i);
    }
    console.log(multiples);
}

// Function to print car object from form fields
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
}

// Function to load car data into form
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
}

// Function to change paragraph color
function changeColor(colorNumber) {
    let paragraph = document.getElementById('styleParagraph');
    if (colorNumber === 1) {
        paragraph.style.color = 'red';
    } else if (colorNumber === 2) {
        paragraph.style.color = 'green';
    } else if (colorNumber === 3) {
        paragraph.style.color = 'blue';
    }
}
