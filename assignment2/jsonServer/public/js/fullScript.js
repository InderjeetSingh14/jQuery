$(document).ready(function(){
    var start=0;
    
    var deleteRow = function(id){
                    $("#deleteConfirm").one('click', function(){
                    	$.ajax({
                    		url: 'http://localhost:8080/Contacts/'+id,
               	         	type: 'DELETE',
               	         	dataType: 'json',                
               	         	success: function(result) {
               	         	alert('deleted successfully');
               	         	$('#deleteModal').modal('hide');
               	         	document.getElementById(id).closest('tr').remove();
               	         	},
               	         	error: function(result){
               	         		alert('deleting... Error Occurred in Deletion');
               	         	}
               	     	});       
               	 	});//end delete record event
               	}

    var updateRow = function(id){
    					$("#updateConfirm").one('click', function(){
    						var object = createObject();
                        	$.ajax({
                            	type:'PATCH',
                            	url: 'http://localhost:8080/Contacts/'+id,    
                            	'content-Type': 'application/json',
                            	data: object,
                            	success: function(data)
                            	{   
                                	alert(object.name+"'s Record Updated Successfully");
                                	$('#updateModal').modal('hide');
                                	refreshRow(id,object);
                                },
                            	error: function()
                            	{
                            	    alert('Updating... error Occured');
                            	}
                        	});
                    	});
                    }

    var refreshRow = function(id,object){
    					var x = document.getElementById(id).closest('tr').cells;
                   	    x[0].innerHTML = object.name;
                   	    x[1].innerHTML = object.nationality;
                   	    x[2].innerHTML = object.company;
                   	    x[3].innerHTML = object.email;
                   	    x[4].innerHTML = object.phone;
                   	    x[5].innerHTML = object.address;
                   	    x[7].innerHTML = object.emergencyContact;	
    				}

    var createObject = function(){
    						Updateobject={
                            	"name": $("#updateName").val(),
                            	"nationality": $("#updateCountry").val(),
                            	"company": $("#updateCompany").val(),
                            	"email": $("#updateEmail").val(),
                            	"phone": $("#updatePhone").val(),
                            	"address": $("#updateAddress").val(),
                            	"emergencyContact": $("#updateEmergencyContact").val()
                            }
                            return Updateobject;
                        }

    var loadUpdateModal = function(){
    						$('#dataTable').find('tr').click(function(){
                            	var loop=1;
                            	var register;
                            	var rowObj = $(this);
                            	rowObj.find('td').each(function(){
                                	if(loop==1){
                                	    document.getElementById("updateName").value = this.innerHTML;
                                	}
                                	if(loop==2){
                                	    document.getElementById("updateCountry").value = this.innerHTML;
                                	}
                                	if(loop==3){
                                	    document.getElementById("updateCompany").value = this.innerHTML;
                               		}
                                	if(loop==4){
                                	    document.getElementById("updateEmail").value = this.innerHTML;
                                	}
                                	if(loop==5){
                                	    $('#updatePhone').attr("type","text");
                                	    document.getElementById("updatePhone").value = this.innerHTML;
                                	}
                                	if(loop==6){
                                	    document.getElementById("updateAddress").value = this.innerHTML;
                                	}
                                	if(loop==7){
                                	    document.getElementById("registered").value = this.innerHTML;
                                	}
                                	if(loop==8){
                                    	$('#updateEmergencyContact').attr("type","text");
                                    	document.getElementById("updateEmergencyContact").value = this.innerHTML;
                                	}
                                	loop=loop+1;
                            	});
                        	});
    					}

    var addRow = function(val){
    				var table = document.getElementById("dataTable");
                    var row = table.insertRow();

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4);
                    var cell6 = row.insertCell(5);
                    var cell7 = row.insertCell(6);
                    var cell8 = row.insertCell(7);
                    var cell9 = row.insertCell(8);

                    cell1.innerHTML = val.name;
                    cell2.innerHTML = val.nationality;
                    cell3.innerHTML = val.company;
                    cell4.innerHTML = val.email;
                    cell5.innerHTML = val.phone;
                    cell6.innerHTML = val.address;
                    cell7.innerHTML = val.registered;
                    cell8.innerHTML = val.emergencyContact;
                    cell9.innerHTML = '<button type="submit" data-toggle="modal" href="#updateModal" class="updateClick" id="'+val.id+'">Update</button>'+'<button type="submit" class="deleteClick" data-toggle="modal" href="#deleteModal"  id="'+val.id+'">Delete</button>';
    			}

    var openBook = function(start){
    					context= 'open';
            			$.ajax({
                			type:'GET',
                			url: 'http://localhost:8080/Contacts?_start='+start+'&_limit=7&_sort=name&_order=ASC',    
                			dataType:'json',
                			success: function(jsonData)
                			{   
                                if(document.getElementById("dataTable").rows.length == 1){
                    			   $("#dataTable").hide();
                   				}
                                $.each(jsonData,function(i,val){
                   					addRow(val);
                   				});
                   				if(jsonData.length>0){
                        			$("#dataTable").show();
                                    loadUpdateModal();//load row data in modal	                                	
                           		}//end if
                           		else{
                                    if(document.getElementById("dataTable").rows.length == 1){
                                        alert('--- Empty Book ---');//contact book empty
                                    }
                                    else{
                                        alert('--- END ---');//end of contact book
                                    }
                           		}
                           	},
                           	error: function()
                			{
                        		alert('error Occured');
                			}
            			});
        			}

    var searchByName = function(start){
    						context = 'search';
            				var searchItem=$(".textSearch").val();
            				$.ajax({
                				type:'GET',
                				url: 'http://localhost:8080/Contacts?name_like='+searchItem+'&_start='+start+'&_limit=7&_sort=name&_order=ASC',   
                				dataType:'json',
                				success: function(jsonData)
                				{   
                    				if(document.getElementById("dataTable").rows.length == 1){
                                        $("#dataTable").hide();
                                    }
                                    if(searchItem.trim() == ''){
                    					alert('Why Searching nothing?');
                    				}
                    				else{
                   					$.each(jsonData,function(i,val){
                   						addRow(val);
                   					});
                   					if(jsonData.length>0){
                        				$("#dataTable").show();
                                        loadUpdateModal();//load row data in modal
                           			}//end if
                           			else{
                           				if(document.getElementById("dataTable").rows.length == 1){
                        					alert('No Record Found');
                        				}
                        				else{
                        					alert('No More Matched Record.. ');	
                        				}
                    				}
                    				}	
                				},
                				error: function()
                				{
                        			alert('error Occured');
                				}
            				});
        				}

    $(".add").click(function(){
        var addItem={
        "name": $("#inputName").val(),
        "nationality": $("#inputCountry").val(),
        "company": $("#inputCompany").val(),
        "email": $("#inputEmail").val(),
        "phone": $("#inputPhone").val(),
        "address": $("#inputAddress").val(),
        "registered": new Date().toDateString( )+"  "+new Date().toLocaleTimeString(),
        "emergencyContact": $("#inputEmergencyContact").val()
        };
            
        $.ajax({
            type:'POST',
            url: 'http://localhost:8080/Contacts',    
            dataType:'json',
            data: JSON.stringify(addItem),
            contentType: "application/json; charset=utf-8", 
            success: function(data)
            {   
                alert(addItem.name+"'s Record Added Successfully");
                $("#myModal").find('form').trigger("reset");
                $('#myModal').modal('hide');
            },
            error: function()
            {
                alert('error Occured');
            }
        });
    });

    $(".addClick").click(function(){
        $("#myModal").find('form').trigger("reset");
    });

    $(".openClick").click(function(){
        var start=0;
        $("#dataTable").find("tr:not(:first)").remove();
        openBook(start);
    });

    $(".searchClick").click(function(){
        var start=0;
        $("#dataTable").find("tr:not(:first)").remove();
        searchByName(start);
    });

    $(document).on('click', 'button[class=deleteClick]', function(){
        var id = this.id;
        deleteRow(id);
    });
    
    $(document).on('click', 'button[class=updateClick]', function(){
        var id = this.id;
        updateRow(id);
    });
    
    $(window).scroll(function(){
        
        if($(window).scrollTop() == ($(document).height() - $(window).height())){
            start=start+7;
            if(context == 'search') {
            searchByName(start);                    
            } else if(context == 'open') {
            openBook(start);
            }
        }
    });

});