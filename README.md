# focus-on-time

![Tests](https://github.com/hazryn/focus-on-time/workflows/Tests/badge.svg)
![Build & Release](https://github.com/hazryn/focus-on-time/workflows/Build%20&%20Release/badge.svg)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Install
#### Windows

Download and install exe file https://github.com/hazryn/focus-on-time/releases/download/v0.2.1/Focus-On-Time-Setup-0.2.1.exe

#### MacOs
Download and install exe file https://github.com/hazryn/focus-on-time/releases/download/v0.2.1/Focus-On-Time-0.2.1.dmg

#### Linux
Download and install package 
- deb https://github.com/hazryn/focus-on-time/releases/download/v0.2.1/focus-on-time_0.2.1_amd64.deb
- rpm https://github.com/hazryn/focus-on-time/releases/download/v0.2.1/focus-on-time-0.2.1.x86_64.rpm

OR add package to your repository

```
wget -O - http://repo.recode-software.eu/dbr.gpg.key | sudo apt-key add -
sudo echo 'deb http://repo.recode-software.eu recode-software main non-free' >> /etc/apt.source.list

sudo apt update && sudo apt install focus-on-time
```
