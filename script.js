let array = createArray(75);

const arraySizeSlider = document.querySelector('#array-size-slider');
arraySizeSlider.value = 75;
arraySizeSlider.oninput = function() {
	const arraySizeLabel = document.querySelector('.array-size-label');
	arraySizeLabel.textContent = this.value;
}

const generateArrayButton = document.querySelector('#generate-array');
generateArrayButton.addEventListener('click', () => {
	array = createArray(arraySizeSlider.value);
});

const startSortingButton = document.querySelector('#start-sort');
startSortingButton.addEventListener('click', () => {
	const sortInput = document.querySelector('.sort-input:checked');

	if (sortInput.value === "1") {
		bubbleSort();
	}
	else if (sortInput.value === "2") {
		selectionSort();
	}
	else if (sortInput.value === "3") {
		insertionSort();
	}
});

function createArray(size) {
	const arrayDisplay = document.querySelector('.array-display');

	while (arrayDisplay.firstChild) {
		arrayDisplay.firstChild.remove();
	}

	let arr = new Array(size);

	for (let i = 0; i < size; i++) {
		arr[i] = Math.floor(Math.random() * 300);

		const arrayElement = document.createElement('div');
		arrayElement.classList.add('array-element');
		arrayElement.setAttribute('style', `height:${10 + arr[i]}px;`);
	
		arrayDisplay.appendChild(arrayElement);
	}

	return arr;
}

function updateArrayDisplay(baseColor, changeColor) {
	const arrayElements = document.querySelectorAll('.array-element');

	for (let i = 0; i < array.length; ++i) {
		let before = arrayElements[i].style.height;
		arrayElements[i].style.height = `${10 + array[i] * 2}px`;

		if (before === arrayElements[i].style.height) {
			arrayElements[i].style.backgroundColor = baseColor;
		}
		else {
			arrayElements[i].style.backgroundColor = changeColor;
		}
	}
}

function bubbleSort() {
	console.log('bubble');
}

function selectionSort() {
	console.log('selection');
}

function insertionSort() {
	console.log('insertion');
}