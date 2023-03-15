var KaiReact;
(function (KaiReact) {
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
            var target = null, self = this;
            self.HTMLElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
            if (self.HTMLElement)
                self.HTMLElement.addEventListener('transitionend', function (event) { var _a; (_a = self.performed) === null || _a === void 0 ? void 0 : _a.call(self, 'transitionend', event); }, true);
            self.rawData = descriptor.data;
            Object.keys(descriptor.data).forEach(function (key) {
                var value = descriptor.data[key], storage = new Storage();
                Object.defineProperty(self, key, {
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
                var template = descriptor.template.replace(/\{\{(.*)\}\}/g, function (_, key) { return self[key]; });
                self.template = template.replace(/[\r\n\t]/g, '').trim();
                if (self.HTMLElement instanceof HTMLElement)
                    self.HTMLElement.innerHTML = self.template;
            };
            target();
            target = null;
        }
        Element.prototype.reset = function () {
            var self = this;
            Object.keys(this.rawData).forEach(function (key) {
                self[key] = self.rawData[key];
            });
        };
        return Element;
    }());
    KaiReact.Element = Element;
})(KaiReact || (KaiReact = {}));
