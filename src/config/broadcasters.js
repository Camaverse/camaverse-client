let broadcasters = [];
import genderList from './genders';
import showList from './shows';
import tagList from './tags';

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
    let _tmp = {
        gender: genderList.getRandom(),
        show: showList.getRandom(),
        slug: `username-${i}`,
        tags: tagList.getRandom(4),
        topic: `here is my topic ${i}`,
        username: `Username ${i}`
    }

    broadcasters.push(_tmp);
}

export default { broadcasters }