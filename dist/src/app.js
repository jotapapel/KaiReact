var SoftkeyHandler = new KaiUI.SoftkeyHandler(), ViewManager = new KaiUI.ViewManager();
var MainView = new KaiUI.View('Title', false, function () {
    SoftkeyHandler.clear();
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Next', function () {
        ViewManager.current = SecondaryView;
    });
});
var SecondaryView = new KaiUI.View('Secondary', true, function () {
    SoftkeyHandler.clear();
});
KeyboardListener.bind(KeyboardKey.Backspace, function () {
    ViewManager.back();
});
ViewManager.current = MainView;
