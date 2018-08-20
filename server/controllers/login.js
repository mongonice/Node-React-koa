const loginPage = async (ctx) => {

    const title = '登录页'
    await ctx.render('login', {
        title
    })
}

module.exports = loginPage

