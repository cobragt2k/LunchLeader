if (Meteor.isClient) {
  Template.leaderboard.helpers({
    data: [
      {restaurant: "Osha Thai", votes: 1},
      {restaurant: "Super Duper", votes: 2},
      {restaurant: "Murrachi's", votes: 3}
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}



