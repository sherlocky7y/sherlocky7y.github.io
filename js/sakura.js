!(function () {
    var petals = [];
    var canvas = document.createElement("canvas");
    canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  `;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function Petal() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 12 + 6;
        this.speed = Math.random() * 2 + 1;
        this.wind = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.pink = Math.floor(Math.random() * 80 + 180);
    }

    Petal.prototype.update = function () {
        this.y += this.speed;
        this.x += this.wind;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    };

    Petal.prototype.draw = function () {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `rgb(255, ${this.pink}, ${this.pink})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    for (var i = 0; i < 60; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(function (p) {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
})();