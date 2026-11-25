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

图片怎么放：
- 把你的作品照片存进 `images/` 目录（建议 jpg，长边 1600-2000 像素，单张压到 500KB 以内）。
- 把 `image` 改成 `images/你的文件名.jpg`。
- 第一张 `artwork-1.svg` 同时用在了首页大图，建议把那张也换成你最满意的作品。

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
6. 点 **Deploy**，等几十秒，得到 `https://david-oil-paintings.pages.dev` 这样的网址。

**以后更新作品（同样简单）**

进入你的项目 → **Deployments** → **Create a new deployment** → 重新上传修改后的文件夹内容即可，网址不变。

**备选：命令行部署（适合频繁更新）**

在 `oil-painting-site` 目录下执行：

```bash
npx wrangler login
npx wrangler pages deploy . --project-name=david-oil-paintings
```

第一次会跳转浏览器授权你的 Cloudflare 账号。之后每次改完文件，只跑第二条命令就行。

### 方案 B：GitHub Pages

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
