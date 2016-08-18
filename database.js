var config = {
    apiKey: "AIzaSyA0aiPn5GtKixPQP73lZ7iX2GMlAOMhJ4I",
    authDomain: "typingpractise.firebaseapp.com",
    databaseURL: "https://typingpractise.firebaseio.com",
    storageBucket: "typingpractise.appspot.com",
};
firebase.initializeApp(config);
// Get a reference to the database service
var database = firebase.database();

function putUserInfo(userInfo) {
    firebase.database().ref('/users/' + userInfo.username).set(userInfo);

}


function putUserKeyStat(username, keyStatObj) {
    firebase.database().ref('/users/' + username + "/" + keyStatObj.key).set(keyStatObj);

}

function putSample(sample) {
    if (verifySample(sample)) {
        var sampleRef = firebase.database().ref('/samples/');
        sampleRef.transaction(function () {

            var newSampleKey = sampleRef.push().key;
            var updates = {};
            alert(newSampleKey);
            updates['/samples/' + newSampleKey] = sample;

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
    var url = '/samples/samples/' + sampleId;
    firebase.database().ref(url).once('value').then(function (snapshot) {
        return snapshot.val();
    });
}
function putSampleType(sampleType) {
    firebase.database().ref('/samples/types/' + sampleType.id).set(sampleType.value);

}
function getSampleType(type,callback,) {
    var url = '/samples/types/' + type;
    console.log("getdata");
    firebase.database().ref(url).once('value').then(function (snapshot) {
    var returnValue= snapshot.val();
       return callback(returnValue,callback1);
        console.log("getdata complete");
    },function errorOccurs(errorOjb){
        console.log("The read failed: " + errorOjb.code);
    });

console.log("get complete")
    }


function getRandom(max) {
    return Math.floor(Math.random() * max);
}
function getRandomSampleByType(type,callback) {

    getSampleType(type,function(sampleType){
        if (sampleType == null) return null;
        var size = sampleType.length;
        var sampleId = sampleType[getRandom(size - 1)];
        return getSample(sampleId);
    });


}

function putTakeSample(takeSampleObj) {
    firebase.database().ref('/users/takesamples/' + takeSampleObj.type).set(takeSampleObj);
}
function putUserSample(userSampleObj) {
    firebase.database().ref('/users/' + userSampleObj.username + "/" + userSampleObj.id).set(userSampleObj);
}

function getUserInfo(userId) {
    firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
        return snapshot.val();
    });
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
   getRandomSampleByType(type,function(value){
       alert(value);
   });
}
testGetRandomSample('A');
$("#pushToDB").click(function () {
    getUserInfo("oknion");
    //writeUserData("oknion","oknionName","oknion@gmail.com","http://oknion.com/img");
});