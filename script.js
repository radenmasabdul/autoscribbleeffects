const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 700;
canvas.height = 900;

ctx.lineWidth = 10;

//canvas shadow, jika render terlalu berat, nonaktifkan shadow
// ctx.shadowOffsetX = 2;
// ctx.shadowOffsetY = 2;
// ctx.shadowColor = 'black';

const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop('0.2', 'pink');
gradient1.addColorStop('0.3', 'red');
gradient1.addColorStop('0.4', 'orange');
gradient1.addColorStop('0.5', 'yellow');
gradient1.addColorStop('0.6', 'green');
gradient1.addColorStop('0.7', 'turquoise');
gradient1.addColorStop('0.8', 'violet');

const paternImage = document.getElementById('patternImage');
const pattern1 = ctx.createPattern(paternImage, 'no-repeat');

ctx.strokeStyle = pattern1;

class Line {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width; //membuat titik start horizontal secara acak berdasarkan lebar canvas
        this.y = Math.random() * this.canvas.height; //membuat titik start vertikal secara acak berdasarkan lebar canvas
        this.history = [{ x: this.x, y: this.y }]; //riwayat posisi secara acak
        this.lineWidth = Math.floor(Math.random() * 25 + 1); //membuat nilai acak antar 1 dan 16 pada garis, atur linewidth untuk pola
        this.hue = Math.floor(Math.random() * 360); //membuat nilai acak untuk warna
        this.maxLength = Math.floor(Math.random() * 150 + 10); //membuat panjang maksimal garis
        this.speedX = Math.random() * 1 - 0.5; //membuat kecepatan horizontal
        this.speedY = 7; //membuat kecepatan vertikal
        this.lifeSpan = this.maxLength * 2; //mengatur apakah garis meninggalkan area canvas
        this.breakPoint = this.lifeSpan * 0.85; //mengatur breakpoint untuk trigonometri
        this.timer = 0; //mengatur value timer
        this.angle = 0; //mengatur value angle untuk trigonometri
        this.va = Math.random() * 0.5 - 0.25; //mengatur vc untuk trigonometri
        this.curve = 0.1; //mengatur curva untuk trigonometri
        this.vc = Math.random() * 0.4 - 0.2; //mengatur vc untuk trigonometri
    };
    draw(context) {
        context.lineWidth = this.lineWidth; //untuk mengatur garis secara acak
        context.beginPath(); // sebuah methods untuk memulai path
        context.moveTo(this.history[0].x, this.history[0].y); //untuk menentukan titik start
        for (let i = 0; i < this.history.length; i++) { //for loop disini untuk menentukan titik posisi secara acak
            context.lineTo(this.history[i].x, this.history[i].y);
        };
        context.stroke(); //untuk merender jalur di kanvas
    };
    update() {
        this.timer++;
        this.angle += this.va;
        this.curve += this.vc;
        if (this.timer < this.lifeSpan) {
            if (this.timer > this.breakPoint) {
                this.va *= -1.12;
            };
            this.x += Math.sin(this.angle) * this.curve; //jumlah value secara acak pada titik horizontal
            this.y += Math.cos(this.angle) * this.curve;  //jumlah value secara acak pada titik vertikal
            this.history.push({ x: this.x, y: this.y }); //push hasil loop ke history
            if (this.history.length > this.maxLength) { //kondisi untuk mengatur maxlength
                this.history.shift();
            };
        } else if (this.history.length <= 1) {
            this.reset();
        } else {
            this.history.shift();
        };
    };
    reset() {
        this.x = Math.random() * this.canvas.width; //membuat titik start horizontal secara acak berdasarkan lebar canvas
        this.y = Math.random() * this.canvas.height; //membuat titik start vertikal secara acak berdasarkan lebar canvas
        this.history = [{ x: this.x, y: this.y }]; //riwayat posisi secara acak
        this.timer = 0;
        this.angle = 0;
        this.curve = 0;
        this.va = Math.random() * 0.5 - 0.25;
    };
};

const lineArray = []; //untuk menyimpan semua objek garis
const numberOfLines = 100; //mengatur jumlah garis, sesuaikan agar tidak lag saat render
for (let i = 0; i < numberOfLines; i++) {
    lineArray.push(new Line(canvas));
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //untuk menghapus canvas
    lineArray.forEach(line => {
        line.draw(ctx);
        line.update();
    });
    requestAnimationFrame(animate);
};
animate();
