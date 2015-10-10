// routes.js

Router.route('/',function() {
  this.render('login');
});

Router.route('/meal/:mealSessionId/choose-restaurant',function() {
  var meal = MealSessions.findOne(this.params.mealSessionId);
  this.render('chooseRestaurant', {data: meal});
});

Router.route('/meal/:mealSessionId/leaderboard',function() {
  // var meal = MealSession.findOne(this.params.mealSessionId);
  Session.set("currentMealSessionId", this.params.mealSessionId);
  this.render('leaderboard');
});