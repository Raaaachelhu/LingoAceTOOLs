# 自研 Level0 完整更新包（一个 ZIP）

本包是包含Level0更新后的完整静态网站，直接用于现有LingoAceTOOLs GitHub Pages工作台。原有图片、PU、RH、自研Level1–8，以及新增Level0的音频、PDF和页面数据全部包含，不需要其他分包。

## 更新内容
- 自研 Level0 Unit1–8，按现有教材单元目录编写补充资源。
- 每单元：词汇与4组表达、原创故事及中文辅助理解、家庭活动、自然拼读示例词。
- 每单元4条实际MP3：词汇、故事、测评听力、自然拼读示例词；共32条。
- 每单元20道客观题、2项口语、学生卷和答案卷；16份单元PDF、2份整级合集。
- 听力使用不同角色音色，每题两遍，预留约6秒；其他音频也有跟读停顿。为美式合成语音，不是官方教材原声。
- 界面保留原有风格和已删除栏目的状态。自研听读入口显示Level0–8，共72单元；全部教材听读测评合计131单元。
- Level0允许成人读题和选项；孩子可指认、动作或口答。口语仍按实际表达评分，不要求孩子独立读长句。

## Mac + GitHub Desktop 更新
1. 把ZIP下载到仓库外，再解压。不要把ZIP本身上传。
2. 打开GitHub Desktop，选现有LingoAceTOOLs仓库，Fetch origin；如显示Pull origin，先同步。
3. 点Repository → Show in Finder。保持这个仓库窗口打开。
4. 打开解压后的更新包文件夹，里面应直接看到index.html、app.js、assets、tools、learning-lab、pu-learning和更新说明。
5. 复制这些内容到第3步的仓库目录，与原index.html同层。请复制文件夹里面的内容，不要把外层更新包文件夹整个复制进去。
6. 同名文件选替换，同名文件夹选合并；不要选择保留两者。
7. 回GitHub Desktop，Summary填“补齐自研Level0听读拓展与测评”，Commit to main，再Push origin。
8. 等GitHub仓库Actions里的Pages部署成功，打开原网址。左侧自研听读与测评 → Level0 → Unit1–8。原单元资源页也有本单元听读入口。

原GitHub网址：https://raaaachelhu.github.io/LingoAceTOOLs/#home
访问密码沿用原设置。不要改Pages配置，不要新建仓库。已有音频与图片目录应继续保留。

包内包含完整网站及本次Level0更新，不是需要拼接的分卷压缩包。刷新仍显示旧版时，Mac用Command+Shift+R。

Developer: Rachel Hu
