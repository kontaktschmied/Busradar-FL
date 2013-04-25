exports.create = function() {
	// Map stuff
	var mapwindow = Ti.UI.createWindow({
		title : 'Busradar Flensburg'
	});
	mapwindow.map = require('modul/map.widget').create();
	mapwindow.add(mapwindow.map);
	var masterwindow = Ti.UI.createWindow({
	});
	masterwindow.add(require('modul/clouds').create());
	masterwindow.add(require('modul/monitor').create());
	///  Main frame:
	if (Ti.Platform.osname === 'ipad') {
		var splitwindow = Ti.UI.iPad.createSplitWindow({
			detailView : mapwindow,
			masterView : masterwindow,
			hide : true
		});
		splitwindow.open();
		Ti.App.addEventListener('app:showmaster', function() {
			splitwindow.setVisible(true);
		});
		splitwindow.addEventListener('visible', function(e) {
			if (e.view == 'detail') {
				//	e.button.title = "Archiv-Liste";
				//	detailWindow.leftNavButton = e.button;
			} else if (e.view == 'master') {
				//	detailWindow.leftNavButton = null;
			}
		});
	} else {
		masterwindow.addEventListener('click', function() {
			masterwindow.close({
				transition : Ti.UI.iPhone.AnimationStyle.CURL_DOWN
			});
		})
		Ti.App.addEventListener('app:showmonitor', function(_e) {
			masterwindow.open({
				transition : Ti.UI.iPhone.AnimationStyle.CURL_UP
			});
		});
		mapwindow.open();
	}
}