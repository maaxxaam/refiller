import {vars, Command} from "./globals.js";

export class ButtonBinder extends Command {
	constructor(func, button){
		super(func);
		this.button = button;
	}
	
	reattach(button){ // ISpriteInstance
		this.button = button;
	}
	
	execute(){
		this.exec(this.button);
	}
} 

export const MainButtons = {
	"MainScreen": new ButtonBinder(showLayer, null),
	"Levels": new ButtonBinder(Lvls, null),
	"About": new ButtonBinder(showLayer, null),
	"Settings": new ButtonBinder(showLayer, null),
	"Shop": new ButtonBinder(showLayer, null),
	"Share": new ButtonBinder(null, null),
	"Platform": new ButtonBinder(null, null)
}

export function showLayer(button) {
	let layout = button.layer.layout;
	let show = button.instVars.AnimationPrefix;
	if (layout.getLayer(show).isVisible) {
		show = "MainScreen";
	}
	console.log("Showing Layer ", show);
	for (let layer of layout.getAllLayers()) {
		if (layer.name != "Background" && layer.name != "AlwaysButtons") {
			layer.isVisible = layer.name == show;
		}
	}
}

function Lvls(button) {
	let runtime = button.runtime;
	runtime.globalVars.LvlPage = Math.floor((runtime.globalVars.UnlockedLvl - 1) / 9);
	runtime.callFunction("UpdateStars");
	showLayer(button);
}

function MapMainButtons(runtime) {
	for (const button of runtime.objects.MainBut.instances()) {
		if (button.instVars.AnimationPrefix == "VK") {
			MainButtons["Platform"].reattach(button);
			continue;
		};
		MainButtons[button.instVars.AnimationPrefix].reattach(button);
	};
}

export function SetupMainButtons(runtime){
	MapMainButtons(runtime);
	MainButtons["Share"].rebind(() => runtime.callFunction("ShareButton"));
	MainButtons["Platform"].rebind(() => runtime.callFunction("SocialButton"));
	MainButtons["MainScreen"].execute();
	setPlatform();
}

export function setPlatform(platformType){
	vars.platform = vars.platforms[platformType];
}

export default {ButtonBinder, MainButtons, SetupMainButtons, setPlatform};