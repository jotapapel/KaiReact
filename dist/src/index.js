var SoftkeyHandler = new KaiUI.SoftkeyHandler(), ViewManager = new KaiUI.ViewManager();
KeyboardListener.bind(KeyboardKey.Backspace, function () {
    ViewManager.back();
});
var MainView = new KaiUI.View('Theme Test', false, function () {
    SoftkeyHandler.clear(true);
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Toggle', function () {
        if (document.querySelector('html').getAttribute('data-theme') == 'light') {
            ThemeManager.theme = 'dark';
        }
        else {
            ThemeManager.theme = 'light';
        }
    });
});
ViewManager.current = MainView;
