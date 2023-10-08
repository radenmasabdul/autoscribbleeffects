const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); //variable context ctx untuk mengambil variable canvas
console.log(ctx); //untuk mengecek properties dan value pada ctx/context

// untuk mengatur ukuran kanvas
canvas.width = 700;
canvas.height = 900;

//membuat kotak diatas element
// x adalah koordinat horizontal (sumbu x) dari sudut kiri atas kotak.
// y adalah koordinat vertikal (sumbu y) dari sudut kiri atas kotak.
// ctx.fillRect(x, y, width, height); <== ini basic nya
// ctx.fillStyle = 'red'; //untuk menetapkan warna value, fillStyle adalah properties dari ctx
// ctx.fillRect(100, 150, 200, 150); // fillRect adalah properties dari ctx
// ctx.lineWidth = 10; //mengatur ketebalan stroke, lineWidth adalah properties dari ctx
// ctx.strokeStyle = 'blue'; //untuk menetapkan warna value, strokeStyle adalah properties dari ctx
// ctx.strokeRect(100, 150, 200, 150); // untuk membuat stroke, strokeRect adalah properties dari ctx

//membuat global settings
ctx.lineWidth = 10; //untuk mengatur ketebalan garis
// ctx.lineCap = 'round'; //atur properties menjadi round
// ctx.strokeStyle = 'magenta'; //untuk mengatur warna garis
// ctx.createLinearGradient(x,y,width,height) //untuk mengatur liniear gradient

//canvas shadow, jika render terlalu berat, nonaktifkan shadow
// ctx.shadowOffsetX = 2;
// ctx.shadowOffsetY = 2;
// ctx.shadowColor = 'black';

//kode dibawah ini untuk membuat gradient
const gradient1 = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient1.addColorStop('0.2', 'pink'); //warna akhir
gradient1.addColorStop('0.3', 'red'); //warna akhir
gradient1.addColorStop('0.4', 'orange'); //warna akhir
gradient1.addColorStop('0.5', 'yellow'); //warna akhir
gradient1.addColorStop('0.6', 'green'); //warna akhir
gradient1.addColorStop('0.7', 'turquoise'); //warna akhir
gradient1.addColorStop('0.8', 'violet'); //warna akhir

// const gradient2 = ctx.createRadialGradient(x * 0.5, y * 0.5, radius); //untuk mengatur radial gradient
const gradient2 = ctx.createRadialGradient(canvas.width * 0.5, canvas.height * 0.5, 30, canvas.width * 0.5, canvas.height * 0.5, 200);
gradient2.addColorStop('0.2', 'green'); //warna akhir
gradient2.addColorStop('0.5', 'red'); //warna akhir
gradient2.addColorStop('0.8', 'blue'); //warna akhir

//canvas pattern
const paternImage = document.getElementById('patternImage');
const pattern1 = ctx.createPattern(paternImage, 'no-repeat');

ctx.strokeStyle = gradient1; //untuk aktifkan liniear gradient
// ctx.strokeStyle = gradient2; //untuk aktifkan radial gradient
// ctx.strokeStyle = pattern1; //untuk aktifkan pattern image, non aktifkan shadow jika render nya berat

//membuat sebuah garis lurus, konsep utama bisa di atur dibagian sini
// ctx.beginPath(); // sebuah methods untuk memulai path, beginPath adalah properties dari ctx
// ctx.moveTo(x, y); // <== ini basic nya
// ctx.moveTo(350, 600); // sebuah methods untuk membuat subpath baru, moveTo adalah properties dari ctx
// ctx.lineTo(x, y); // <== ini basic nya
// ctx.lineTo(450, 700) // sebuah methods untuk membuat garis lurus dari subpath baru, lineTo adalah properties dari ctx
// ctx.lineTo(350, 800) // membuat garis baru
// ctx.lineTo(150, 100) // membuat garis baru
// ctx.lineTo(250, 300) // membuat garis baru
// ctx.lineTo(250, 300) // membuat garis baru
// ctx.lineTo(450, 200) // membuat garis baru
// ctx.stroke(); //sebuah metode stroke

//membuat customm class
class Line {
    constructor(canvas) {
        this.canvas = canvas;
        // this.startX = Math.random() * this.canvas.width; //membuat titik start horizontal secara acak berdasarkan lebar canvas
        // this.startY = Math.random() * this.canvas.height; //membuat titik start vertikal secara acak berdasarkan lebar canvas
        this.x = Math.random() * this.canvas.width; //membuat titik start horizontal secara acak berdasarkan lebar canvas
        this.y = Math.random() * this.canvas.height; //membuat titik start vertikal secara acak berdasarkan lebar canvas
        // this.endX = Math.random() * this.canvas.width; //membuat titik akhir horizontal secara acak berdasarkan lebar canvas
        // this.endY = Math.random() * this.canvas.height; //membuat titik akhir vertikal secara acak berdasarkan lebar canvas
        this.history = [{ x: this.x, y: this.y }]; //riwayat posisi secara acak
        this.lineWidth = Math.floor(Math.random() * 15 + 1); //membuat nilai acak antar 1 dan 16 pada garis, atur linewidth untuk pola images
        this.hue = Math.floor(Math.random() * 360); //membuat nilai acak untuk warna
        // this.maxLength = 10; //membuat panjang maksimal garis
        this.maxLength = Math.floor(Math.random() * 150 + 10); //membuat panjang maksimal garis
        this.speedX = Math.random() * 1 - 0.5; //membuat kecepatan horizontal
        this.speedY = 7; //membuat kecepatan vertikal
        this.lifeSpan = this.maxLength * 2; //mengatur apakah garis meninggalkan area canvas
        this.timer = 0; //mengatur value timer
        this.angle = 0; //mengatur angle untuk trigonometri
        this.va = Math.random() * 0.5 - 0.25 //mengatur vc untuk trigonometri
        this.curve = 0.1; //mengatur curva untuk trigonometri
        this.vc = Math.random() * 0.4 - 0.2 //mengatur vc untuk trigonometri
    };
    draw(context) { //merupakan custom methods untuk membuat garis antara 2 titik
        context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)'; //untuk mengatur warna garis secara acak
        context.lineWidth = this.lineWidth; //untuk mengatur garis secara acak
        context.beginPath(); // sebuah methods untuk memulai path
        // context.moveTo(this.startX, this.startY); //untuk menentukan titik start
        context.moveTo(this.history[0].x, this.history[0].y); //untuk menentukan titik start
        //for loop dibagian untuk membuat garis acak sesuai jumlah value nya
        // for (let i = 0; i < 30; i++) {
        //     this.x = Math.random() * this.canvas.width;
        //     this.y = Math.random() * this.canvas.height;
        //     this.history.push({ x: this.x, y: this.y }) //push hasil loop ke history
        // }
        //for loop disini untuk menentukan titik posisi secara acak
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y)
        };
        // context.lineTo(this.endX, this.endY) //untuk menentukan titik akhir
        context.stroke(); //untuk merender jalur di kanvas
    };
    update() {
        // this.x = Math.random() * this.canvas.width;
        // this.y = Math.random() * this.canvas.height;
        this.timer++;
        this.angle += this.va;
        this.curve += this.vc;
        if (this.timer < this.lifeSpan) {
            // this.x += this.speedX + Math.random() * 20 - 10; //jumlah value secaca acak pada titik horizontal
            this.x += Math.sin(this.angle) * this.curve; //jumlah value secaca acak pada titik horizontal
            this.y += Math.cos(this.angle) * this.curve;  //jumlah value secaca acak pada titik vertikal
            // this.y += this.speedY + Math.random() * 20 - 10; //jumlah value secaca acak pada titik vertikal
            // this.y += this.speedY; //jumlah value secaca acak pada titik vertikal
            this.history.push({ x: this.x, y: this.y }) //push hasil loop ke history
            //kondisi untuk mengatur maxlength
            if (this.history.length > this.maxLength) {
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
        this.timer = 0; //mengatur value timer
        this.angle = 0;
        this.curve = 0;
    };
};

//membuat variable
const lineArray = []; //untuk menampung semua objek garis
const numberOfLines = 50; //mengatur jumlah garis
for (let i = 0; i < numberOfLines; i++) {
    lineArray.push(new Line(canvas));
};
console.log(lineArray);

//fungsi untuk animasi
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height) //untuk menghapus canvas
    //untuk draw line
    // lineArray.forEach(line => line.draw(ctx)); //membaut garis menjadi acak
    lineArray.forEach(line => {
        line.draw(ctx);
        line.update();
    });
    //untuk update line
    // lineArray.forEach(line => line.update(ctx)); //membaut garis menjadi acak
    requestAnimationFrame(animate);
    // console.log('animate');
};
animate();

// const line1 = new Line(canvas);
// line1.draw(ctx); //untuk menampilkan hasil dari methods draw
