// function delay(time) {
//     let promise;

//     promise = new Promise(function (resolve, err) {
//         setTimeout(function () {
//             resolve(time);
//         }, time)
//     });

//     return promise;
// }

// async function main() {

// };

// main();



// (function main(arg) {
//     delay(1000)
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(500);
//         })
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(100);
//         })
//         .then(function (data) {
//             console.log(`delay = ${data}`);
//             return delay(100);
//         })
// }());

// async function something() {
//     console.log("this might take some time....");
//     await delay(1000);
//     console.log("done!")
// }

// something();


// function wait(ms, cb) {
//    setTimeout(cb, ms)
// }

// function main() {
//    console.log('sắp rồi...')
//    wait(2007, () => {
//      console.log('chờ tí...')
//      wait(2012, () => {
//        console.log('thêm chút nữa thôi...')
//        wait(2016, () => {
//          console.log('xong rồi đấy!')
//        })
//      })
//    })
// }

// main();
const fetch = require('node-fetch');

async function showAvatar() {

    // read our JSON
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

    // read github user
    let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
    let githubUser = await githubResponse.json();

    // show the avatar
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    // wait 3 seconds
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));

    img.remove();

    return githubUser;
}

showAvatar();