using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using Webstation_Chat_Application;

namespace Webstation_Chat_Application
{
    public class Chat : Hub
    {
        //DbConnection _connect = new DbConnection();
        //
        public void Send(string from, string to, string message, bool blnShowChatName, bool blnInvokeChat)
        {
            string ConnectionID = selectUsername(to);
            string currentTime = DateTime.Now.ToString("t");
            // Call the addMessage method on all clients    
            Clients.Client(ConnectionID).addMessage(from,currentTime, message, blnShowChatName, blnInvokeChat);
            if (!from.Equals(to))
            {
                blnInvokeChat = false;
                Clients.Caller.addMessage(from, currentTime, message, blnShowChatName, blnInvokeChat);
            }
            //
            //storing the Chat data into the Database Table "MessagesTable"
            //_connect.storeMessage(from, message);
        }

        static ConcurrentDictionary<string, User> _users = new ConcurrentDictionary<string, User>();

        public override Task OnDisconnected()
        {
            var user = _users[Context.ConnectionId]; //user as ConnectionId
            User removedUser; //new class object
            //removing the username from the list based on the connectionID
            //which was generated automatically by the system.
            _users.TryRemove(Context.ConnectionId, out removedUser);
            return Clients.All.leave(user, DateTime.Now.ToString());
            //return Clients.All.leave();
        }

        public void Joined(string username)
        {
            //adding the username entered by the user into the user class constructor
            User user = new User(Context.ConnectionId, username);
            //adding the new username into the static dictionary "_users"
            _users.TryAdd(user.ConnectionID, user);
            //calling the javascript method i.e client side
            Clients.All.Joins();
        }

        public List<User> getConnectedUsers()
        {
            return _users.Values.ToList();
        }

        private  string selectUsername(string SelectedUsername)
        {
            var user = _users.FirstOrDefault(x => x.Value.Name == SelectedUsername);
            return user.Value.ConnectionID;
        
            //foreach (var item in _users)
            //{
            //    if (item.Value.Name == SelectedUsername)
            //    {
            //        return item.Value.ConnectionID;
            //    }               
            //}
            //return null;
        }        
    }
}