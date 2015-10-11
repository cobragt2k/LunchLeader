
var restaurantSearch = function(event, template) {
  event.preventDefault();

  var restaurantName = $("#restaurant-input").val();

  var yelpSearchText = $('#restaurant-input').val();

  Meteor.call('getYelpSearchResults',yelpSearchText, function(err, response){
    Session.set('yelpResults', response);
    console.log(err);
  });

};

Vote = function vote(restaurantId) {
  var restaurant = Restaurants.findOne(restaurantId);
  var currentUserId = Session.get("currentUserId"); 

  var userIndex = _.contains(restaurant.votes, currentUserId);

  if(!userIndex) {

    restaurant.votes.push(currentUserId);
    Restaurants.update(restaurantId, restaurant);

  } else {

    console.log("Not equal -1");
  }

}

Template.chooseRestaurant.events({
  "click #add-restaurant-button": function(event, template) {
    restaurantSearch(event, template);
  },
  "submit #choose-restaurant-form": function(event, template) {
    restaurantSearch(event, template);
  }
});

Template.chooseRestaurant.yelpResults = function(){
    return Session.get('yelpResults').businesses || "Please search...";
};

Template.chooseRestaurant.events({
  "click .yelp-result-li": function (event, template) {
    event.preventDefault();

    var restaurantId = Restaurants.insert({
      yelpData: this,
      votes: []
    });

    var mealId = template.data._id;
    var meal = MealSessions.findOne(mealId);

    meal.restaurantIds.push(restaurantId);

    MealSessions.update(mealId, meal);

    Vote(restaurantId);

    Session.set('yelpResults', '');
    return Router.go("/meal/" + mealId + "/leaderboard");
  }
});