var TypingDatabase=(function(){

})();
var config = {
    apiKey: "AIzaSyA0aiPn5GtKixPQP73lZ7iX2GMlAOMhJ4I",
    authDomain: "typingpractise.firebaseapp.com",
    databaseURL: "https://typingpractise.firebaseio.com",
    storageBucket: "typingpractise.appspot.com",
};
firebase.initializeApp(config);
// Get a reference to the database service
var tpDB = firebase.database();

var configDb={
    usersUrl:"/users/",
    samplesUrl:"/samples/samples/",
    samplesTypeUrl:"/samples/types/",
    userSample:"/users/samples/",
    userSampleType:"/users/samplebytype/",

}

function putUserInfo(userInfo) {
    tpDB.ref(configDb.usersUrl + userInfo.username).set(userInfo);

}
function getSampleTypeThatHaveErrorAlot(username){

    return getRandomSampleByType('A');


}
function putUserKeyStat(username, keyStatObj) {
    tpDB.ref(configDb.usersUrl + username + "/" + keyStatObj.key).set(keyStatObj);
}

function putSample(sample) {
    if (verifySample(sample)) {
        var sampleRef = tpDB.ref(configDb.samplesUrl);
        sampleRef.transaction(function () {

            var newSampleKey = sampleRef.push().key;
            var updates = {};

            updates[newSampleKey] = sample;

            var type = sample.type;

            for (var i = 0; i < type.length; i++) {
                var typeValue = getSampleType(type[i]);
                if (typeValue == undefined) {
                    typeValue = [];
                }
                typeValue.push(newSampleKey);
                putSampleType({
                    id: type[i],
                    value: typeValue
                });
            }
            sampleRef.update(updates);
        })
        return true;
    } else {
        return false;
    }
}
function verifySample(sample) {
    return sample.hasOwnProperty("type")
        && sample.hasOwnProperty("text")
        && sample.hasOwnProperty("wordCount")
        && sample.hasOwnProperty("letterCount")
        ;
}
function getSample(sampleId) {
    return new Promise(function(resolve,reject){
        var url = configDb.samplesUrl + sampleId;
        tpDB.ref(url).once('value').then(function (snapshot) {
            console.log("get Sample:"+url+" complete");
            resolve(snapshot.val());
        },function errorOccurs(errorObj){
            console.log("get Sample:"+url+" Error"+errorObj.code);
            reject(errorObj);
        });
    });
}
function putSampleType(sampleType) {
    tpDB.ref(configDb.samplesTypeUrl + sampleType.id).set(sampleType.value);

}
function getSampleType(type) {
    return new Promise(function(resolve,reject){
        var url =configDb.samplesTypeUrl + type;
        console.log("get sampleType:"+url);
        tpDB.ref(url).once('value').then(function (snapshot) {
            var sampleType= snapshot.val();
            resolve(sampleType);
        },function errorOccurs(errorOjb){
            reject(errorOjb);
            console.log("The read failed: " + errorOjb.code);
        });
        console.log("get complete:"+url);
    })
}


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
function getRandomSampleByType(type) {
    console.log("enter getRandomType");
  var promise = new Promise(function (resolve,reject){
      getSampleType(type).then(function(data){
          var index=  getRandom(data.length-1);
          alert(JSON.stringify(data[index]));

          getSample(data[index]).then(function(sample){

              resolve(sample);
          })
      })
  })
return promise;

}

function putTakeSample(takeSampleObj) {
   return new Promise(function(resolve,reject){
   	tpDB.ref('/users/takesamples/' + takeSampleObj.type).push(takeSampleObj.id,function(){
   		resolve(1);
   	});
   }) 

}

function putUserSample(userSampleObj) {
    tpDB.ref(configDb.userSample + userSampleObj.username + "/" + userSampleObj.id).set(userSampleObj);

    var sampleRef = tpDB.ref(configDb.userSample+ userSampleObj.username +"/");
    sampleRef.transaction(function () {

        var newSampleKey = sampleRef.push().key;
        var updates = {};

        updates[newSampleKey] = userSampleObj;

        var type = userSampleObj.type;
        putTakeSample({type:takeSampleObj.type,
        				id:newSampleKey}).then(function(data){
        					sampleRef.update(updates);
        				});
    })
    return true;
}

function getUserInfo(userId) {

    return new Promise(function(resolve,reject){
        tpDB.ref('/users/' + userId).once('value').then(function (snapshot) {
            resolve(snapshot.val());
        });
    })
}

function getUserKeyStat(username, key) {

}


function writeStat(stat) {

}
function main() {
    putSample({
        type: ['A', 'B'],
        text: "hello adopt alex",
        wordCount: 3,
        letterCount: 16
    })
}
function testGetRandomSample(type) {
    getRandomSampleByType(type).then(function(data){
alert(JSON.stringify(data))
    });
}
testGetRandomSample('A');
$("#pushToDB").click(function () {
    getUserInfo("oknion");
    //writeUserData("oknion","oknionName","oknion@gmail.com","http://oknion.com/img");
});