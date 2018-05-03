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
  document.querySelector('.answer').addEventListener('click', function (event) {
    if (event.target.classList.contains('bubbly-button')) {
      // Do something
      history.go(-1);
    }
  });

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
            t += textelm[i].innerText.toLowerCase().replace(/(<([^>]+)>)/ig,"");
          }

          var srcdoc = generateAnswer(t);
          var poem = "";
          for(var i = 0; i < srcdoc.length; i++){
            poem += srcdoc[i];
          }
          console.log("poem :" + poem);
          ansEle.innerHTML = poem+"<button class='bubbly-button' id='restart'>Ask again</button>";
        })
        .catch(function(){
          ansEle.innerHTML = "<p>Focus your energy and workship Google harder to get an answer.</p><button class='bubbly-button' id='restart'>Try again</button>";
          console.log("Can’t access " + url + " response. Blocked by browser?");
        });
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
function parseSentencs(t){
  let doc = nlp(t);
  let pos = {};
  let p = ["he", "she", "it", "my", "", "i", "me", "her", "him", "we", "our", "ours", "their", "its", "the", "this", "that", "but"];

  var nouns = doc.sentences().match('#Noun').out('text').toLowerCase().replace(/\s+/g, ',').split(',');
  nouns = nouns.filter((v, i, a) => a.indexOf(v) === i);
  for(var i = 0; i < p.length; i++){
    var index = nouns.indexOf(p[i]);
    if (index !== -1) nouns.splice(index, 1);
  }

  var verbs = doc.sentences().match('#Verb').out('text').toLowerCase().replace(/\s+/g, ',').split(',');
  verbs = verbs.filter((v, i, a) => a.indexOf(v) === i);
  for(var i = 0; i < p.length; i++){
    var index = verbs.indexOf(p[i]);
    if (index !== -1) verbs.splice(index, 1);
  }

  var adjectives = doc.sentences().match('#Adjective').out('text').toLowerCase().replace(/\s+/g, ',').split(',');
  adjectives = adjectives.filter((v, i, a) => a.indexOf(v) === i);
  for(var i = 0; i < p.length; i++){
    var index = adjectives.indexOf(p[i]);
    if (index !== -1) adjectives.splice(index, 1);
  }

  // var adverbs = doc.sentences().match('#Adverb').out('text').replace(/\s+/g, ',').split(',');
  // adverbs = adverbs.filter((v, i, a) => a.indexOf(v) === i);
  //
  // var prepositions = doc.sentences().match('#Preposition').out('text').replace(/\s+/g, ',').split(',');
  // prepositions = prepositions.filter((v, i, a) => a.indexOf(v) === i);

  pos = {
    'noun': nouns,
    'verb': verbs,
    'adjective': adjectives
  }

  return pos;
}
/*
*
*/
function generateAnswer(htmltext){

  var pg = {
    numSentences: 6,
    numSentencePatterns: null,
    // hard-coded sentence patterns is the simpler way
    sentencePatterns: [
      ['article', 'adjective', 'noun', 'verb', 'adverb', 'preposition', 'article', 'noun'],
      ['pronoun', 'adverb', 'verb', 'noun', 'preposition', 'article', 'noun']
    ],
    languageParts: {
      'vowel': 'aeiou'.split(''),
      'article': {
        'beforeVowel': 'the|an'.split('|'),
        'beforeConsonant': 'the|a'.split('|')
      },
      'preposition': 'to|through|under|over|between|on|in|above|below|behind'.split('|'),
      // 'adjective': 'beautiful|tall|flowing|hot|cold|fragrant|misty|bare|coarse|blind|dim|dreary|elaborate|enchanting|gleaming|glistening|green|organic|tender|cloudless'.split('|'),
      'adverb': 'quickly|slowly|boldly|always|angrily|cheerfully|elegantly|frantically|innocently|nervously|powerfully|rarely|silently|wildly|warmly|solemly'.split('|'),
      // 'noun': 'hair|finger|sun|field|arm|sphere|rock|sand|grass|tree|flower|orb|sea|water|ocean|tide|sky|cloud|moon|star|cosmos|ant|otter|elephant'.split('|'),
      'pronoun': 'he|she|we|someone|it'.split('|'),
      // 'verb': 'kicks|moves|swings|runs|walks|flies|sprays|stings|drops|breaks|explodes|diminishes|sweetens|falls|rises|hears|floats'.split('|'),
      'stop': '.|?|!'.split('|'),
      'pause': ',|;|...| - |'.split('|')
    },
    setLanguageParts: function(partsOfSpeech){
      var temp = {};
      for(var key in this.languageParts) temp[key] = this.languageParts[key];
      for(var key in partsOfSpeech) temp[key] = partsOfSpeech[key];
      this.languageParts = temp;
      console.log("languageParts nouns: "+this.languageParts.noun);
      console.log("languageParts verbs: "+this.languageParts.verb);
      console.log("languageParts adjective: "+this.languageParts.adjective);
    },
    init: function() {
      this.numSentencePatterns = this.sentencePatterns.length;
    },
    generateSentences: function(numSentences, markupBefore, markupAfter) {
      var numSentences = numSentences || this.numSentences;
      var markupBefore = markupBefore || '';
      var markupAfter = markupAfter || '';
      var sentences = [];

      while (numSentences--) {
        var sentence = '';
        var sentencePattern = this.sentencePatterns[ randomInt(0, this.numSentencePatterns - 1) ];

        // loop through sentence pattern array
        for (var i = 0, length = sentencePattern.length; i < length; i++) {
          var languagePartArray;
          var articleType;
          var nextWord = null;

          // if this word is an article, need to determine if next word starts with a vowel or consonant
          if (sentencePattern[i] === 'article') {
            // get next word
            var nextWordLanguagePartArray = this.languageParts[ sentencePattern[i + 1] ];
            var nextWord = nextWordLanguagePartArray[ randomInt(0, nextWordLanguagePartArray.length - 1) ];

            // set article type based on whether next word starts with vowel or consonant
            if (this.languageParts['vowel'].indexOf(nextWord[0]) !== -1) {
              articleType = 'beforeVowel';
            } else {
              articleType = 'beforeConsonant';
            }

            languagePartArray = this.languageParts[ sentencePattern[i] ][ articleType ];
          } else {
            languagePartArray = this.languageParts[ sentencePattern[i] ];
          }
          // add this word to sentence
          sentence += languagePartArray[ randomInt(0, languagePartArray.length - 1) ] + ' ';

          // if next word was gotten, also add next word to sentence and increment the i counter
          if (nextWord !== null) {
            sentence += nextWord + ' ';
            i++;
          }
        }
        sentences.push(markupBefore + sentence.trim() + markupAfter);
      } // end while (numSentences--)

      return sentences;
    } // end generateSentences()
  } // end poetryGenerator

  htmltext = htmltext.replace(/[^0-9a-zA-Z\s]/gi, '');
  console.log("Print out replaced txt" + htmltext);

  var partsOfSpeech = parseSentencs(htmltext);
  pg.init();
  pg.setLanguageParts(partsOfSpeech);
  var poem = pg.generateSentences(8, "<p>", "</p>");
  console.log("Let's read the poem: "+ poem);

  return poem;
}

// -- UTILITY FUNCTIONS
function randomInt(min, max) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

String.prototype.trim == String.prototype.trim || function() {
return this.replace(/^\s+|\s+$/g, '');
}
// append the query parameter key=yourAPIKey to all request URLs. The API key is safe for embedding in URLs, it doesn't need any encoding.
//AIzaSyCeIkbqWdO1sqWJXDF361F9Xx4iI3Kwovc
