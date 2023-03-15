var React;
(function (React) {
    var Storage = (function () {
        function Storage() {
            this.subscribers = [];
        }
        Storage.prototype.depend = function (target) { if (target && this.subscribers.indexOf(target) === -1)
            this.subscribers.push(target); };
        Storage.prototype.notify = function () { this.subscribers.forEach(function (sub) { return sub(); }); };
        return Storage;
    }());
    var Element = (function () {
        function Element(descriptor) {
            var _this = this;
            var _a;
            var target = null;
            this.innerElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
            (_a = this.innerElement) === null || _a === void 0 ? void 0 : _a.addEventListener('transitionend', function (event) { var _a; (_a = _this.performed) === null || _a === void 0 ? void 0 : _a.call(_this, 'transitionend', event); }, true);
            this.rawData = descriptor.data;
            Object.keys(descriptor.data).forEach(function (key) {
                var value = descriptor.data[key], storage = new Storage();
                Object.defineProperty(_this, key, {
                    get: function () {
                        storage.depend(target);
                        return value;
                    },
                    set: function (newValue) {
                        value = newValue;
                        storage.notify();
                    }
                });
            });
            target = function () {
                var template = descriptor.template.replace(/\{\{(.*)\}\}/g, function (_, key) { return _this[key]; });
                _this.template = template.replace(/[\r\n\t]/g, '').trim();
                if (_this.innerElement instanceof HTMLElement)
                    _this.innerElement.innerHTML = _this.template;
            };
            target();
            target = null;
        }
        Element.prototype.reset = function () {
            var _this = this;
            Object.keys(this.rawData).forEach(function (key) {
                _this[key] = _this.rawData[key];
            });
        };
        return Element;
    }());
    React.Element = Element;
})(React || (React = {}));
