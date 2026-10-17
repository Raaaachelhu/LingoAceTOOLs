# LingoAce GitHub 网页分批上传

网站布局、画质和密码均保持不变。访问密码：lyp82nlf。
本套文件基于已修复旧版首页的版本。

## 先上传主程序

1. 下载并解压 LingoAce-Website-00.zip。
2. 进入 GitHub 仓库首页（根目录），选择 Add file → Upload files。
3. 把解压后直接看到的全部网站文件和 tools 等目录拖进去，不要拖最外层的解压文件夹，也不要上传 ZIP 本身。
4. 提交保存。上传完成后，仓库根目录必须直接有 index.html、auth.js、catalog.js、tools/。
5. 若之前已上传过主程序，本主程序包用于覆盖更新；不要删除已上传的图片。

## 再分批上传图片

共 10 包，包含全部 634 张图片文件（317 张完整海报＋317 张缩略图），没有降低画质。

1. 下载并解压 LingoAce-Images-01.zip。
2. 回到 GitHub 仓库首页（根目录），再次选择 Add file → Upload files。
3. 把这一包解压后看到的 assets 文件夹整体拖入上传区域；不要拖 Images-01 外层文件夹。
4. 提交保存，完成这一批。
5. 按相同方法继续上传 Images-02 至 Images-10，每包独立提交一次。
6. 每一包都从仓库首页操作；同名 assets 目录会合并，图片名称不同，不会相互覆盖。

不要一次把所有图片包合并后再拖入，那样仍会超过网页上传数量限制。
不要上传 ZIP，GitHub Pages 不会自动将 ZIP 解压成网站图片。
不要把图片直接放在根目录，网站按 assets/cards/文件名.webp 寻找图片。

如果你已经进入了仓库的 assets/cards 目录，也可以在该目录选 Upload files，拖入单个分批包中的 .webp 图片文件；此时不要再拖 assets 文件夹。

## 上传后检查

- 仓库图片位置：assets/cards/。
- 总共应有 634 个 .webp 文件；每批的精确名单见 GitHub-Upload-Manifest.csv。
- 网站主入口：仓库根目录的 index.html。
- GitHub Settings → Pages：Deploy from a branch，选择 main 分支、/(root) 后保存。
- 等待 Pages 部署完成后刷新页面，进入单元资源库查看海报。
- 若仍有图片不显示，先检查上传后路径是否多了一层 Images-01 或 LingoAce-GitHub-Ready。

## 分批清单

| 文件 | 上传文件数 | 压缩包大小 |
|---|---:|---:|
| LingoAce-Images-01.zip | 80 | 15.9 MiB |
| LingoAce-Images-02.zip | 80 | 17.9 MiB |
| LingoAce-Images-03.zip | 72 | 17.6 MiB |
| LingoAce-Images-04.zip | 76 | 17.5 MiB |
| LingoAce-Images-05.zip | 72 | 18.0 MiB |
| LingoAce-Images-06.zip | 66 | 17.7 MiB |
| LingoAce-Images-07.zip | 54 | 17.6 MiB |
| LingoAce-Images-08.zip | 48 | 17.4 MiB |
| LingoAce-Images-09.zip | 50 | 17.5 MiB |
| LingoAce-Images-10.zip | 36 | 12.6 MiB |

GitHub 官方说明：https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
