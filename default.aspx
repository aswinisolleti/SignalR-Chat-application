<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="wbfrmChat.aspx.cs" Inherits="Webstation_Chat_Application.wbfrmChat" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <script src="Scripts/jquery-1.6.4.min.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-1.0.0-alpha2.min.js" type="text/javascript"></script>
    <!--  If this is an MVC project then use the following -->
    <!--  <script src="~/signalr/hubs" type="text/javascript"></script> -->
    <script src="/signalr/hubs" type="text/javascript"></script>
    <script src="JS%20files/file.js" type="text/javascript"></script>
    <link href="Styles/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    <%--Visitors online:
    <%= Application["OnlineUsers"].ToString() %>--%>
    <div id="showUsernames"></div>
    <div id="chat-outline">
        <div id="chat-main">
            <div id="chat-inner">
                <div id="chat-title">
                    <div id="chat-title-name">
                    </div>
                </div>
                <div id="chat-display">
                    <div id="messages">
                    </div>
                </div>
                <div id="chat-message-outline">
                    <div id="chat-message">
                        <asp:TextBox ID="txtmsg" BackColor="Transparent" runat="server" Wrap="true" BorderStyle="None"
                            TextMode="MultiLine" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>
</body>
</html>
