document.addEventListener("DOMContentLoaded", function() {
    loadTweets();
  });
  
  document.getElementById("tweet-button").addEventListener("click", function() {
    var tweetInput = document.getElementById("tweet-input");
    var tweetText = tweetInput.value;
    
    if (tweetText) {
      createTweet(tweetText);
      tweetInput.value = "";
    } else {
      alert("Lütfen bir twit girin!");
    }
  });
  
  function createTweet(tweetText) {
    var tweetList = document.getElementById("tweet-list");
    
    var tweet = document.createElement("div");
    tweet.className = "tweet";
    
    var content = document.createElement("div");
    content.className = "content";
    
    var text = document.createElement("p");
    text.textContent = tweetText;
    
    var deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Sil";
    deleteButton.addEventListener("click", function() {
      deleteTweet(tweet);
    });
    
    content.appendChild(text);
    content.appendChild(deleteButton);
    
    tweet.appendChild(content);
    
    tweetList.prepend(tweet);
  
    saveTweet(tweetText);
  }
  
  function deleteTweet(tweet) {
    tweet.remove();
    var tweetText = tweet.querySelector("p").textContent;
    removeTweetFromStorage(tweetText);
    addDeletedTweetToStorage(tweetText);
  }
  
  function saveTweet(tweetText) {
    var tweets = getStoredTweets();
    tweets.push(tweetText);
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }
  
  function removeTweetFromStorage(tweetText) {
    var tweets = getStoredTweets();
    var index = tweets.indexOf(tweetText);
    if (index !== -1) {
      tweets.splice(index, 1);
      localStorage.setItem("tweets", JSON.stringify(tweets));
    }
  }
  
  function addDeletedTweetToStorage(tweetText) {
    var deletedTweets = getStoredDeletedTweets();
    deletedTweets.push(tweetText);
    localStorage.setItem("deletedTweets", JSON.stringify(deletedTweets));
  }
  
  function loadTweets() {
    var tweets = getStoredTweets();
    var deletedTweets = getStoredDeletedTweets();
    
    tweets.forEach(function(tweetText) {
      if (!deletedTweets.includes(tweetText)) {
        createTweet(tweetText);
      }
    });
  }
  
  function getStoredTweets() {
    var tweets = localStorage.getItem("tweets");
    return tweets ? JSON.parse(tweets) : [];
  }
  
  function getStoredDeletedTweets() {
    var deletedTweets = localStorage.getItem("deletedTweets");
    return deletedTweets ? JSON.parse(deletedTweets) : [];
  }
  