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

class SoftkeyHandler {
	private static element: React.Element = new React.Element({
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
	static set visible (value: boolean) {
		switch (value) {
			case false:
				SoftkeyHandler.element.innerElement?.classList.add('hidden');
				break;
			case true:
				SoftkeyHandler.element.innerElement?.classList.remove('hidden');
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

class ViewManager {
	private static stack: View[] = [];
	private static element: React.Element = new React.Element({
		selector: '#kai-view-container',
		data: {
			content: 'HELLO WORLD!'
		},
		template: '{{content}}'
	});
	constructor () {
		// TODO: View Manager
	}
	static get current () {
		return ViewManager.stack[ViewManager.stack.length - 1];
	}
	static set current (view: View) {
		ViewManager.stack.push(view);
		ViewManager.update();
	}
	static update () {
		ViewManager.current.init();
		ViewManager.element.content = ViewManager.current.template;
	}
}

class View extends React.Element {
	init: Function;
	constructor (title = '', secondary: boolean = false, init: Function = () => {}) {
		super({
			data: {
				title: title,
				secondary: secondary ? ' secondary' : '',
				content: ''
			},
			template: `<div class="kai-view{{secondary}}">
				<div class="kai-view-header">{{title}}</div>
				<div class="kai-view-content">{{content}}</div>
			</div>`
		});
		this.init = init;
	}
}