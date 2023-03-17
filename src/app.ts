ViewManager.current = new View('Title', true, function () {
	SoftkeyHandler.bind(KeyboardKey.Enter, 'Ok', () => {
		console.log(this);
		console.log('Center button pressed...');
	});
});
