Template.leaderboard.helpers({
  data: function(template) {
    var mealSession = MealSessions.findOne(Session.get("currentMealSessionId"));
    console.log("mealSession", mealSession)
    var restaurants = mealSession.restaurantIds.map(function(id){
      return Restaurants.findOne(id);
    });
    console.log("restaurants", restaurants);
    var ascending = _.sortBy(restaurants, function(restaurant) {
      return restaurant.votes.length;
    });

    return ascending.reverse();
  }
});

Template.leaderboard.events({
  'click #upvote-btn': function () {
    Vote(this._id);
  }
});