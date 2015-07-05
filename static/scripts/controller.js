function Controller() 
{
	this.states = 
	[
		"ConfigForm",
		"DelegateToFlashcardController",
		"SessionComplete"
	];
	this.stateIndex = 0;
	beginSessionView = new BeginSessionView();
	flashcardView = new FlashcardView();
	completeSessionView = new CompleteSessionView();
	interactionController = new InteractionController();	
	canvas.background.mouseover(function() { this.resetAnswerBoxes(); }.bind(this));
}

Controller.prototype.nextState = function()
{
	var numberOfStates = this.states.length;
	this.stateIndex = (this.stateIndex + 1) % numberOfStates;
	this.processState();
}

Controller.prototype.processState = function()
{
	var state = this.states[this.stateIndex];
	switch (state)
	{
		case "ConfigForm":			
			completeSessionView.clear();
			beginSessionView.displayBeginSessionMenu();
			break;
		case "DelegateToFlashcardController":
			Analytics.reportBeginSession(hskWordList, FLASHCARD_DISPLAY_MODE);
			beginSessionView.clear();
			beginSessionView.showCreateNewSessionButton();
			flashcardController = new FlashcardController();
			flashcardController.performPhase();
			break;
		case "SessionComplete":
			Analytics.reportCompleteSession(hskWordList, FLASHCARD_DISPLAY_MODE);
			flashcardView.clear();
			flashcardController = null;
			interactionController.beginAwaitingSessionCompleteKey();
			completeSessionView.displaySessionCompleteMenu();
			break;
		default: 
			alert("Invalid state.");
	}
}

Controller.prototype.resetAnswerBoxes = function()
{
	completeSessionView.resetSessionCompleteButtons();
	flashcardView.resetAnswerBoxes();
	beginSessionView.resetButtons();
}

Controller.prototype.repeatSession = function()
{
	completeSessionView.clear();
	this.stateIndex = 1;
	this.processState();
}

Controller.prototype.newSession = function()
{	
	completeSessionView.clear();
	beginSessionView.clear();
	beginSessionView.hideCreateNewSessionButton();
	flashcardView.clear();
	this.stateIndex = 0;
	this.processState();
}