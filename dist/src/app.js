var SoftkeyHandler = new KaiUI.SoftkeyHandler(), ViewManager = new KaiUI.ViewManager();
ViewManager.current = new KaiUI.View('Title', false, function () {
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Ok', function () {
        this.visible = false;
    });
});
