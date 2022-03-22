/* eslint-disable no-bitwise */
// function mulberry32(a) {
//     a |= 0; a = a + 0x6D2B79F5 | 0;
//     var t = Math.imul(a ^ a >>> 15, 1 | a);
//     t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
//     return ((t ^ t >>> 14) >>> 0) / 4294967296;
// }

const middleSquare = function (seed) {
  let result = (seed * seed * seed).toString().padStart(5, '0').slice(1, 4)
  return parseInt(result, 10)
}

/* eslint-disable no-bitwise */
// function xorShift(seed){
//   seed ^= seed << 13;
//   seed ^= seed >> 17;
//   seed ^= seed << 5;
//   let pos= (seed <0)?~seed+1: seed; //2's complement of the negative result to make all numbers positive.
//   pos= pos%10000
//   pos=pos/10000
//   if(pos===0){
//     pos=0.836
//   }
//   return pos
// }

// const toNum=function(seed){
//   let sum=0
//   for (let i = 0; i < seed.length; i += 1){
//     sum+=seed.charCodeAt(i)
//   }
//   return sum
// }

// const getNums=function(seed, num=4){
//   if(typeof seed==='string'){
//     seed=toNum(seed)
//   }
//   let arr=[]
//   for (let i = 0; i < num; i += 1){
//     let n=middleSquare(seed)
//     arr.push(n/1000)
//     seed=n
//   }
//   return arr
// }

export function generate() {
  return 'xxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const getNums = function (seed) {
  let arr = []
  for (let i = 0; i < seed.length; i += 1) {
    let num = parseInt(seed[i], 16)
    arr.push(num / 16)
  }
  return arr
}

export function pick(input, num) {
  return input[Math.floor(num * input.length)]
}
// export default { generate, getNums, pick }

// let seed=generate()
// console.log(seed,fromID(seed))
// let nums=getNums(seed,4)
// console.log(nums)
// let num=nums.pop()
// console.log(num,pick([],num))

// console.log(mulberry32(1331))
