var SERVER_URL = "http://westonklee.com/planner/";

$(document).ready(function(){
	$('#Todo_form').submit(function() { 
		addTodo($("#image_name").val(), $("#due_date").val());
		return false; 
		});		
});

var edit_id = -1;

// Loads XML from GetTodos.php and writes HTML to the gallery div
function loadXMLDoc()
{
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	// Add our response function, called when the server responds
	xmlhttp.onreadystatechange=function()
	{
		// readyState == 4 && status == 200 means the response was sucessful and has XML
	  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			// Clear out any existing content in the gallery div
			document.getElementById("gallery").innerHTML = '';
			
			// Assign XML to our xmlDoc variable
			xmlDoc=xmlhttp.responseXML;
			// Create an array of XML nodes 
			var x=xmlDoc.getElementsByTagName("TODO");
			
			// Walks through all of the images and write the image tag with the path to the image
			for (i=0;i<x.length;i++)
			{ 
				var id = x[i].getElementsByTagName("id")[0].childNodes[0].nodeValue;
				var title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
				var checked = x[i].getElementsByTagName("checked")[0].childNodes[0].nodeValue;
				var date = "";
				if(x[i].getElementsByTagName("date")[0].childNodes[0]) {
				 	date = x[i].getElementsByTagName("date")[0].childNodes[0].nodeValue;
				}
				var checkHTML = "";
				if(checked == "1") {
					checkHTML = ' checked '					
				}
				// if completed class is strike otherwise standard
			  	document.getElementById("gallery").innerHTML += ('<li><span class="date_float">' + date + '</span><span id="todo">' + title +'</span> <input type="image" src="http://westonklee.com/images/monotone_close_exit_delete.png" class="remove" onClick=removeTodo(' + id +')></input>' +' <input type="image" src="http://westonklee.com/images/edit_48.png" class="edit" onClick=startEdit("' + id +'")></input>' +' <input type="checkbox" class="check" id="check' + id +'" ' + checkHTML + ' onClick="completeTodo('+ id +')" />' + '</li>');
			  	
			}	
			
			if(x.length == 0){
				addTodo("Example TODO", "1/5/14");	
			}
			
			$(".remove").on("click", removeItem);
		}
	}
	
	// send off our request
	
	xmlhttp.open("GET","api/GetTodos.php",true);
	xmlhttp.send();

}

function startEdit(id) {
	edit_id = id;
	$("#todo"+id).html('<form id="updateForm"><input type="text" name="update_name" id="update_name" value="'+ $("#todo"+id).text() + '" /><button type="submit" class="button">Submit</button></form>');
	$('#updateForm').submit(function() { 

		updateTodo($("#update_name").val(), edit_id);
			
			edit_id = -1;
			return false; 
		});
}

function removeItem(event) { 
	// fade out the clicked element
	//alert($(this).text());
	$(this).parent().fadeOut('slow', function() {
    $(this).remove();
  });

}

function addTodo(title, due_date)
{
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	// Add our response function, called when the server responds
	xmlhttp.onreadystatechange=function()
	{
		// readyState == 4 && status == 200 means the response was sucessful and has XML
	  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			$("#image_name").val('');
			$("#due_date").val('');
			loadXMLDoc();
		}
	}

	// send off our request
	xmlhttp.open("GET",SERVER_URL + "api/AddTodo.php?title=" + title + "&due_date=" + due_date, true);
	xmlhttp.send();	
}

function addDate(due_date)
{
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	// Add our response function, called when the server responds
	xmlhttp.onreadystatechange=function()
	{
		// readyState == 4 && status == 200 means the response was sucessful and has XML
	  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			$("#due_date").val('');
			loadXMLDoc();
		}
	}

	// send off our request
	xmlhttp.open("GET",SERVER_URL + "api/addDate.php?due_date=" + due_date, true);
	xmlhttp.send();	
}

function completeTodo(id)
{
	var completed = 0;
	console.log($("#check" + id).attr('checked'));
	if($("#check" + id).is(':checked'))
	{
		completed = 1;
	}
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	// send off our request
	xmlhttp.open("GET",SERVER_URL + "api/CompleteTodo.php?completed=" + completed + "&id=" +id,true);
	xmlhttp.send();	
}


function updateTodo(title, id)
{
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	$("#todo"+id).val(title);
	$("#todo"+id).html(title);
	// send off our request
	xmlhttp.open("GET",SERVER_URL + "api/UpdateTodo.php?title=" + title + "&id=" +id,true);
	xmlhttp.send();	
}

function removeTodo(id)
{
	// Compose the request
	xmlhttp=new XMLHttpRequest();
	
	// Add our response function, called when the server responds
	xmlhttp.onreadystatechange=function()
	{
		// readyState == 4 && status == 200 means the response was sucessful and has XML
	  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//loadXMLDoc();
		}
	}
	
	// send off our request
	xmlhttp.open("GET",SERVER_URL + "api/RemoveTodo.php?id=" + id,true);
	xmlhttp.send();
}