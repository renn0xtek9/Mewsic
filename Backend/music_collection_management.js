var mysql = require('mysql');
var connection=mysql.createConnection({host:"localhost", user:"mewsic",password:"mewsic"});
module.exports={
	ScanCollection: function(path){
		//if database does not exist , then :
// 				create the database 
		
// 		else  delete the tables form the database
// 		create the tables
// 		list all files under the path that are ending with .mp3
		
					
	},
	CreateCollectionDatabase: function(){
		con.connect(function(err) {
			if(err) throw err;
			    console.log("Connected!");
		});
	},
};

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
	
	function getInformationFormId3Tags(){
		
		return false;			//True if we return 
	}
	
}
///@function DoesDataBaseAlreadyExist()			
///@brief Return true if the database already exists, false otherwise

function DoesDataBaseAlreadyExist()(){
	
}
///@function DeleteAllTablesFromTables			
///@brief Delete all tables from the database 

function DeleteAllTablesFromTables(){
	
}
///@function CreateDatabase			
///@brief Create the database.

function CreateDatabase(){
	
}
///@function CreateTables			
///@brief Create all required tables for the database

function CreateTables(){
	
}

///@function ListAllFileFromTheFileSystem			
///@brief This will list all the media file that are located under the given path
/// @param path root path of the music collection

function ListAllFileFromTheFileSystem(path){
	
}
