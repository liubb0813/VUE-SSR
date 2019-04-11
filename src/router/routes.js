const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const User = () => import(/* webpackChunkName: "User" */ "@/views/User.vue");
const Canvas = () =>
  import(/* webpackChunkName: "Canvas" */ "@/views/canvas.vue");

export default [
  {
    path: "/",
    name: "home",
    component: Home,
    children: [
      {
        path: "user",
        name: "user",
        component: User
      },
      {
        path: "canvas",
        name: "canvas",
        component: Canvas
      }
    ]
  }
];
