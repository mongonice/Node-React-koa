/**
 * 处理渲染 todo页面
 */
// module.exports = {

//     async indexPage (ctx) {
//         const title = 'todo'
//         await ctx.render('todo', {
//             title
//         })
//     }
// }

module.exports = async ( ctx ) => {
    const title = 'todo'
    await ctx.render('todo', {
      title
    })
  }