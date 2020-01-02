var log = require('./log.js');
var Twit = require('twit');
var Twitter = new Twit(require('./config.js'));

/**
 * The searching function.
 * @callback callback function which is called after the tweet is returned.
 */
function search(callback) {

  /**
   * Gets a search key from data.js.
   * @private
   */
  function getSearchKey() {
    let searchKeys = require('./data.js').searchKeys;
    return searchKeys[Math.floor(Math.random() * searchKeys.length)].toLowerCase();
  }

  Twitter.get(
    'search/tweets',
    { q: getSearchKey(), count: 50, lang: 'en' },
    function(err, data, response) {
      let tweetList = [];
      if (!err) {
        for (let i = 0; i < data.statuses.length; i++) {
          let tweet = data.statuses[i];
          tweetList.push(tweet);
        }
        callback(tweetList[Math.floor(Math.random() * tweetList.length)]);
        return;
      } else {
        log(err);
        return;
      }
    }
  );
}

/**
 * Replies to a tweet passed into the function with "ok boomer".
 * @param {*} tweet
 */
function reply(tweet) {
  Twitter.post(
    'statuses/update',
    {
      status: `@${tweet.user.screen_name} ok boomer`,
      in_reply_to_status_id: tweet.id_str
    },
    function(err, data, response) {
      if (err) {
        log(err.message);
        return;
      } else {
        log(`Replied to @${tweet.user.screen_name}`);
        return;
      }
    }
  );
}

function main() {
  search(reply);
}

main();  // Run the main function once first before running the interval ticks.
setInterval(main, Math.floor(((Math.random() * 10) + 5) * 1000) * 60);
