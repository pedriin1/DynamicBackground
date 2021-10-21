import React, { useRef, useEffect } from "react";
import { Container } from "../styles/home";
import useImageColor from "use-image-color";

function Canvas(props) {
  const canvasRef = useRef(null);
  const image =
    "https://media-exp1.licdn.com/dms/image/C4D0BAQGED8d4EG_pQA/company-logo_200_200/0/1632764275957?e=1640822400&v=beta&t=4_raxSXBSGaBEJ4O_jbMi2hf6uxz8u2CdDvnIou0TLo";

  const { colors } = useImageColor(image, {
    cors: true,
    colors: 5,
    format: "rgb",
  });

  useEffect(() => {
    const cnv = canvasRef.current;
    const ctx = cnv.getContext(`2d`);

    var x = 100;
    var y = 100;
    var dx = 5;
    var dy = 5;

    class GradientAnimation {
      constructor() {
        this.cnv = canvasRef.current;
        this.ctx = this.cnv.getContext(`2d`);

        this.circlesNum = 5;

        this.speed = 2;

        this.width = cnv.clientWidth;
        this.height = cnv.clientHeight;

        this.minRadius = this.width * 1.2;
        this.maxRadius = this.width * 1.2;

        // (window.onresize = () => {
        //   this.setCanvasSize();
        //   this.createCircles();
        // })();
        this.resizeCanvasToDisplaySize(cnv);
        this.setCanvasSize();
        this.createCircles();
        this.drawAnimation();
      }
      resizeCanvasToDisplaySize(canvas) {
        // look up the size the canvas is being displayed

        // If it's resolution does not match change it
        if (canvas.width !== this.width || canvas.height !== this.height) {
          canvas.width = this.width;
          canvas.height = this.height;
          return true;
        }

        return false;
      }

      setCanvasSize() {
        this.w = this.width;
        this.h = this.height;
        // this.ctx.scale(scale, scale);
      }
      createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
          this.circles.push(
            new Circle(
              Math.floor(Math.random() * (this.w - 0 + 1) + 0),
              Math.floor(Math.random() * (this.h - 0 + 1) + 0),
              this.minRadius,
              this.maxRadius
            )
          );
        }
      }
      drawCircles() {
        this.circles.forEach((circle) => circle.draw(this.ctx, this.speed));
      }
      clearCanvas() {
        this.ctx.clearRect(0, 0, this.w, this.h);
      }
      drawAnimation() {
        this.clearCanvas();
        this.drawCircles();
        window.requestAnimationFrame(() => this.drawAnimation());
      }
    }

    class Circle {
      constructor(w, h, minR, maxR) {
        // console.log(canvasRef.current.getBoundingClientRect().height);
        this.vx = 1;
        this.vy = 1;
        this.x = Math.floor(
          Math.random() *
            (canvasRef.current.getBoundingClientRect().width * 2 - 30 + 1) +
            30
        );
        this.y = Math.floor(
          Math.random() *
            (canvasRef.current.getBoundingClientRect().height * 2 - 30 + 1) +
            30
        );
        // console.log(this.x, this.y);
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * (maxR - minR) + minR;
        this.firstColor = `rgba(${
          colors[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
        }, 1)`;
        this.secondColor = `rgba(${
          colors[Math.floor(Math.random() * (4 - 0 + 1) + 0)]
        }, 0)`;
      }
      draw(ctx, speed) {
        this.angle += speed;
        const x = this.x;
        const y = this.y;

        this.x = this.x + speed * this.vx;
        this.y = this.y + speed * this.vy;

        if (this.x > canvasRef.current.getBoundingClientRect().width) {
          this.vx = -1;
        } else if (this.x < 0) {
          this.vx = 1;
        }
        if (this.y > canvasRef.current.getBoundingClientRect().height) {
          console.log(canvasRef.current.getBoundingClientRect().height);

          this.vy = -1;
        } else if (this.y < 0) {
          this.vy = 1;
        }
        // this.radius = 5;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `multiply`;
        ctx.filter = "blur(200px)";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (colors) {
      // window.onload = () => {
      new GradientAnimation();
      // };
    }
  }, [colors]);

  return (
    <Container>
      <div className="container">
        <canvas
          ref={canvasRef}
          {...props}
          className="canvas"
          style={colors ? { background: "#5e5e5e" } : null}
        />
        <section className="content">{props.children}</section>
      </div>

      {/* <iframe
        allow="autoplay *; encrypted-media *; fullscreen *"
        frameborder="0"
        height="150"
        // style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        src="https://embed.music.apple.com/br/album/penhasco/1574994387?i=1574994593"
      ></iframe> */}
    </Container>
  );
}

export default Canvas;
