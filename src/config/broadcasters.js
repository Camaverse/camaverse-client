let broadcasters = [];
import showList from './shows';
import tagList from './tags';

for (let i = 1; i <= 100; i++){
    let _tmp = {
        gender: '',
        show: '',
        slug: `username-${i}`,
        tags: [tagList[Math.floor(Math.random()*tagList.length)]],
        topic: `here is my topic ${i}`,
        username: `Username ${i}`
    }

    broadcasters.push(_tmp);
}

export default { broadcasters }