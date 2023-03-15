let TestElement = new React.Element({
	selector: '#kai-view-container',
	data: {
		content: ''
	},
	template: `{{content}}`
});

SoftkeyManager.Manager.bind(SoftkeyManager.Command.CENTER, 'Enter', () => {
	console.log('Cheers mate!');
});