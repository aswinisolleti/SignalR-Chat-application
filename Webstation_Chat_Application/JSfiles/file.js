//Added References

/*
* jquery-1.8.3.min.js
* jquery.signalR-1.0.0-alpha2.min.js
*/

/// <reference path="../Scripts/jquery-1.8.3-vsdoc.js" />




$(function () {

    //
    var _blnCall = true;
    //    debugger;
    var _chatUsername = window.prompt("Enter Username:", "");
    var _invokeChat = false;
    var _previousUsername = '';
    var _selectedTask = '';
    var _selectedUsername = '';
    var _showChatName = true;

    //
    var btnCloseChat = $('#btnCloseChat');
    var btnShowUserList = $("#btnShowUserList");
    var chatDisplay = $('#chat-display');
    var chatList = $('#chatList');
    var chatMessageOutline = $('#chat-message-outline');
    var chatTitle = $('#chat-title');
    var chatTitleName = $('#chat-title-name');
    var chatOutline = $('#chat-outline');
    var divBuzz = $('#divBuzz');
    var showMessage = $('#messages');
    var showUsernames = $('#showUsernames');
    var txtMsg = $('#txtmsg');
    var usernameList = $('#showUsernames');
    //
    //Keep the focus on the Textbox when the page loads.
    txtMsg.focus();
    //Show the username first letter as CAPS.
    _chatUsername = _chatUsername.toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });

    $('html').append('<h1>' + _chatUsername + '</h1>');
    /*********************************/
    // Proxy created on the fly (SignalR Variable)         
    var chat = $.connection.chat; //calling the created class "Chat" (Works, if and only if it implements Hub class)
    btnShowUserList.on('click', function () {
        $('#divShowTaskNames').css('display', 'none');
        chatList.slideToggle();
    });

    chatList.on('click', function () {
        chatList.css('display', 'none');
        txtMsg.focus();
    });
    /*********************************/
    //    txtMsg.tagit({
    //            availableTags: ["c++", "java", "php", "javascript", "ruby", "python", "c"]
    //    });

    //show Username in Title bar div
    //chatTitleName.text("Chat between " + chatUsername + " and " + selectedUsername);
    // Proxy created on the fly (SignalR Variable)         
    var chat = $.connection.chat; //calling the created class "Chat" (Works, if and only if it implements Hub class)
    //    var _Tasks = chat.server.getTasks(_chatUsername);
    //for removing the username who is disconnected from the server
    chat.client.leave = function () {
        //calling the server side method "GetConnectedUsers"
        //The return value of the method is stored in a variable "users"
        chat.server.getConnectedUsers().done(function (users) {
            //clearing the div, to fill it again (over writing)
            usernameList.empty();
            //calling each username stored in a static dictionary on server side using for loop
            for (var i = 0; i < users.length; ++i) {
                usernameList.append('<li>' + users[i].Name + '</li>');
            }
        });
    };

    //On key press "Enter"
    txtMsg.keypress(function (e) {
        if (e.which == 13) {
            //prevent default operations of the "Enter" Key
            e.preventDefault();
            //
            sendMessage(txtMsg.val());
        }
    });

    function replaceMessage(data, username) {
        var re = new RegExp('@' + username + '\\b', 'g');
        return data.replace(re, "<strong>@" + username + "</strong>");
    }
    // Declare a function on the chat hub so the server can invoke it          
    chat.client.addMessage = function (chatUsername, currentTime, message, showChatName, invokeChat) {
        if (invokeChat) {
            _selectedUsername = chatUsername;
            _invokeChat = false;
            chatTitleName.text("Chat with: " + _selectedUsername);
        }

        message = replaceMessage(message, _selectedUsername);
        message = replaceMessage(message, _chatUsername);

        // var time = new Date();
        // var currentTime = time.getHours() + ':' + time.getMinutes();
        if (showChatName) {
            //To show Username with the typed message
            showMessage.append('<b>' + chatUsername + '</b><span>(' + currentTime + ')</span>' + ':&nbsp&nbsp;' + message + '</br>');
        }
        else {
            //To show only typed message, not the username
            showMessage.append('<span>(' + currentTime + ')</span>' + '&nbsp;&nbsp;' + message + '</br>');
        }
        _previousUsername = chatUsername;
        //To keep scroll always bottom
        showMessage.scrollTop(showMessage[0].scrollHeight);
        checkCallAlert(message, _blnCall);
        _blnCall = true;
    };

    //Invoking the hub class
    $.connection.hub.start().done(function () {
        //calling the server side method just after invoking the hub class
        chat.server.joined(_chatUsername);
    });

    //Method to show the usernames of the connected users in a div of id -- showUsernames
    chat.client.joins = function () {
        //calling the server side method "GetConnectedUsers"
        //The return value of the method is stored in a variable "users"
        chat.server.getConnectedUsers().done(function (users) {
            //clearing the div, to fill it again (over writing)
            usernameList.empty();
            //calling each username stored in a static dictionary on server side using for loop
            for (var i = 0; i < users.length; ++i) {
                //Restrict showing self username
                if (users[i].Name != _chatUsername) {
                    usernameList.append('<li>' + users[i].Name + '</li>');
                }
            }
        });
    };

    //    $("#messages").uploadify({
    //        height: 30,
    //        width: 120
    //    });

    //Connect to the user to which the message is to be sent
    showUsernames.on('click', 'li', function () {
        //store the selected user value in 'selectedUsername'
        _selectedUsername = $(this).text();
        //Allow chat if and only if the user is not calling self.
        if (_selectedUsername != _chatUsername) {
            _invokeChat = true;
            chatTitleName.text("Chat with: " + _selectedUsername);
        }
    });

    btnCloseChat.on('click', function () {
        //display none for closing the chat application
        chatOutline.css('display', 'none');
    });



    chatTitleName.on('click', function () {
        //toggle functions to all the chat elements to minimize and maximize.
        chatDisplay.toggle();
        chatMessageOutline.toggle();
        chatOutline.toggleClass('minimize');
        chatTitle.toggleClass('minimize');
        $(this).toggleClass('minimize');
        btnShowUserList.toggle();
    });

    function checkCallAlert(message, blnCall) {
        var re = '<strong>@' + _chatUsername + '</strong>';
        if (message.indexOf(re) !== -1 && blnCall) {
            //Buzzer On
            alert("call from " + _selectedUsername);
            _blnCall = false;
        }
    }

    divBuzz.click(function () {
        sendMessage("@" + _selectedUsername);
    });

    function sendMessage(data) {
        //Comparing if the last message entered username is same as the current username
        //if the previous username and current username are same then dont show the username again.
        if ((!_previousUsername.length == 0) && (_previousUsername == _chatUsername)) {
            _showChatName = false;
        }
        else { _showChatName = true; }

        var message = data;
        if (message.replace(/\s/g, "").length !== 0) {
            if (message.indexOf("@" + _chatUsername) != -1) {
                _blnCall = false;
            }
            //calls the server side method if and only if there is some valid info to send
            chat.server.send(_chatUsername, _selectedUsername, message, _showChatName, _invokeChat);
        }
        //emptying the textbox once the message is sent to server
        txtMsg.val('');
    }

    /*********************************/
    /****** Show related Task names***/
    /*********************************/
    //    _Tasks.each(function () {
    //        $('#showTaskNames').append('<li>' + $(this) + '</li>');
    //    });


    $('#showTaskNames').on('click', 'li', function () {
        debugger;
        _selectedTask = $(this).text();
        $('#divTaskName').text(_selectedTask);
        //        $('#divTaskName').attr('title', _selectedTask);
        $('#divShowTaskNames').css('display', 'none');
    });

    //    $('#insertComment').click(function () {
    //        chat.server.insertTask(_selectedTask, _chatUsername, txtMsg.val());
    //    });

    $('#divSelectTasks').click(function () {
        chatList.css('display', 'none');
        $('#divShowTaskNames').slideToggle();
    });
});



        