<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wbfrmChat.aspx.cs" Inherits="Webstation_Chat_Application.wbfrmChat" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!--[if lte IE 8 ]>
    <html xmlns="http://www.w3.org/1999/xhtml" class="ie_8">
<![endif]-->
<!--[if (gt IE 8)|(!IE)]><!-->
<html xmlns="http://www.w3.org/1999/xhtml">
<!--<![endif]-->
<head id="headChat" runat="server">
    <title></title>
    <script src="Scripts/jquery-1.8.3.min.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-1.0.0-rc1.min.js" type="text/javascript"></script>
    <script src="/signalr/hubs" type="text/javascript"></script>
    <script src="JSfiles/file.js" type="text/javascript"></script>
    <link href="Styles/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <div id="chat-outline">
        <div id="chat-main">
            <div id="chat-inner">
                <div id="chat-title" style="height: 10%;">
                    <input type="button" id="btnShowUserList" value="+" title="show connected users list" />
                    <div id="chat-title-name">
                    </div>
                    <input type="button" id="btnCloseChat" value="X" title="close chat" />
                </div>
                <div id="chatBelow">
                    <div id="chatList">
                        <ul id="showUsernames">
                        </ul>
                    </div>
                    <div id="chat-display">

                        <div id="messages">
                        </div>
                    </div>
                    <div id="middleChatStrip">
                        <div id="divBuzz">
                            <img src="Images/Alert.png" alt="none" />
                        </div>
                        
                    </div>
                    <div id="chat-message-outline">
                        <div id="chat-message">
                            <div id="divMessage">
                                <asp:TextBox ID="txtmsg" BackColor="Transparent" runat="server" Wrap="true" BorderStyle="None"
                                    TextMode="MultiLine" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
