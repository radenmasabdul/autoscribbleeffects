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
ctx.strokeStyle = 'magenta'; //untuk mengatur warna garis

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
        this.history = [{ x: this.x, y: this.y }] //riwayat posisi secara acak
        this.lineWidth = Math.floor(Math.random() * 15 + 1) //membuat nilai acak antar 1 dan 16 pada garis
        this.hue = Math.floor(Math.random() * 360); //membuat nilai acak untuk warna
    }
    draw(context) { //merupakan custom methods untuk membuat garis antara 2 titik
        context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)'; //untuk mengatur warna garis secara acak
        context.lineWidth = this.lineWidth; //untuk mengatur garis secara acak
        context.beginPath(); // sebuah methods untuk memulai path
        // context.moveTo(this.startX, this.startY); //untuk menentukan titik start
        context.moveTo(this.history[0].x, this.history[0].y); //untuk menentukan titik start
        //for loop dibagian untuk membuat garis acak sesuai jumlah value nya
        for (let i = 0; i < 3; i++) {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.history.push({ x: this.x, y: this.y }) //push hasil loop ke history
        }
        //for loop disini untuk menentukan titik posisi secara acak
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x, this.history[i].y)
        }
        // context.lineTo(this.endX, this.endY) //untuk menentukan titik akhir
        context.stroke(); //untuk merender jalur di kanvas
    };
};

//membuat variable
const lineArray = []; //untuk menampung semua objek garis
const numberOfLines = 1; //mengatur jumlah garis
for (let i = 0; i < numberOfLines; i++) {
    lineArray.push(new Line(canvas));
}
console.log(lineArray);
lineArray.forEach(line => line.draw(ctx)); //membaut garis menjadi acak

//fungsi untuk animasi
function animate() {
    //untuk draw line

    //untuk update line

    requestAnimationFrame(animate);
}

// const line1 = new Line(canvas);
// line1.draw(ctx); //untuk menampilkan hasil dari methods draw
