if (Meteor.isClient) {
  Template.chooseRestaurant.helpers({
    data: [
      {restaurant: "Osha Thai", votes: 1},
      {restaurant: "Super Duper", votes: 2},
      {restaurant: "Murrachi's", votes: 3}
    ]
  });
}