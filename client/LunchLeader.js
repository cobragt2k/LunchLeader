Template.page.events({
  "click #register": function(event) {
    event.preventDefault();
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
  }

});

Template.page.helpers({
  username: function() {
    return Session.get("currentUserId");
  }
});

Template.page.helpers({
  isLoginPage: function() {
    return Router.current().route.getName() === undefined;
  }
});