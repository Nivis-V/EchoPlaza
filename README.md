# EchoPlaza

Echo 的 Git 静态软件包库。仓库分发 Agent 角色、描述与版本索引，不需要应用服务器；模型由 Echo 桌面客户端调用用户配置的云端服务。

## 首个 Agent：饰品运营老师

- 标识：nivis.jewelry-operator
- 版本：0.1.0
- 面板：jewelry.operations
- 专注项链、戒指、手镯、耳钉等饰品的账号定位、内容脚本、营销活动与运营复盘。
- 根据可取得的抖音公开资料提出三个优先动作、7 天内容计划、可拍摄脚本和对照实验。
- 作品归属核验、来源与时间、缺失指标标记、事实与推断区分。

[查看 Agent 软件包](agents/nivis.jewelry-operator/0.1.0/manifest.json)

## 在 Echo 中使用

使用支持 EchoPlaza 和 jewelry.operations 面板的 Echo 桌面版：

1. 进入插件市场，点击「刷新 EchoPlaza」。
2. 选中「饰品运营老师」，点击「添加联系人」，开始会话。
3. 选择已配置的模型。右侧填写抖音主页并读取公开页面。
4. 补充品牌、品类、价格带、人群与目标，保存后点击「分析账号并制定方案」。

公开页面可能要求登录、动态加载或验证。当前读取器不会绕过这些限制；读不到时请在正常浏览器查看主页，把公开简介、近期作品标题、日期和互动数粘贴到「公开资料补充」中。首版按需读取，不包含定时监控、视频画面分析或抖音后台授权。

播放、完播、订单、成交等后台数据没有接入，不会当作已知指标。Git 不会托管账号资料、聊天记录或 API Key；资料保存在客户端本机，分析时由用户选定的模型处理。

当前仓库只分发声明式软件包，不从 Git 动态执行第三方 React、Rust 或脚本代码。专属面板由宿主注册，因此单独下载 manifest 不等于获得独立运行服务。

## 目录与发布协议

~~~text
index.json
agents/{id}/{version}/manifest.json
contracts/manifest.schema.json
scripts/validate.mjs
.github/workflows/validate.yml
~~~

索引包含 schemaVersion: 1，以及每个软件包的 id、version、manifest 相对路径和原始 UTF-8 字节的 sha256。客户端使用 HTTPS 读取固定 main 分支，校验大小、路径、哈希和描述结构，缓存到本地。

新版本新增版本目录，并更新索引；已经发布的版本目录应保持不可变。SHA-256 验证完整性，不替代发布者签名。

本地校验：Node.js 20 或以上运行 node scripts/validate.mjs。GitHub Actions 在提交和拉取请求中执行同一校验。
