import genderList from './genders'
import showList from './shows'
import tagList from './tags'
let broadcasters = []

const getRandom = function (arr, amt = null) {
  let _tmpArr = arr.join('|').split('|')
  let ret = []
  for (let i = 0; i < Math.max(amt, 1); i++) {
    let index = Math.floor(Math.random() * _tmpArr.length)
    ret.push(_tmpArr[index])
    _tmpArr.splice(index, 1)
  }

  if (amt === null) return ret[0]
  return ret
}

for (let i = 1; i <= 100; i++) {
  const gender = getRandom(genderList)
  const imgSite = gender === 'm' ? 'hunkholder' : 'babeholder'

  let _tmp = {
    gender: gender,
    show: getRandom(showList),
    slug: `username-${i}`,
    tags: getRandom(tagList, 4),
    thumb: `http://${imgSite}.pixoil.com/img/300/100/?${i}`,
    topic: `here is my topic ${i}`,
    username: `Username ${i}`
  }

  broadcasters.push(_tmp)
}

console.log(broadcasters)

export default { broadcasters }
