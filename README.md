# Xyu-Chern.github.io

个人主页（GitHub Pages user page）：https://xyu-chern.github.io

内容全部来自三份简历（`Xu Chen_CV_AI.pdf` / `Xu Chen_CV_Robotics.pdf` / `Xu_Chen_CV_Research.pdf`），包含 4 个工程项目、3 个 RL 研究项目、实习、技能与教育背景。

## 文件结构

```
index.html              页面结构 + 全部文案
assets/css/style.css    样式（浅色 / 深色主题、响应式、打印样式）
assets/js/main.js       主题切换、移动端导航、方向筛选、滚动动效、复制邮箱
assets/avatar.jpg       手绘头像（替换此文件即可换头像）
assets/favicon.svg      站点图标
.nojekyll               禁用 Jekyll，直接发布静态文件
```

无构建步骤、无外部依赖、无 CDN。改文案直接编辑 `index.html` 即可。

研究卡片 R1（Implicit Values）与 R3（DOAL）的标题和 `View on OpenReview` 按钮都链接到对应 OpenReview 页面；R2 暂无公开链接。

## 本地预览

在本目录执行：

```bash
python -m http.server 8000
```

然后打开 http://localhost:8000 。也可以直接用浏览器打开 `index.html`。

## 发布

`main` 分支即发布分支，push 后 GitHub Pages 自动更新：

```bash
git add -A && git commit -m "Update homepage" && git push origin main
```

## 可调整的地方

- 主题色、字体、间距：改 `style.css` 顶部 `:root` 与 `[data-theme="dark"]` 的 CSS 变量。
- 项目 / 研究卡片：改 `index.html` 中 `#work` 里的 `<article>`，`.filter` 与各卡片的 `data-track`（`ai` / `robotics` / `research`）需保持一致。
- 联系方式：邮箱在 `index.html` 中搜索 `nakupenda.ics@gmail.com`；GitHub 链接搜索 `github.com/Xyu-Chern`。
- 想加简历 PDF 下载：把 PDF 放进 `assets/cv/`，再在页面里加一个链接即可。
