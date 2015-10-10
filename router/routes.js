// routes.js

Router.route('/',function() {
  this.render('login');
});

Router.route('/choose-restaurant',function() {
  this.render('chooseRestaurant');
});

Router.route('/leaderboard',function() {
  this.render('leaderboard');
});