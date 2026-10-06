# EchoPlaza

Echo 的 Git 静态软件包库。分发 Agent 角色、描述与版本索引，不需要应用服务器；模型由 Echo 桌面客户端调用用户配置的云端服务。

## 官方 Agent：AI视频分镜老师

- 标识：nivis.storyboard-teacher
- 版本：0.2.0
- 面板：storyboard.project
- 根据聊天中的剧本自主组织适合 AI 视频生成的分镜与逐镜提示词。
- 自主处理镜头数量、时长、景别、构图、动作、运镜、光线与连续性。
- 按偏好提供中文、英文或中英视频提示词，以及各镜静态生图参考帧提示词。
- 配合新版 Echo 宿主交付纯文字或图文 HTML，图片由用户设置中的生图子模型生成。

[查看 Agent 软件包](agents/nivis.storyboard-teacher/0.2.0/manifest.json)

## 使用流程

使用支持新版 storyboard.project 和 HTML 导出的 Echo 桌面版：

1. 进入插件市场，点击「刷新 EchoPlaza」，添加或更新分镜老师。
2. 选择联系人，在聊天区会话侧栏选择或新建会话；双击标题改名，可确认后删除。
3. 在设置中统一配置对话/生图服务、URL、API Key 和对应模型 ID。
4. 右侧仅选择视觉风格、画幅、提示词语言、纯文字/图文输出和生图子模型。
5. 直接在聊天输入框发送剧本，老师完成分镜文件；图文模式逐镜生成参考图。
6. 点击「导出 HTML」保存独立网页文件；带图文件内嵌图片，可离线打开。
7. 图片失败时保留文字与已完成图片，可补全缺失镜头。

同一联系人可建立多个独立会话，每个会话分别保存消息、创作偏好与分镜结果。当前交付 AI 视频提示词与静态参考图；视频生成由后续视频模型执行。

Git 不托管剧本、聊天记录、账号资料、图片或 API Key。数据保存在客户端本机，模型请求使用用户选定的云端服务。生图服务必须兼容 POST /images/generations；填写模型名不保证接口可用。

旧运营角色已撤下，旧分镜版本和运营角色的迁移保留会话、消息与模型配置，旧账号资料不加入分镜上下文。0.1.0 的剧本字段保留在本地，需要发送到聊天后进入新工作流。

仓库只分发声明式描述，专属 React 面板、生图与导出由 Echo 宿主提供；单独下载 manifest 不等于独立运行服务。

## 目录与发布

```text
index.json
agents/{id}/{version}/manifest.json
contracts/manifest.schema.json
scripts/validate.mjs
.github/workflows/validate.yml
```

索引包含 schemaVersion: 1，以及每个软件包的 id、version、manifest 相对路径与原始 UTF-8 字节的 sha256。客户端通过 HTTPS 读取固定 main 分支，校验数量、大小、路径、哈希和描述结构，缓存到本地。

新版本新增目录，并更新索引；已发布版本目录保持不可变。SHA-256 验证完整性，发布者签名后续增加。旧版本可在版本目录或 Git 历史中查看。

Node.js 20 或以上运行 `node scripts/validate.mjs` 校验。GitHub Actions 在提交与拉取请求中执行同一校验。
