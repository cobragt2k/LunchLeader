Template.login.helpers({
  username: function() {
    return Session.get("currentUserId");
  }
});

Template.login.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();

    var group = $("#group-input").val();
    var username = $("#username-input").val();

    Users.insert({
      name: username,
      authenticated: false
    });

    Session.set("currentUserId", username);

    var findGroup = Groups.findOne({name: group});
    // If group is duplicate than join exisiting one
    if (!findGroup) {
      var groupId = Groups.insert({
        name: group,
        users: [username]
      });
    } else {
      findGroup.users.push(username);
      Groups.update(findGroup._id, findGroup);
    }

    groupId = groupId || findGroup._id;

    var currentDay = moment().format("DD-MM-YYYY");
    var mealSession = MealSessions.findOne({
      groupId: groupId,
      day: currentDay
    });

    if (!mealSession) {
      var mealSessionId = MealSessions.insert({
        day: "10-10-2015",
        groupId: groupId,
        restaurantIds: []
      });
    }

    mealSessionId = mealSessionId || mealSession._id;

    // var groupId = this.params.groupId;
    return Router.go("/meal/" + mealSessionId + "/choose-restaurant");
  }
})