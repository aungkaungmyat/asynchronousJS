window.onload = function(){

  // comment -  AJAX request
  /*var http = new XMLHttpRequest();

  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
    // console.log(JSON.parse(http.response));
    }
  };

  http.open("GET", "data/tweets.json", true);
  http.send();

  //jquery method
  $.get("data/tweets.json", function(data){
    console.log(data);
  });
  console.log('test');*/


// comment - callback functions
// function handleError(jqXHR, textStatus, error){
//   console.log(error);
// }
//
// $.ajax({
//   type: "GET",
//   url: "data/tweets.json",
//   success: cbTweets,
//   error: handleError
//   });
//
// function cbTweets(data){
//   console.log(data);
// }
//
//
// $.ajax({
//   type: "GET",
//   url: "data/friends.json",
//   success: cbFriends,
//   error: handleError
//   });
//
// function cbFriends(data){
//   console.log(data);
// }
//
// $.ajax({
//   type: "GET",
//   url: "data/videos.json",
//   success: cbVideos,
//   error: handleError
//   });
//
// function cbVideos(data){
//   console.log(data);
// }


// comment - Promises

/*$.get("data/tweets.json").then(function(tweets){
  console.log(tweets);
  return $.get("data/friends.json");
}).then(function(friends){
  console.log(friends);
  return $.get("data/videos.json");
}).then(function(videos){
  console.log(videos);
});


function get(url){
  return new Promise(function(resolve, reject){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function(){
      if(xhttp.status == 200){
        resolve(JSON.parse(xhttp.response));
      }
      else{
        reject(xhttp.statusText);
      }
    };
    xhttp.onerror = function(){
      reject(xhttp.statusText);
    };
    xhttp.send();
  });

}

var promise = get("data/tweets.json");
promise.then(function(tweets){
  console.log(tweets);
  return get("data/friends.json");
}).then(function(friends){
  console.log(friends);
  return get("data/videos.json");
}).then(function(videos){
  console.log(videos);
}).catch(function(error){
  console.log(error);
});*/

// comment - generators
// function* gen(){
//   var x = yield 10;
//   console.log(x);
// }
//
// var myGen = gen();
// console.log(myGen.next());
// console.log(myGen.next(10));

getWrap(function* (){

  var tweets = yield $.get("data/tweets.json");
  console.log(tweets);
  var friends = yield $.get("data/friends.json");
  console.log(friends);
  var videos = yield $.get("data/videos.json");
  console.log(videos);
});

function getWrap(generator){
  var gen =  generator();

  function handle(yielded){
    if(!yielded.done){
      yielded.value.then(function(data){
        return handle(gen.next(data));
      })
    }
  }

  return handle(gen.next());
}

};

/*READY STATES

0 - request not initialized
1 - request has been set up
2 - request has been sent
3 - request is in process
4 - request is complete
*/
