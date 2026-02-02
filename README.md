# GitHub Pages（分支直接发布产物）

站点源码在 `website/`，发布时将构建产物直接放到 `website` 分支根目录，让 GitHub Pages 从该分支发布（不使用 Actions 流水线）。

## 一次性设置

在 GitHub 仓库 `Settings -> Pages`：
- Source 选择 `Deploy from a branch`
- Branch 选择 `website`
- Folder 选择 `/(root)`

## 发布（项目站点）

如果站点地址是 `https://<用户名>.github.io/<仓库名>/`（例如 `https://wgqqqqq.github.io/web_test/`），构建时需要设置：

`BASE_PATH=/<仓库名>/`

然后把 `website/dist/` 的内容同步到 `website` 分支根目录并提交。
