# LingoAce 教学工作台

完整静态独立站，可部署到 GitHub Pages，无需安装 Node.js 或构建。

## 正确入口

请打开解压后根目录的 `index.html`。旧的 `tools/index.html` 已改为自动跳转到同一个新版入口，不再展示旧版工具中心。更新已有仓库时，请用本包完整覆盖原文件。

## 进入工作台

访问密码：`lyp82nlf`。正确输入后，本标签页保留访问状态约 12 小时；右上角锁定按钮可退出。直接打开工具页也会显示密码入口。

这是前端入口密码，并非服务器身份验证。公开仓库中的代码、教材与图片可被查看或下载；请勿用它存放机密资料。

## 方法一：GitHub Pages 分支部署（推荐）

1. 解压本下载包。将解压后的全部文件上传至 GitHub 仓库根目录，保留 `assets`、`tools` 等目录结构。请上传文件，而不是 ZIP 压缩包。
2. 文件较多，建议使用 GitHub Desktop：克隆你的仓库，把解压文件复制进去，提交并 Push 到 `main` 分支。
3. 仓库根目录应直接看到 `index.html`、`auth.js`、`assets/` 和 `tools/`，不要再套一层 `dist` 或压缩包名称文件夹。
4. 打开仓库 **Settings → Pages**，在 **Build and deployment → Source** 选择 **Deploy from a branch**。
5. 选择 `main` 分支和 `/(root)` 目录，点击 Save，等待页面顶部出现站点地址。
6. 打开该地址，输入密码进入。仓库是否支持 Pages 取决于你的 GitHub 账户及仓库可见性。

## 方法二：GitHub Actions 部署

已附 `.github/workflows/pages.yml`。保留这个隐藏目录，上传后在 **Settings → Pages → Source** 选择 **GitHub Actions**。到 Actions 页面运行 **Deploy LingoAce to GitHub Pages**，或再次向 `main` 推送提交即可触发。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 本地预览

可先直接打开 `index.html`。若浏览器限制本地工具页功能，请在此文件夹运行：

```sh
python3 -m http.server 8000
```

Windows 可使用 `py -3 -m http.server 8000`。随后访问 http://localhost:8000 ，输入密码。

需要电脑已安装 Python。预览服务器只用于本地查看，关闭终端即停止。

## 文件与内容

- 保留左侧导航、渐变配色、粒子交互、北京时间、每日一句和日历；移除了截图中的“Rachel 的工作空间”侧边卡片。
- 包含 135 个单元的现有内容、317 张完整卡片海报及对应缩略图。
- 收藏和部分工具草稿存储在当前浏览器，不会自动同步到其他电脑。
- 教材和图片均随包提供；少数原有工具的在线字体、导出库仍可能需要网络。
- 所有资源使用相对路径，支持 `https://用户名.github.io/仓库名/`。

## 修改访问密码

`auth.js` 中的 `EXPECTED` 是密码的 SHA-256 摘要。用新密码的 SHA-256 十六进制结果替换它，再提交部署即可。不要仅修改这份说明中的密码文字。
