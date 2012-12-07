<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="serverNameExample._default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="Scripts/jquery-1.8.2.js" type="text/javascript"></script>
    <script src="Scripts/jquery.signalR-1.0.0-alpha2.min.js" type="text/javascript"></script>
    <!--  If this is an MVC project then use the following -->
    <!--  <script src="~/signalr/hubs" type="text/javascript"></script> -->
    <script src="/signalr/hubs" type="text/javascript"></script>
    <script src="Resources/file.js" type="text/javascript"></script>
    <link href="Resources/style.css" rel="stylesheet" type="text/css" />
</head>
<body>
    <form id="form1" runat="server">
    Visitors online:
    <%= Application["OnlineUsers"].ToString() %>
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
