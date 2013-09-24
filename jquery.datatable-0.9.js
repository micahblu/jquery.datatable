(function ( $ ) {
	$.fn.datatable = function(settings) {
	
	  var _this = this;
	 
	  /**
	   * Define our internal methods
	   */
	  var methods = {
			
			_self : this,
				   
		  "reNumRows" : function(){
			 	$(".rownum").each(function(index){
				 	$(this).html(index+1);
			 	});
		  },
		  
		  "deleterow" : function(url, id){
				  	
			  $.get(url, {"id" : id}, function(data){
			  
				  var response = $.parseJSON(data);
				  
				  if(response.success){
					  $("#"+id).parent().parent().remove(); // remove entire row
					  methods.reNumRows();
					  
				  }else{
					  alert("There was an error deleting that row");
				  }
			  });
		  }
	  }
	  
	  if(typeof arguments[0] == "string"){
		  	
      var func = arguments[0];
      var id = this.attr("id");
      var url = this.attr("href");
     
      methods[func].apply(null, [url, id]);
			//arguments[0].apply(this, args);
			return false;  
	  }
	  
	  
	  /*
	   * Render data table
	   */ 
		$.get(settings.dataurl, function( data ) {
			
			var tabledata = $.parseJSON(data);
			var table = "<table>\n";
			var rowID = "";
			var rownum = 1;
			
			if(settings.headers){
				table += "\t<tr class=\"header-row\">\n";
				
				if(settings.rownumbers){
					table += "\t\t<th></th>\n";
				}
				
				for(header in settings.headers){
					table += "\t\t<th>" + settings.headers[header] + "</th>\n";
				}
				
				if(settings.controls.delete.title){
					table += "\t\t<th>" + settings.controls.delete.title + "</th>\n";
				}else{
					table += "\t\t<th></th>\n";
				}
				
				table += "\t</tr>\n";
			}
			
		  for(row in tabledata){
		  	table += "\t<tr>\n";
		  	
		  	if(settings.rownumbers){
			  	table += "\t\t<td class=\"rownum\">" + rownum + "</td>\n";
		  	}
		  	
			  for(column in tabledata[row]){
				  if(column != settings.rowID){
				  	table += "\t\t<td>" + tabledata[row][column] + "</td>\n";
				  }else{
					  rowid = tabledata[row][column];
				  }
			  }
			  
			  if(settings.controls.delete){
			  			  	
			  	if(settings.controls.delete.action != "ajax"){
				  	table += "\t\t<td><a id=\"" + rowid + "\" href=\"" + settings.controls.delete.url +"\">Delete</a></td>\n"; 
				  }else{
					  table += "\t\t<td><a id=\"" + rowid + "\" class=\"datatable-del-row\" onclick=\"$('#" + rowid + "').datatable('deleterow'); return false;\" href=\"" + settings.controls.delete.url + "\">Delete</a></td>\n"; 
				  }
			  }
			  
			  if(settings.controls.update){
				  table += "\t\t<td><a href=\"\">Edit</a></td>\n";
			  }

			  table += "\t</tr>\n";
			  rownum++;
		  }
		  table += "</table>\n";
		  
		  _this.html(table);
		  
		}); // closes our $.get request
	}; // closes our $.fn plugin declaration
	
	/*
	 * let's write up our directly invokable methods
   */
  $.extend({
		dataTableGet: function () {
		  // plugin code
		}
  });
}( jQuery ));