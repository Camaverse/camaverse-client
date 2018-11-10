let broadcasters = [];

for (let i = 1; i <= 100; i++){
    let _tmp = {
        username: `Username ${i}`,
        topic: `here is my topic ${i}`,
        slug: `username-${i}`
    }

    broadcasters.push(_tmp);
}

export default { broadcasters }