// Reactive component library for KaiOS v2.5.x devices.
// Author: jotapapel
// Version: 1.0
namespace React {
	class Storage {
		subscribers: any[] = [];
		depend (target: any) { if (target && this.subscribers.indexOf(target) === -1) this.subscribers.push(target); }
		notify () { this.subscribers.forEach((sub) => sub()); }
	}
	export class Element {
		[index: string]: any;
		innerElement?: HTMLElement|null;
		rawData: object;
		template: string;
		constructor(descriptor: {selector?: string, data: {[index: string]: any}, template: string}) {
			let target: any = null;
			// element: The HTMLElement binded to the reactive element.
			this.innerElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
			// data: variables to watch for reactivity (the 'rawData' variable is generated to hold initial values).
			this.rawData = descriptor.data;
			Object.keys(descriptor.data).forEach((key) => {
				let value = descriptor.data[key],
					storage = new Storage();
				Object.defineProperty(this, key, {
					get: () => {
						storage.depend(target);
						return value;
					},
					set: (newValue: any) => {
						value = newValue;
						storage.notify();
					}
				});
			});
			// template: the HTML template.
			target = () => {
				let template = descriptor.template.replace(/\{\{(.*)\}\}/g, (_, key) => this[key]);
				this.template = template.replace(/[\r\n\t]/g, '').trim();
				if (this.innerElement) this.innerElement.innerHTML = this.template;
			};
			target();
			target = null;
		}
		reset () {
			Object.keys(this.rawData).forEach((key) => {
				this[key] = this.rawData[key];
			});
		}
	}
}