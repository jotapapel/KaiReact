import KaiElement = KaiReact.Element;

let TestElement = new KaiElement({
    selector: 'div',
    data: {
        myVariable: 0
    },
    template: `{{myVariable}}`
});

TestElement.myVariable = 32;