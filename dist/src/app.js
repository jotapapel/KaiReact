ViewManager.current = new View('Title', true, function () {
    var _this = this;
    SoftkeyHandler.bind(KeyboardKey.Enter, 'Ok', function () {
        console.log(_this);
        console.log('Center button pressed...');
    });
});
