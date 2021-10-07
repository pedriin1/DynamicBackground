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
  // const COLORS = [
  //   { r: 45, g: 74, b: 227 },
  //   { r: 45, g: 74, b: 227 },
  //   { r: 45, g: 74, b: 227 },
  //   { r: 45, g: 74, b: 227 },
  //   { r: 45, g: 74, b: 227 },
  // ];

  useEffect(() => {
    // const cnv =
    // const ctx = canvas.getContext("2d");

    class GradientAnimation {
      constructor() {
        this.cnv = canvasRef.current;
        this.ctx = this.cnv.getContext(`2d`);

        this.circlesNum = 10;
        this.minRadius = 1200;
        this.maxRadius = 1000;
        this.speed = 1;

        // (window.onresize = () => {
        //   this.setCanvasSize();
        //   this.createCircles();
        // })();
        this.setCanvasSize();
        this.createCircles();
        this.drawAnimation();
      }
      setCanvasSize() {
        this.w = this.cnv.width = outerWidth * devicePixelRatio;
        this.h = this.cnv.height = outerHeight * devicePixelRatio;
        this.ctx.scale(devicePixelRatio, devicePixelRatio);
      }
      createCircles() {
        this.circles = [];
        for (let i = 0; i < this.circlesNum; ++i) {
          this.circles.push(
            new Circle(this.w, this.h, this.minRadius, this.maxRadius)
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
        console.log(this.x, this.y);
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
          this.vy = -1;
        } else if (this.y < 0) {
          this.vy = 1;
        }
        // this.radius = 5;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
        gradient.addColorStop(0, this.firstColor);
        gradient.addColorStop(1, this.secondColor);

        ctx.globalCompositeOperation = `multiply`;
        ctx.filter = "brightness(80%)";
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
    </Container>
  );
}

export default Canvas;
