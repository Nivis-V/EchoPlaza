# EchoPlaza

Echo 的 Git 静态软件包库。仓库分发 Agent 角色、描述与版本索引，不需要应用服务器；模型由 Echo 桌面客户端调用用户配置的云端服务。

## 官方 Agent：AI视频分镜老师

- 标识：nivis.storyboard-teacher
- 版本：0.1.0
- 面板：storyboard.project
- 专职根据剧本规划适合 AI 视频生成的分镜与逐镜提示词。
- 明确景别、构图、动作、运镜、光线、起止状态、时长与镜头衔接。
- 支持文生视频、图生视频和首尾帧方案；未知模型能力会标为待确认。
- 检查角色、服装、道具、视线、屏幕方向和时长连续性，提供复杂镜头的简化方案。
- 按项目语言设置交付中文、英文或中英逐镜提示词。

[查看 Agent 软件包](agents/nivis.storyboard-teacher/0.1.0/manifest.json)

## 在 Echo 中使用

使用支持多会话和 storyboard.project 面板的新版 Echo 桌面版：

1. 进入插件市场，点击「刷新 EchoPlaza」。
2. 选中「AI视频分镜老师」，点击「添加联系人」，新建会话。
3. 为会话选择设置中配置的语言模型。
4. 在右侧填写剧本、目标视频模型、生成模式、画幅、时长、视觉风格及连续性设定，保存项目。
5. 点击「生成分镜与提示词」「只生成逐镜提示词」或「检查连续性与可执行性」。

同一联系人可以建立多个独立会话，每个会话分别保存剧本和项目资料。会话可以重命名或删除。聊天语言模型生成文本；目标视频模型用于规划提示词，当前没有视频生成接口。参考帧说明当前为文字输入。

Git 不托管剧本、聊天记录、账号资料或 API Key。项目保存在客户端本机，发起请求时由用户选定的语言模型处理。原运营老师已从当前索引撤下；新版 Echo 会迁移已安装的旧联系人，保留旧消息、会话身份与模型设置，旧账号资料不加入分镜上下文。

当前仓库只分发声明式软件包，不从 Git 动态执行第三方 React、Rust 或脚本代码。专属面板由宿主注册，因此单独下载 manifest 不等于获得独立运行服务。

## 目录与发布协议

```text
index.json
agents/{id}/{version}/manifest.json
contracts/manifest.schema.json
scripts/validate.mjs
.github/workflows/validate.yml
```

索引包含 schemaVersion: 1，以及每个软件包的 id、version、manifest 相对路径和原始 UTF-8 字节的 sha256。客户端使用 HTTPS 读取固定 main 分支，校验大小、路径、哈希和描述结构，缓存到本地。

新版本新增版本目录，并更新索引；同一 ID 已经发布的版本目录应保持不可变。SHA-256 验证完整性，不替代发布者签名。撤下的软件包可以通过 Git 历史查看。

本地校验：Node.js 20 或以上运行 node scripts/validate.mjs。GitHub Actions 在提交和拉取请求中执行同一校验。
