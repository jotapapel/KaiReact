namespace KeyboardListener {
	export enum Key {
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
	class _Listener {
		private methods: {[index: string]: Function} = {};
		constructor () {
			document.addEventListener('keypress', (event: KeyboardEvent) => {
				if (Key[event.key]) this.methods[event.key]();
			});
		}
		bind (key: Key, method: Function) {
			this.methods[key] = method;
		}
	}
	export const Listener: _Listener = new _Listener();
}

namespace SoftkeyManager {
	export enum Command {
		LEFT = KeyboardListener.Key.SoftLeft,
		CENTER = KeyboardListener.Key.Enter,
		RIGHT = KeyboardListener.Key.SoftRight
	}
	class _Manager {
		private element: React.Element = new React.Element({
			selector: '#kai-softkey-container',
			data: {
				labelLeft: '',
				labelCenter: '',
				labelRight: ''
			},
			template: `
				<label id="kai-softkey-left">{{labelLeft}}</label>
				<label id="kai-softkey-center">{{labelCenter}}</label>
				<label id="kai-softkey-right">{{labelRight}}</label>
			`
		});
		set visible (value: boolean) {
			switch (value) {
				case false:
					this.element.HTMLElement.classList.add('hidden');
					break;
				case true:
					this.element.HTMLElement.classList.remove('hidden');
					break;
			}
		}
		get visible () {
			return this.element.HTMLElement.classList.contains('hidden');
		}
		bind (command: Command, label: string, method: Function) {
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
			};
			KeyboardListener.Listener.bind(command as unknown as KeyboardListener.Key, method);
		}
	}
	export const Manager: _Manager = new _Manager();
}