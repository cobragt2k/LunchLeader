$("#group-error").hide();
$("#name-error").hide();

var groupInput = function() {
  return $("#group-input").val();
};

var usernameInput = function() {
  return $("#username-input").val();
}

var hasError = false;

Template.login.helpers({
  username: function() {
    return Session.get("currentUserId");
  },
  groupValidation: function() {
    return groupInput().length >= 3;
  },
  usernameValidation: function() {
    return usernameInput().length >= 2;
  }
});

Template.login.events({
  "submit #login-form": function(event, template) {
    event.preventDefault();

    var group = groupInput();
    var username = usernameInput();

    if(username.length >= 2) {
      Users.insert({
        name: username,
        authenticated: false
      });

      Session.set("currentUserId", username);
    }

    if(group.length >= 3) {
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
    }

    // var groupId = this.params.groupId;
    if (username.length >= 2 && group.length >= 3) {
      return Router.go("/meal/" + mealSessionId + "/choose-restaurant");
    } else {
      hasError = username.length >= 2 || group.length >= 3;
      if(group.length < 3) {
        $("#group-error").show();
      } else {
        $("#group-error").hide();
      }
      if(username.length < 2) {
        $("#name-error").show();
      } else {
        $("#name-error").hide();
      }
    }
  }
})