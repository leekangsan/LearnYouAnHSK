function BeginSessionView() 
{
	this.radioButtonSize = TEXT_SIZE;
	this.hskRadioButtonSetSize = 3 * this.radioButtonSize;
	this.hskRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.hskRadioButtonSetSize), 
							0.1 * canvas.height, 
							"blue", 
							[["HSK 1"], ["HSK 2"]], 
							[function() { HSK_WORDLIST = 1; }, function() { HSK_WORDLIST = 2; }], 
							this.radioButtonSize);

	this.testTypeRadioButtonSetSize = 7 * this.radioButtonSize;
	this.testTypeRadioButtons = canvas.drawRadioButtons(0.5 * (canvas.width - this.testTypeRadioButtonSetSize), 
							0.1 * canvas.height + this.radioButtonSize, 
							"blue", 
							[["Characters +", "Pinyin"], ["Characters"], ["Pinyin"], ["English", "Translation"]], 
							[
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS_AND_PINYIN; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.PINYIN; }, 
								function() { FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.ENGLISH; }
							], 
							this.radioButtonSize);
	this.beginSessionButton = this.drawBeginSessionButton();
	this.clear();
}

BeginSessionView.prototype.displayBeginSessionMenu = function()
{
	this.hskRadioButtons.show();
	this.testTypeRadioButtons.show();
	this.beginSessionButton.box.show();
	this.beginSessionButton.text.show();
}

BeginSessionView.prototype.resetButtons = function()
{
	this.hskRadioButtons.reset();
	this.testTypeRadioButtons.reset();
	this.beginSessionButton.box.attr({ stroke: null });
}

BeginSessionView.prototype.drawBeginSessionButton = function()
{
	return canvas.drawButton(0.5 * canvas.width,
							 0.1 * canvas.height + 2 * this.radioButtonSize, 
							 ["Begin session"],
							 "green",
							 0.15 * this.radioButtonSize,
							 function() { controller.nextState(); },
							 this.radioButtonSize);
}

BeginSessionView.prototype.clear = function()
{
	this.hskRadioButtons.hide();
	this.testTypeRadioButtons.hide();
	this.beginSessionButton.box.hide();
	this.beginSessionButton.text.hide();
}