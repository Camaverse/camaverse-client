let broadcasters = [];
import tagList from './tags'

for (let i = 1; i <= 100; i++){
    let _tmp = {
        username: `Username ${i}`,
        slug: `username-${i}`,
        tags: [tagList[Math.floor(Math.random()*tagList.length)]],
        topic: `here is my topic ${i}`
    }

    broadcasters.push(_tmp);
}

export default { broadcasters }