// 拼豆图纸数据
// js/data.js
const beadPatterns = [
    {
        id: 1,
        title: '水豚噜噜',
        category: 'cartoon',
        difficulty: 'beginner',
        views: 800,
        downloads: 650,
        liked: false,
        favorited: false,
        beadsCount: 300,
        colors: 5,
        image: 'images/1.jpg',
        keywords: ["猫", "猫咪", "宠物", "动物", "可爱", "简单", "新手", "kitty", "cat", "卡通猫"]
    },
    {
        id: 2,
        title: '粉色labubu',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 980,
        downloads: 720,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 4,
        image: 'images/3.jpg'
        // 已删除 materials 字段
    },
    {
        id: 3,
        title: '点赞狗狗',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1560,
        downloads: 920,
        liked: false,
        favorited: false,
        beadsCount: 200,
        colors: 6,
        image: 'images/4.jpg'
        // 已删除 materials 字段
    },
    {
        id: 4,
        title: 'Hello Kitty懒洋洋',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 2100,
        downloads: 1500,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 3,
        image: 'images/5.jpg'
    },
    {
        id: 5,
        title: '鼠鼠',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/6.jpg'
        // 已删除 materials 字段
    },
    {
        id: 6,
        title: '丑鱼kitty',
        category: 'plant',
        difficulty: 'advanced',
        // 已删除 author 字段
        views: 1450,
        downloads: 950,
        liked: false,
        favorited: false,
        beadsCount: 350,
        colors: 6,
        image: 'images/7.jpg'
        // 已删除 materials 字段
    },
    {
        id: 7,
        title: '灰色的LABUBU',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 750,
        downloads: 600,
        liked: false,
        favorited: false,
        beadsCount: 160,
        colors: 5,
        image: 'images/2.jpg'
        // 已删除 materials 字段
    },
    {
        id: 8,
        title: '浇水kitty',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 980,
        downloads: 720,
        liked: true,
        favorited: false,
        beadsCount: 150,
        colors: 4,
        image: 'images/8.jpg'
        // 已删除 materials 字段
    },
    {
        id: 9,
        title: '乌萨奇',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1560,
        downloads: 920,
        liked: false,
        favorited: false,
        beadsCount: 220,
        colors: 7,
        image: 'images/9.jpg'
        // 已删除 materials 字段
    },
    {
        id: 10,
        title: 'kitty',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 2100,
        downloads: 1500,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 3,
        image: 'images/10.jpg'
        // 已删除 materials 字段
    },
    {
        id: 11,
        title: '企鹅',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 100,
        colors: 4,
        image: 'images/11.jpg'
        // 已删除 materials 字段
    },
    {
        id: 12,
        title: '星露谷',
        category: 'game',
        difficulty: 'advanced',
        // 已删除 author 字段
        views: 1450,
        downloads: 950,
        liked: false,
        favorited: false,
        beadsCount: 350,
        colors: 6,
        image: 'images/12.jpg'
        // 已删除 materials 字段
    },
    {
        id: 13,
        title: '不要动农民的行李箱',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 750,
        downloads: 600,
        liked: false,
        favorited: false,
        beadsCount: 160,
        colors: 5,
        image: 'images/13.jpg'
        // 已删除 materials 字段
    },
    {
        id: 14,
        title: '恶魔kitty',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 980,
        downloads: 720,
        liked: true,
        favorited: false,
        beadsCount: 150,
        colors: 4,
        image: 'images/14.jpg'
        // 已删除 materials 字段
    },
    {
        id: 15,
        title: '白熊',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1560,
        downloads: 920,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 7,
        image: 'images/15.jpg'
        // 已删除 materials 字段
    },
    {
        id: 16,
        title: '小金鱼',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 2100,
        downloads: 1500,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 3,
        image: 'images/16.jpg'
        // 已删除 materials 字段
    },
    {
        id: 17,
        title: '玉贵狗',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/17.jpg'
        // 已删除 materials 字段
    },
    {
        id: 18,
        title: '鸭子',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 750,
        downloads: 600,
        liked: false,
        favorited: false,
        beadsCount: 160,
        colors: 5,
        image: 'images/18.jpg'
        // 已删除 materials 字段
    },
    {
        id: 19,
        title: '大眼鼠',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 980,
        downloads: 720,
        liked: true,
        favorited: false,
        beadsCount: 150,
        colors: 4,
        image: 'images/19.jpg'
        // 已删除 materials 字段
    },
    {
        id: 20,
        title: '莲花kitty',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1560,
        downloads: 920,
        liked: false,
        favorited: false,
        beadsCount: 220,
        colors: 7,
        image: 'images/20.jpg'
        // 已删除 materials 字段
    },
    {
        id: 21,
        title: '睡觉',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 2100,
        downloads: 1500,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 3,
        image: 'images/21.jpg'
        // 已删除 materials 字段
    },
    {
        id: 22,
        title: '白熊',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/22.jpg'
        // 已删除 materials 字段
    },
    {
        id: 23,
        title: 'kitty',
        category: 'cartoon',
        difficulty: 'advanced',
        // 已删除 author 字段
        views: 1450,
        downloads: 950,
        liked: false,
        favorited: false,
        beadsCount: 350,
        colors: 6,
        image: 'images/23.jpg'
        // 已删除 materials 字段
    },
    {
        id: 24,
        title: '深情兔子',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 750,
        downloads: 600,
        liked: false,
        favorited: false,
        beadsCount: 160,
        colors: 5,
        image: 'images/24.jpg'
        // 已删除 materials 字段
    },
    {
        id: 25,
        title: '白熊币',
        category: 'cartoon',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 980,
        downloads: 720,
        liked: true,
        favorited: false,
        beadsCount: 150,
        colors: 4,
        image: 'images/25.jpg'
        // 已删除 materials 字段
    },
    {
        id: 26,
        title: '星之卡比',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1560,
        downloads: 920,
        liked: false,
        favorited: false,
        beadsCount: 220,
        colors: 7,
        image: 'images/26.jpg'
        // 已删除 materials 字段
    },
    {
        id: 27,
        title: '星之卡比',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 2100,
        downloads: 1500,
        liked: true,
        favorited: false,
        beadsCount: 200,
        colors: 3,
        image: 'images/27.jpg'
        // 已删除 materials 字段
    },
    {
        id: 28,
        title: '睡觉卡比',
        category: 'cartoon',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/28.jpg'
        // 已删除 materials 字段
    },
    {
        id: 29,
        title: '安琪拉',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0005.JPG'
        // 已删除 materials 字段
    },
    {
        id: 30,
        title: '西施',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/55.jpg'
        // 已删除 materials 字段
    },
    {
        id: 31,
        title: '马嘉祺',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0014.JPG'
        // 已删除 materials 字段
    },
    {
        id: 32,
        title: '宋亚轩',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0015.jpg'
        // 已删除 materials 字段
    },
    {
        id: 33,
        title: '贺峻霖',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0016.JPG'
        // 已删除 materials 字段
    },
    {
        id: 34,
        title: '刘耀文',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0017.jpg'
        // 已删除 materials 字段
    },
    {
        id: 35,
        title: '曹恩齐',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0018.JPG'
        // 已删除 materials 字段
    },
    {
        id: 36,
        title: '周俊炜',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9951.jpg'
        // 已删除 materials 字段
    },
    {
        id: 37,
        title: '文韬',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9948.JPG'
        // 已删除 materials 字段
    },
    {
        id: 38,
        title: '齐思均',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9949.jpg'
        // 已删除 materials 字段
    },
    {
        id: 39,
        title: '罗予彤',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9950.jpg'
        // 已删除 materials 字段
    },
    {
        id: 40,
        title: '李晋晔',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9954.JPG'
        // 已删除 materials 字段
    },
    {
        id: 41,
        title: '邵明明',
        category: 'idol',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9955.jpg'
        // 已删除 materials 字段
    },
    {
        id: 42,
        title: '第五人格-C',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9918.JPG'
        // 已删除 materials 字段
    },
    {
        id: 43,
        title: '第五人格-B',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9919.jpg'
        // 已删除 materials 字段
    },
    {
        id: 44,
        title: '第五人格-A',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9920.JPG'
        // 已删除 materials 字段
    },
    {
        id: 45,
        title: '第五人格-S',
        category: 'game',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9921.jpg'
        // 已删除 materials 字段
    },
    {
        id: 46,
        title: '第五人格',
        category: 'tect',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9923.jpg'
        // 已删除 materials 字段
    },
    {
        id: 47,
        title: '大获全胜',
        category: 'tect',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9922.jpg'
        // 已删除 materials 字段
    },
    {
        id: 48,
        title: '院',
        category: 'tect',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_9941.jpg'
        // 已删除 materials 字段
    },
    {
        id: 49,
        title: '院人姓名条（英文）',
        category: 'tect',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9947.jpg',
    },
                {
        id: 50,
        title: '院人姓名条（英文）',
        category: 'tect',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9946.jpg',
    },
        {
        id: 51,
        title: '院人姓名条（英文）',
        category: 'tect',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_9943.jpg',
        },
        {
        id: 52,
        title: '哦',
        category: 'tect',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0094.jpg',
       
    },
        {
        id: 53,
        title: '2026',
        category: 'tect',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0093.jpg',
    },
        {
        id: 54,
        title: '2026',
        category: 'tect',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0092.jpg',
    },
                {
        id: 55,
        title: '2026',
        category: 'tect',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0091.jpg',
    },
        {
        id: 56,
        title: '2026',
        category: 'tect',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0089.jpg',
    },
    {
        id: 57,
        title: '绿天鹅',
        category: 'animal',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 350,
        colors: 4,
        image: 'images/IMG_0125.JPG'
        // 已删除 materials 字段
    },
    {
        id: 58,
        title: '绿天鹅',
        category: 'animal',
        difficulty: 'intermediate',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 350,
        colors: 4,
        image: 'images/IMG_0126.jpg'
        // 已删除 materials 字段
    },
    {
        id: 59,
        title: '螃蟹',
        category: 'animal',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0129.jpg'
        // 已删除 materials 字段
    },
    {
        id: 60,
        title: '章鱼',
        category: 'animal',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0130.jpg'
        // 已删除 materials 字段
    },
    {
        id: 61,
        title: '海豚',
        category: 'animal',
        difficulty: 'beginner',
        // 已删除 author 字段
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0131.jpg'
        // 已删除 materials 字段
    },
    {
        id: 62,
        title: '珍珠蚌',
        category: 'animal',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0132.jpg',
    },
                {
        id: 63,
        title: '乌龟',
        category: 'animal',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0133.jpg',
    },
        {
        id: 64,
        title: '金鱼',
        category: 'animal',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 180,
        colors: 4,
        image: 'images/IMG_0134.jpg',
        },
        {
        id: 65,
        title: '海马',
        category: 'animal',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0135.jpg',
       
    },
        {
        id: 66,
        title: '海星',
        category: 'animal',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0136.jpg',
    },
        {
        id: 67,
        title: '开门大吉',
        category: 'festival',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 250,
        colors: 4,
        image: 'images/IMG_0116.jpg',
    },
                {
        id: 68,
        title: 'chiikawa迎春',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 11191,
        colors: 4,
        image: 'images/IMG_0117.jpg',
    },
        {
        id: 69,
        title: '对联',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 4420,
        colors: 4,
        image: 'images/IMG_0118.jpg',
    },
    {
        id: 70,
        title: '财神新',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 1028,
        colors: 4,
        image: 'images/IMG_0119.jpg',
    },
    {
        id: 71,
        title: '粉色小马',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 692,
        colors: 4,
        image: 'images/IMG_0120.jpg',
    },
        {
        id: 72,
        title: '小猫圣诞花环',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 925,
        colors: 4,
        image: 'images/IMG_0121.jpg',
    },
    {
        id: 73,
        title: '金',
        category: 'festival',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 250,
        colors: 4,
        image: 'images/IMG_0122.jpg',
    },
    {
        id: 74,
        title: '红包',
        category: 'festival',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 120,
        colors: 4,
        image: 'images/IMG_0123.jpg',
    },
        {
        id: 75,
        title: '圣诞主题',
        category: 'festival',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 7546,
        colors: 4,
        image: 'images/IMG_0124.jpg',
    },
    {
        id: 76,
        title: '学习通',
        category: 'abstract',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 760,
        colors: 4,
        image: 'images/IMG_0109.jpg',
    },
    {
        id: 77,
        title: '拿鞭子小黄豆人',
        category: 'abstract',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 692,
        colors: 4,
        image: 'images/IMG_0108.jpg',
    },
        {
        id: 78,
        title: '被打黄豆人',
        category: 'abstract',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 925,
        colors: 4,
        image: 'images/IMG_0107.jpg',
    },
    {
        id: 79,
        title: '申公豹',
        category: 'abstract',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 741,
        colors: 4,
        image: 'images/IMG_0106.jpg',
    },
    {
        id: 80,
        title: '邓超',
        category: 'abstract',
        difficulty: 'advanced',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 10939,
        colors: 4,
        image: 'images/IMG_0105.jpg',
    },
        {
        id: 81,
        title: '小丑',
        category: 'abstract',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 925,
        colors: 4,
        image: 'images/IMG_0104.jpg',
    },
    {
        id: 82,
        title: '杀马特kitty',
        category: 'abstract',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 694,
        colors: 4,
        image: 'images/IMG_0103.jpg',
    },
        {
        id: 83,
        title: '我鸟都不鸟你',
        category: 'abstract',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 1837,
        colors: 4,
        image: 'images/IMG_0097.jpg',
    },
    {
        id: 84,
        title: '?',
        category: 'abstract',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 398,
        colors: 4,
        image: 'images/IMG_0095.jpg',
    },
    {
        id: 85,
        title: '亲嘴篮脸',
        category: 'abstract',
        difficulty: 'beginner',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 1482,
        colors: 4,
        image: 'images/IMG_0098.jpg',
    },
        {
        id: 86,
        title: 'ok蓝脸',
        category: 'abstract',
        difficulty: 'intermediate',
        views: 1890,
        downloads: 1300,
        liked: false,
        favorited: false,
        beadsCount: 1848,
        colors: 4,
        image: 'images/IMG_0100.jpg',
    },
];
// 导出数据供其他文件使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { beadPatterns };
}