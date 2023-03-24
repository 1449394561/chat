import login from "@/components/login"
import register from "@/components/register"
import map from "@/components/map"
import cs from "@/view/cs"
import Login from "@/view/chat/Login"
import Chat from "@/view/chat/Chat"
import MChat from "@/view/chat/MChat"

const stativRoute = [{
    "path":"/",
    "name":"home",
    "redirect":"/login"
},
{
    "path":"/login",
    "name":"login",
    "component":login
},
{
    "path":"/register",
    "name":"register",
    "component":register
},
{
    "path":"/map",
    "name":"map",
    "component":map
},
{
    "path":"/cs",
    "name":"cs",
    "component":cs
},
{
    "path":'/chat/login',
    "name":'Login',
    "component": Login
  },
  {
    "path":'/chat',
    "name":'Chat',
    "component": Chat
  },
  {
    "path":'/mchat',
    "name":'MChat',
    "component": MChat
  }
]
export default stativRoute