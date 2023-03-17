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
	document.addEventListener('keypress', (event: KeyboardEvent) => {
		if (KeyboardKey[event.key]) methods[event.key]();
	});
	export function add (key: KeyboardKey, method: Function) {
		methods[key] = method;
	}
}

namespace KaiUI {
	export class SoftkeyHandler {
		private element: React.Element = new React.Element({
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
		get visible () {
			return this.element.HTMLElement.classList.contains('hidden');
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
			KeyboardListener.add(key, method.bind(this));
		}
	}

	export class ViewManager {
		private stack: View[] = [];
		private element: React.Element = new React.Element({
			selector: '#kai-view-container',
			data: {
				content: ''
			},
			template: '{{content}}'
		});
		back () {
			let previous = this.stack.pop();
			this.update();
		}
		get current () {
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

	export class View extends React.Element {
		init: Function;
		constructor (title = '', secondary: boolean = false, init: Function = () => {}) {
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