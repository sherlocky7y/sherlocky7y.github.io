!(function () {
  window.addEventListener("click", function (e) {
    for (var i = 0; i < 6; i++) {
      createPetal(e.clientX, e.clientY);
    }
  });

  function createPetal(x, y) {
    var petal = document.createElement("div");
    var size = Math.random() * 15 + 8;
    var angle = Math.random() * 360;
    var spread = Math.random() * 60 - 30;
    petal.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 9999;
      border-radius: 50% 0 50% 0;
      background: rgba(255, ${Math.floor(Math.random() * 80 + 130)}, ${Math.floor(Math.random() * 80 + 160)}, 0.8);
      animation: petalFall 1.2s ease forwards;
      transform: rotate(${angle}deg);
    `;
    document.body.appendChild(petal);
    petal.style.setProperty('--spread', spread + 'px');
    setTimeout(() => petal.remove(), 1200);
  }

  var style = document.createElement("style");
  style.innerHTML = `
    @keyframes petalFall {
      0% { transform: translateY(0) translateX(0) rotate(0deg) scale(1); opacity: 1; }
      100% { transform: translateY(-100px) translateX(var(--spread)) rotate(180deg) scale(0.3); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();