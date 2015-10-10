Template.chooseRestaurant.events({
  "click #add-restaurant-button": function(event, template) {
    event.preventDefault();
    var restaurantName = $("#restaurant-input").val();

    var restaurantId = Restaurants.insert({
      name: restaurantName,
      votes: []
    });

    var mealId = template.data._id;
    var meal = MealSessions.findOne(mealId);

    meal.restaurantIds.push(restaurantId);

    MealSessions.update(mealId, meal);
    return Router.go("/meal/" + mealId + "/leaderboard");

  }
})