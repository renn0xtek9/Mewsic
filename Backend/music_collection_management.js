const fs = require('fs');
const sq = require('sqlite3');
const walk = require('walk');
const NodeID3 = require('node-id3');
const sqlqueries = JSON.parse(fs.readFileSync('sqlquery.json', 'utf8'));

// var mysql = require('mysql');
// var connection=mysql.createConnection({host:"localhost", user:"mewsic"});
/*
connection.connect(function(err){
	if(err) throw err;
	console.log("Connected to mysql");
}); */
module.exports = {
  ScanCollection(path) {
    CreateCollectionDatabase();
    const filespaths = IndexTheWholePath(path);
    console.log('Media files listed');
    const songs = [];
    for (filepath in filespaths) {
      songs.append(new Song(filepath));
    }
    console.log('Media information extracted');
    // TODO insert all song into the datasbase
  },
};


function CreateCollectionDatabase() {
  // TODO make it a promise !
  if (DoesDataBaseAlreadyExist()) {
    DeleteAllTablesFromTables();
    CreateDatabase();
  } else {
    CreateDatabase();
  }
  console.log('Database created');
}


// / @class SongFile
// / @brief Reprensents a media file (typically an mp3 file)
// / @param path the fullpath to the file
class SongFile {
  constructor(path) {
    this.path = path;
    // TODO at first extract the basename of the file form the full path and use it as a songname (if we don't get anythig better form id3tag, we will have this
    this.title = '';
    this.artist = '';
    this.album = '';
    this.tracknumber=0
    this.duration = 0.0;
    var that=this;
    var getinfofromid3=this.getInformationFormId3Tags();
    getinfofromid3.then(function(result){
	    that.title=result.title;
	    that.artist=result.artist; 
    },function(err){
	    console.log("Problem with promise of id3tags");	    
    })
  }
  // /@function getInformationFormId3Tags()
  // /@brief get Id 3 Tag information from the media and populate class member.
  // /@return true, if Id3Tag have been retrieved, false otherwise
  get ValuesForSQLInsertion(){
	  return this.getValuesForSQLInsertion();
  } 
  getValuesForSQLInsertion(){
	var list=[this.title,this.artist,this.album,this.duration,this.tracknumber];
	var ret=''
	for (var i=0;i<list.length;i++)
	{
		ret+='"'+list[i]+'"';
		if (i<list.length-1)
		{
			ret+=",";
		}
	}
	return ret;
	  
  }
  
  async getInformationFormId3Tags() {
    try {
      console.log(`Reading tag for ${this.path}`);
      const file = this.path || new Buffer('Buffer for mp3 file');
      
      return new Promise(function(resolve,reject){
	      let tags = NodeID3.read(file);
	      try{
		resolve(tags);
	      }
	      catch(e)
	      {
		reject (e);
	      }  
      })
    } catch (e) {
      console.log(`Error reading id3tags of ${this.path}`);
    }
  }
}
// /@function DoesDataBaseAlreadyExist()
// /@brief Return true if the database already exists, false otherwise

function DoesDataBaseAlreadyExist() {
  if (fs.existsSync(`${__dirname}/musiccollection.db`)) {
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
	} */
}
// /@function DeleteAllTablesFromTables
// /@brief Delete all tables from the database

function DeleteAllTablesFromTables() {

}
// /@function CreateDatabase
// /@brief Create the database.

function CreateDatabase() {
  db = new sq.Database(`${__dirname}/musiccollection.db`);

  /*
	if (connection.connect){
		connection.query(sqlqueries['SQLQueries'][''],function(err,result){
			if(err) throw err;
		});
	}
	else {
		console.log("Can't create database: not connected");
	} */
}
// /@function CreateTables
// /@brief Create all required tables for the database

function CreateTables() {
  db.run(sqlqueries.SQLQueries.CreateTrackTable);
}

// /@function IndexTheWholePath
// /@brief This will list all the media file that are located under the given path
// / @param path root path of the music collection

function IndexTheWholePath(path) {
// 	var walk    = require('walk');
  const Songs = [];
  console.log(`Now listing media files under ${path}`);
  if (!fs.existsSync(path)) {
    console.log(`Path does not exist ${path}`);
    return [];
  }

  // Walker options
  const walker = walk.walk(path, { followLinks: false });
  walker.on('file', (root, stat, next) => {
    if (stat.name.includes('.mp3')) {
      Songs.push(new SongFile(`${root}/${stat.name}`));
    }
    next();
  });
  walker.on('errors', (root, nodeStatsArray, next) => {
    next();
  });

  walker.on('end', () => {
    console.log('All media files listed');
    InsertSongsInTheDatabase(Songs);
  });
}


// /@function InsertSongsInTheDatabase
// /@brief Insert a list of Songs Object into the database
// / @param Songs a list of Song Objects that are to be insterted

function InsertSongsInTheDatabase(Songs) {
  for (var i=0; i<Songs.length;i++) {
    var song=Songs[i];
    db.run(sqlqueries.SQLQueries.InsertTrackIntoTrackTable+song.ValuesForSQLInsertion+");");
  }
}
