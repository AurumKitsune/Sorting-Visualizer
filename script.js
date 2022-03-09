let array = createArray(75);
let arraySorted = false;
let timeTaken = 0, comparisons = 0, arrayWrites = 0, secondaryWrites = 0;

const arraySizeSlider = document.querySelector('#array-size-slider');
arraySizeSlider.value = 75;
arraySizeSlider.oninput = function() {
	const arraySizeLabel = document.querySelector('.array-size-label');
	arraySizeLabel.textContent = this.value;
}

const generateArrayButton = document.querySelector('#generate-array');
generateArrayButton.addEventListener('click', () => {
	arraySorted = false;
	array = createArray(arraySizeSlider.value);
});

const startSortingButton = document.querySelector('#start-sort');
startSortingButton.addEventListener('click', async () => {
	if (arraySorted) {
		return;
	}

	disableButtons(true);

	timeTaken = 0, comparisons = 0, arrayWrites = 0;

	const sortInput = document.querySelector('.sort-input:checked');

	if (sortInput.value === "1") {
		await bubbleSort();
	}
	else if (sortInput.value === "2") {
		await selectionSort();
	}
	else if (sortInput.value === "3") {
		await insertionSort();
	}
	else if (sortInput.value === "4") {
		await mergeSort(0, array.length - 1);
	}
	else if (sortInput.value === "5") {
		await radixSort();
	}

	updateArrayDisplay('#00AA88', '#00AA88');
	updateInfo();

	arraySorted = true;
	disableButtons(false);
});

function createArray(size) {
	const arrayDisplay = document.querySelector('.array-display');

	while (arrayDisplay.firstChild) {
		arrayDisplay.firstChild.remove();
	}

	let arr = new Array(size);

	for (let i = 0; i < size; ++i) {
		arr[i] = Math.floor(Math.random() * 200);

		const arrayElement = document.createElement('div');
		arrayElement.classList.add('array-element');
		arrayElement.setAttribute('style', `height:${10 + arr[i] * 2}px;`);
	
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

function updateInfo() {
	const timeTakenDiv = document.querySelector('#time-taken');
	timeTakenDiv.textContent = `Time Taken: ${timeTaken}`;

	const comparisonDiv = document.querySelector('#comparisons');
	comparisonDiv.textContent = `Comparisons: ${comparisons}`;

	const arrayWritesDiv = document.querySelector('#array-writes');
	arrayWritesDiv.textContent = `Array Writes: ${arrayWrites}`;

	const secondaryWritesDiv = document.querySelector('#secondary-writes');
	secondaryWritesDiv.textContent = `Secondary Writes: ${secondaryWrites}`;
}

function disableButtons(bool) {
	generateArrayButton.disabled = bool;
	startSortingButton.disabled = bool;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getLargest() {
	let largest = array[0];

	for (let i = 1; i < array.length; ++i) {
		if (array[i] > largest) {
			largest = array[i];
		}
	}

	return largest;
}

async function bubbleSort() {
	for (let i = 0; i < array.length - 1; ++i) {
		for (let j = 0; j < array.length - 1 - i; ++j) {
			if (array[j] > array[j+1]) {
				const temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;

				arrayWrites += 2;

				updateArrayDisplay('#3388CC', '#FFDD88');
				updateInfo();

				await sleep(2000 / (array.length * 2));
			}
			comparisons++;
		}
	}
}

async function selectionSort() {
	let min_index, swap;

	for (let i = 0; i < array.length - 1; ++i) {
		swap = false;

		min_index = i;
		for (let j = i + 1; j < array.length; ++j) {
			if (array[j] < array[min_index]) {
				min_index = j;
				swap = true;
			}
			comparisons++;
		}

		if (swap) {
			const temp = array[i];
			array[i] = array[min_index];
			array[min_index] = temp;
				
			arrayWrites += 2;

			updateArrayDisplay('#3388CC', '#FFDD88');
			updateInfo();

			await sleep(20000 / (array.length + 25));
		}
	}
}

async function insertionSort() {
	for (let i = 1; i < array.length; i++) {
		if (array[i] < array[i-1]) {

			for (let j = i; j >= 0 && array[j] < array[j-1]; j--) {
				const temp = array[j];
				array[j] = array[j-1];
				array[j-1] = temp;
				
				arrayWrites += 2;
				comparisons++;

				updateArrayDisplay('#3388CC', '#FFDD88');
				updateInfo();

				await sleep(4000 / (array.length * 2));
			}
		}
		comparisons++;
	}
}

async function mergeSort(start, end) {
	if (start >= end) {
		return;
	}
	else {
		const mid = start + Math.floor((end - start) / 2);
		await mergeSort(start, mid);
		await mergeSort(mid + 1, end);
		await merge(start, mid, end);
	}
}

async function merge(start, mid, end) {
	const n1 = mid - start + 1;
	const n2 = end - mid;

	let leftArray = new Array(n1);
	let rightArray = new Array(n2);

	for (let i = 0; i < n1; ++i) {
		leftArray[i] = array[start + i];

		secondaryWrites++;
	}
	for (let i = 0; i < n2; ++i) {
		rightArray[i] = array[mid + 1 + i];

		secondaryWrites++;
	}

	let i = 0, j = 0, k = start;

	while (i < n1 && j < n2){
		if (leftArray[i] < rightArray[j]) {
			array[k++] = leftArray[i++];
			
			arrayWrites++;
		}
		else {
			array[k++] = rightArray[j++];
			
			arrayWrites++;
		}
		comparisons++;

		updateArrayDisplay('#3388CC', '#FFDD88');
		updateInfo();

		await sleep(10000 / (array.length * 2));
	}

	while (i < n1) {
		array[k++] = leftArray[i++];

		arrayWrites++;

		updateArrayDisplay('#3388CC', '#FFDD88');
		updateInfo();
		await sleep(10000 / (array.length * 2));
	}
	while (j < n2) {
		array[k++] = rightArray[j++];

		arrayWrites++;

		updateArrayDisplay('#3388CC', '#FFDD88');
		updateInfo();
		await sleep(10000 / (array.length * 2));
	}
}

async function radixSort() {
	let largest = getLargest();

	for (let i = 1; Math.floor(largest / i) > 0; i *= 10) {
		let newArray = new Array(array.length);
		
		let sumArray = new Array(10);
		for (let j = 0; j < 10; ++j) {
			sumArray[j] = 0;
		}

		// find the number of each mod value
		for (let j = 0; j < array.length; ++j) {
			const modValue = Math.floor(array[j] / i) % 10;
			sumArray[modValue]++;

			secondaryWrites++;
		}

		// summify the array
		for (let j = 1; j < 10; ++j) {
			sumArray[j] += sumArray[j - 1];

			secondaryWrites++;
		}

		// move values into the right place in newArray
		for (let j = array.length - 1; j >= 0; --j) {
			const modValue = Math.floor(array[j] / i) % 10;
			
			const position = --sumArray[modValue];
			newArray[position] = array[j];

			secondaryWrites++;
		}

		// move newArray back to the original array
		for (let j = 0; j < array.length; ++j) {
			array[j] = newArray[j];
				
			arrayWrites++;

			updateArrayDisplay('#3388CC', '#FFDD88');
			updateInfo();
			await sleep(10000 / (array.length * 2));
		}
	}
} 