import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "随记",
      icon: "laptop-code",
      prefix: "notes/",
      link: "notes/",
      children: "structure",
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    // "intro",
  ],
});
