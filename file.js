var showChatName = new Boolean();
showChatName = true;
var chatUsername = window.prompt("Enter Username:", "");
var sameChatName;

$(function () {
    chatUsername = chatUsername.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    sameChatName = chatUsername;
    //show Username in Title bar div
    $('#chat-title-name').text(chatUsername);
    // Proxy created on the fly          
    var chat = $.connection.chat; //calling the created class "Chat"
    chat.state.username = chatUsername;
    $.connection.hub.qs = "name=" + chatUsername;

    // Declare a function on the chat hub so the server can invoke it          
    chat.client.addMessage = function (chatUsername, message, showChatName) {

        if (showChatName) {
            $('#messages').append('<b>' + chatUsername + '</b>' + ':&nbsp;' + message + '</br>');
            showChatName = false;
        }
        else {
            $('#messages').append('&nbsp;&nbsp;' + message + '</br>');
        }

        //To keep scroll always bottom
        $("#messages").scrollTop($("#messages")[0].scrollHeight);
    };

    $('#txtmsg').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();

            var message = $('#txtmsg').val();
            if (message.replace(/\s/g, "").length !== 0) {
                chat.server.send(chatUsername, $('#txtmsg').val(), showChatName);
            }
            $('#txtmsg').val('');
        }
    });

    $.connection.hub.start()
    .done(function () {
        chat.server.GetConnectedUsers().done(function () {
         //Uncaught TypeError: Object #<Object> has no method 'GetConnectedUsers' 
            
         /*display your contacts*/
        });
    });
}).done(function () {
  //Uncaught TypeError: Object [object Object] has no method 'done' 

    chat.joined();
});
