# Mewsic
## Status 
Project is freshly started. Not to be actively used at the moment.

## Goal
### Near term goal
Mewsic is a music player written in NodeJs.
This expose a webpage that allows you to control the music player (for instance the PC in your living room) from any device in your local network.
The main focus of music is to handle and manage your music collection. 
In addition, music will be able to sync the music collection of you devices (smartphone etc.. on the fly).
For this we will have native apps (in android). 

### Long term goal 
In long term Mewsic will be able to handle several play clients. That means that you can play different music in the living room and bathroom.



## Architecture
Right now music is backend (server) in Node.Js.
The client side (webpage) is an html5 with javascript page.
The audio playback is ensure by starting vlc in headless mode with remote control capabilities (vlc -I rc). Right now this is sufficient. Later on we might need to



## TODO 
*a lot...* 


### Urgent (usability hindering)
* Implement settings page where users will save settings regarding music collection
	* Path of music
	* Let the user change the port
* Implement a scan of all the collection 
* Ensure that mysql server is started at start-up of Mewsic
* Implement search of music in the collection



### Important (very annoying)
* Define nice style for client side webpage
* Client side webpage must auto define scaling when displayed on small screen devices (smartphone)


### To be done (belong to feature path)
* Implement search view and current playlist view from 
* Investigate how we do start a process at Computer start by the root (


### Nice to have
* Make a KDE native plasmoid (QML) that connect to Mewsic
* Make a native Android app that connect to Mewsic



