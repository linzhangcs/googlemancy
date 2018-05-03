// on page load, search for & display a random gif matching your search term using the Giphy API.
document.addEventListener('DOMContentLoaded', init());

function init(){
  // loadJSON(function(data){
  //     console.log(data);
  // });
}

window.onload = function(){
  let doc = nlp('she sells seashells by the seashore.');
  doc.sentences().toFutureTense().out('text');
  console.log(doc);

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
  var askbtn = document.getElementById("ask-google");
  askbtn.addEventListener('click', function(){
    var formdiv = document.getElementsByClassName("ask-form")[0];
    var intro = document.getElementsByClassName('intro-text')[0];
    intro.classList.add('hide');
    formdiv.classList.add('show');
  }, false);
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
        var s = Math.floor(Math.random()*10);
        var item;
        var ansEle = document.getElementsByClassName( 'answer' )[0];
        // request.open('GET', data.items[s].link, true);
        console.log(data.items[0].link);
        console.log(data.items[0].htmlTitle);
        // fetch(data.items[s].link,{mode: 'no-cors'}).then(function(response){
        //   console.log(response);
        //   response.text().then(function(text){
        //     console.log(text);
        //   })
        //   .then(contents => console.log(contents));
        // });
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var durl = data.items[s].link;
        var parser = new DOMParser();
        var html = "";
        fetch(proxyurl + durl) // https://cors-anywhere.herokuapp.com/https://example.com
        .then(response => response.text())
        .then(function(contents){
          html = parser.parseFromString(contents, "text/html");
          var body = html.body;

          var textelm = html.getElementsByTagName( 'p' );

          var t = "";
          for(var i = 0; i < textelm.length; i++){
            // t.getElementsByTagName('p');
            t += textelm[i].innerText;
          }
          // var srcdoc = "<html><head><script src='https://mkremins.github.io/blackout/bundle.js'></script></head><body><p>"+t+"</p></html>"
          ansEle.innerHTML = '<p>'+t+'</p>';
          // var srcdoc = generateAnswer(t);
          console.log(srcdoc);
          // ansEle.innerHTML = '<iframe srcdoc="'+srcdoc+'" width="1200" height="500"> </iframe>';
          // <a href="'+data.items[s].link+'">'+data.items[s].htmlTitle+'</a>

        })
        .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

        function generateAnswer(t){

        }

        // for (var i = 0; i < data.items.length; i++) {
        //   if(i == s)
        //   {
        //     item = data.items[i];
        //     break;
        //   }
        //    // in production code, item.htmlTitle should have the HTML entities escaped.
        // }

        // ansEle.innerHTML = '<iframe src="'+data.items[s].link+'" width="400" height="300"><a href="'+data.items[s].link+'">'+data.items[s].htmlTitle+'</a></iframe>';
// onclick="window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        //classie.addClass( ansEle, 'show' );

        // var strWindowFeatures = "location=yes,height=1200,width=2400,scrollbars=yes,status=yes";
        // var url = data.items[s].link;
        // var title = data.items[s].htmlTitle;

        // ansEle.innerHTML = '<a onclick="window.open(\''+url+'\', \'_blank\',\''+ strWindowFeatures+'\');">'+data.items[s].htmlTitle+'</a>';

        // ansEle.innerHTML = '<a onclick=" (function(){ var OpenWindow = window.open(\''+url+'\', \'_blank\',\''+ strWindowFeatures+'\'); var s = document.createElement(\'script\');  s.setAttribute(\'src\',\'https://mkremins.github.io/blackout/bundle.js\'); OpenWindow.document.body.appendChild('+ s +');})();return false;">'+title+'</a>';

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
