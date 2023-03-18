// Reactive component implementation for KaiOS v2.5.x devices (written for strict ES5).
// Author: jotapapel
// Version: 1.0
class ReactiveElement {
	[index: string]: any;
	innerElement?: HTMLElement;
	rawData: {[index: string]: any} = {};
	template: string;
	constructor(descriptor: {selector?: string, data: {[index: string]: any}, template: string}) {
        let update = this.render(descriptor.template);
		this.innerElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
		Object.keys(descriptor.data).forEach(key => {
			let value = descriptor.data[key];
			this.rawData[key] = value;
			Object.defineProperty(this, key, {
				get: () => {
					return value;
				},
				set: newValue => {
					value = newValue;
					update();
				}
			});
		});
		update();
	}
	render (rawTemplate: string) {
		return () => {
			let template = rawTemplate.replace(/\{\{(.*)\}\}/g, (_, key) => this[key]);
			this.template = template.replace(/[\r\n\t]/g, '').trim();
			if (this.innerElement) this.innerElement.innerHTML = this.template;	
		}
	}
	reset () {
		Object.keys(this.rawData).forEach(key => {
			this[key] = this.rawData[key];
		});
	}
}