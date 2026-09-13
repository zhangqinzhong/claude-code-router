# AgentRouter 上游审查（2026-09-13）

上游：musistudio/claude-code-router，main = afba89f，正式版本 v3.1.0。
本地：feat/agentrouter-rebrand，HEAD = 39d6d1f，另有未提交的品牌、日志和设置修改。
本次已 fetch，未合并、未修改安装包、未发布。

## 已移植，不应重复 cherry-pick

提交历史中的 23 个未包含提交并不等于 23 个缺失功能。品牌及路径改名导致 patch-id 不同。

| 上游 | 本地移植 | 内容 |
|---|---|---|
| 37ae4f5 | 82ab0fd | Claude App 恢复偏好 |
| 82d2f52 | 5ab22bb | 移除 Claude App 废弃配置 |
| 09d41b0 | d7d50b8 | 模型目录缓存 |
| 687b84f | 641e662 | 路由 provider identity 缓存 |
| 9f45399 | 912ac21 | 减少重复扫描可执行文件 |
| 9387b5b | 66ff98b | 保存取消勾选的协议 |
| b1fd1e2 | 349f904 | Gemini 协议和认证 |
| c7e9a4c | 0698fa1 | OpenCode 会话请求头 |
| b229bd8 | 78972cc | Cowork WebSearch 识别 |
| bc630ff | cdfadc5、bcf9e3e | Claude Code helper 认证与供应商限额 |
| 39e4da3 | bb9a06b | Meta 输出下限、工具 ID |
| 49fdd1a | 72ff5a1 | Claude Design 交互问题 |
| a8d7038 | c946321 | 托盘账户与时间范围 |
| 923c742 | 7a6359a、1a12d34 | 概览统计重置 |

对照实际文件确认：缓存、WebSearch、Claude Design 核心逻辑相同；其他移植存在品牌/本地下游差异，不能用整文件覆盖。

## 推荐按功能抽取

主要来自 b0d59af，不能整个提交直接套用。

1. **优先：凭据并发写入保护。** config-repository.ts 的事务更新 API 与 config.ts、profiles/service.ts 配套移植。上游测试覆盖旧设置快照不能恢复已撤销密钥、交错保存不覆盖密钥轮换与限额。
2. **优先：数据库初始化失败后可重试。** ConfigRepository 初始化 Promise 失败时清空，并在初始化/建表失败时关闭连接。带上 config-repository-init-retry 测试。
3. **优先：跨协议限额估算。** window-limiter.ts 增加 Responses input/instructions 和 Gemini contents/systemInstruction，识别 max_completion_tokens 与 generationConfig 输出上限。带上 window-limiter 测试。
4. **推荐：失败响应不阻塞重试。** upstream/executor.ts 从等待读完错误正文改为异步取消，同时保留 Responses 原生请求字段。先确认实际请求路径是否经过该 executor；当前默认 core gateway 路径未必经过它。
5. **推荐：设置保存队列和供应商重命名引用。** config-persistence.ts、provider-references.ts 与 UI 调用点成组移植，防止保存结果覆盖后续编辑和供应商改名后路由引用失效。涉及 App.tsx，不直接覆盖本地日志/图标设置。
6. **按使用需要：微信 iLink 禁用流式回复（4bf5508）。** 本地仍直接使用 bot.streamReplies。迁移运行时和 UI 限制；其他平台保持原行为。
7. **独立更新：模型目录。** 本地目录 4298 个模型，上游 4631 个；可审查后更新价格/能力目录。不要把版本号修改当作功能升级。

## 暂缓或保留本地

- 4afd350 的 Claude 配置编辑器和完整生成选项目录：当前本地缺生成文件，需组件、脚本、数据及测试一并移植，不能只拷 JSON。
- Codex base_instructions 替换：改变系统提示词和模型行为，单独评估，不混入修复批次。
- 保留本地日志独立记录、正文回收、保存天数和首 Token/速率修改。上游对应代码不同，整体覆盖会撤掉本地修复。
- 不覆盖品牌、图标、数据路径、发布目标；不更改 Dockerfile。

## 使用自己的 GitHub Releases 更新

已核实 zhangqinzhong/claude-code-router 是公开仓库，目前没有 Releases。
可用的目录形式为：https://github.com/zhangqinzhong/claude-code-router/releases/latest/download/
这是实际仓库的发布资产入口，但当前没有更新文件，因此现在直接启用会找不到 latest-mac.yml。

发布配置应为：

```json
{
  "publish": [{
    "provider": "github",
    "owner": "zhangqinzhong",
    "repo": "claude-code-router",
    "releaseType": "release"
  }]
}
```

修改 electron-builder.json 当前的 publish:null，并发布自己的 AgentRouter 制品；不能引用 musistudio 的上游安装包。现有 tag 发布流程还需端到端验证：同步各 package.json/锁文件版本、正确的 macOS 签名、DMG/ZIP、latest-mac.yml、架构对应资源及校验。

当前代码只在环境变量存在时启用更新。发布完成后，完全退出 App，再启动：

```sh
open -a /Applications/AgentRouter.app --env AR_UPDATE_FEED_URL=https://github.com/zhangqinzhong/claude-code-router/releases/latest/download/
```

该启动参数仅本次生效。正式发行应在 update-service.ts 配置自己的默认源，并允许环境变量覆盖，避免每次手动设置。本次没有启用源、上传文件、创建 Release 或改变版本号。


## 1.0.0 实施结果

已按功能移植凭据并发保护、初始化失败重试、跨协议限额估算、失败响应取消、Responses 原生字段保留及 iLink 流式限制，保留原有 AgentRouter 修改。模型目录和大规模配置 UI 重构未纳入本批。新增或移植相应回归测试；旧 profile 测试显式写入凭据数据库，符合新的凭据权威存储规则。

发行版本改为 1.0.0。更新源内置本仓库 Releases 资产目录，环境变量可覆盖；发布配置归属 zhangqinzhong/claude-code-router。macOS 当前只有本地签名，公证及真实自动安装升级仍需另行验证。


## 1.0.1 实施结果

剩余设置保存队列/草稿合并、供应商引用同步、未保存编辑保护、Claude 高级设置编辑器、模型目录和 Codex base_instructions 均已移植。保留 AgentRouter 标识、3466 默认端口、旧路径兼容、日志清理及指标修改。模型目录测试改用新快照中仍有 OpenRouter 直接记录的型号，继续验证供应商特定限制优先于跨供应商合并上限。

Claude/Codex 配置写入的上游依赖一并接入；测试中显式隔离 HOME，使用已配置网关端口匹配托管设置。Dockerfile 未改动。
