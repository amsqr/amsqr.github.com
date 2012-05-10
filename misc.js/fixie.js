/* 
 
Fixie.js
 
Automagically adds filler content whenever an element has class="fixie".
  
Copyright (c) 2012 Ryhan Hassan  ryhanh@me.com

Modified by Alejandro Mosquera, <amsqr2@gmail.com> in order to
change the word generation list and additional small changes. May, 2012.

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */ 
 
var fixie = (
function () {

    var selector;
    var imagePlaceHolder = 'http://lorempixel.com/${w}/${h}/';

    if (typeof window.getElementsByClassName != 'function') {
        document.getElementsByClassName = function (cl) {
            var retnode = [];
            var myclass = new RegExp('\\b' + cl + '\\b');
            var elem = this.getElementsByTagName('*');
            for (var i = 0; i < elem.length; i++) {
                var classes = elem[i].className;
                if (myclass.test(classes)) retnode.push(elem[i]);
            }
            return retnode;
        };
    }

    /* 
     * Spec
     * Here are some functions you might find useful
     * 
     * fixie_handler(element)
     * fixie_handle_elements(elements)
     *
     * fixie_fetchWord();
     * fixie_fetchPhrase();
     * fixie_fetchSentence();
     * fixie_fetchParagraph();
     * fixie_fetchParagraphs();
     *
     */


    /* 
     * fixie_handler(element)
     *
     * Takes in an element and adds filler content.
     * Returns false if tag is unrecognized.
     */
    function fixie_handler(element) {
        if (!/^\s*$/.test(element.innerHTML)){
            var childs = element.children;
            if(childs.length){
                for(var fixie_i = 0; fixie_i < childs.length; fixie_i++){
                    fixie_handler(childs[fixie_i]);
                }
            }
            return;
        }
        switch (element.nodeName.toLowerCase()) {
        case 'b':
        case 'em':
        case 'strong':
        case 'button':
        case 'th':
        case 'td':
        case 'title':
        case 'tr':
            element.innerHTML = fixie_fetchWord();
            break;

        case 'header':
        case 'cite':
        case 'caption':
        case 'mark':
        case 'q':
        case 's':
        case 'u':
        case 'small':
        case 'span':
        case 'code':
        case 'pre':
        case 'li':
        case 'dt':
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
            element.innerHTML = fixie_fetchPhrase();
            break;

        case 'footer':
        case 'aside':
        case 'summary':
        case 'blockquote':
        case 'p':
            element.innerHTML = fixie_fetchParagraph();
            break;

        case 'article':
        case 'section':
            element.innerHTML = fixie_fetchParagraphs()
            break;

            /* Special cases */
        case 'a':
            element.href = "http://www.amsqr.com/";
            element.innerHTML = "www." + fixie_fetchWord() + fixie_capitalize(fixie_fetchWord()) + ".com";
            break;

        case 'img':
            var src = element.getAttribute('src') || element.src;
            var temp = element.getAttribute('fixie-temp-img');
            if(src == "" || src == null || temp == true || temp == "true"){
                var width = element.getAttribute('width') || element.width || (element.width = 250);
                var height = element.getAttribute('height') || element.height || (element.height = 100);
                element.src = imagePlaceHolder.replace('${w}', width).replace('${h}', height);
                element.setAttribute('fixie-temp-img', true);
            }
            break;

        case 'ol':
        case 'ul':
            element.innerHTML = fixie_fetchList();
            break;

        default:
            element.innerHTML = fixie_fetchSentence();
        }
    }

    // Handle an array of elements
    function fixie_handle_elements(elements){
        for (var i = 0; i < elements.length; i++) {
            fixie_handler(elements[i]);
        }
    }


    // Begin generator
    var fixie_wordlibrary = ["Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","Google","Facebook","Twitter","blogger","windows","I","agree","call","me","call","the","police","can","I","access","the","internet","here","can","I","borrow","some","money","can","I","bring","my","friend","can","I","have","a","glass","of","water","please","can","I","have","a","receipt","please","can","I","have","the","bill","please","can","I","help","you","can","I","make","an","appointment","for","next","wednesday","can","I","see","your","passport","please","can","I","take","a","message","can","I","try","it","on","can","I","use","your","phone","can","it","be","cheaper","can","we","have","a","menu","please","can","we","have","some","more","bread","please","can","we","sit","over","there","can","you","call","back","later","can","you","call","me","back","later","can","you","carry","this","for","me","can","you","do","me","a","favor","can","you","fix","this","can","you","give","me","an","example","can","you","help","me","can","you","hold","this","for","me","can","you","please","say","that","again","can","you","recommend","a","good","restaurant","can","you","repeat","that","please","can","you","show","me","be","careful","driving","a","few","a","little","a","long","time","ago","a","one","way","ticket","a","round","trip","ticket","about","300","kilometers","across","from","the","post","office","all","day","am","I","pronouncing","it","correctly","amy","is","john","girlfriend","and","you","anything","else","are","there","any","concerts","are","they","coming","this","evening","are","they","the","same","are","you","afraid","are","you","allergic","to","anything","are","you","american","are","you","busy","are","you","comfortable","are","you","coming","this","evening","are","you","free","tonight","are","you","going","to","attend","their","wedding","are","you","going","to","help","her","are","you","going","to","take","a","plane","or","train","are","you","here","alone","are","you","hungry","are","you","married","are","you","okay","are","you","ready","are","you","sick","are","you","sure","are","you","waiting","for","someone","are","you","working","today","are","you","working","tomorrow","are","your","children","with","you","as","soon","as","possible","at","3","clock","in","the","afternoon","at","3","clock","at","5th","street","at","7","clock","at","night","at","7","clock","in","the","morning","at","what","time","did","it","happen","at","what","time","be","careful","be","quiet","behind","the","bank","bring","me","my","shirt","please","business","is","good","can","you","speak","louder","please","can","you","swim","can","you","throw","that","away","for","me","can","you","translate","this","for","me","certainly!cheers!chicago","is","very","different","from","boston","come","here","I","ate","already","I","believe","you","I","bought","a","shirt","yesterday","I","came","with","my","family","I","can","swim","I","can","hear","you","clearly","I","can","hear","you","I","do","care","I","do","feel","well","I","do","have","a","girlfriend","I","do","have","any","money","I","don't","have","enough","money","I","don't","have","time","right","now","I","don't","know","how","to","use","it","I","don't","know","I","don't","like","him","I","don't","like","it","I","don't","mind","I","don't","speak","english","very","well","I","don't","speak","very","well","I","don't","think","so","I","don't","understand","what","your","saying","I","don't","understand","I","don't","want","it","I","don't","want","that","I","don't","want","to","bother","you","I","feel","good","I","forget","I","get","off","of","work","at","6","I","give","up","I","got","in","an","accident","I","have","a","cold","I","have","a","headache","I","have","a","lot","of","things","to","do","I","have","a","question","I","want","to","ask","you","/","I","want","to","ask","you","a","question","I","have","a","reservation","I","have","money","I","have","one","in","my","car","I","have","pain","in","my","arm","I","have","three","children,","two","girls","and","one","boy","I","have","to","go","to","the","post","office","I","have","to","wash","my","clothes","I","have","two","sisters","I","haven't","been","there","I","haven't","finished","eating","I","haven't","had","lunch","yet","I","hope","you","and","your","wife","have","a","nice","trip","I","know","I","like","her","I","like","it","I","like","italian","food","I","like","to","watch","tv","I","live","in","california","I","lost","my","watch","I","love","you","I","made","a","mistake","I","made","this","cake","I","need","a","doctor","I","need","another","key","I","need","some","tissues","I","need","this","to","get","there","by","tomorrow","I","need","to","change","clothes","I","need","to","go","home","I","need","to","go","now","I","need","to","practice","my","english","I","only","have","5","dollars","I","only","want","a","snack","I","remember","I","speak","a","little","english","I","speak","two","languages","I","still","have","a","lot","of","things","to","buy","I","still","have","a","lot","to","do","I","still","have","to","brush","my","teeth","and","take","a","shower","I","still","haven't","decided","I","think","I","need","amsqr.com","to","see","a","doctor","I","think","it","tastes","good","I","think","is","very","good","I","think","so","I","think","those","shoes","are","very","good","looking","I","think","you","have","too","many","clothes","I","thought","he","said","something","else","I","thought","the","clothes","were","cheaper","I","trust","you","I","understand","now","I","understand","I","usually","drink","coffee","at","breakfast","I","want","to","buy","something","I","want","to","contact","our","embassy","I","want","to","give","you","a","gift","I","want","to","send","this","package","to","the","united","states","I","want","to","show","you","something","I","was","about","to","leave","the","restaurant","when","my","friends","arrived","I","was","going","to","the","library","I","was","in","the","library","I","went","to","the","supermarket,","and","then","to","the","computer","store","I","wish","I","had","one","i'd","like","a","map","of","the","city","i'd","like","a","non-smoking","room","i'd","like","a","room","with","two","beds","please","i'd","like","a","room","i'd","like","a","single","room","i'd","like","a","table","near","the","window","i'd","like","some","water","too,","please","i'd","like","the","number","for","the","hilton","hotel","please","i'd","like","to","buy","a","bottle","of","water,","please","i'd","like","to","buy","a","phone","card","please","i'd","like","to","buy","something","i'd","like","to","call","the","united","states","i'd","like","to","eat","at","5th","street","restaurant","i'd","like","to","exchange","this","for","dollars","i'd","like","to","go","for","a","walk","i'd","like","to","go","home","i'd","like","to","go","shopping","i'd","like","to","go","to","the","store","i'd","like","to","make","a","phone","call","i'd","like","to","make","a","reservation","i'd","like","to","rent","a","car","i'd","like","to","send","a","fax","i'd","like","to","send","this","to","america","i'd","like","to","speak","to","mr.","smith","please","i'd","like","to","use","the","internetif","you","like","it","I","can","buy","more","if","you","need","my","help,","please","let","me","know","i'll","be","right","back","i'll","call","back","later","i'll","call","you","on","friday","i'll","call","you","when","I","leave","i'll","come","back","later","i'll","give","you","a","call","i'll","have","a","cup","of","tea","please","i'll","have","a","glass","of","water","please","i'll","have","the","same","thing","i'll","pay","for","dinner","i'll","pay","for","the","tickets","i'll","pay","i'll","take","it","i'll","take","that","one","also","i'll","take","you","to","the","bus","stop","i'll","talk","to","you","soon","i'll","teach","you","i'll","tell","him","you","called","I","26","years","old","I","32","I","I","a","beginner","I","a","size","8","I","a","teacher","I","allergic","to","seafood","I","american","I","an","american","I","bored","I","cleaning","my","room","I","cold","I","coming","right","now","I","coming","to","pick","you","up","I","fine","and","you","I","from","america","I","full","I","getting","ready","to","go","out","I","going","home","in","four","days","I","going","to","america","next","year","I","going","to","bed","I","going","to","go","have","dinner","I","going","to","leave","I","good,","and","you","I","good","I","happy","I","here","on","business","I","hungry","I","just","kidding","I","just","looking","I","leaving","tomorrow","I","looking","for","the","post","office","I","losti'm","married","I","not","afraid","I","not","american","I","not","busy","I","not","going","I","not","married","I","not","ready","yet","I","not","sure","I","ok","I","on","hold","phone","ready","I","self-employed","I","sick","I","single","I","sorry,","are","sold","out","I","sorry","I","thirsty","I","tired","I","very","busy","I","very","busy","I","do","not","have","time","now","I","very","well,","thank","you","I","waiting","for","you","I","worried","too","in","30","minutes","is","anyone","else","coming","is","everything","ok","is","it","close","is","it","cold","outside","is","it","far","from","here","is","it","hot","is","it","nearby","is","it","possible","is","it","raining","is","it","ready","is","it","suppose","to","rain","tomorrow","is","john","here","is","john","there","please","is","mr.","smith","an","american","is","that","enough","is","that","ok","is","the","bank","far","is","there","a","movie","theater","nearby","is","there","a","nightclub","in","town","is","there","a","restaurant","in","the","hotel","is","there","a","store","near","here","is","there","air","conditioning","in","the","room","is","there","an","english","speaking","guide","is","there","any","mail","for","me","is","there","anything","cheaper","is","this","a","safe","area","is","this","mr.","smith","is","this","pen","yours","is","this","the","bus","to","new","york","is","this","your","book","is","your","father","home","is","your","house","like","this","one","is","your","husband","also","from","boston","is","your","son","here","is","it","it","costs","20","dollars","per","hour","it","depends","on","the","weather","it","hurts","here","it","rained","very","hard","today","it","takes","2","hours","by","car","it","will","arrive","shortly","willll","be","cold","this","evening","it","11:30pm","is","17","dollars","is","6am","is","8:45","is","a","quarter","to","7","is","august","25th","it","delicious","far","from","here","is","going","to","be","hot","today","is","going","to","snow","today","is","half","past","11","is","here","it","is","a","quarter","past","nine","is","less","than","5","dollars","is","longer","than","2","miles","it","mine","it","more","than","5","dollars","it","near","the","supermarket","is","north","of","here","is","not","suppose","to","rain","today","is","not","too","far","is","not","very","expensive","is","ok","is","on","7th","street","is","over","there","is","raining","is","really","hot","is","shorter","than","3","miles","is","suppose","to","rain","tomorrow","is","there","is","too","late","is","very","cold","today","is","very","important","is","very","windy","happy","birthday","has","your","brother","been","to","california","have","a","good","trip","have","they","met","her","yet","have","you","arrived","have","you","been","to","boston","have","you","been","waiting","long","have","you","done","this","before","have","you","eaten","at","that","restaurant","have","you","eaten","yet","have","you","ever","had","potato","soup","have","you","finished","studying","have","you","seen","this","movie","he","always","does","that","for","me","he","broke","the","window","he","doesn't","look","like","a","nurse","he","has","a","nice","car","he","likes","it","very","much","he","likes","juice","but","he","doesn't","like","milkhe","needs","some","new","clothes","he","never","gives","me","anything","he","said","this","is","a","nice","place","he","said","you","like","to","watch","movies","he","studies","at","boston","university","he","thinks","we","don't","want","to","go","he","works","at","a","computer","company","in","new","york","he'll","be","back","in","20","minutes","hello","help!here","is","your","salad","here","it","is","here","you","are","here's","my","number","here's","your","order","he's","a","very","good","student","he's","an","american","he's","an","engineer","he's","coming","soon","he's","faster","than","me","he's","in","the","kitchen","he's","never","been","to","america","he's","not","in","right","now","he's","right","he's","very","annoying","he's","very","famous","he's","very","hard","working","hi,","is","mrs.","smith","there,","please","his","family","is","coming","tomorrow","his","room","is","very","small","his","son","how","about","saturday","how","are","you","paying","how","are","you","how","are","your","parents","how","do","I","get","there","how","do","I","get","to","daniel","street","how","do","I","get","to","the","american","embassy","how","do","I","use","this","how","do","you","know","how","do","you","pronounce","that","how","do","you","say","it","in","english","how","do","you","spell","it","how","do","you","spell","the","word","seattle","how","does","it","taste","how","far","is","it","to","chicago","how","far","is","it","how","is","she","how","long","are","you","going","to","stay","in","california","how","long","are","you","going","to","stay","how","long","does","it","take","by","car","how","long","does","it","take","to","get","to","georgia","how","long","have","you","been","here","how","long","have","you","been","in","america","how","long","have","you","lived","here","how","long","have","you","worked","here","how","long","is","it","how","long","is","the","flight","how","long","will","it","take","how","long","will","you","be","staying","how","many","children","do","you","have","how","many","hours","a","week","do","you","work","how","many","languages","do","you","speak","how","many","miles","is","it","to","pennsylvania","how","many","people","are","there","in","new","york","how","many","people","do","you","have","in","your","family","how","many","people","how","many","how","much","altogether","how","much","are","these","earrings","how","much","do","I","owe","you","how","much","does","it","cost","per","day","how","much","does","this","cost","how","much","is","it","to","go","to","miami","how","much","is","it","how","much","is","that","how","much","is","this","how","much","money","do","you","have","how","much","money","do","you","make","how","much","will","it","cost","every","week","everyday","I","get","up","at","6am","everyone","knows","it","everything","is","ready","did","it","snow","yesterday","did","you","come","with","your","family","did","you","get","my","email","did","you","send","me","flowers","did","you","take","your","medicine","did","your","wife","like","california","do","you","accept","u","s","","dollars","do","you","believe","that","do","you","feel","better","do","you","go","to","florida","often","do","you","have","a","boyfriend","do","you","have","a","girlfriend","do","you","have","a","pencil","do","you","have","a","problem","do","you","have","a","swimming","pool","do","you","have","an","appointment","do","you","have","another","one","do","you","have","any","children","do","you","have","any","coffee","do","you","have","any","money","do","you","have","any","vacancies","do","you","have","anything","cheaper","do","you","have","enough","money","do","you","have","the","number","for","a","taxi","do","you","have","this","in","size","11","do","you","hear","that","do","you","know","her","do","you","know","how","much","it","costs","do","you","know","how","to","cook","do","you","know","how","to","get","to","the","marriott","hotel","do","you","know","what","this","means","do","you","know","what","this","says","do","you","know","where","I","can","get","a","taxi","do","you","know","where","my","glasses","are","do","you","know","where","she","is","do","you","know","where","there's","a","store","that","sells","towels","do","you","like","it","here","do","you","like","the","book","do","you","like","to","watch","tv","do","you","like","your","boss","do","you","like","your","co-workers","do","you","need","anything","else","do","you","need","anything","do","you","play","any","sports","do","you","play","basketball","do","you","sell","batteries","do","you","sell","medicine","do","you","smoke","do","you","speak","english","do","you","study","english","do","you","take","credit","cards","do","you","think","it'll","rain","today","do","you","think","is","going","to","rain","tomorrow","do","you","think","is","possible","do","you","think","you'll","be","back","by","11:30","do","you","understand","do","you","want","me","to","come","and","pick","you","up","do","you","want","to","come","with","me","do","you","want","to","go","to","the","movies","do","you","want","to","go","with","me","does","anyone","here","speak","english","does","he","like","the","school","does","it","often","snow","in","the","winter","in","massachusetts","does","this","road","go","to","new","york","don't","do","that","don't","worry","excellent","excuse","me,","what","did","you","say","excuse","me","expiration","date","give","me","a","call","fill","it","up,","please","follow","me","for","how","many","nights","forget","it","from","here","to","there","from","time","to","time","give","me","the","pen","go","straight","ahead","good","afternoon","good","evening","sir","good","idea","good","luck","good","morning","great","how","much","would","you","like","how","old","are","you","how","tall","are","you","how","was","the","movie","how","was","the","trip","how's","business","how's","the","weather","how's","work","going","hurry!i've","already","seen","it","i've","been","here","for","two","days","i've","been","there","i've","heard","texas","is","a","beautiful","place","i've","never","done","that","i've","never","seen","that","before","i've","seen","it","i've","worked","there","for","five","years","pick","up","your","clothes","please","call","me","please","come","in","please","count","this","for","me","please","fill","out","this","form","please","sit","down","please","speak","english","please","speak","more","slowly","october","22nd","of","course","okay","on","the","left","on","the","right","on","the","second","floor","near","the","bank","never","mind","next","time","nice","to","meet","youno","problem","no,","I","american","no,","thank","you","male","or","female","may","I","speak","to","mrs.","smith","please","maybe","more","than","200","miles","more","than","that","my","birthday","is","august","27th","my","car","isn't","working","my","car","was","hit","by","another","car","my","cell","phone","doesn't","have","good","reception","my","cell","phone","doesn't","work","my","daughter","is","here","my","father","has","been","there","my","father","is","a","lawyer","my","friend","is","american","john","is","going","on","vacation","tomorrow","june","3rd","just","a","little","just","a","moment","let","me","check","let","me","think","about","it","let's","go","have","a","look","let's","go","let's","meet","in","front","of","the","hotel","let's","practice","english","let's","share","my","grandmother","passed","away","last","year","my","house","is","close","to","the","bank","my","luggage","is","missing","my","name","is","john","smith","my","son","studies","computers","my","son","my","stomach","hurts","my","throat","is","sore","my","watch","has","been","stolen","no,","this","is","the","first","time","no","nobody","is","helping","us","nobody","is","there","right","now","nonsense","not","recently","not","yet","nothing","else","now","or","later","one","like","that","one","ticket","to","new","york","please","one","way","or","round","trip","open","the","door","open","the","window","our","children","are","in","america","outside","the","hotel","over","here","over","there","please","speak","slower","please","take","me","to","the","airport","please","take","me","to","this","address","please","take","off","your","shoes","please","tell","her","john","called","please","tell","me","please","wait","for","me","please","write","it","down","please","really","right","here","right","there","see","you","later","see","you","tomorrow","see","you","tonight","she","wants","to","know","when","you're","coming","she's","an","expert","she's","going","with","me","tomorrow","she's","older","than","me","she's","pretty","should","I","wait","some","books","someone","does","that","for","me","someone","is","coming","sometimes","I","go","to","sleep","at","11pm,","sometimes","at","11:30pm","sorry","to","bother","you","sorry,","I","didn't","hear","clearly","sorry,","I","don't","have","a","pencil","sorry,","I","think","I","have","the","wrong","number","sorry,","we","don't","accept","credit","cards","sorry,","we","don't","have","any","vacancies","sorry,","we","don't","have","any","sorry,","we","only","accept","cash","start","the","car","stop!take","a","chance","take","it","outside","take","me","downtown","take","me","to","the","marriott","hotel","take","this","medicine","tell","him","that","I","need","to","talk","to","him","tell","me","thank","you","miss","thank","you","sir","thank","you","very","much","thank","you","thanks","for","everything","thanks","for","your","help","thanks","that","car","is","similar","to","my","car","that","car","over","there","is","mine","that","looks","great","that","looks","old","that","means","friend","that","restaurant","is","not","expensive","that","smells","bad","that","way","that's","a","good","school","that's","alright","that's","enough","that's","fair","that's","fine","that's","her","book","that's","it","that's","not","enough","that's","not","fair","that's","not","right","that's","right","that's","too","bad","that's","too","expensive","that's","too","late","that's","too","many","that's","too","much","that's","wrong","the","accident","happened","at","the","intersection","the","big","one","or","the","small","one","the","book","is","behind","the","table","the","book","is","in","front","of","the","table","the","book","is","near","the","table","the","book","is","next","to","the","table","the","book","is","on","the","table","the","book","is","on","top","of","the","table","the","book","is","under","the","table","the","books","are","expensive","the","car","is","fixed","the","cars","are","american","the","food","was","delicious","the","plane","departs","at","5:30p","the","roads","are","slippery","the","tv","is","broken","the","whole","day","there","are","many","people","here","there","are","some","apples","in","the","refrigerator","there","are","some","books","on","the","table","there","has","been","a","car","accident","there's","a","book","under","the","table","there's","a","restaurant","near","here","there's","a","restaurant","over","there,","but","I","don't","think","is","very","good","there's","plenty","of","time","these","books","are","ours","they","arrived","yesterday","they","charge","26","dollars","per","day","they","haven't","met","her","yet","they'll","be","right","back","they're","planning","to","come","next","year","they're","the","same","they're","very","busy","they're","waiting","for","us","this","doesn't","work","this","house","is","very","big","this","is","mrs.","smith","this","is","my","mother","this","is","the","first","time","i've","been","here","this","is","very","difficult","this","is","very","important","this","room","is","a","mess","those","men","are","speaking","english","try","it","on","try","it","try","to","say","it","turn","around","turn","left","turn","right","would","you","ask","him","to","call","me","back","please","would","you","ask","him","to","come","here","would","you","like","a","glass","of","water","would","you","like","coffee","or","tea","would","you","like","some","water","would","you","like","some","wine","would","you","like","something","to","drink","would","you","like","something","to","eat","would","you","like","to","buy","this","would","you","like","to","go","for","a","walk","would","you","like","to","have","dinner","with","me","would","you","like","to","rent","a","movie","would","you","like","to","watch","tv","would","you","like","water","or","milk","would","you","take","a","message","please","waiter!waitress!we","can","eat","italian","or","chinese","food","we","have","two","boys","and","one","girl","we","like","it","very","much","we'll","have","two","glasses","of","water","please","we're","from","california","we're","late","were","there","any","problems","were","you","at","the","library","last","night","what","are","you","doing","what","are","you","going","to","do","tonight","what","are","you","going","to","have","what","are","you","thinking","about","what","are","you","two","talking","about","what","are","your","hobbies","what","can","I","do","for","you","what","color","is","that","car","what","day","are","they","coming","over","what","day","of","the","week","is","it","what","did","you","do","last","night","what","did","you","do","yesterday","what","did","you","think","what","do","people","usually","do","in","the","summer","in","los","angeles","what","do","they","study","what","do","you","do","for","work","what","do","you","have","what","do","you","recommend","what","do","you","study","what","do","you","think","of","these","shoes","what","do","you","think","what","do","you","want","to","buy","what","do","you","want","to","do","what","do","your","parents","do","for","work","what","does","he","do","for","work","what","does","this","mean","what","does","this","say","what","does","this","word","mean","what","does","your","father","do","for","work","what","happened","what","is","it","what","is","that","what","is","the","area","code","what","is","today's","date","what","kind","of","music","do","you","like","what","school","did","you","go","to","what","should","I","wear","what","size","what","time","are","they","arriving","what","time","are","you","going","to","the","bus","station","what","time","did","you","get","up","what","time","did","you","go","to","sleep","what","time","did","you","wake","up","what","time","do","you","go","to","work","everyday","what","time","do","you","think","you'll","arrive","what","time","does","it","start","what","time","does","the","movie","start","what","time","does","the","store","open","what","time","is","check","out","what","time","is","it","what","will","the","weather","be","like","tomorrow","what","would","you","like","to","drink","what","would","you","like","to","eat","what's","in","it","what's","the","address","what's","the","charge","per","night","","(hotel)what's","the","date","what's","the","exchange","rate","for","dollars","what's","the","exchange","rate","what's","the","matter","what's","the","name","of","the","company","you","work","for","what's","the","phone","number","what's","the","room","rate","what's","the","temperature","what's","this","what's","today's","date","what's","up","what's","wrong","what's","your","address","what's","your","email","address","what's","your","favorite","food","what's","your","favorite","movie","what's","your","last","name","what's","your","name","what's","your","religion","when","are","they","coming","when","are","you","coming","back","when","are","you","going","to","pick","up","your","friend","when","are","you","leaving","when","are","you","moving","when","did","this","happen","when","did","you","arrive","in","boston","when","do","we","arrive","when","do","we","leave","when","do","you","arrive","in","the","u","s","","when","do","you","get","off","work","when","do","you","start","work","when","does","he","arrive","when","does","it","arrive","when","does","the","bank","open","when","does","the","bus","leave","when","does","the","plane","arrive","when","I","went","to","the","store,","they","didn't","have","any","apples","when","is","the","next","bus","to","philidalphia","when","is","your","birthday","when","was","the","last","time","you","talked","to","your","mother","when","will","he","be","back","when","will","it","be","ready","when","would","you","like","to","meet","where","are","the","t-shirts","where","are","you","from","where","are","you","going","to","go","where","are","you","going","where","are","you","where","can","I","buy","tickets","where","can","I","exchange","u","s","","dollars","where","can","I","find","a","hospital","where","can","I","mail","this","where","can","I","rent","a","car","where","did","it","happen","where","did","you","go","where","did","you","learn","english","where","did","you","learn","it","where","did","you","put","it","where","did","you","work","before","you","worked","here","where","do","you","live","where","do","you","want","to","go","where","do","you","work","where","does","it","hurt","where","does","your","wife","work","where","is","an","atm","where","is","he","from","where","is","he","where","is","it","where","is","main","street","where","is","my","shirt","where","is","she","from","where","is","the","airport","where","is","the","bathroom","where","is","the","bus","station","where","is","there","a","doctor","who","speaks","english","where","is","there","an","atm","where","were","you","where","would","you","like","to","go","where","would","you","like","to","meet","where's","the","closest","restaurant","where's","the","mail","box","where's","the","nearest","hospital","where's","the","pharmacy","where's","the","post","office","which","is","better,","the","spaghetti","or","chicken","salad","which","is","better","which","is","the","best","which","one","do","you","want","which","one","is","better","which","one","is","cheaper","which","one","is","the","best","which","one","which","road","should","I","take","which","school","does","he","go","to","who","are","they","who","are","you","looking","for","who","are","you","who","is","it","who","is","that","who","sent","this","letter","who","taught","you","that","who","taught","you","who","was","that","who","was","your","teacher","who","won","who","would","you","like","to","speak","to","who's","calling","who's","that","man","over","there","whose","book","is","that","why","are","you","laughing","why","aren't","you","going","why","did","you","do","that","why","did","you","say","that","why","not","will","you","call","me","a","taxi","please","will","you","hand","me","a","towel","please","will","you","pass","me","the","salt","please","will","you","put","this","in","the","car","for","me","will","you","remind","me","will","you","take","me","home","yes,","really","yes","you","have","a","very","nice","car","you","look","like","my","sister","you","look","tired","you","speak","english","very","well","your","children","are","very","well","behaved","your","daughter","your","house","is","very","nice","your","things","are","all","here","you're","beautiful","you're","right","you're","smarter","than","him","you're","very","nice","you're","very","smart","you're","welcome","I", "8-bit", "ethical", "reprehenderit", "delectus", "non", "latte", "fixie", "mollit", "authentic", "1982", "moon", "helvetica", "dreamcatcher", "esse", "vinyl", "nulla", "carles", "bushwick", "bronson", "clothesline", "fin", "frado", "jug", "kale", "organic", "local", "fresh", "tassel", "liberal", "art", "the", "of", "bennie", "chowder", "daisy", "gluten", "hog", "capitalism", "is", "vegan", "ut", "farm-to-table", "etsy", "incididunt", "sunt", "twee", "yr", "before", "gentrify", "whatever", "wes", "anderson", "chillwave", "dubstep", "sriracha", "voluptate", "pour-over", "esse", "trust-fund", "pinterest", "instagram", "dslr", "vintage", "dumpster", "totally", "selvage", "gluten-free", "brooklyn", "placeat", "delectus", "sint", "magna", "brony", "pony", "party", "beer", "shot", "narwhal", "salvia", "letterpress", "art", "party", "street-art", "seitan", "anime", "wayfarers", "non-ethical", "viral", "iphone", "anim", "polaroid", "gastropub", "city", 'classy', 'original', 'brew']

    function fixie_capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function fixie_fetchWord() {
        return fixie_wordlibrary[constrain(0, fixie_wordlibrary.length - 1 )];
    }

    function constrain(min, max){
        return Math.round(Math.random() * (max - min) + min)
    }

    function fixie_fetch(min, max, func){
        var fixie_length = constrain(min, max) ;
        var result = [];
        for (var fixie_i = 0; fixie_i < fixie_length ; fixie_i++) {
            result.push(func());
        }
        return fixie_capitalize(result.join(' '));
    }

    function fixie_fetchPhrase() {
        return fixie_fetch(3, 5, fixie_fetchWord);
    }

    function fixie_fetchSentence() {
        return fixie_fetch(4, 9, fixie_fetchWord) + '.';
    }

    function fixie_fetchParagraph() {
        return fixie_fetch(3, 7, fixie_fetchSentence);
    }

    function fixie_fetchParagraphs() {
        var fixie_length = constrain(3, 7);
        var fixie_str = "";
        for (var fixie_i = 0; fixie_i < fixie_length - 1; fixie_i++) {
            fixie_str += "<p>" + fixie_fetchParagraph() + "</p>";
        }
        return fixie_str;
    }

    function fixie_fetchList() {
        var i, n = Math.random() * 4 + 4, list = [];
        for(i = 0; i < n; i++) {
            list.push(fixie_fetchPhrase());
        }
        return '<li>' + list.join('</li><li>') + '</li>';
    }
    
    // Handle all elements with class 'fixie'
    fixie_handle_elements(document.getElementsByClassName('fixie'));

    // Handle elements which match give css selectors


    function init_str(selector_str) {
        if (!document.querySelectorAll) {
            return false;
        }
        try {
            fixie_handle_elements(document.querySelectorAll(selector_str));
            return true;
        } 
        catch (err) {
            return false;
        }
    }

    return {
        /* returns true if successful, false otherwise */
        'init': function() {
            if (selector) {
                init_str(selector);
            } else {
                fixie_handle_elements(document.getElementsByClassName('fixie'));
            }
        },
        'setImagePlaceholder': function(pl) {
            imagePlaceHolder = pl;
            return this;
        },
        'setSelector': function(sl){
            if (typeof sl === "object") {
                selector = sl.join(",");
            } else if (sl){
                selector = sl;
            } 
            return this;
        }
    };

})();
