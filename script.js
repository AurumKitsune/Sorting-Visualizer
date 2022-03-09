let array = createArray(75);
let arraySorted = false;

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

	updateArrayDisplay('#00AA88', '#00AA88');
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

function disableButtons(bool) {
	generateArrayButton.disabled = bool;
	startSortingButton.disabled = bool;
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
	for (let i = 0; i < array.length - 1; ++i) {
		for (let j = 0; j < array.length - 1 - i; ++j) {
			if (array[j] > array[j+1]) {
				const temp = array[j];
				array[j] = array[j+1];
				array[j+1] = temp;

				updateArrayDisplay('#3388CC', '#FFDD88');

				await sleep(2000 / (array.length * 2));
			}
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
		}

		if (swap) {
			const temp = array[i];
			array[i] = array[min_index];
			array[min_index] = temp;

			updateArrayDisplay('#3388CC', '#FFDD88');

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
			
				updateArrayDisplay('#3388CC', '#FFDD88');

				await sleep(4000 / (array.length * 2));
			}
		}
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
	}
	for (let i = 0; i < n2; ++i) {
		rightArray[i] = array[mid + 1 + i];
	}

	let i = 0, j = 0, k = start;

	while (i < n1 && j < n2){
		if (leftArray[i] < rightArray[j]) {
			array[k++] = leftArray[i++];
		}
		else {
			array[k++] = rightArray[j++];
		}

		updateArrayDisplay('#3388CC', '#FFDD88');
		await sleep(10000 / (array.length * 2));
	}

	while (i < n1) {
		array[k++] = leftArray[i++];

		updateArrayDisplay('#3388CC', '#FFDD88');
		await sleep(10000 / (array.length * 2));
	}
	while (j < n2) {
		array[k++] = rightArray[j++];

		updateArrayDisplay('#3388CC', '#FFDD88');
		await sleep(5000 / (array.length * 2));
	}
}