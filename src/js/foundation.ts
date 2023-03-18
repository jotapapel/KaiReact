enum KeyboardKey {
	SoftLeft = 'SoftLeft',
	Enter = 'Enter',
	SoftRight = 'SoftRight',
	ArrowRight = 'ArrowRight',
	ArrowUp = 'ArrowUp',
	ArrowLeft = 'ArrowLeft',
	ArrowDown = 'ArrowDown',
	Call = 'Call',
	Backspace = 'Backspace'
}

namespace KeyboardListener {
	const methods: {[index: string]: Function} = {};
	document.addEventListener('keydown', event => {
		if (KeyboardKey[event.key] && methods[event.key]) {
			if (event.key == KeyboardKey.Backspace) event.preventDefault();
			methods[event.key]();
		}
	});
	export function bind (key: KeyboardKey, method: Function) {
		methods[key] = method;
	}
	export function clear (key: KeyboardKey|KeyboardKey[]) {
		if (typeof key === 'string') {
			delete methods[key];
		} else {
			key.forEach(k => {
				delete methods[k];
			});
		}
	}
}

namespace KaiUI {
	export class SoftkeyHandler {
		private element: ReactiveElement = new ReactiveElement({
			selector: '#kai-softkey-container',
			data: {
				labelLeft: '',
				labelCenter: '',
				labelRight: ''
			},
			template: `
				<label class="kai-softkey-left">{{labelLeft}}</label>
				<label class="kai-softkey-center">{{labelCenter}}</label>
				<label class="kai-softkey-right">{{labelRight}}</label>
			`
		});
		get visible (): boolean {
			return this.element.innerElement?.classList.contains('hidden');
		}
		set visible (value: boolean) {
			switch (value) {
				case false:
					this.element.innerElement?.classList.add('hidden');
					break;
				case true:
					this.element.innerElement?.classList.remove('hidden');
					break;
			}
		}
		bind (key: KeyboardKey, label: string, method: Function) {
			switch (key) {
				case KeyboardKey.SoftLeft:
					this.element.labelLeft = label;
					break;
				case KeyboardKey.Enter:
					this.element.labelCenter = label;
					break;
				case KeyboardKey.SoftRight:
					this.element.labelRight = label;
					break;
			};
			KeyboardListener.bind(key, method.bind(this));
		}
		clear () {
			KeyboardListener.clear([KeyboardKey.SoftLeft, KeyboardKey.Enter, KeyboardKey.SoftRight]);
			this.element.reset();
		}
	}

	export class ViewManager {
		private stack: View[] = [];
		private element: ReactiveElement = new ReactiveElement({
			selector: '#kai-view-container',
			data: {
				content: ''
			},
			template: '{{content}}'
		});
		back (): View {
			let previous = this.stack.pop();
			if (this.stack.length == 0) {
				window.close();
			} else {
				this.update();
			}
			return previous;
		}
		get current (): View {
			return this.stack[this.stack.length - 1];
		}
		set current (view: View) {
			this.stack.push(view);
			this.update();
		}
		update () {
			this.element.innerElement?.classList.add('transitioning');
			this.element.innerElement.addEventListener('transitionend', () => {
				this.current.init();
				this.element.content = this.current.template;
				this.element.innerElement?.classList.remove('transitioning');
			}, {once: true});
		}
	}

	export class View extends ReactiveElement {
		init: Function;
		constructor (title: string = '', secondary: boolean = false, init: Function = () => {}) {
			super({
				data: {
					title: title,
					secondary: secondary ? ' secondary' : '',
					content: ''
				},
				template: `
					<div class="kai-view{{secondary}}">
						<div class="kai-view-header">{{title}}</div>
						<div class="kai-view-content">{{content}}</div>
					</div>
				`
			});
			this.init = init;
		}
	}
}