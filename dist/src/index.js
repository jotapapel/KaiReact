var SoftkeyHandler=new KaiUI.SoftkeyHandler,ViewManager=new KaiUI.ViewManager,MainView=(KeyboardListener.bind(KeyboardKey.Backspace,function(){ViewManager.back()}),new KaiUI.View("Theme Test",!1,function(){SoftkeyHandler.clear(!0),SoftkeyHandler.bind(KeyboardKey.Enter,"Toggle",function(){"light"==document.querySelector("html").getAttribute("data-theme")?ThemeManager.theme="dark":ThemeManager.theme="light"})}));ViewManager.current=MainView;