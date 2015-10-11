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