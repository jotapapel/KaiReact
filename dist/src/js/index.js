var SoftkeyHandler = new KaiUI.SoftkeyHandler(), ViewManager = new KaiUI.ViewManager();
KeyboardListener.bind(KeyboardKey.Backspace, function () { ViewManager.back(); });
var MainView = new KaiUI.View('KaiReact Test', false, function () {
    SoftkeyHandler.clear(true);
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Next', function () {
        ViewManager.current = SecondaryView;
    });
});
var SecondaryView = new KaiUI.View('', true, function () {
    SoftkeyHandler.clear(false);
    this.content = 'This is a secondary view, no interactions, just text, hence no softkeys.</br></br>Press the back key to go back.';
});
ViewManager.current = MainView;
