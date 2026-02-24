# Tapday — 实施计划

## 产品概述

**名称：** Tapday
**描述：** 一个可以变成任何打卡场景的 PWA 网页应用。用户自定义名字、图标、打卡样式，安装到桌面后就像一个专属的打卡 App。
**目标用户：** 想要一个简单、美观、个性化打卡工具的任何人
**核心理念：** 不是通用打卡工具，而是打卡模板——安装到桌面上就是用户自己的专属 App

## 技术决策

### 数据存储：IndexedDB（纯本地）

V1 不使用 Supabase，所有数据存储在本地 IndexedDB：

- 使用 `idb` 库封装，API 简洁
- 存储用户配置（名称、图标、主题色、打卡标记）
- 存储打卡记录（日期 → 是否打卡）
- 存储用户上传的图片（二进制数据，localStorage 做不到）

### 动态 PWA Manifest：客户端 Blob URL

这是产品最大特色，方案如下：

1. 服务端提供静态默认 manifest（name: "Tapday"，默认图标）
2. 客户端从 IndexedDB 读取用户配置后，动态生成 manifest JSON
3. 用 `URL.createObjectURL(new Blob([json]))` 创建 blob URL
4. 更新 `<link rel="manifest">` 的 href 指向 blob URL
5. 同步更新 iOS 专属 meta 标签：`apple-mobile-web-app-title`、`apple-touch-icon`

图标生成：

- Emoji → Canvas 渲染 → 导出 PNG data URL → 写入 manifest icons
- 上传图片 → 裁剪压缩 → 存为 data URL → 写入 manifest icons

关键流程：Setup 完成 → manifest 更新 → **然后**引导用户"添加到主屏幕"。顺序很重要。

Settings 页修改配置后提示："要更新主屏幕图标，请先移除再重新添加。"

### 动画：Framer Motion + canvas-confetti

- Setup 步骤过渡、打卡弹性动效：Framer Motion
- 打卡粒子效果：canvas-confetti（轻量，效果好）
- 里程碑庆祝动画：V1.1

### SVG 打卡标记：Lucide Icons

已有 `lucide-react` 依赖，从中挑选 15-20 个风格统一的图标：
Check, Star, Flame, Heart, Zap, Trophy, Diamond, Crown, Flower2, Award, Sun, Moon, ThumbsUp, Music, Coffee, Dumbbell, BookOpen, Palette

### 图片裁剪：react-image-crop

客户端裁剪，正方形输出，压缩后存入 IndexedDB。

## 模板文件审计

### 删除

| 文件/目录                              | 原因                |
| -------------------------------------- | ------------------- |
| `src/app/auth/`                        | V1 无需认证         |
| `src/app/login/`                       | V1 无需认证         |
| `src/app/dashboard/`                   | 被日历主界面替代    |
| `src/lib/supabase/`                    | V1 纯本地存储       |
| `src/middleware.ts`                    | 无需路由保护        |
| `src/components/login-form.tsx`        | 认证相关            |
| `src/components/dashboard-content.tsx` | 被新组件替代        |
| `src/components/__tests__/`            | 模板测试，重写      |
| `src/app/__tests__/page.test.tsx`      | 模板测试，重写      |
| `supabase/migrations/`                 | V1 不用服务端数据库 |

### 修改

| 文件                   | 改动                                                               |
| ---------------------- | ------------------------------------------------------------------ |
| `src/app/layout.tsx`   | 更新 metadata、字体改系统字体栈、添加 PWA meta 标签、主题 Provider |
| `src/app/page.tsx`     | 改为应用入口：首次进入 → Setup，之后 → 日历主界面                  |
| `src/app/globals.css`  | 添加主题色 CSS 变量系统（支持用户切换）、移除 sidebar 相关变量     |
| `src/lib/utils.ts`     | 保留 `cn()`，不改                                                  |
| `README.md`            | 重写为产品 README                                                  |
| `docs/ARCHITECTURE.md` | 更新为 Tapday 架构                                                 |
| `package.json`         | 添加新依赖，移除 Supabase 依赖，改名为 tapday                      |

### 保留

| 文件                   | 原因                     |
| ---------------------- | ------------------------ |
| `src/components/ui/*`  | shadcn/ui 组件，继续使用 |
| 构建/lint/测试配置     | 不需要改                 |
| `.github/`、`.claude/` | CI 和工具配置            |

## 新增文件

```
src/
├── app/
│   ├── page.tsx                  # 应用入口（路由到 Setup 或日历）
│   ├── stats/page.tsx            # 统计页（V1.1，先放占位）
│   ├── settings/page.tsx         # 设置页
│   └── __tests__/
│       ├── page.test.tsx         # 入口页测试
│       └── settings.test.tsx     # 设置页测试
├── components/
│   ├── setup/
│   │   ├── setup-wizard.tsx      # Setup 主容器（步骤管理 + 过渡动画）
│   │   ├── step-name.tsx         # 第一步：输入名称
│   │   ├── step-icon.tsx         # 第二步：选择图标
│   │   ├── step-marker.tsx       # 第三步：选择打卡标记
│   │   ├── step-theme.tsx        # 第四步：选择主题色
│   │   └── step-complete.tsx     # 完成页：汇总 + 安装引导
│   ├── calendar/
│   │   ├── calendar-view.tsx     # 月历网格主组件
│   │   ├── calendar-day.tsx      # 单日格子（点击/长按交互）
│   │   ├── calendar-header.tsx   # 月份切换 + 统计栏
│   │   └── check-animation.tsx   # 打卡动效（弹性 + confetti）
│   ├── settings/
│   │   └── settings-panel.tsx    # 设置面板
│   ├── common/
│   │   ├── bottom-nav.tsx        # 底部 tab 导航
│   │   ├── emoji-picker.tsx      # Emoji 选择面板
│   │   ├── icon-preview.tsx      # 桌面效果预览
│   │   ├── marker-picker.tsx     # 打卡标记选择器（emoji + Lucide SVG）
│   │   └── image-cropper.tsx     # 图片上传裁剪
│   ├── pwa/
│   │   └── manifest-updater.tsx  # 动态 manifest 管理（客户端组件）
│   └── __tests__/
│       ├── setup-wizard.test.tsx
│       ├── calendar-view.test.tsx
│       └── bottom-nav.test.tsx
├── hooks/
│   ├── use-app-config.ts         # 用户配置 CRUD（名称、图标、主题、标记）
│   ├── use-check-ins.ts          # 打卡记录 CRUD + 统计计算
│   └── use-theme.ts              # 主题色应用（CSS 变量切换）
├── lib/
│   ├── db.ts                     # IndexedDB 封装（idb）
│   ├── manifest.ts               # manifest JSON 生成 + blob URL 管理
│   ├── icons.ts                  # emoji→PNG、图片压缩、Lucide 标记列表
│   └── constants.ts              # 预设主题色、预设标记列表
```

## 新增依赖

| 包                 | 用途                                   |
| ------------------ | -------------------------------------- |
| `idb`              | IndexedDB Promise 封装                 |
| `framer-motion`    | 动画（setup 过渡、打卡弹性、页面切换） |
| `canvas-confetti`  | 打卡粒子效果                           |
| `react-image-crop` | 图片裁剪（正方形）                     |

移除：`@supabase/ssr`、`@supabase/supabase-js`

## 新增 shadcn/ui 组件

- `dialog` — 确认弹窗（补打卡、取消打卡、重置数据）
- `progress` — 完成率环形进度（V1.1）
- `sheet` — 移动端抽屉（可选）

## 实施阶段

### V1.0 — 核心体验（4 个 PR）

**PR 1: 基础架构**

- 移除模板认证相关文件（auth、login、dashboard、supabase、middleware）
- 移除 Supabase 依赖，添加新依赖（idb、framer-motion、canvas-confetti、react-image-crop）
- 搭建 IndexedDB 存储层（`lib/db.ts`）
- 搭建主题系统（CSS 变量 + 预设色板）
- 动态 manifest 基础设施（`lib/manifest.ts` + `pwa/manifest-updater.tsx`）
- 底部 tab 导航骨架
- 更新 layout.tsx（metadata、系统字体、PWA meta 标签）
- 更新 README.md、ARCHITECTURE.md

**PR 2: Setup 流程**

- 4 步引导向导 + 步骤间过渡动画
- 第一步：名称输入（滚动 placeholder 示例）
- 第二步：图标选择（Emoji 面板 / 上传裁剪 / AI 占位按钮）+ 桌面预览
- 第三步：打卡标记选择（Emoji / Lucide SVG 预设）+ 日历预览
- 第四步：主题色选择（实时预览）
- 完成页：配置汇总 + PWA 安装引导（iOS/Android）
- Setup 完成后更新动态 manifest

**PR 3: 月历打卡**

- 月历网格组件（当月所有日期）
- 点击今天 = 打卡（核心一 tap 交互）
- 打卡动效：标记弹性放大缩回 + confetti 粒子 + 震动反馈（兼容处理）
- 左右滑动切换月份
- 长按补打卡（确认弹窗）+ 长按取消打卡
- 顶部统计栏（连续天数、本月打卡数、累计总数）
- 已打卡日显示用户选的 emoji/SVG 标记

**PR 4: 设置页**

- 修改名称、图标、打卡标记、主题色（复用 Setup 组件）
- 重置所有数据（二次确认）
- 暗色模式支持（跟随系统 + 手动切换）
- 配置修改后提示重新安装 PWA

### V1.1 — 增强体验

- 统计页：GitHub 风格热力图、最长连续天数、月完成率环形进度、周几偏好柱状图
- 里程碑动画：7天/30天/100天庆祝
- 数据导出（JSON 下载）
- 关于 Tapday 页面
- Setup 动画细节打磨

## 路由结构

```
/          → 首次进入走 Setup，之后显示月历打卡
/stats     → 统计页（V1.1）
/settings  → 设置页
```

底部 tab 导航：打卡 | 统计 | 设置

## 设计规范

- 圆角 16px+，卡片式布局，大面积留白
- 系统字体栈（移除 Geist，用 -apple-system 等）
- 主题色做点缀（按钮、高亮、进度条），不大面积铺色
- 动画丝滑：Framer Motion spring 配置，不过度
- 暗色模式全适配
- 预设色板：6-8 个精选颜色（珊瑚红、天空蓝、薄荷绿、琥珀黄、薰衣草紫、深空灰、玫瑰粉、森林绿）
