
//Declare SQL Query for SQLite

var createBookInfoStatement = "CREATE TABLE IF NOT EXISTS BookInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, subTitle TEXT, genre TEXT,audience TEXT, synopsis TEXT, mainCharacter TEXT)";

var createBookStatement = "CREATE TABLE IF NOT EXISTS Book (id INTEGER PRIMARY KEY AUTOINCREMENT, bookInfoId ID, detail TEXT)";

var createNoteStatement = "CREATE TABLE IF NOT EXISTS Note (id INTEGER PRIMARY KEY AUTOINCREMENT, note TEXT)";

var createImageStatement = "CREATE TABLE IF NOT EXISTS Image (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)";

var createSettingStatement = "CREATE TABLE IF NOT EXISTS Setting (id INTEGER PRIMARY KEY AUTOINCREMENT, setting TEXT)";


var selectThisBookInfoStatement = "SELECT * FROM BookInfo WHERE id = ?";


var selectAllBookInfoStatement = "SELECT * FROM BookInfo";

var selectAllBookStatement = "SELECT * FROM Book";

var selectAllNoteStatement = "SELECT * FROM Note";

var selectAllImageStatement = "SELECT * FROM Image";

var selectAllSettingStatement = "SELECT * FROM Setting";
 
 
var insertBookInfoStatement = "INSERT INTO BookInfo (title, subTitle,genre,audience,synopsis,mainCharacter) VALUES (?, ?, ?, ?, ?, ?)";

var insertBookStatement = "INSERT INTO Book (bookInfoId, detail) VALUES (?, ?)";

var insertNoteStatement = "INSERT INTO Note (note) VALUES (?)";

var insertImageStatement = "INSERT INTO Image (name) VALUES (?)";

var insertSettingStatement = "INSERT INTO Setting (setting) VALUES (?)";


var updateBookInfoStatement = "UPDATE BookInfo SET title = ?, subtitle = ? ,genre = ?, audience = ?, synopsis = ?, mainCharacter = ? WHERE id=?";

var updateBookStatement = "UPDATE Book SET detail = ? WHERE id=?";

var updateNoteStatement = "UPDATE Note SET note = ? WHERE id=?";

var updateImageStatement = "UPDATE Image SET name = ? WHERE id=?";

var updateSettingStatement = "UPDATE Setting SET setting = ? WHERE id=?";


var deleteBookInfoStatement = "DELETE FROM BookInfo WHERE id=?";

var deleteBookStatement = "DELETE FROM Book WHERE bookInfoId=?";

var deleteNoteStatement = "DELETE FROM Note WHERE id=?";

var deleteImageStatement = "DELETE FROM Image WHERE id=?";

var deleteSettingStatement = "DELETE FROM Setting WHERE id=?";


var dropBookInfoStatement = "DROP TABLE BookInfo";

var dropBookStatement = "DROP TABLE Book";

var dropNoteStatement = "DROP TABLE Note";

var dropNoteStatement = "DROP TABLE Image";

var dropSettingStatement = "DROP TABLE Setting";
 
 var db = openDatabase("Book", "1.0", "Book", 200000);  // Open SQLite Database
 
var dataset;
 
var DataType;
 
 function initDatabase()  // Function Call When Page is ready.
 
{
    try {
 
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
        {
 
            alert('Databases are not supported in this browser.');
 
        }
 
        else {
 
            createTable();  // If supported then call Function for create table in SQLite
            startNoteRecords();
            startSettingRecords();
        }
 
    }
 
    catch (e) {
 
        if (e == 2) {
 
            // Version number mismatch. 
 
            console.log("Invalid database version.");
 
        } else {
 
            console.log("Unknown error " + e + ".");
 
        }
 
        return;
 
    }
 
}
 
function createTable()  // Function for Create Table in SQLite.
{
    db.transaction(function (tx) { tx.executeSql(createBookInfoStatement, [], showBookInfoRecords, onError);  });
    db.transaction(function (tx) { tx.executeSql(createBookStatement, [], showBookRecords, onError); });
    db.transaction(function (tx) { tx.executeSql(createNoteStatement, [], showNoteRecords, onError); });
    db.transaction(function (tx) { tx.executeSql(createImageStatement, [], showImageRecords, onError); });
    db.transaction(function (tx) { tx.executeSql(createSettingStatement, [], showSettingRecords, onError); });
    insertSetting();
}
 
function insertBookInfoRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var title = $('input:text[id=newTitle]').val();
        var subTitle = $('input:text[id=newSubTitle]').val();
        var genre = $('input:text[id=newGenre]').val();
        var audience = $('input:text[id=newAudience]').val();
        var synopsis = $('#newSynopsis').val();
        var mainCharacter = $('#newMainCharacter').val();
        db.transaction(function (tx) { tx.executeSql(insertBookInfoStatement, [title, subTitle,genre,audience,synopsis,mainCharacter], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
        
}

function insertBook() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var bookInfoId = $('input:text[id=writeBookInfoId]').val();
        var detail = $('textarea[id=writeText]').val();
        db.transaction(function (tx) { tx.executeSql(insertBookStatement, [bookInfoId, detail], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertNoteFirst() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var note = "";
        db.transaction(function (tx) { tx.executeSql(insertNoteStatement, [note], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertNote() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var note = $('textarea[id=noteText]').val();
        db.transaction(function (tx) { tx.executeSql(insertNoteStatement, [note], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertImage() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var image = $('input[id=imageName]').val();
        db.transaction(function (tx) { tx.executeSql(insertImageStatement, [image], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertSettingFirst() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var setting = "1";
        db.transaction(function (tx) { tx.executeSql(insertSettingStatement, [setting], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}

function insertSetting() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var setting = $('input:text[id=setting]').val();
        db.transaction(function (tx) { tx.executeSql(insertSettingStatement, [setting], loadAndReset, onError); });
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
}
 
function deleteBookInfo(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();
    db.transaction(function (tx) { tx.executeSql(deleteBookInfoStatement, [id], showBookInfoRecords, onError); 
    /*alert("Delete Sucessfully");*/ });
    resetForm();
}

function deleteBook(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();
    db.transaction(function (tx) { tx.executeSql(deleteBookStatement, [id], showBookRecords, onError);
    /*alert("Delete Sucessfully");*/ });
    resetForm();
}

function deleteNote(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();
    db.transaction(function (tx) { tx.executeSql(deleteNoteStatement, [id], showNoteRecords, onError);
    /*alert("Delete Sucessfully");*/ });
    resetForm();
}

function deleteImage(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();
    db.transaction(function (tx) { tx.executeSql(deleteImageStatement, [id], showImageRecords, onError);
    /*alert("Delete Sucessfully");*/ });
    resetForm();
}

function deleteSetting(id) // Get id of record . Function Call when Delete Button Click..
{
    var iddelete = id.toString();
    db.transaction(function (tx) { tx.executeSql(deleteSettingStatement, [id], showSettingRecords, onError); 
    /*alert("Delete Sucessfully");*/ });
    resetForm();
}
 
function updateBookInfoRecord() // Get id of record . Function Call when Delete Button Click..
{
	var title = $('input:text[id=updateTitle]').val();
    var subTitle = $('input:text[id=updateSubTitle]').val();
    var genre = $('input:text[id=updateGenre]').val();
    var audience = $('input:text[id=updateAudience]').val();
    var synopsis = $('#updateSynopsis').val();
    var mainCharacter = $('#updateMainCharacter').val();
    var bookInfoId = $('input:text[id=updateBookInfoId]').val();
    db.transaction(function (tx) { tx.executeSql(updateBookInfoStatement, [title, subTitle,genre,audience,synopsis,mainCharacter, Number(bookInfoId)], loadAndReset, onError); });
}

function updateBookRecord() // Get id of record . Function Call when Delete Button Click..
{
	var bookInfoId = $('input:text[id=bookInfoId]').val();
    var detail = $('input:text[id=detail]').val();
    var bookId = $('input:text[id=bookId]').val();
    db.transaction(function (tx) { tx.executeSql(updateBookStatement, [bookInfoId, detail, Number(bookId)], loadAndReset, onError); });
}

function updateNoteRecord() // Get id of record . Function Call when Delete Button Click..
{
	var note = $('textarea[id=noteText]').val();
    var noteId = "1";
    db.transaction(function (tx) { tx.executeSql(updateNoteStatement, [note, Number(noteId)], loadAndReset, onError); });
}

function updateSettingRecord() // Get id of record . Function Call when Delete Button Click..
{
	var setting = $('#voiceSetting').val();
	var settingId = "1";
    db.transaction(function (tx) { tx.executeSql(updateStatement, [setting, Number(settingId)], loadAndReset, onError); });
}
 
function dropBookTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { tx.executeSql(dropBookStatement, [], showBookRecords, onError); });
    resetForm();
    initDatabase();
}

function dropBookInfoTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { tx.executeSql(dropBookInfoStatement, [], showBookInfoRecords, onError); });
    resetForm();
    initDatabase();
}

function dropNoteTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { tx.executeSql(dropNoteStatement, [], showNoteRecords, onError); });
    resetForm();
    initDatabase();
}


function dropImageTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { tx.executeSql(dropImageStatement, [], showImageRecords, onError); });
    resetForm();
    initDatabase();
}

function dropSettingTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { tx.executeSql(dropSettingStatement, [], showSettingRecords, onError); });
    resetForm();
    initDatabase();
}
 
function loadBookInfoRecord(id) // Function for display records which are retrived from database.
{
	 db.transaction(function (tx) 
    {
	    tx.executeSql(selectThisBookInfoStatement, [id], function (tx, result) 
	    {
		    dataset = result.rows;
		    for (var i = 0; i < dataset.length; i++) 
		    {
			    var item = dataset.item(i);
			    $("#updateTitle").val((item['title']).toString());
			    $("#updateSubTitle").val((item['subTitle']).toString());
			    $("#updateGenre").val((item['genre']).toString());
			    $("#updateAudience").val((item['audience']).toString());
			    $("#updateSynopsis").html((item['synopsis']).toString());
			    $("#updateMainCharacter").html((item['mainCharacter']).toString());
			    $("#updateBookInfoId").val((item['id']).toString());
		    }
	    });
    });
}

function loadBookRecord(i) // Function for display records which are retrived from database.
{
    var item = dataset.item(i);
    $("#writeBookInfoId").val((item['bookInfoId']).toString());
    $("#writeText").val((item['detail']).toString());
}

function loadNoteRecord(i) // Function for display records which are retrived from database.
{
    var item = dataset.item(i);
    $("#noteText").val((item['note']).toString());
}

function loadSettingRecord(i) // Function for display records which are retrived from database.
{
    var item = dataset.item(i);
    $("#setting").val((item['setting']).toString());
    $("#settingId").val((item['id']).toString());
}
 
function resetBookInfoForm() // Function for reset form input values.
{
    $("#title").val("");
    $("#subTitle").val("");
    $("#genre").val("");
    $("#audience").val("");
    $("#synopsis").val("");
    $("#mainCharacter").val("");
    $("#bookInfoid").val("");
}

function resetBookForm() // Function for reset form input values.
{
    $("#bookInfoId").val("");
    $("#detail").val("");
    $("#bookId").val("");
}

function resetNoteForm() // Function for reset form input values.
{
    $("#note").val("");
    $("#noteId").val("");
}

function resetSettingForm() // Function for reset form input values.
{
    $("#setting").val("");
    $("#settingId").val("");
}
 
function loadAndReset() //Function for Load and Reset...
{
    resetBookInfoForm();
    showBookInfoRecords();
    showNoteRecords();
    showSettingRecords();
    showImageRecords();
}
 
function onError(tx, error) // Function for Hendeling Error...
{
 
    //alert(error.message);
 
}


function startNoteRecords() // Function For Retrive data from Database Display records as list
{
    db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllNoteStatement, [], function (tx, result) 
	    {
		    dataset = result.rows;
		    if(dataset.length == 0)
		    {
		    	insertNoteFirst();
		    }
	    });
    });
}

function startSettingRecords() // Function For Retrive data from Database Display records as list
{
    db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllSettingStatement, [], function (tx, result) 
	    {
		    dataset = result.rows;
		    if(dataset.length == 0)
		    {
		    	insertSettingFirst();
		    }
	    });
    });
}

function showNoteRecords() // Function For Retrive data from Database Display records as list
{
	$("#noteText").val("");
	db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllNoteStatement, [], function (tx, result) 
	    {
		    dataset = result.rows;
		    if(dataset.length > 0)
		    {
		    	
		    	item = dataset.item(0);
		        var thisNote = item['note'];
		        
		        $("#noteText").val(thisNote);
		    }
	    });
    });
}

function showSettingRecords() // Function For Retrive data from Database Display records as list
{
	$("#voiceSetting").val("1");
	db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllSettingStatement, [], function (tx, result) 
	    {
		    dataset = result.rows;
		    if(dataset.length > 0)
		    {
		    	
		    	item = dataset.item(0);
		        var thisSetting = item['setting'];
		        
		        $("#voiceSetting").val(thisSetting);
		    }
	    });
    });
}

function showBookInfoRecords() // Function For Retrive data from Database Display records as list
{
 
    $("#resultsBookInfo").html("");

    db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllBookInfoStatement, [], function (tx, result) 
	    {
	    	$("#resultsBookInfo").html("");
	    	
		    dataset = result.rows;

		    for (var i = 0; i < dataset.length; i++) 
		    {
		        item = dataset.item(i);
		        var linkeditdelete = '<li class="thisBookList" id="">'+
		  			'<img class="bookImage" src="images/logo.png"/><br>'+
			  			'<div class="ui-block-b bookList" style="margin-left:0%;width:auto">'+
		        			'<span class="bookInfoListId">'+ item['id'] +'</span><br>'+
		        			'<span class="bookInfoListTitle">'+ item['title'] +'</span><br>'+
						  	'<span class="bookInfoListSubTitle">'+ item['subTitle']+'</span>'+
						'</div>'+
						'<div class="ui-block-b bookList" style="margin-left:0%;float:right;width:auto;margin-top:10px">'+
	        			'<p class="bookInfoListWrite" id="'+ item['id'] +'"><i class="fa fa-pencil fa-1x"></i></p>'+
	        			'<p class="bookInfoListUpdate" id="'+ item['id'] +'"><i class="fa fa-edit fa-1x"></i></p>'+
					  	'<p class="bookInfoListDelete" id="'+ item['id'] +'"><i class="fa fa-times fa-1x"></i></p>'+
					'</div>'+
				   '</li>';
		        $("#resultsBookInfo").append(linkeditdelete);
		        $("#resultsBookInfo").listview('refresh');
		    }
	 
	    });
 
     });
    
}

function showBookRecords() // Function For Retrive data from Database Display records as list
{
 
    var thisBookMainId = $("#writeBookInfoId").val();
    $("#writeText").val("");

    db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllBookStatement, [], function (tx, result) 
	    {
	    	
	    	
		    dataset = result.rows;

		    for (var i = 0; i < dataset.length; i++) 
		    {
		        item = dataset.item(i);
		        var thisBookId =  item['bookInfoId'];
		        if(thisBookId == thisBookMainId)
		        {
		        	loadBookRecord(i);
		        }
		        
		    }
	 
	    });
 
     });
    
}

function showImageRecords()
{
	
	$("#resultsImageInfo").html("");
	
    db.transaction(function (tx) 
    {
	    tx.executeSql(selectAllImageStatement, [], function (tx, result) 
	    {
	    	
	    	$("#resultsImageInfo").html("");
	    	
		    dataset = result.rows;
		    
		    for (var i = 0; i < dataset.length; i++) 
		    {
		        item = dataset.item(i);
		        var linkeditdelete = '<li class="imageItem">'+
				  					 	'<img src="http://www.kodkillerz.com/Book/images/upload/'+ item['name'] +'">'+
			  					 		'<div class="imageControl">'+
			  					 			'<p class="imageInfoListDelete" id='+ item['id'] +'><i class="fa fa-times fa-1x"></i></p>'+
			  					 		'</div>'+
			                         '</li>';
		        $("#resultsImageInfo").append(linkeditdelete);
		        $("#resultsImageInfo").listview('refresh');
		    }
	 
	    });
 
     });

}
 
$(document).ready(function () // Call function when page is ready for load.. 
{
	
	initDatabase();
	loadAndReset();
	
	$(".sureConfirmation").click(function()
	{
		var thisId = $(".bookIdConfirmation").html();
		deleteBookInfo(thisId);
		deleteBook(thisId);
		$.mobile.changePage("#listBook");
	});
	
	$(".cancelConfirmation").click(function()
	{
		$.mobile.changePage("#listBook");
	});
	
	$(".sureImageConfirmation").click(function()
	{
		var thisId = $(".imageIdConfirmation").html();
		deleteImage(thisId);
		$.mobile.changePage("#listImage");
	});
	
	$(".cancelImageConfirmation").click(function()
	{
		$.mobile.changePage("#listImage");
	});
	
	$('.bookInfoListDelete').live("click",function(e)
	{
		var bookName = $(this).closest("li").children(".bookList").children(".bookInfoListTitle").html();
		var thisId = $(this).attr("id");
		$(".bookNameConfirmation").html(bookName);
		$(".bookIdConfirmation").html(thisId);
		$.mobile.changePage("#myPopupDialog" , { role: "dialog" });
	});
	
	$('.imageInfoListDelete').live("click",function(e)
	{
		
		var thisId = $(this).attr("id");
		
		$(".imageIdConfirmation").html(thisId);
		$.mobile.changePage("#myImagePopupDialog" , { role: "dialog" });
	});
		
	$("#newBookInfoSave").click(function()
	{
		
		insertBookInfoRecord();
		$.mobile.changePage("#listBook");
		
	});
	
	$("#updateBookInfoSave").click(function()
	{
		updateBookInfoRecord();
		$.mobile.changePage("#listBook");
		
	});
	
	$("#writeBookInfoSave").click(function()
	{
		insertBook();
	});
	
	$("#writeBookInfoSaveSmall").click(function()
	{
		insertBook();
	});
	
	$("#writeNoteInfoSave").click(function()
	{
		updateNoteRecord();
	});
	
	$("#writeNoteInfoSaveSmall").click(function()
	{
		updateNoteRecord();
	});
	
	$("#writeSettingInfoSaveSmall").click(function()
	{
		updateSettingRecord();
	});
	
	$(".bookInfoListWrite").live("click",function(e)
	{
		//e.stopPropagation();
		var thisId = $(this).attr("id");
		
		$("#writeBookInfoId").val(thisId);
		showBookRecords();
		$.mobile.changePage("#write");
		$("#writeBookInfoPlay").css("display","inline-block");
		$("#writeBookInfoPause").css("display","none");
		$("#writeBookInfoPlayOn").css("display","none");
		
	    
	});
	
	$("#writeBookInfoPlay").live("click",function(e)
	{
		$("#speech").html("");
		var audioText = $("#writeText").val();
		//$("#speech").append('<audio id="speechMain"><source src="http://tts-api.com/tts.mp3?q='+audioText+'" type=audio/mpeg></audio>');
		$("#speech").append('<audio id="speechMain"><source src="http://api.voicerss.org/?key=84a4758e3d6a4500b31772b38dc1be3a&src='+audioText+'&hl=en-us" type=audio/mpeg></audio>');
		
		$("#speechMain").get(0).play();
		$("#writeBookInfoPlay").css("display","none");
		$("#writeBookInfoPause").css("display","inline-block");
		$("#writeBookInfoPlayOn").css("display","none");
		document.getElementById('speechMain').addEventListener('ended', function()
		{
			this.currentTime = 0;
			this.pause();
			$("#writeBookInfoPlay").css("display","inline-block");
			$("#writeBookInfoPause").css("display","none");
			$("#writeBookInfoPlayOn").css("display","none");
		}, false);
	});
	
	$("#writeBookInfoPause").live("click",function(e)
	{
		$("#speechMain").get(0).pause();
		$("#writeBookInfoPlay").css("display","none");
		$("#writeBookInfoPause").css("display","none");
		$("#writeBookInfoPlayOn").css("display","inline-block");
	});
	
	$("#writeBookInfoPlayOn").live("click",function(e)
	{
		$("#speechMain").get(0).play();
		$("#writeBookInfoPlay").css("display","none");
		$("#writeBookInfoPlayOn").css("display","none");
		$("#writeBookInfoPause").css("display","inline-block");
	});
	
	
	$(".bookInfoListUpdate").live("click",function(e)
	{
	//	e.stopPropagation();
		var thisId = $(this).attr("id");
		$("#updateBookInfoId").val(thisId);
		loadBookInfoRecord(thisId);
		$.mobile.changePage("#updateBook");
	});
	/*
	$(".bookInfoListDelete").live("click",function(e)
	{
	//	e.stopPropagation();
		
		
		
	});

	$(".deleteBookConfirm").live("click",function(e)
	{
		$.mobile.changePage( $("#listBook"));
	});
	
	$(".deleteBookCancel").live("click",function(e)
	{
		$.mobile.changePage( $("#listBook"));
	});
	*/	
	
	$('#rent').click(function()
	{
		$.mobile.changePage( $("#listBook"));
	});
	
	$('#contacts').click(function()
	{
		$.mobile.changePage( $("#research"));
	});
	
	$('#voicemail').click(function()
	{
		$.mobile.changePage( $("#settings"));
	});
	
	$(".newBookInfoReset").click(function()
	{
		  $('input:text[id=newTitle]').val("");
	      $('input:text[id=newSubTitle]').val("");
	      $('input:text[id=newGenre]').val("");
	      $('input:text[id=newAudience]').val("");
	      $('#newSynopsis').val("");
	      $('#newMainCharacter').val("");
	});
	/*
    $("body").fadeIn(2000); // Fede In Effect when Page Load..
 
    initDatabase();
 
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
 
    $("#btnUpdate").click(updateRecord);
 
    $("#btnReset").click(resetForm);
 
    $("#btnDrop").click(dropTable);
 */
});