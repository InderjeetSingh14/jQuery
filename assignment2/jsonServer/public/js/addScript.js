$(document).ready(function(){
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

});
  

