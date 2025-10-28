import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/notes/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "SSE",
        link: "ai&f12&sse"
      },
    ],
  }
]);
