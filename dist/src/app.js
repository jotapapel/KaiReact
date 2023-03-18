var SoftkeyHandler = new KaiUI.SoftkeyHandler(), ViewManager = new KaiUI.ViewManager();
KeyboardListener.bind(KeyboardKey.Backspace, function () { ViewManager.back(); });
var MainView = new KaiUI.View('Title', false, function () {
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Next', function () {
        ViewManager.current = SecondaryView;
    });
});
var SecondaryView = new KaiUI.View('Secondary', true, function () {
    SoftkeyHandler.clear();
});
ViewManager.current = MainView;
