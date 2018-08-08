/**
 * 渲染 detail 页面
 */
// module.exports = {

//     async indexPage (ctx) {
//         const title = 'detail'
//         await ctx.render('detail', {
//             title
//         })
//     }
// }

module.exports = async ( ctx ) => {
    const title = 'detail'
    await ctx.render('detail', {
      title
    })
  }