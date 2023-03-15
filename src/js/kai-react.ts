namespace KaiReact {
	class Storage {
		subscribers: any[] = [];
		depend (target: any) { if (target && this.subscribers.indexOf(target) === -1) this.subscribers.push(target); }
		notify () { this.subscribers.forEach((sub) => sub()); }
	}
	
	interface Descriptor {
		selector?: string,
		data: object,
		template: string
	}
	
	export class Element {
		HTMLElement: HTMLElement;
		rawData: object;
		template: string;
		[index: string]: any;
		
		constructor(descriptor: Descriptor) {
			let target = null,
			self = this;
			
			// element: The HTMLElement binded to the reactive element.
			self.HTMLElement = descriptor.selector ? document.querySelector(descriptor.selector) : undefined;
			if (self.HTMLElement instanceof HTMLElement) self.HTMLElement.addEventListener('transitionend', (event) => { self.performed?.('transitionend', event) }, true);
			
			// data: variables to watch for reactivity (the 'rawData' variable is generated to hold initial values).
			self.rawData = descriptor.data;
			Object.keys(descriptor.data).forEach((key: string) => {
				let value = descriptor.data[key],
						storage = new Storage();
				Object.defineProperty(self, key, {
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
				let template = descriptor.template.replace(/\{\{(.*)\}\}/g, (_, key) => self[key]);
				self.template = template.replace(/[\r\n\t]/g, '').trim();
				if (self.HTMLElement instanceof HTMLElement) self.HTMLElement.innerHTML = self.template;
			};
			target();
			target = null;
		}

		reset() {
			let self = this;
			Object.keys(this.rawData).forEach((key) => {
				self[key] = self.rawData[key];
			});
		}
	}
}