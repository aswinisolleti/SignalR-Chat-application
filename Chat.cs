using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace serverNameExample
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
            var user = _users[Context.ConnectionId];
            User removedUser;
            _users.TryRemove(Context.ConnectionId, out removedUser);
            return Clients.All.leave(user, DateTime.Now.ToString());
        }

        public void Joined()
        {
            User user = new User(Context.ConnectionId,Clients.Caller.username);    
            _users.TryAdd(user.ConnectionID, user);
            Clients.All.joins(user.ConnectionID, user.Name, DateTime.Now);
        }

        public List<User> GetConnectedUsers()
        {
            return _users.Values.ToList();
        }
    }
}