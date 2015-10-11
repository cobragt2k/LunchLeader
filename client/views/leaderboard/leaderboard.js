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
    })
    return ascending.reverse();
  }


   //[
  //   {restaurant: "Osha Thai", votes: 1},
  //   {restaurant: "Super Duper", votes: 2},
  //   {restaurant: "Murrachi's", votes: 3}
  // ]
});

Template.leaderboard.events({
  'click #upvote-btn': function () {

    Vote(this._id);

  }
    
});