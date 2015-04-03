## This repository refers to the article [Build an iOS app with Push Notifications using Ionic Framework](https://www.airpair.com/ionic-framework/posts/push-notifications-using-ionic-framework)

### Running the server
**PushNewsCert.pem** and **PushNewsKey.pem** should be [created](https://www.airpair.com/ionic-framework/posts/push-notifications-using-ionic-framework#provisioning-profile-and-certificates)
```bash
$ npm install
$ node server.js
```

### Building iOS app

```bash
$ npm i -g cordova ionic

$ cordova plugin add cordova-plugin-console
$ cordova plugin add cordova-plugin-device
$ cordova plugin add com.ionic.keyboard
$ cordova plugin add https://github.com/phonegap-build/PushPlugin.git
$ cordova plugin add cordova-plugin-inappbrowser

$ ionic platform add ios
$ ionic build ios
$ ionic run ios
```

<iframe width="640" height="480" src="https://www.youtube.com/embed/MRSIgfM-Omc?rel=0" frameborder="0" allowfullscreen></iframe>
