// Reactive component library for KaiOS v2.5.x devices.
// Author: jotapapel
// Version: 1.0
namespace React {
	class Storage {
		subscribers: any[] = [];
		depend (target: any) { if (target && this.subscribers.indexOf(target) === -1) this.subscribers.push(target); }
		notify () { this.subscribers.forEach((sub) => sub()); }
	}
	interface Descriptor {
		selector?: string,
		data: {[index: string]: any},
		template: string
	}
	export class Element {
		[index: string]: any;
		innerElement?: HTMLElement|null;
		rawData: object;
		template: string;
		constructor(descriptor: Descriptor) {
			let target: any = null;
			this.innerElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
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