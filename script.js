let array = createArray(150);

const arraySizeSlider = document.querySelector('#array-size-slider');
arraySizeSlider.value = 150;
arraySizeSlider.oninput = function() {
	const arraySizeLabel = document.querySelector('.array-size-label');
	arraySizeLabel.textContent = this.value;
}

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