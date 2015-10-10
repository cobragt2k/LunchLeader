Users = new Mongo.Collection("Users");
  // {
  //  name: "willchen"
  //  authenticated: false
  //  _id:"34920439jfweio"
  // }
MealSessions = new Mongo.Collection("MealSession");
  // {
  //   day: "10-25-2015"
  //   groupName: "opentable"
  //   groupId: ...
  //   restaurantIds: [_id.. ]
  // }
Groups = new Mongo.Collection("Groups");
   // {
   //  users: ["349...", ""],
   //  name: "opentable"
   //}
Restaurants = new Mongo.Collection("Restaurants");
   //  {
  //  yelpData: {...},
  // X mealSessionId: "MealSession._id"
  // X date: "10-25-2015"
  // X groupName: "opentable"
  //  likes ["willchen", "bwong"]
    //}
    //