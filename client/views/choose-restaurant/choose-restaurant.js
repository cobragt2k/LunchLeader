var keyPressCount = 0;

var getYelpSearchText = function() {
  return $("#restaurant-input").val();
}

var restaurantSearch = function(event, template) {
  event.preventDefault();

  Meteor.call('getYelpSearchResults', getYelpSearchText(), function(err, response){
    console.log(response);
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
  "input #restaurant-input": function(event, template) {
    keyPressCount++;
    if(keyPressCount > 2 && getYelpSearchText().length !== 0) {
      restaurantSearch(event, template);
    } else {
      Session.set('yelpResults', undefined);
    }
  },
  "input #choose-restaurant-form": function(event) {
    event.preventDefault();
  }
});

Template.chooseRestaurant.yelpResults = function(){
  var results = Session.get('yelpResults')
  if (results) {
      return results.businesses;
  } else {
      return [];
  }
};

Template.chooseRestaurant.events({
  "click .yelp-result-li": function (event, template) {
    event.preventDefault();

    if(!Session.get("currentUserId")) {
      $('.ui.basic.modal').modal({
        onApprove: function(){
          console.log("approve");
          var username = $("#register-modal-input").val();
          if(!Users.findOne({name: username})) {
            Users.insert({
              name: username,
              authenticated: false
            });
          }
          Session.set("currentUserId", username);
          return true;
        }

      }).modal("show");
      return
    }

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