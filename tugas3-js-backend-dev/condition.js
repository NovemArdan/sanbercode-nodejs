const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('masukkan angka nilai: ', (input) => {
    let number = parseInt(input);
    if (number % 2 === 0) {
        console.log("angka genap");
    } else {
        console.log("angka ganjil");
    }

    rl.question('masukkan angka hari (1-7): ', (dayNumber) => {
        dayNumber = parseInt(dayNumber);
        switch(dayNumber) {
            case 1: console.log("senin"); break;
            case 2: console.log("selasa"); break;
            case 3: console.log("rabu"); break;
            case 4: console.log("kamis"); break;
            case 5: console.log("jumat"); break;
            case 6: console.log("sabtu"); break;
            case 7: console.log("minggu"); break;
            default: console.log("angka tidak sesuai"); break;
        }
        rl.close();
    });
});
