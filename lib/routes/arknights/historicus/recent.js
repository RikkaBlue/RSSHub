const got = require('@/utils/got');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: `https://terra-historicus.hypergryph.com/api/recentUpdate`,
        headers: {
            Referer: `https://terra-historicus.hypergryph.com/`,
        },
    });

    const data = response.data.data;

    ctx.state.data = {
        // 源标题
        title: `泰拉记事部`,
        // 源链接
        link: `https://terra-historicus.hypergryph.com/`,
        // 源说明
        description: `记下罗德岛干员生活的每一个瞬间！`,
        // 遍历此前获取的数据
        item: data.map((item) => ({
            // 文章标题
            title: item.title,
            // 文章正文
            description: `泰拉记事部更新啦！<br>${item.title}<br>${item.subtitle}<br>${item.episodeShortTitle}<br><image src="${item.coverUrl}"><url>${item.coverUrl}</url> </image>`,
            // 文章发布时间
            pubDate: parseDate(`${item.date}`),
            // 文章链接
            link: `https://terra-historicus.hypergryph.com/comic/${item.comicCid}/episode/${item.episodeCid}`,
        })),
    };
};
