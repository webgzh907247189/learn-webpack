let acorn = require("acorn");
console.log(acorn.parse("1 + 1"));


/**
 * sourceType值    module(不用严格模式) 、script(严格模式)
 * 
 */
// Node {
//     type: 'Program',
//     start: 0,
//     end: 5,
//     body: [ Node {
//          type: 'ExpressionStatement',
//          start: 0,
//          end: 5,
//          expression: [Node] } 
//      ],
//     sourceType: 'script' 
// }




/**
 * 编译源代码
 */
const walk = require("acorn-walk")
walk.simple(acorn.parse("let x = 10"), {
    Literal(node) {
        console.log(`Found a literal: ${node.value}`) // Found a literal: 10
    }
})