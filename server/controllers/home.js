const homePage = async (ctx) => {
    const title = '主页'

    await ctx.render('home', {
        title
    })
}

module.exports = homePage