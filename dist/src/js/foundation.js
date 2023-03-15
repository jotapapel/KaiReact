var Foundation;
(function (Foundation) {
    var KeyboardKey;
    (function (KeyboardKey) {
        KeyboardKey["SoftLeft"] = "SoftLeft";
        KeyboardKey["Enter"] = "Enter";
        KeyboardKey["SoftRight"] = "SoftRight";
        KeyboardKey["ArrowRight"] = "ArrowRight";
        KeyboardKey["ArrowUp"] = "ArrowUp";
        KeyboardKey["ArrowLeft"] = "ArrowLeft";
        KeyboardKey["ArrowDown"] = "ArrowDown";
        KeyboardKey["Call"] = "Call";
        KeyboardKey["Backspace"] = "Backspace";
    })(KeyboardKey = Foundation.KeyboardKey || (Foundation.KeyboardKey = {}));
    var KeyboardListener;
    (function (KeyboardListener) {
        var methods = {};
        document.addEventListener('keypress', function (event) {
            if (KeyboardKey[event.key])
                methods[event.key]();
        });
        function add(key, method) {
            methods[key] = method;
        }
        KeyboardListener.add = add;
    })(KeyboardListener = Foundation.KeyboardListener || (Foundation.KeyboardListener = {}));
})(Foundation || (Foundation = {}));
