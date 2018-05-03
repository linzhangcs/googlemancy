// on page load, search for & display a random gif matching your search term using the Giphy API.
document.addEventListener('DOMContentLoaded', init());

function init(){
  // loadJSON(function(data){
  //     console.log(data);
  // });
  var htmltext = "The picture is clear before me of the day I first walked. My mother, a handsome, cold-eyed woman, who did not love me, had driven out from town to nurse's cottage. I shut my eyes, and I am back in the little parlour with its spindle chairs, an old-fashioned piano with green silk front, its pink-flowered wall-paper, and the two wonderful black-and-white dogs on the mantelpiece. There were two pictures I loved to gaze upon—Robert Emmett in the dock, and Mary Stuart saying farewell to France. I do not remember my mother's coming or going. Memory begins to work from the moment nurse put me on a pair of unsteady legs. There were chairs placed for me to clutch, and I was coaxingly bidden to toddle along, over to mamma. It was very exciting. First one chair had to be reached, then another fallen over, till a third tumbled me at my mother's feet. I burst into a passion of tears, not because of the fall, but from terror at finding myself so near my mother. Nurse gathered me into her arms and began to coo over me, and here the picture fades from my mind.My nurse loved me devotedly, and of course spoiled me. Most of the villagers helped her in this good work, so that the first seven years of my childhood, in spite of baby-face unblest by mother's kiss, were its happiest period. Women who do not love their children do well to put them out to nurse. The contrast of my life at home and the years spent with these rustic strangers is very shocking. The one petted, cherished, and untroubled; the other full of dark terrors and hate, and a loneliness such as grown humanity cannot understand without experience of that bitterest of all tragedies—unloved and ill-treated childhood. But I was only reminded of my sorrow at nurse's on the rare occasion of my mother's visits, or when nurse once a month put me into my best clothes, after washing my face with blue mottled soap—a thing I detested—and carried me off on the mail-car totown to report my health and growth. This was a terrible hour for me. From a queen I fell to the position of an outcast. My stepfather alone inspired me with confidence. He was a big handsome man with a pleasant voice, and he was always kind to me in a genial, thoughtless way. He would give me presents which my mother would angrily seize from me and give to her other children, not from love, for she was hardly kinder to them than to me, but from an implacable passion to wound, to strike the smile from the little faces around her, to silence a child's laughter with terror of herself. She was a curious woman, my mother. Children seemed to inspire her with a vindictive animosity, with a fury for beating and banging them, against walls, against chairs, upon the ground, in a way that seems miraculous to me now how they were saved from the grave and she from the dock. She had a troop of pretty engaging children, mostly girls, only one of whom she was ever known to kiss or caress, and to the others she was worse than the traditional stepmother of fairy tale. It was only afterwards I learned that those proud creatures I, in my abject solitude, hated and envied, lived in the same deadly fear[Pg 4] of her with which her cold blue eyes and thin cruel lips inspired me with.But there were, thank God! many bright hours for me, untroubled by her shadow. I was a little sovereign lady in my nurse's kindly village, admired and never thwarted. I toddled imperiously among a small world in corduroy breeches and linsey skirts, roaming unwatched the fields and lanes from daylight until dark. We sat upon green banks and made daisy chains, and dabbled delightedly with the sand of the pond edges, while we gurgled and chattered and screamed at the swans. The setting of that nursery biography is vague. It seemed to me that the earth was made up of field beyond field, and lanes that ran from this world to the next, with daisies that never could be gathered, they were so many; and an ocean since has impressed me less with the notion of immensity of liquid surface than the modest sheet of water we called the Pond. Years afterwards I walked out from town to that village, and how small the pond was, how short the lanes, what little patches for fields so sparsely sprinkled with daisies! A more miserable disillusionment I have not known. I have always marvelled at the roll of [Pg 5]reminiscences and experiences of childhood told consecutively and with coherence. Children live more in pictures, in broken effects, in unaccountable impulses that lend an unmeasured significance to odd trifles to the exclusion of momentous facts, than in story. This alone prevents the harmonious fluency of biography in an honest account of our childhood. Memory is a random vagabond, and plays queer tricks with proportion. It dwells on pictures of relative unimportance, and revives incidents of no practical value in the shaping of our lives. Its industry is that of the idler's, wasteful, undocumentary, and untrained. For vividness without detail, its effects may be compared with a canvas upon which a hasty dauber paints a background of every obscure tint in an inextricable confusion, and relieves it with sharply defined strokes of bright colour. Jim Cochrane, my everyday papa, as I called him, was a sallow-faced man with bright black eyes, which he winked at me over the brim of his porter-measure, as he refreshed himself at the kitchen fire after a hard day's work. He was an engine-driver, and once took me on the engine with him to the nearest station, he and a comrade holding me tight between them, while[Pg 6] I shrieked and chattered in all the bliss of a first adventure.This is a memory of sensation, not of sight. I recall the rush through the air, the sting, like needle-points against my cheeks and eyelids, of the bits of coal that flew downward from the roll of smoke, the shouting men laughing and telling me not to be afraid, the red glare of the furnace whenever they slid back the grate opening, the whiff of fright and delight that thrilled me, and, above all, the confidence I had that I was safe with nurse's kind husband.Poor Jim! His was the second dead face I looked upon without understanding death. The ruthless disease of the Irish peasant was consuming him then, and he died before he had lived half his life through.";
  htmltext.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
  console.log(htmltext);
  generateAnswer(htmltext);
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

/*
* This function parse the html file into sentence parts using compromise.js
*/

function generateAnswer(t){
  let doc = nlp(t);
  var nouns = doc.sentences().match('#Noun').out('text');
  console.log(nouns);
}
// append the query parameter key=yourAPIKey to all request URLs. The API key is safe for embedding in URLs, it doesn't need any encoding.
//AIzaSyCeIkbqWdO1sqWJXDF361F9Xx4iI3Kwovc
