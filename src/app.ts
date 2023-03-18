const SoftkeyHandler = new KaiUI.SoftkeyHandler(),
	  ViewManager = new KaiUI.ViewManager();

KeyboardListener.bind(KeyboardKey.Backspace, () => { ViewManager.back(); });

const MainView = new KaiUI.View('Title', false, function () {
	SoftkeyHandler.bind(KeyboardKey.Enter, 'Next', function () {
		ViewManager.current = SecondaryView;
	});
});
const SecondaryView = new KaiUI.View('Secondary', true, () => {
	SoftkeyHandler.clear();
});
ViewManager.current = MainView;