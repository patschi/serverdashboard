# Server dashboard

This is a simple and awesome dashboard for your own server. The dashboard require the functionality of shell_exec - they are mostly disabled on shared hosting systems. There is also a simple cache functionality included to prevent high loads on the system, configurable in the simple configuration.

JSON will be used to transfer data between the dashboard and the PHP script. Optionally you can allow external access from other domains with AJAX to the simple json-API - simply change the config variable `AllowExternalAccess` to `true`.

For easier use there is a simple configuration file, which is located at `assets/config.php` and edit it to your needs, before you're going to use this dashboard. Please give me feedback, wishes and report bugs - if you find one :)

Thanks for using!

### Requirements
---
1. a (own?) linux machine (Debian recommended).
2. PHP 5.3+ with shell_exec() enabled.
3. a browser with JavaScript and CSS3 support.
4. some basic knowledge.

### Installation
---
1. Clone this git: `git clone git://github.com/patschi/serverdashboard.git`
1. Add `www-data        ALL=NOPASSWD: /sbin/ifconfig eth0` to your `sudo` configuration, which can be open by default with the command `visudo.` This is needed that the user `www-data` can execute the ifconfig command to read out the current sent and received bytes for getting the network speed.
2. Install `lsb-release` package (`sudo apt-get install lsb-release` on debian systems).
3. If don't use eth0 as your default network interface, you need to set the correct one in the configuration file, which is located at `assets/config.php`.
4. Change the configuration of `assets/config.php` to your needs.

### Screenshots
---
![Screenshot 1](https://raw.github.com/patschi/serverdashboard/master/ServerOverview1.png "Screenshot 1")
![Screenshot 2](https://raw.github.com/patschi/serverdashboard/master/ServerOverview2.png "Screenshot 2")

### Project page by github
---
The official project page is powered by github at: <a href="http://patschi.github.io/serverdashboard/" target="_blank">patschi.github.io/serverdashboard/</a>

### Live Demo
---
Live demonstration can be viewed on <a href="http://serverdashboard.pkern.at" target="_blank">serverdashboard.pkern.at</a>

### Credits
---
Code and idea by <a href="http://pkern.at" target="_blank">pkern.at</a>
