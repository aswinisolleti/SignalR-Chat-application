using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;

namespace serverNameExample
{
    public class User
    {
        public User(string ConnID, string Username)
        {
            Name = Username;
            ConnectionID = ConnID;
        }

        public string Name { get; set; }
        public string ConnectionID { get; set; }
    }
}