var KeyboardListener;
(function (KeyboardListener) {
    var Key;
    (function (Key) {
        Key["SoftLeft"] = "SoftLeft";
        Key["Enter"] = "Enter";
        Key["SoftRight"] = "SoftRight";
        Key["ArrowRight"] = "ArrowRight";
        Key["ArrowUp"] = "ArrowUp";
        Key["ArrowLeft"] = "ArrowLeft";
        Key["ArrowDown"] = "ArrowDown";
        Key["Call"] = "Call";
        Key["Backspace"] = "Backspace";
    })(Key = KeyboardListener.Key || (KeyboardListener.Key = {}));
    var _Listener = (function () {
        function _Listener() {
            var _this = this;
            this.methods = {};
            document.addEventListener('keypress', function (event) {
                if (Key[event.key])
                    _this.methods[event.key]();
            });
        }
        _Listener.prototype.bind = function (key, method) {
            this.methods[key] = method;
        };
        return _Listener;
    }());
    KeyboardListener.Listener = new _Listener();
})(KeyboardListener || (KeyboardListener = {}));
var SoftkeyManager;
(function (SoftkeyManager) {
    var Command;
    (function (Command) {
        Command["LEFT"] = "SoftLeft";
        Command["CENTER"] = "Enter";
        Command["RIGHT"] = "SoftRight";
    })(Command = SoftkeyManager.Command || (SoftkeyManager.Command = {}));
    var _Manager = (function () {
        function _Manager() {
            this.element = new React.Element({
                selector: '#kai-softkey-container',
                data: {
                    labelLeft: '',
                    labelCenter: '',
                    labelRight: ''
                },
                template: "\n\t\t\t\t<label id=\"kai-softkey-left\">{{labelLeft}}</label>\n\t\t\t\t<label id=\"kai-softkey-center\">{{labelCenter}}</label>\n\t\t\t\t<label id=\"kai-softkey-right\">{{labelRight}}</label>\n\t\t\t"
            });
        }
        Object.defineProperty(_Manager.prototype, "visible", {
            get: function () {
                return this.element.HTMLElement.classList.contains('hidden');
            },
            set: function (value) {
                switch (value) {
                    case false:
                        this.element.HTMLElement.classList.add('hidden');
                        break;
                    case true:
                        this.element.HTMLElement.classList.remove('hidden');
                        break;
                }
            },
            enumerable: false,
            configurable: true
        });
        _Manager.prototype.bind = function (command, label, method) {
            switch (command) {
                case Command.LEFT:
                    this.element.labelLeft = label;
                    break;
                case Command.CENTER:
                    this.element.labelCenter = label;
                    break;
                case Command.RIGHT:
                    this.element.labelRight = label;
                    break;
            }
            ;
            KeyboardListener.Listener.bind(command, method);
        };
        return _Manager;
    }());
    SoftkeyManager.Manager = new _Manager();
})(SoftkeyManager || (SoftkeyManager = {}));
