let broadcasters = [];
import genderList from './genders';
import showList from './shows';
import tagList from './tags';

Array.prototype.getRandom = function () {
    return this[Math.floor(Math.random() * this.length)]
}

for (let i = 1; i <= 100; i++){
    let _tmp = {
        gender: genderList.getRandom(),
        show: showList.getRandom(),
        slug: `username-${i}`,
        tags: [tagList.getRandom()],
        topic: `here is my topic ${i}`,
        username: `Username ${i}`
    }

    broadcasters.push(_tmp);
}

export default { broadcasters }