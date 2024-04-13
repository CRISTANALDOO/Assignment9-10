document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("main");
    const ctx = canvas.getContext("2d");
  
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let brushSize = 5;
    let currentColor = "#000000"; // Default color is black (eraser)
  
    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function draw(e) {
      if (!isDrawing) return;
  
      ctx.strokeStyle = currentColor;
      ctx.lineCap = "round";
      ctx.lineWidth = brushSize;
  
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
  
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function erase() {
      currentColor = "#FFFFFF"; // Set color to white for erasing
      brushSize = 10; // Set a larger brush size for eraser
    }
  
    function setColor(color) {
      currentColor = color;
      brushSize = 5; // Reset brush size when changing color
    }
  
    function updateBrushSize() {
      brushSize = this.value;
      document.getElementById("brushSize").textContent = brushSize;
    }
  
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
  
    document.getElementById("erase").addEventListener("click", erase);
  
    document.getElementById("black").addEventListener("click", () => setColor("#000000"));
    document.getElementById("pink").addEventListener("click", () => setColor("#F50057"));
    document.getElementById("blue").addEventListener("click", () => setColor("#2979FF"));
    document.getElementById("yellow").addEventListener("click", () => setColor("#FFD600"));
  
    document.getElementById("slider").addEventListener("input", updateBrushSize);
  
    document.getElementById("new").addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      brushSize = 5; // Reset brush size
      document.getElementById("slider").value = brushSize;
      document.getElementById("brushSize").textContent = brushSize;
    });
  });
  