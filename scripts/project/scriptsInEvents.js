function initDevtodev(platform, player)
{
	// choose key for init. If neither VK nor OK platform, init with Yandex key
	var key = platform == "VK" ? "ak-Xps2eA9bfUHP60ti5ZogTzljxdGaN8Dy" : platform == "OK" ? "ak-01ElkNFD5RiwPStcsphMaLHBbUTAYq7G" : "ak-RyvCowHOKEer5INq3uXBUYf2n0J7QMkz";
	console.log("Platform: " + platform);
	devtodev.init(key, player);
	return "Initialized devtodev";
}



const scriptsInEvents = {

		async Menuevents_Event92(runtime, localVars)
		{
			runtime.setReturnValue(initDevtodev(localVars.platformType, localVars.playerID))
		}

};

self.C3.ScriptsInEvents = scriptsInEvents;

