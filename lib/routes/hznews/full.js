const parser = require('@/utils/rss-parser');

module.exports = async (ctx) => {
    const feedOrigin = await parser.parseURL('https://h5.newaircloud.com/api/rss?sid=hzxw&rssSource=1');
    const feedOthers = await parser.parseURL('https://h5.newaircloud.com/api/rss?sid=hzxw&rssSource=0');
    const title = '杭州新闻';
    const link = 'https://h5.newaircloud.com';

    const itemsOrigin = await Promise.all(
        feedOrigin.items.map(async (item) => {
            const single = {
                title: item.title,
                description: item.content,
                pubDate: item.pubDate,
                link: item.link,
            };
            return Promise.resolve(single);
        })
    );

    const itemsOthers = await Promise.all(
        feedOthers.items.map(async (item) => {
            const single = {
                title: item.title,
                description: item.content,
                pubDate: item.pubDate,
                link: item.link,
            };
            return Promise.resolve(single);
        })
    );

    const items = itemsOrigin.concat(itemsOthers);

    ctx.state.data = {
        title,
        link,
        description: '杭州新闻 - 独特韵味 别样精彩 世界名城',
        image: {
            url: 'https://oss.newaircloud.com/global/user/hzxw/mobile/img/icon.png',
        },
        item: items,
    };
};
