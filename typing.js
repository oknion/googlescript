class CountWPM{
  
   constructor() {
     this.numWord=0;
     this.correctWord=[];
     this.errorWord=[];
     this.numLetter=0;
   };
  getWPM(){
    var totalMinutes=(this.endTime-this.startTime)/1000/60;
    return this.numWord/totalMinutes;
  };
  increaseNumLetter(){
    this.numLetter+=1;
  }
  increaseNumWord(){
    this.numWord+=1;
  };
  setStartTime(startTime){
    this.startTime=startTime;
  }
  setEndTime(endTime){
    this.endTime=endTime;
  };
  
};
var countWPM=new CountWPM();
var collectWPM=[];
var inputContainer= document.querySelector(".text-input");
var mouseTrap = new Mousetrap(inputContainer);
var arrayKeyToBind=["A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z",".","(",")",",",";","[","]","?","!","@"];
var specialKeyToBind=['space'];
var hello="Lorem Ipsum is simply";
var container=$(".input-fragment");

function addErrorClass(elem){
  elem.addClass("input-item-error");
};
function addCorrectClass(elem){
  elem.addClass("input-item-correct");
};
function isSpaceChar(item){
  return String.fromCharCode(765)==item;
}
function errorAlreadyCounted(elem){
  return elem.hasClass("input-item-error");
}
function moveCusor(currentPosElem){
  currentPosElem.removeClass("current-cursor-pos");
  var nextElem= currentPosElem.next("span");
  countWPM.increaseNumLetter();
  if(nextElem.length==0){
     countWPM.setEndTime(new Date().getTime());
    collectWPM.push(countWPM);
  report(countWPM);
    console.log(collectWPM[collectWPM.length-1].getWPM());
    console.log(collectWPM);
   renew(hello);
  }else{
    
    if(isSpaceChar(nextElem.html())){
        countWPM.increaseNumWord();
    }
    
    nextElem.addClass("current-cursor-pos");
  }
};
function isEqual(input1,input2){
  return input1==input2;
};
function isFirstChar(container){
  if(container.children(".input-item-correct").length==0){
    return true;
  }
  return false;
}
function getCurrentChar(container){
 var child= container.children(".current-cursor-pos");
 return child;
};
function processInput(x){
  var currentElem= getCurrentChar(container);
  if(isFirstChar(container)){
    countWPM.setStartTime(new Date().getTime());
  }
  if(isEqual(x,currentElem.text())){
    addCorrectClass(currentElem);
   countWPM.correctWord.push(x);
    moveCusor(currentElem);
   
  }else{
    if(!errorAlreadyCounted(currentElem)){
       countWPM.errorWord.push(currentElem.text());
    }
    addErrorClass(currentElem);
  
  }
};
function report(countWPM){
  $("#wpm-report-field").text(countWPM.getWPM().toFixed(0));
  $("#error-report-field").text(countWPM.errorWord.length);
  $("#correct-report-field").text(((countWPM.numLetter-countWPM.errorWord.length)*100/countWPM.numLetter).toFixed(2));
  
}
  function genSingleChar(x){
    if(x==' '){
      return '<span class="input-item input-item-space">&#765;</span>';
    }else{     return '<span class="input-item">'+x+'</span>';       
     }
  };

function genInput(s){
 var textInputHtml="";
  for(var i=0;i<s.length;i++){
   textInputHtml+=genSingleChar(s.charAt(i));
  }
  return textInputHtml;
};
function renew(s){
  countWPM=new CountWPM();
  var inputText=genInput(s);
  container.html(inputText);
  container.children(":first-child").addClass("current-cursor-pos");
};


function bindKey(){
 arrayKeyToBind.forEach(function(entry){
  mouseTrap.bind(entry,function(e){
   processInput(entry);
  });  
});
specialKeyToBind.forEach(function(entry){
  mouseTrap.bind(entry,function(e){
   processInput(String.fromCharCode(765));
  });
});  
};
bindKey();
renew(hello);
$(".text-input").focusout(function(){
  $(".text-input").addClass("text-input-blur");
})
$(".text-input").focus(function(){
  $(".text-input").removeClass("text-input-blur");
})

