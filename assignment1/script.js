var obj={};
var l=1;
$("#dataTable").hide();
$(document).ready(function(){
    $(".searchClick").click(function(){
        var searchItem=$(".textSearch").val();
        l=1;
        $("#dataTable").find("tr:not(:first)").remove();
        $.ajax({
            type:'GET',
            url: 'http://www.omdbapi.com/?s='+searchItem,    
            dataType:'json',
            success: function(jsonData)
            {   
                $("#dataTable").hide();
                var json=jsonData;
                json=json.Search;
                $(json).each(function(i,val){
                    $.each(val,function(k,v){
                        if(l!=json.length)
                        {
                            $("#dataTable").show();
                            var table = document.getElementById("dataTable");
                            var row = table.insertRow(l);

                             var cell1 = row.insertCell(0);
                             var cell2 = row.insertCell(1);
                            //var cell3 = row.insertCell(2);
                            //var cell4 = row.insertCell(3);
                           // var cell5 = row.insertCell(4);

                            cell1.innerHTML = "<img src="+json[l].Poster+">";
                            cell2.innerHTML = "<tr> Title : "+json[l].Title+"<br></tr>"+"<tr> Year : "+json[l].Year+"<br></tr>"+"<tr> imdbID : "+json[l].imdbID+"<br></tr>"+"<tr> Type : "+json[l].Type+"<br></tr>";
                            //cell3.innerHTML = json[l].Year;
                            //cell4.innerHTML = json[l].imdbID;
                           // cell5.innerHTML = json[l].Type;
                            l=l+1;
                        }
                    
                    });
                });
            },
            error: function()
            {
                    alert('error occured');
            }
        });
            
  
    });
});
  

