//Added References

/*
* jquery-1.8.3.min.js
* jquery.signalR-1.0.0-alpha2.min.js
*/


var showChatName = new Boolean();
var connectionID = 1;
showChatName = true;
var chatUsername = window.prompt("Enter Username:", "");
var sameChatName;
//var users = new chatR.connectedUsersViewModel();

$(function () {
    chatUsername = chatUsername.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    sameChatName = chatUsername;
    //show Username in Title bar div
    $('#chat-title-name').text(chatUsername);
    // Proxy created on the fly          
    var chat = $.connection.chat; //calling the created class "Chat"

    //for removing the username who is disconnected from the server
    chat.client.leave = function (user, date) {
        user = "";  //making the string empty so that the disconnected user value will be lost.
    };


    $('#txtmsg').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();

            var message = $('#txtmsg').val();
            if (message.replace(/\s/g, "").length !== 0) {
            //calls the server side method
                chat.server.send(chatUsername, $('#txtmsg').val(), showChatName);
            }
            $('#txtmsg').val('');
        }
    });

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


    $.connection.hub.start().done(function () {
        chat.server.joined(chatUsername);
    });

    chat.client.joins = function () {
        $('#showUsernames').val('').done(function () {
            chat.server.getConnectedUsers().done(function (users) {
                for (var i = 0; i < users.length; ++i) {
                    $('#showUsernames').append(users[i].Name + '<br>');
                }
            });
        });
    };
});



        
