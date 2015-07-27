// JavaScript Document
// PROJECT: Phonegap LocalNotifications
// AUTHOR: Drew Dahlman ( www.drewdahlman.com )
// DATE: 1.26.2012

// UPDATED BY: Dave Alden (www.workingedge.co.uk)
// DATE: 5.30.2013

/*
NOTES:
We will be creating LocalNotifications that can be set to fire while app is inactive, 
and create a callback for the JS to know when the app has come back from a notification.

One thing that is deceptive about the LocalNotifications plugin is that when it shows a notification
has been created it shows it based on the timezone +0000 which can throw you off.

in the call for setting the notification we simply call notification.local_timed("13:00") - note that I supplied a string.

The ability to set repeating notifications has been added! 
- daily
- weekly
- monthly
- yearly
*/

/*
2013 UPDATE NOTES:
- Updated from phonegap-1.2.0 to cordova-2.5.0
- Updated to use new plugin signature (Cordova 2.1.0+)
- Added support for silent alerts with sound='none'
- Added more examples
*/



// NOTIFICATION CENTER
/*
I like to set up one object that's only job is to manage notifications
*/
var notification = {
	init:function(){
		cordova.plugins.notification.local.on('schedule', function (notification) {
			console.log("Scheduled local notification: "+ notification.id);
		}, this);
		cordova.plugins.notification.local.on('trigger', function (notification) {
			console.log("Triggered local notification: "+ notification.id);
		}, this);
		cordova.plugins.notification.local.on('click', function (notification) {
			console.log("User clicked local notification: "+ notification.id);
		}, this);
	},
	// This will fire immediately
	local_now:function(){
		cordova.plugins.notification.local.schedule({
			id: 1,
			title: 'My app',
			text: 'Immediate notification'
		});
	},
	
	// This will fire after 10 seconds
	local_10:function(){
		var d = new Date();
		d = d.getTime() + 10*1000; //10 seconds from now
		d = new Date(d);

		cordova.plugins.notification.local.schedule({
			id: 2,
			title: 'My app',
			text: '10 second notification',
			at: d
		});
	},

	clear:function(){
		cordova.plugins.notification.local.clearAll();
	}
	
}

var app = {
	bodyLoad:function(){
		document.addEventListener("deviceready", app.deviceReady, false);
	},
	deviceReady:function(){
		app.init();
	}
};