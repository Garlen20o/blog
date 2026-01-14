import fs from "node:fs";
import path from "node:path";

const files = process.argv.slice(2);
let hasError = false;

files.forEach((file) => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, "utf-8");

  // 提取 YAML frontmatter
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (match) {
    const frontmatter = match[1];

    // 检查 tags 列表下的空项
    // 匹配样式:
    // tags:
    //   - tag1
    //   -
    const tagsMatch = frontmatter.match(/tags:\r?\n([\s\S]+?)(?:\r?\n\w+:|$)/);
    if (tagsMatch) {
      const tagsBlock = tagsMatch[1];
      const emptyTagRegex = /^\s*-\s*$/m;

      if (emptyTagRegex.test(tagsBlock)) {
        console.error(
          `\x1b[31m[错误] 文件 "${file}" 的 tags 中包含空的标签项！\x1b[0m`
        );
        console.error(
          `\x1b[33m建议: 请删除 tags 下多余的 "-" 或补全标签内容。\x1b[0m`
        );
        hasError = true;
      }
    }
  }
});

if (hasError) {
  process.exit(1);
} else {
  process.exit(0);
}
