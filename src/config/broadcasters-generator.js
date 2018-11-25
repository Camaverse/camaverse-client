let broadcasters = [];
import genderList from './genders';
import showList from './shows';
import tagList from './tags';

const rando = () => Math.floor(Math.random() * 19) + 1
const safeForWork = process.env.VUE_APP_SAFE_FOR_WORK || false;

Array.prototype.getRandom = function (amt = null) {
    let _tmpArr = this.join("|").split("|")
    let ret = [];
    for (let i = 0; i < Math.max(amt,1); i++){
        let index = Math.floor(Math.random() * _tmpArr.length);
        ret.push(_tmpArr[index])
        _tmpArr.splice(index, 1);
    }

    if (amt === null) return ret[0];
    return ret;
}

for (let i = 1; i <= 100; i++){

    const gender = genderList.getRandom();
    const imgSite = gender === 'm' ? 'hunkholder' : 'babeholder';

    let _tmp = {
        gender: gender,
        show: showList.getRandom(),
        slug: `username-${i}`,
        tags: tagList.getRandom(4),
        thumb: `http://${imgSite}.pixoil.com/img/300/100/?${i}`,
        topic: `here is my topic ${i}`,
        username: `Username ${i}`
    }

    broadcasters.push(_tmp);
}

console.log(broadcasters)

export default { broadcasters }

