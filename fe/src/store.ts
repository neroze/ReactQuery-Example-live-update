import { types, onSnapshot } from "mobx-state-tree";
import axios from "axios";

// A tweet has a body (which is text) and whether it's read or not
const Tweet = types
  .model("Tweet", {
    title: types.string,
    _id: types.string,
  })
  .actions((tweet) => ({}));

// Define the Twitter "store" as having an array of tweets
const TwitterStore = types
  .model("TwitterStore", {
    tweets: types.array(Tweet),
  })
  .actions((self: any) => ({
    async getAllTwets() {
      const _tweets = await axios.get("http://localhost:3030");
      console.log("---->>", _tweets.data);
      self.setTweets(_tweets.data);
      console.log("---->>", self.tweets);
      return _tweets;
    },

    setTweets(_tweets: any) {
      self.tweets = _tweets;
    },
  }));

export default TwitterStore;
