# 油画独立站

一个零月费、纯静态的艺术家作品站。部署后自带 HTTPS，买家从全球都能打开。

## 一、本地预览

直接双击 `index.html` 就能在浏览器里看。想更接近真实环境，用 Python 起个本地服务：

```bash
cd oil-painting-site
python -m http.server 8000
```

然后浏览器打开 http://localhost:8000

## 二、换成你自己的内容

**只需要改 `js/data.js` 一个文件**：

1. `SITE` —— 你的名字、简介、邮箱、PayPal 链接、运输说明。
2. `ARTWORKS` —— 每幅画一个对象。把 `image` 换成你的作品照片路径。

图片怎么放（推荐用自带工具，不用手动压缩）：

1. 把原始作品照片（jpg/png/webp 都行）复制进 `images/原始照片/` 文件夹。
2. 进入 `tools/` 文件夹，**双击 `处理照片.bat`**。
3. 工具自动校正方向、缩放到长边 2000 像素、压缩到 400KB 以内，按 `painting-01.jpg`、`painting-02.jpg`… 命名输出到 `images/`。
4. 打开 `images/图片清单.txt`，看每张照片对应哪个新文件名。
5. 在 `js/data.js` 里把 `image` 改成 `images/painting-01.jpg` 这样的路径。

**画面显示原则**：卡片占位固定为**正方形**，图片按自身真实比例等比缩放居中显示，**不变形、不裁切**，正方形内没被覆盖的地方用背景色填充。所以无论换什么尺寸的画（横幅、竖幅、30×60 长条），页面布局都完全不变，无需任何配置。拍照仍建议正面自然光、别用滤镜和闪光灯。

首页大图（hero）用的是 `images/artwork-2.svg`，单独在 `index.html` 里写死，建议换成你最满意、适合横幅的作品。

字段说明都在 `data.js` 顶部的注释里。`price` 留空（写成 `''`）就显示"价格面议"。

## 三、发布上线（免费）

### 方案 A：Cloudflare Pages（推荐，国内访问相对稳）

**第一次部署（网页上传，最简单）**

1. 打开 https://dash.cloudflare.com 并登录。
2. 左侧菜单 **Workers & Pages** → **Create** → **Pages** 标签 → **Upload assets**。
3. 项目名填英文小写，例如 `david-oil-paintings`（这会成为网址的一部分）。
4. 上传时把 `oil-painting-site` **文件夹里的全部内容**拖进上传框（即 `index.html`、`css/`、`js/`、`images/` 这几项），确保 `index.html` 在根目录。
   - 常见坑：如果连文件夹一起拖进去，网址会变成 `xxx.pages.dev/oil-painting-site/`，页面会找不到样式和图片。
5. 构建命令和输出目录**全部留空**（纯静态站不需要构建）。
6. 点 **Deploy**，等几十秒，得到访问网址。
   - 新版 Cloudflare 把 Pages 合并进了 Workers，新项目可能给 `https://xxx.pages.dev`，也可能给 `https://xxx.your-account.workers.dev`（带账号名，更长）。**两者都正常**，都说明部署成功。
   - 如果从中国大陆打开时出现 `ERR_CONNECTION_TIMED_OUT`，这不是站点挂了——用第三方检测（如 downforeveryoneorjustme.com）会显示 "It's just you, site is up"。这是国内网络访问 Cloudflare 免费域名的常见问题，海外买家不受影响。自己要看效果可以换手机流量或代理；要长期稳定国内访问，则需绑定自己的域名并使用国内可解析的线路。

**以后更新作品（关键：不能只改单个文件，要重新上传整个文件夹）**

Cloudflare 不支持在线替换某一个文件，每次改动都要重新上传完整文件夹，生成一次新部署，网址不变。

- **如果你的网址是 `xxx.pages.dev`**（Pages 项目）：
  进入项目 → **Deployments** → **Create a new deployment** → 重新拖入整个文件夹内容 → Deploy。想先测试可选 Preview，没问题再转 Production。

- **如果你的网址是 `xxx.你的账号.workers.dev`**（Workers 静态资产项目，新版默认）：
  Dashboard 里没有一个干净的"重新上传文件夹"按钮，用命令行最省事。在 `oil-painting-site` 目录下执行：

  ```bash
  npx wrangler login
  npx wrangler deploy
  ```

  第一次会跳浏览器授权账号；之后每次改完文件，只跑 `npx wrangler deploy` 就行。如果提示找不到项目配置，先跑一次 `npx wrangler init` 生成配置文件，或改用 `npx wrangler pages deploy . --project-name=你的项目名`。

### 方案 B：Cloudflare Pages + GitHub 自动部署（改一次，以后最省事）

**适合谁**：不想每次都用电脑重传文件夹。配置一次后，在 GitHub 网页版改 `data.js` 或上传新图，Cloudflare 会自动重新部署，网址不变。

**前提**：GitHub 网页能打开（国内时好时坏，打不开的时候用方案 A 的电脑直传兜底）。

**第一次配置**

1. 打开 https://github.com 登录 → 右上角 **+** → **New repository**。
2. 仓库名填英文小写，例如 `david-oil-paintings`；选 **Public**；**不要**勾选 "Add a README file"；点 **Create repository**。
3. 在新建好的仓库页面，点那行小字 **uploading an existing file** → 把 `oil-painting-site` **文件夹里的内容**全选拖进去（`index.html`、`css/`、`js/`、`images/`、`README.md`），点 **Commit changes**。
   - 注意：传的是文件夹里的内容，不是文件夹本身。
4. 回到 Cloudflare Dashboard，从左侧 **Workers & Pages** 主页开始（不要点任何旧项目/旧链接，否则会看到 "Worker xxx 不存在" 的报错）。点 **Create** → **Pages** 标签 → **Connect to Git**。
   - 新版界面把 Workers 放在最显眼的位置。如果页面上找不到 Pages，看屏幕底部那行灰色小字 **Looking to deploy Pages? Get started**，点那个链接进 Pages。
5. 弹出 GitHub 登录后完成授权 → 在仓库列表里选中刚建的 `david-oil-paintings` → 点 **Install & Authorize** → **Begin setup**。
6. 构建设置：**Framework preset** 选 None，**Production branch** 填 `main`，**Build command** 留空，**Build output directory** 填 `/`（根目录下就是 `index.html`）。
7. 点 **Save and Deploy**，等一两分钟，得到 `https://david-oil-paintings.pages.dev` 这样的新网址。打开确认页面样式和图片都正常。

**以后怎么更新（这是这个方案的价值）**

- 改文字/价格：打开 GitHub 仓库 → 点 `js/data.js` → 点铅笔图标 **Edit** → 改完拉到页面底部点 **Commit changes** → Cloudflare 几分钟内自动更新，网址不变。
- 换作品图：在仓库里点进 `images/` → **Add file** → **Upload files** → 传新图 → Commit。记得同步改 `data.js` 里对应的 `image` 路径。
- 手机上也能做：GitHub 网页版在手机浏览器里改文件、提交都行。

**注意**

- 这会新建一个 `pages.dev` 项目，和之前那个 `workers.dev` 是两个独立的站。对外只用其中一个网址就行，别两边都挂。
- `pages.dev` 是经典 Pages，Git 自动部署就是为它设计的；`workers.dev` 是 Workers 静态资产，更新方式不同（见方案 A）。所以走这条路等于换到 `pages.dev`。

### 方案 C：GitHub Pages（备用，国内访问不太稳）

1. 新建仓库，把文件夹内容推上去。
2. Settings → Pages → Source 选 main 分支。
3. 得到 `用户名.github.io/仓库名` 的网址。

### 绑定自己的域名（可选）

在 Cloudflare 或域名服务商买一个域名（如 `yourname.art`，一年约 $10-20），在平台的 Custom Domain 里绑定即可，证书自动签发。

## 四、收款怎么接

这个站是"询价制"，不是购物车——原作是非标品，买家先问、你再报价和收运费，更符合艺术品交易习惯。

- **询价**：表单和"咨询这幅作品"按钮会自动打开买家邮件客户端，预填好作品信息，发到你的邮箱。
- **收款**：填 `SITE.paypalMe`（PayPal.me 链接）就会显示付款入口。国内收款建议用 PayPal 或万里汇（WorldFirst）/ Payoneer 结汇。
- **没有 PayPal**：把 `paypalMe` 留空，那一栏会自动隐藏，只留邮件询价。

## 五、让海外买家找到你

站点上线只是第一步，接下来：

1. **Google Search Console** 提交网址，让作品页被搜到。
2. 图片文件名改成英文关键词，如 `abstract-blue-oil-painting.jpg`，Alt 文本也用英文。
3. Instagram / Pinterest 发创作过程，链接指向这个站。
4. 每幅作品在 Saatchi Art 等平台也挂一份，详情页引导藏家来你的站直接交易（省掉 40% 佣金）。

## 文件结构

```
oil-painting-site/
├── index.html          首页（单页，含作品/关于/联系）
├── css/style.css       样式
├── js/data.js          ★ 你主要改这个：作品数据和文案
├── js/app.js           交互逻辑（一般不用动）
├── images/             作品图片（换成你的）
└── README.md           本说明
```
