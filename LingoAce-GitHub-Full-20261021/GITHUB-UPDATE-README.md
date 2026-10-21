# LingoAce 工作台 · GitHub 完整更新包

本包为完整静态网站，包含原海报、PU Level1–3、RH Level4–7、自研Level1–8听读与测评资源。解压后 index.html 就是首页，不需要安装或构建。

## 更新现有 GitHub 仓库（GitHub Desktop）
1. 解压 ZIP。不要将 ZIP 本身上传。
2. GitHub Desktop 选择你现有的 LingoAce 工作台仓库，点击 Fetch origin；若显示 Pull origin，先点击同步。
3. 菜单 Repository → Show in Finder 打开仓库文件夹。
4. 将解压后的全部文件和文件夹复制到现有 index.html 所在目录，合并文件夹并替换同名文件。不要复制外面多套的一层文件夹。保留仓库自己的 .git 和 .github。
5. 若以下旧文件还在，删除：tools/learning-plan.html、tools/gm-workbench.html、tools/worksheets.html。新版已移除三个旧工具。
6. 回到 GitHub Desktop，在 Summary 填写 Update LingoAce workspace，点击 Commit to main，再点击 Push origin。
7. GitHub 仓库 Settings → Pages：Source 选择 Deploy from a branch；Branch 选择 main，目录选择 /(root)，保存。如果原来已配置正确，保持原配置。
8. 等 Pages 部署成功，打开原 GitHub Pages 网址。Mac 按 Command+Shift+R 强制刷新。

## 目录检查
仓库根目录应直接看到 index.html、app.js、auth.js、assets、tools、learning-lab、pu-learning。
如果你原仓库从 /docs 发布，则全部内容放进 docs，Pages 继续选择 /docs。若原来使用自定义 Actions，请保留原工作流并让它发布本包所在目录，不要直接改成根目录。

## 本次内容
- RH Level4–7：每级Unit1–8，共32单元。
- 自研Level1–8：每级Unit1–8，共64单元。
- 加上PU Level1–3的27单元，共123个听读与测评单元、369条MP3。
- 每单元含主题词、语言示例、拓展阅读、家庭活动、20道客观题、2项口语、学生卷与答案卷PDF。
- 音频为美式神经网络合成朗读；听力分角色、每题两遍并留作答停顿，支持下载与调速。
- 已去掉个性化学习规划、学管服务工作台、课后练习导航。保留阶段总结与规划。

## 注意
全部音频和图片已包含，无需单独找素材。所有新增资源使用相对路径，支持 GitHub Pages 的仓库子路径。
访问密码沿用原工作台设置。入口密码是静态前端遮罩；公开GitHub仓库及Pages中的资源仍可被读取，请勿在仓库中加入学生隐私或密钥。
此包只用于更新网站文件，不包含任何 .git、Sites 配置或平台访问令牌。

Developer: Rachel Hu
