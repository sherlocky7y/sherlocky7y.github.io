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

    // 🌬️ 全局风（让整体一起斜飘）
    var globalWind = 0;

    function Petal() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;

        this.size = Math.random() * 12 + 6;
        this.speed = Math.random() * 2 + 1;

        // 👉 横向风增强（关键）
        this.wind = Math.random() * 2 + 1; // 全部偏右飘

        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 3 - 1.5;

        this.opacity = Math.random() * 0.6 + 0.4;
        this.pink = Math.floor(Math.random() * 80 + 180);
    }

    Petal.prototype.update = function () {
        // 🌸 下落
        this.y += this.speed;

        // 🌸 横向：基础风 + 摆动 + 全局风
        this.x += this.wind + Math.sin(this.y * 0.01) * 1.5 + globalWind;

        // 🌸 旋转
        this.rotation += this.rotationSpeed;

        // 🌸 重置位置
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

    // 🌸 花瓣数量（60 ≈ 12×5，也算呼应一下“5”的节奏感）
    for (var i = 0; i < 60; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 🌬️ 全局风随时间变化（更自然）
        globalWind = Math.sin(Date.now() * 0.001) * 1.2;

        petals.forEach(function (p) {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
})();