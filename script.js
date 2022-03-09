const arraySizeSlider = document.querySelector('#array-size-slider');
arraySizeSlider.value = 150;
arraySizeSlider.oninput = function() {
	const arraySizeLabel = document.querySelector('.array-size-label');
	arraySizeLabel.textContent = this.value;
}