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
	let methods: {[index: string]: Function} = {};
	document.addEventListener('keypress', (event) => {
		if (KeyboardKey[event.key]) methods[event.key]();
	});
	export function add (key: KeyboardKey, method: Function) {
		methods[key] = method;
	}
}

class SoftkeyHandler {
	static element: React.Element = new React.Element({
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
	static set visible (value: boolean) {
		switch (value) {
			case false:
				SoftkeyHandler.element.innerElement.classList.add('hidden');
				break;
			case true:
				SoftkeyHandler.element.innerElement.classList.remove('hidden');
				break;
		}
	}
	static get visible () {
		return SoftkeyHandler.element.HTMLElement.classList.contains('hidden');
	}
	static bind (key: KeyboardKey, label: string, method: Function) {
		switch (key) {
			case KeyboardKey.SoftLeft:
				SoftkeyHandler.element.labelLeft = label;
				break;
			case KeyboardKey.Enter:
				SoftkeyHandler.element.labelCenter = label;
				break;
			case KeyboardKey.SoftRight:
				SoftkeyHandler.element.labelRight = label;
				break;
		};
		KeyboardListener.add(key, method.bind(this));
	}
}

class View extends React.Element {
	constructor (title = '') {
		super({
			data: {
				title: title,
				content: ''
			},
			template: `<div class="kai-view">
				<div class="kai-view-header">{{title}}</div>
				<div class="kai-view-content">{{content}}</div>
			</div>`
		})
		// TODO: view implementaton;
	}
}