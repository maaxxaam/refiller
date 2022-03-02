
// Import any other script files here, e.g.:
import * as MainMenu from "./main_menu.js";
import * as Global from "./globals.js";

const pointerUpListeners = {
	"Menu": OnPointerUpMM,
	"Main": OnPointerUpLvl,
	"Intro": OnPointerUpIntro,
	"Loader": () => {}
}

class pointerListener{
	constructor(runtime, layout = "Menu"){
		this.upListener = e => pointerUpListeners[layout](e, runtime);
		runtime.addEventListener("pointerup", this.upListener);
	}
	
	swapListener(runtime, layout){
		console.log("Attempting swap for layout ", layout)
		runtime.removeEventListener("pointerup", this.upListener);
		this.upListener = e => pointerUpListeners[layout](e, runtime);
		runtime.addEventListener("pointerup", this.upListener);
	}
}

var pl;

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	var link = document.createElement('style');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.innerHTML = ``
	document.head.appendChild(link);

	pl = new pointerListener(runtime);
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.

	runtime.getLayout("Menu").addEventListener("beforelayoutstart", () => MainMenu.SetupMainButtons(runtime));
	
	for (const layout of runtime.getAllLayouts()) {
		layout.addEventListener("beforelayoutstart", () => pl.swapListener(runtime, layout.name));
	}
	//runtime.addEventListener("afterprojectstart", () => OnAfterProjectStart(runtime));
	//runtime.addEventListener("pointerup", e => OnPointerUpMM(e, runtime));
	//runtime.addEventListener("tick", () => Tick(runtime));
}

function OnPointerUpMM(e, runtime) {
	var mainbuts = Object.values(MainMenu.MainButtons).filter((val) => {return val.button.layer.isVisible});
	let x, y;
	[x, y] = runtime.layout.getLayer(0).cssPxToLayer(e.clientX, e.clientY);
	if (e.button == 0){
		for (const mainbut of mainbuts) {
			if (mainbut.button.containsPoint(x, y)) {
				mainbut.execute();
				break;
			}
		}
		
		for (const closebut of runtime.objects.BackToMainBut.instances()) {
			if (closebut.containsPoint(x, y) && closebut.layer.isVisible) {
				MainMenu.MainButtons["MainScreen"].execute();
				break;
			}
		}
	}
}

function OnPointerUpLvl(e, runtime) {
	console.log("We're in a level");
}

function OnPointerUpIntro(e, runtime) {
	console.log("We're in intro sequence");
}

function Tick(runtime)
{
	// Code to run every tick
}
