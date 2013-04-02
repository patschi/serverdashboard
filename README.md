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

### Live Demo
---
Live demonstration can be viewed on <a href="http://serverdashboard.pkern.at" target="_blank">serverdashboard.pkern.at</a>

### License
---
<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Server Dashboard</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://pkern.at" property="cc:attributionName" rel="cc:attributionURL">Patrik Kernstock (Patschi)</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.<br />Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="https://github.com/patschi/serverdashboard" rel="cc:morePermissions">https://github.com/patschi/serverdashboard</a>.

### Credits
---
Awesome design by <a href="http://code-project.de" target="_blank">code-project.de</a><br />
Code and idea by <a href="http://pkern.at" target="_blank">pkern.at</a>