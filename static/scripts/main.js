var TEXT_SIZE = window.innerWidth / 10;
var FLASHCARD_DISPLAY_MODE = FlashcardDisplayMode.CHARACTERS_AND_PINYIN;
var controller;
var flashcardController;
var flashcardView;
var canvas;

$(document).ready(function () 
{  
	var init = function()
	{
		canvas = new Canvas();
		controller = new Controller();
		controller.processState();
	}

	if (SVG.supported)
	{
		init();
	}
	else
	{
		alert('SVG not supported');
	}
});