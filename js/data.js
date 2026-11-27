/* ============================================================
   作品数据 —— 你只需要修改这个文件就能换上自己的作品
   ============================================================
   每幅画一个对象，字段说明：
   image      图片路径（放到 images/ 目录，或填完整网址）
   titleZh    中文标题
   titleEn    英文标题
   year       创作年份
   medium     材质，如 "布面油画 / Oil on canvas"
   sizeCm     厘米尺寸，如 "60 × 80 cm"
   sizeIn     英寸尺寸，如 "24 × 32 in"
   ratio      可选：画面宽高比，如 "30 / 60"（宽30高60）。填了就按真实比例完整显示、不裁切；不填则默认 4:5
   price      标价（美元数字），留空则不显示价格
   category   分类：abstract / landscape / stilllife / portrait
   descZh     中文介绍（一两句话讲灵感或故事）
   descEn     英文介绍
   ============================================================ */

const SITE = {
  artistNameZh: '大卫和维纳斯',
  artistNameEn: 'David and Venus',
  taglineZh: '原创布面油画 · 手工绘制',
  taglineEn: 'Original oil paintings, hand-painted on canvas',
  bioZh: '在这里写一段 2-4 句的艺术家简介：你的背景、创作主题、风格来源。海外藏家很吃「故事」这一套，别只写履历。',
  bioEn: 'Write a short 2-4 sentence artist bio here: your background, themes, and influences. Collectors respond to a story, not just a résumé.',
  email: 'davidandvenus@hotmail.com',
  paypalMe: 'https://www.paypal.me/yourname',
  whatsapp: '',
  instagram: '',
  locationZh: '中国',
  locationEn: 'China',
  shippingZh: '作品从中国直接寄出，通过 DHL 艺术品专线运输，运费按目的地另计。带框作品使用木箱包装并附熏蒸证明。',
  shippingEn: 'Works ship directly from China via DHL art logistics. Shipping is quoted by destination. Framed works are crated with ISPM-15 certification.'
};

const ARTWORKS = [
  {
    image: 'images/peach.jpg',
    titleZh: '树上的桃子',
    titleEn: 'Peach on the tree',
    year: '2021',
    medium: '布面油画 / Oil on canvas',
    sizeCm: '30 × 60 cm',
    sizeIn: '11.81 × 23.62',
    price: 680,
    category: 'landscape',
    descZh: '本幅取竖狭构图，桃枝自左上入画，深紫褐枝干斜贯画面中轴，分出疏密。桃实三两颗错落枝间，近者受光面施胭脂红，背光处转以淡黄月白，最下一颗红尤浓重，稳稳压住下半幅。桃叶狭长，向光处敷黄绿，背光处沉入墨绿，前后层叠，筋脉不事细描而以笔触写出。背景以暖赭色虚化铺陈，光斑斑驳，明暗相生，笔意松散而收放有度。全幅于写实中见写意，设色清丽温润，留住夏日午后的晴光。右下角署款，附 “2021.8” 纪年。',
    descEn: 'Painted in a tall, narrow format, the picture opens with a peach branch entering from the upper left, its deep purple-brown limb cutting diagonally through the central axis and setting the spacing of the whole. A few peaches are set at intervals along the branch: the nearer fruit carries rouge red on its lit side, passing into pale yellow and moon white where the light falls away, while the lowest peach, deepest in tone, anchors the lower half of the canvas. The peach leaves are slender — yellow-green where the sun reaches them, sunk to a dark green in shadow — layered one behind another, their veins laid in with the brush rather than finely delineated. The background dissolves into a warm ochre ground, its dappled light and shadow answering one another, the handling loose yet restrained. Throughout, realism gives way to a painterly ease; the colour is clear and gently warm, holding the bright light of a summer afternoon. Signed lower right and dated "2021.8".'
  },
  {
    image: 'images/artwork-3.svg',
    titleZh: '静谧生长',
    titleEn: 'Quiet Growth',
    year: '2024',
    medium: '布面油画 / Oil on canvas',
    sizeCm: '60 × 80 cm',
    sizeIn: '24 × 32 in',
    price: 580,
    category: 'stilllife',
    descZh: '以绿色为主的静物，探讨日常物件里被忽略的安静时刻。',
    descEn: 'A green-toned still life exploring the overlooked quiet moments in ordinary objects.'
  },
  {
    image: 'images/artwork-4.svg',
    titleZh: '城市构成',
    titleEn: 'Urban Composition',
    year: '2025',
    medium: '布面油画 / Oil on canvas',
    sizeCm: '90 × 70 cm',
    sizeIn: '36 × 28 in',
    price: 650,
    category: 'abstract',
    descZh: '用几何色块拆解城市印象，红、金、灰的碰撞带有现代主义的克制。',
    descEn: 'Geometric planes deconstruct an impression of the city, with a modernist restraint in red, gold and grey.'
  },
  {
    image: 'images/artwork-5.svg',
    titleZh: '余晖',
    titleEn: 'Afterglow',
    year: '2024',
    medium: '布面油画 / Oil on canvas',
    sizeCm: '70 × 90 cm',
    sizeIn: '28 × 36 in',
    price: 620,
    category: 'portrait',
    descZh: '柔和的粉调记录光线消逝前的最后一刻，情绪安静而私人。',
    descEn: 'Soft pink tones hold the last moment before the light fades — quiet and deeply personal.'
  },
  {
    image: 'images/artwork-6.svg',
    titleZh: '湖畔晨雾',
    titleEn: 'Morning Mist on the Lake',
    year: '2025',
    medium: '布面油画 / Oil on canvas',
    sizeCm: '100 × 80 cm',
    sizeIn: '40 × 32 in',
    price: 780,
    category: 'landscape',
    descZh: '横向铺开的水岸场景，冷绿与暖金过渡，适合挂在沙发上方。',
    descEn: 'A panoramic waterscape shifting between cool greens and warm gold, made for the wall above a sofa.'
  }
];

const I18N = {
  zh: {
    navWorks: '作品', navAbout: '关于', navContact: '联系',
    heroBadge: '原创油画 · 手工绘制', heroTitle: '把安静留在画布上',
    heroSub: '每一幅都是独一份的手绘原作，带着笔触的温度和时间的痕迹。',
    heroCta: '浏览作品', heroCta2: '了解创作',
    worksTitle: '作品集', worksSub: 'Selected works',
    filterAll: '全部', filterAbstract: '抽象', filterLandscape: '风景', filterStilllife: '静物', filterPortrait: '人物',
    aboutTitle: '关于艺术家', aboutSub: 'About the artist',
    contactTitle: '联系与购买', contactSub: 'Enquiries',
    contactLead: '对某幅作品感兴趣，或想定制一幅专属油画？直接发送邮件或填写下方表单，我通常在 48 小时内回复。',
    formName: '你的名字', formEmail: '电子邮箱', formMessage: '想说的话', formSubmit: '发送询价',
    formNote: '表单会打开你的邮件客户端，请发送后确认邮件已成功发出。',
    directEmail: '或直接发邮件至', shippingTitle: '运输与付款',
    paypal: '通过 PayPal 付款', paypalNote: '（付款前请先邮件确认作品与运费）',
    currency: '美元', inquire: '咨询这幅作品', viewDetails: '查看详情',
    footerRights: '保留所有权利', backTop: '回到顶部',
    size: '尺寸', year: '年份', medium: '材质', price: '价格', priced: '价格面议',
    close: '关闭'
  },
  en: {
    navWorks: 'Works', navAbout: 'About', navContact: 'Contact',
    heroBadge: 'Original oil paintings · Hand-painted', heroTitle: 'Quiet moments, kept on canvas',
    heroSub: 'Every piece is a one-of-a-kind hand-painted original, carrying the warmth of the brush and the trace of time.',
    heroCta: 'View works', heroCta2: 'The artist',
    worksTitle: 'Selected works', worksSub: 'Portfolio',
    filterAll: 'All', filterAbstract: 'Abstract', filterLandscape: 'Landscape', filterStilllife: 'Still life', filterPortrait: 'Portrait',
    aboutTitle: 'About the artist', aboutSub: 'About',
    contactTitle: 'Enquiries & purchase', contactSub: 'Get in touch',
    contactLead: 'Interested in a piece, or want a custom painting made for you? Send an email or use the form below. I usually reply within 48 hours.',
    formName: 'Your name', formEmail: 'Email address', formMessage: 'Your message', formSubmit: 'Send enquiry',
    formNote: 'This form opens your email app — please make sure the message is sent.',
    directEmail: 'Or email me directly at', shippingTitle: 'Shipping & payment',
    paypal: 'Pay with PayPal', paypalNote: '(confirm the work and shipping with me by email first)',
    currency: 'USD', inquire: 'Enquire about this work', viewDetails: 'View details',
    footerRights: 'All rights reserved', backTop: 'Back to top',
    size: 'Size', year: 'Year', medium: 'Medium', price: 'Price', priced: 'Price on request',
    close: 'Close'
  }
};
