     var config = {
        apiKey: "AIzaSyA0aiPn5GtKixPQP73lZ7iX2GMlAOMhJ4I",
        authDomain: "typingpractise.firebaseapp.com",
        databaseURL: "https://typingpractise.firebaseio.com",
        storageBucket: "typingpractise.appspot.com",
      };
      firebase.initializeApp(config);
      // Get a reference to the database service
      var database = firebase.database();
      function writeUserData(userId, name, email, imageUrl) {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email,
        profile_picture : imageUrl
      });
      }

      function writeSample(sample){
          firebase.database().ref('samples/' + sample.mainLetter+"/"+sample.id).set(sample);
      }
     function getUserInfo(userId){
         return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
             alert(JSON.stringify(snapshot.val()));
         });
     }
     function writeStat(stat){

     }
    function  main(){


    }
     main();

      $("#pushToDB").click(function(){
          getUserInfo("oknion");
      //writeUserData("oknion","oknionName","oknion@gmail.com","http://oknion.com/img");
      });