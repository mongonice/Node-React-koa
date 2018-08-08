/**
 * 渲染 index 首页
 */
// module.exports = {

//     async indexPage ( ctx ) {
//       const title = 'index page'
//       await ctx.render('index', {
//             title
//         })
//     }
  
//   }

module.exports = async ( ctx ) => {
  const title = 'home'
  await ctx.render('index', {
    title
  })
}