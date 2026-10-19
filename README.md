# LingoAce 整站一次上传指南

本包是完整网站，不是图片分批包。全部图片、缩略图、教材数据、拓展内容与工具页均已包含。访问密码仍为 lyp82nlf。
已包含最新修改：移除工作空间侧栏卡片、主页三张统计卡与归档说明；旧版工具首页自动跳转到新版入口。

## 你只需要做什么

第一次：下载一个完整 ZIP → 解压一次 → 复制整个网站到本地仓库 → Commit → Push。
以后：把更新文件放进同一个本地仓库 → Commit → Push。无需再按 100 张图片分批。

GitHub Desktop 是用来把电脑文件夹和 GitHub 仓库同步的软件；GitHub Pages 是发布网站的功能。两者配合使用，不需要编写命令。

## 第一步：准备 GitHub Desktop

1. 前往 https://desktop.github.com/ 下载并安装与你电脑兼容的 GitHub Desktop。
2. 打开软件，选择 Sign in to GitHub.com，用你已有的 GitHub 账号登录。
3. 设置 Git 提交使用的姓名和邮箱。

## 第二步：把你现有的网站仓库下载到电脑（只做一次）

1. 在 GitHub Desktop 顶部菜单选择 File → Clone Repository。
2. 在 GitHub.com 列表中选择你正在使用的 LingoAce 网站仓库；不要选其他学科项目。
3. 找不到时，点击 URL 标签，填入网站仓库的 GitHub 地址。地址格式为 https://github.com/你的用户名/你的仓库名 ，不是 github.io 的网页访问地址。
4. Local Path 是电脑上的存放位置，选一个以后找得到的位置。
5. 点击 Clone，等待完成。
6. 点击 Repository → Show in Finder（Mac）或 Show in Explorer（Windows），打开仓库文件夹。

注意：你之前在浏览器上传成功的文件会随 Clone 一起下载，不必重新建仓库。

## 第三步：一次放入完整网站

1. 解压 LingoAce-GitHub-Ready.zip，只需这一个压缩包，不需要旧的 10 个图片包。
2. 打开解压文件夹，里面应直接看到 index.html、cockpit.js、catalog.js、assets、tools 等。
3. 全选里面的网站文件和文件夹，复制到第二步打开的本地仓库文件夹；出现同名文件时选择替换。同名目录应合并内容。
4. 如果系统只提供“替换文件夹”，本包的 assets 和 tools 已含该版本全部内容；若你自行加过额外资料，先保留一份，再合并这些自有资料。
5. 复制后检查：本地仓库文件夹里必须直接看到 index.html；图片必须在 assets/cards 中。不要多套一层 LingoAce-GitHub-Ready 文件夹。
6. ZIP 本身不要复制进仓库。不要删除仓库原有的 Git 配置。

如果只新增图片、尚未整理教材映射，图片不会自动出现在对应单元。图片文件和映射数据是一起工作的。

## 第四步：一次提交和上传全部文件

1. 回到 GitHub Desktop，选择刚才的网站仓库。
2. Current branch 应是网站发布所使用的 main（如果你的仓库实际使用其他分支，以 Pages 设置为准）。
3. 左侧 Changes 会自动显示新增、修改文件，保留本次网站更新文件的勾选。
4. 左下角 Summary 写：更新 LingoAce 完整网站。
5. 点击 Commit to main（按钮上的分支名可能不同）。
6. 点击顶部 Push origin，等待上传完成。这次会提交全部新增和修改内容，不用每批点一次。
7. 如果出现 Fetch origin，先点它；若提示 Pull origin，先拉取。遇到冲突时暂停，不要强制推送。
8. 没有待推送提交，且仓库网页能看到本次提交，即说明同步完成。

重要：只点 Commit 是保存到电脑，必须继续点 Push origin 才会上传 GitHub。

## 第五步：设置 GitHub Pages（只做一次）

1. 浏览器打开你的网站 GitHub 仓库 → Settings → Pages。
2. Build and deployment 中，Source 选择 Deploy from a branch。
3. Branch 选择 main，目录选择 /(root)，点击 Save。若你的默认分支是其他名称，选择你刚才推送的分支。
4. 本包是静态网站，不需要 npm install，也不需要单独运行构建。
5. 等待仓库 Actions 中对应 Pages 部署完成。在 Pages 页面打开发布地址。
6. 输入密码 lyp82nlf，进入单元资源库，选一个已有海报的单元，确认缩略图和大图都能打开。

如果 Pages 已按同一分支、根目录发布，不用反复改设置。后续推送该分支后会触发部署。
本包未附额外 Actions workflow，采用 GitHub 自带的分支 Pages 发布。

## 以后新增词卡和延伸拓展：怎么不再反复上传

1. 始终使用这一个本地仓库文件夹，先 Fetch/Pull 获取最新版本。
2. 把整理好的新海报及缩略图放入 assets/cards，保留约定文件名。
3. 同时替换整理好的 catalog.json 和 catalog.js，确保教材、Level、Unit 与图片对应。两个文件应同步更新。
4. 新增内容的整理仍需进行；仅把任意新图片放入文件夹，网站不会自动判断它属于哪个教材单元。
5. 回 GitHub Desktop，只需一次 Commit，再一次 Push origin。Git 会记录变化的文件，无须手动重选以前的图片。
6. 如果拿到的是新的完整版本，也可以只解压那个整包一次，再覆盖到同一个本地仓库，一次 Commit/Push 即可。

这不是后台自动发布系统，也不会自动读取聊天中的新增海报。它解决的是“反复分批解压、在网页逐批选择上传”的问题。

## 对照排错

- 仍然打开旧界面：确认根目录 cockpit.js 为本包版本，等 Pages 部署成功后刷新，必要时强制刷新。
- 图片破图：确认图片位于 assets/cards，而不是根目录或某个 Images-01 子目录；确认 catalog 两个文件同步。
- 更新不上线：确认点过 Push origin，检查 Pages 使用的分支，检查 Actions 是否成功。
- 没有 Changes：确认你复制到了 Show in Finder/Explorer 打开的真实仓库路径，或文件内容本来就相同。
- 只需提供网页访问地址时，请发 Pages 的地址，不能用 GitHub 文件列表地址代替。

## 内容与访问说明

135 个单元、317 张完整海报及其 317 张缩略图；保留已有词汇和拓展内容，没有为尚未制作的单元新增海报。
前端入口密码限制界面入口，不能隐藏公开仓库中的教材和图片。收藏和部分工具草稿保存在使用者的浏览器中。

## 官方参考

- 安装与使用 GitHub Desktop：https://docs.github.com/en/desktop
- 克隆仓库：https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop
- 提交并推送：https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop
- 配置 Pages：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
