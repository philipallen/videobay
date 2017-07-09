to run in browser:
npm install -g ionic cordova //first time only
npm install
ionic serve

to run on android phone:
install android sdk (download from internet)
install java jdk (download from internet)
plug android phone into pc
you have to allow 'usb debugging' on phone (google it for your phone)
run from project: 
	cordova platform add android //adds android template files to project under /platforms/android
	cordova build android //builds gradle project and .apk for this project in /platforms/android
	cordova run android //installs the .apk onto phone
	 