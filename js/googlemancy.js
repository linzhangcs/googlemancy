// on page load, search for & display a random gif matching your search term using the Giphy API.
document.addEventListener('DOMContentLoaded', init());

function init(){
  // loadJSON(function(data){
  //     console.log(data);
  // });
}

window.onload = function(){
  var theForm = document.getElementById( 'theForm' );
  var q1 = document.getElementById('q1');
  var q2 = document.getElementById('q2');
  new stepsForm( theForm, {
    onSubmit : function( form ) {
      // hide form
      classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

      // var messageEl = theForm.querySelector( '.final-message' );
      // messageEl.innerHTML = 'Asking the new and improved god';
      // classie.addClass( messageEl, 'show' );

      getSearchResults(q1.value);
    }
  } );
}
function loadJSON(callback){
    var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
      xobj.open('GET', 'json/deck.json', true);
      xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);
}

function getSearchResults(q){
  console.log(q);
  if(q.length > 0){
    var api = "https://www.googleapis.com/customsearch/v1";
    var query = "&q=";
    var cx = "&cx=006859218002199286879:_cg0ssolqoi"
    var apikey = "?key=AIzaSyCeIkbqWdO1sqWJXDF361F9Xx4iI3Kwovc";

    query += q; // search query
    var url = api+apikey+cx+query;
    console.log(url);

    request = new XMLHttpRequest;
    request.open('GET', url, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400){
        data = JSON.parse(request.responseText);
        console.log(data);

        var ansEle = document.getElementsByClassName( 'answer' )[0];
        for (var i = 0; i < data.items.length; i++) {
           var item = data.items[i];
           // in production code, item.htmlTitle should have the HTML entities escaped.
           ansEle.innerHTML += "<br>" + item.htmlTitle;
        }
        classie.addClass( ansEle, 'show' );
      } else {
        console.log('reached google API, but API returned an error');
       }
    };

    request.onerror = function() {
      console.log('connection error');
    };

    request.send();
  }
}
// append the query parameter key=yourAPIKey to all request URLs. The API key is safe for embedding in URLs, it doesn't need any encoding.
//AIzaSyCeIkbqWdO1sqWJXDF361F9Xx4iI3Kwovc
