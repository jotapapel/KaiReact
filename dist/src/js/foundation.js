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
    var SoftkeyHandler = (function () {
        function SoftkeyHandler() {
        }
        Object.defineProperty(SoftkeyHandler, "visible", {
            get: function () {
                return SoftkeyHandler.element.HTMLElement.classList.contains('hidden');
            },
            set: function (value) {
                switch (value) {
                    case false:
                        SoftkeyHandler.element.innerElement.classList.add('hidden');
                        break;
                    case true:
                        SoftkeyHandler.element.innerElement.classList.remove('hidden');
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        SoftkeyHandler.bind = function (key, label, method) {
            switch (key) {
                case KeyboardKey.SoftLeft:
                    SoftkeyHandler.element.labelLeft = label;
                    break;
                case KeyboardKey.Enter:
                    SoftkeyHandler.element.labelCenter = label;
                    break;
                case KeyboardKey.SoftRight:
                    SoftkeyHandler.element.labelRight = label;
                    break;
            }
            ;
            KeyboardListener.add(key, method.bind(this));
        };
        SoftkeyHandler.element = new React.Element({
            selector: '#kai-softkey-container',
            data: {
                labelLeft: '',
                labelCenter: '',
                labelRight: ''
            },
            template: "\n\t\t\t\t<label id=\"kai-softkey-left\">{{labelLeft}}</label>\n\t\t\t\t<label id=\"kai-softkey-center\">{{labelCenter}}</label>\n\t\t\t\t<label id=\"kai-softkey-right\">{{labelRight}}</label>\n\t\t\t"
        });
        return SoftkeyHandler;
    }());
    Foundation.SoftkeyHandler = SoftkeyHandler;
})(Foundation || (Foundation = {}));
