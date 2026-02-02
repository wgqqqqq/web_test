# GitHub Pages（根域名）

要发布到 `https://<你的用户名>.github.io/`：

1. 在 GitHub 上新建仓库，仓库名必须是：`<你的用户名>.github.io`
2. 推送本仓库代码到该仓库的 `main` 分支
3. 进入仓库 `Settings -> Pages`，将 Source 选择为 `GitHub Actions`

站点源码在 `website/`，工作流会构建并部署 `website/dist`。
