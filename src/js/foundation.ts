namespace Foundation {
	export enum KeyboardKey {
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

	export namespace KeyboardListener {
		const methods: {[index: string]: Function} = {};
        document.addEventListener('keypress', (event: KeyboardEvent) => {
            if (KeyboardKey[event.key]) methods[event.key]();
        });
		export function add (key: KeyboardKey, method: Function) {
			methods[key] = method;
		}
	}
}