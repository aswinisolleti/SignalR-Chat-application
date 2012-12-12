using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Webstation_Chat_Application
{
    public class Chat : Hub
    {
        public void Send(string from, string message, bool blnShowChatName)
        {
            // Call the addMessage method on all clients    
            Clients.All.addMessage(from, message, blnShowChatName);
        }

        static ConcurrentDictionary<string, User> _users = new ConcurrentDictionary<string, User>();

        public override Task OnDisconnected()
        {            
            var user = _users[Context.ConnectionId]; //user as ConnectionId
            User removedUser; //new class object
            _users.TryRemove(Context.ConnectionId, out removedUser);
            return Clients.All.leave(user, DateTime.Now.ToString());
        }

        public void Joined(string username)
        {
            User user = new User(Context.ConnectionId, username);
            _users.TryAdd(user.ConnectionID, user);
            Clients.All.Joins();
        }

        public List<User> getConnectedUsers()
        {
            return _users.Values.ToList();
        }
    }
}
