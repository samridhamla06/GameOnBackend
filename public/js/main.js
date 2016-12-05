/**
 * Created by samridhamla06 on 05/12/16.
 */
/*$.ajax({
    type: "GET",
    url: "https://localhost:9000/",
    dataType: "json",
    success: processData,
    error: function(){ alert("failed"); }
});*/

function getRestaurants()
{

    alert( "hello: " );
    //do something with data
    $.get( "/cities", function( data ) {
        alert( "Data Loaded: " + data );
    });
}



