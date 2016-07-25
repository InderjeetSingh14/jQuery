$(document).ready(function(){
    $(".searchClick").click(function(){
        var searchItem=$(".textSearch").val().toLowerCase();
        $("#dataTable").find("tr:not(:first)").remove();
        $.ajax({
            type:'GET',
            url: 'http://localhost:8080/Contacts',    
            dataType:'json',
            success: function(jsonData)
            {   
                var count=0;
                $("#dataTable").hide();
               
                $.each(jsonData,function(i,val){
                   
                    if(val.name.toLowerCase().includes(searchItem) && searchItem !='' && searchItem !=' ') 
                    {
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
                            
                        count=count+1;
                    }

                });
                if(count>0){
                    $("#dataTable").show();
                    $(".table-bordered").css("display", "block");
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

                    //update record event
                        $(".updateClick").click(function(){
                            var id = this.id;
                            $("#update").one('click',function(){
                                var updateItem={
                                    "name": $("#updateName").val(),
                                    "nationality": $("#updateCountry").val(),
                                    "company": $("#updateCompany").val(),
                                    "email": $("#updateEmail").val(),
                                    "phone": $("#updatePhone").val(),
                                    "address": $("#updateAddress").val(),
                                    "registered": $("#registered").val(),
                                    "emergencyContact": $("#updateEmergencyContact").val()
                                };
        
                                $.ajax({
                                    type:'PUT',
                                    url: 'http://localhost:8080/Contacts/'+id,    
                                    dataType:'json',
                                    data: JSON.stringify(updateItem),
                                    contentType: "application/json; charset=utf-8", 
                                    success: function(data)
                                    {   
                                        alert(updateItem.name+"'s Record Updated Successfully");
                                        $('#updateModal').modal('hide');
                                        var x = document.getElementById(id).closest('tr').cells;
                                        x[0].innerHTML = updateItem.name;
                                        x[1].innerHTML = updateItem.nationality;
                                        x[2].innerHTML = updateItem.company;
                                        x[3].innerHTML = updateItem.email;
                                        x[4].innerHTML = updateItem.phone;
                                        x[5].innerHTML = updateItem.address;
                                        x[6].innerHTML = updateItem.registered;
                                        x[7].innerHTML = updateItem.emergencyContact;
                                                                               
                                    },
                                    error: function()
                                    {
                                        alert('Updating... error Occured');
                                    }
                                });
                            });//end update record event
                        });//end updateClick

                        $(".deleteClick").click(function(){
                            var id = this.id;
                            $("#deleteConfirm").one('click',function(){
                                $.ajax({
                                    url: 'http://localhost:8080/Contacts/'+id,
                                    type: 'DELETE',
                                    dataType: 'json',                
                                    success: function(result) {
                                    alert('deleted successfully');
                                    $('#deleteModal').modal('hide');
                                    document.getElementById(id).closest('tr').remove();
                                    },
                                    error: function(result){alert('deleting... Error Occurred in Deletion');}
                                });       
                            });//end delete record event
                        });
                    
                }
                else{
                    alert('No Record Found');
                }
            },
            error: function()
            {
                    alert('error Occured');
            }
        });
    });
});
  

