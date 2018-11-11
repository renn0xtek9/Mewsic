var fs = require('fs');
var sq = require('sqlite3');
var walk = require('walk');

var sqlqueries = JSON.parse(fs.readFileSync('sqlquery.json', 'utf8'));

// var mysql = require('mysql');
// var connection=mysql.createConnection({host:"localhost", user:"mewsic"});
/*
connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to mysql");
});*/
module.exports={
	ScanCollection: function(path){
		CreateCollectionDatabase();
		console.log(path);
		var files=ListAllFileFromTheFileSystem(path);
		
		console.log("Media files listed");
	},
};



function CreateCollectionDatabase(){
	//TODO make it a promise !
	if (DoesDataBaseAlreadyExist())
	{
		DeleteAllTablesFromTables();
		CreateDatabase();
	}
	else{
		CreateDatabase();
	}
	console.log("Database created");
}



/// @class Songfile
/// @brief Reprensents a media file (typically an mp3 file)
/// @param path the fullpath to the file
class SongFile {
	constructor(path){
		this.path=path;
// 		this.songname=			//TODO at first extract the basename of the file form the full path and use it as a songname (if we don't get anythig better form id3tag, we will have this
		this.artistname="";
		this.albumname="";
		this.duration=0.0;
		this.getInformationFormId3Tags()
	}
	///@function getInformationFormId3Tags()
	///@brief get Id 3 Tag information from the media and populate class member.
	///@return true, if Id3Tag have been retrieved, false otherwise

	getInformationFormId3Tags(){

		return false;			//True if we return
	}

}
///@function DoesDataBaseAlreadyExist()
///@brief Return true if the database already exists, false otherwise

function DoesDataBaseAlreadyExist(){
	if (fs.existsSync(__dirname+"/musiccollection.db")) {
		return true;
	}
	return false;
	/*
	if (connection.connect){
		connection.query(sqlqueries['SQLQueries']['TestPresenceOfDatabase'],function(err,result){
			if(err) throw err;
			console.log("Result: "+result);
		});
	}
	else{
		console.log("Can't check if database exist: not connected");
		return false ;
	}*/
}
///@function DeleteAllTablesFromTables
///@brief Delete all tables from the database

function DeleteAllTablesFromTables(){

}
///@function CreateDatabase
///@brief Create the database.

function CreateDatabase(){
	db=new sq.Database(__dirname + "/musiccollection.db");

	/*
	if (connection.connect){
		connection.query(sqlqueries['SQLQueries'][''],function(err,result){
			if(err) throw err;
		});
	}
	else {
		console.log("Can't create database: not connected");
	}*/
}
///@function CreateTables
///@brief Create all required tables for the database

function CreateTables(){
	db.run(sqlqueries['SQLQueries']['CreateTrackTable'])

}

///@function ListAllFileFromTheFileSystem
///@brief This will list all the media file that are located under the given path
/// @param path root path of the music collection

function ListAllFileFromTheFileSystem(path){
	var walk    = require('walk');
	var files   = [];
	console.log("Now listing media files under "+path);
	if (!fs.existsSync(path)) {
		console.log("Path does not exist "+path);
		return  [];
	}	
	
	// Walker options
	var walker  = walk.walk(path, { followLinks: false });

	walker.on('file', function(root, stat, next) {
		console.log(stat);
		if (stat.name.includes(".mp3"))
		{
			files.push(root + '/' + stat.name);
			console.log(stat.name)
		}
		next();
	});
	walker.on("errors", function (root, nodeStatsArray, next) {
		next();
	});

	walker.on('end', function() {
		console.log(files);
	});
	return files
}
