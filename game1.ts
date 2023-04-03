//Biến xử lý thuật toán
let min: number = 0;
let max: number = 9;
let message: string = "";
let dem: number = 1;
let k: string = '';
let flag: boolean = true;

//Biến xác định thời gian chờ
let wait: number = 1;

// Biến xử lý số vòng game tối đa
let soVong: number;

//HTML Element
const spanCount: HTMLSpanElement = <HTMLSpanElement>document.getElementById('level');
const inputNumber: HTMLInputElement = <HTMLInputElement>document.getElementById('numbers');
const btnGuess: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn-guess');
const btnReset: HTMLButtonElement = <HTMLButtonElement>document.getElementById('btn-reset');
const paraRandom: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('requirement');
const paraResult: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById('result');


//Hàm tạo ra số random
function mangRandom(len: number): number[] {
    let r: number[] = [];
    for(let i: number = 0; i < len; i++){
        r[i] = Number(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return r;
}

// Hàm kiểm tra bằng nhau
function kiemTra(random: number[], guess: string[]): boolean {
    let count: number = 0;
    for(let i: number = 0; i < random.length; i++){
        if(String((random[i])) == String(guess[i]))
            count++;
    }
    if(count == random.length)
        return true;
    else 
        return false;
}

// Biến xác định 2 mảng và thứ tự câu hỏi
let randomNumber: number[];
let guessNumber: string[];
spanCount.innerHTML = String(dem+1);

// Hàm tạo giao diện chuỗi random
function createString(): void {
    k ='';
    for(let i: number =0; i< randomNumber.length; i++) {
        if(i< randomNumber.length -1)
            k += String(randomNumber[i]) + ' - ';
        else 
            k += String(randomNumber[i]);
    }
    console.log(k);
    paraRandom.innerHTML = k;
}

//Hàm pause và xóa mảng random
function waitTime(): void {
    setTimeout(() => {
        paraRandom.innerHTML = '';
    }, wait * 1000);
}

// Xử lý thuật toán cho game
function check(): void {
    guessNumber = inputNumber.value.split(" ");
    
    //Kiểm tra 2 mảng bằng nhau
    if(kiemTra(randomNumber, guessNumber) == true) {
        //Thứ tự vòng chơi
        dem++;
        // Cập nhật flag
        flag = true;
        if(dem == soVong) {
            message = 'Ban la SIEU TRI NHO !';
            paraRandom.innerHTML = 'YOU WIN! Click "Choi lai" to play again';
        }
        else if(dem < soVong) {
            message = 'Good! Qua vong tiep theo nao!';
            // random ra số mới
            if(min ==0)
                min = 1;
            
            min = min*10;
            max = (max*10 +9);
            
            // Thứ tự câu đố
            spanCount.innerHTML = String(dem+1);
            
            //Tạo mảng mới 
            randomNumber = mangRandom(soVong);
            console.log(randomNumber);
            
            createString();   //Tạo chuỗi dãy số random
     
            // Pause 
            if(dem <= 3) {
                wait = 3;
                waitTime();        // Xóa chuối dãy số ran dom sau 3*1000 millisecons.                
            }
            else if(dem > 3 && dem <= soVong) {
                wait = dem;
                waitTime();                       
            }
        }
        console.log(dem);
    }
    else {
        // Cập nhật flag
        flag = false;
        message = 'Game over';
    }

    // in ra thông điệp    
    paraResult.innerHTML = message;
          

    // Đặt lại Input rỗng khi enter đáp án
    inputNumber.value = '';
    guessNumber = inputNumber.value.split('');
    
    //Cập nhật giao diện
    if(dem < soVong) {
        if(flag == true){
            btnGuess.style.display = 'block';
            btnReset.style.display = 'none';
        }
        else if(flag == false) {
            btnGuess.style.display = 'none';
            btnReset.style.display = 'block';
        }
    }
    else if(flag == true && dem == soVong) {
        btnGuess.style.display = 'none';
        btnReset.style.display = 'block';
    }
}

//Reset lại game
function reset(): void {
    min = 0;
    max = 9;
    dem = 0;
    wait = 3; 

    //Thiết lập số vòng chơi max   ///////////////////////////
    soVong = 5;                    ///////////////////////////

    //Thông báo kết quả
    message = '';
    paraResult.innerHTML = message;
    // Input
    inputNumber.value = '';
    guessNumber = inputNumber.value.split('');
    //Số vòng choi
    spanCount.innerHTML = String(dem + 1);
    
    // Tạo mảng random
    randomNumber = mangRandom(soVong);
    console.log(randomNumber);

    createString();  // tạo chuỗi dãy random
    
    // Pause 
    waitTime();

    //Giao diện
    btnGuess.style.display = 'block';
    btnReset.style.display = 'none';
}
reset();

