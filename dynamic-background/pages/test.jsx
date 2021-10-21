import React, { useRef, useEffect } from "react";
import useImageColor from "use-image-color";
import { Container } from "../styles/home";

export default function Test(props) {
  const canvasRef = useRef(null);
  const image =
    "https://media-exp1.licdn.com/dms/image/C4D03AQFzUvVCa2JneQ/profile-displayphoto-shrink_400_400/0/1605726756128?e=1640217600&v=beta&t=ATT0P95CDseNr3DzvYrk9nsBzDGuJV7chzdJHpCkXmM";

  const { colors } = useImageColor(image, {
    cors: true,
    colors: 5,
    format: "rgb",
  });

  useEffect(() => {
    const cnv = canvasRef.current;
    const ctx = cnv.getContext(`2d`);

    var radius = width * 0.8;
    var vx = Math.floor(Math.random() * (width - 0 + 1) + 0);
    var vy = Math.floor(Math.random() * (height - 0 + 1) + 0);

    if (colors) {
      var color = colors[Math.floor(Math.random() * (4 - 0 + 1) + 0)];
      console.log(color);

      function GlowCircles(x, y, radius, color) {
        var innerRadius = 0;
        // Radius of the entir;
        var vx = x;
        var vy = y;

        var gradient = ctx.createRadialGradient(
          vx,
          vy,
          innerRadius,
          x,
          y,
          radius
        );
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        gradient.addColorStop(0, `rgba(${color}, 1)`);

        ctx.arc(vx, vy, radius, 0, 2 * Math.PI);
        ctx.globalCompositeOperation = `multiply`;
        ctx.filter = "brightness(80%)";
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      function clearCanvas() {
        ctx.clearRect(0, 0, width, height);
      }

      function generateCircle(vx, vy, radius, color) {
        var anglex = 1;
        var angley = 1;
        vx += 1 * anglex;
        vy += 1 * angley;
        // console.log(vx, vy);
        console.log(anglex, angley);

        if (vx > width) {
          anglex *= -1;
          console.log("a");
        }
        if (vy > height) {
          angley *= -1;
        }
        window.requestAnimationFrame(() =>
          generateCircle(vx, vy, radius, color)
        );
        clearCanvas();

        for (var i = 0; i < 5; i++) {
          GlowCircles(Math.floor(vx), Math.floor(vy), width * 0.8, color);
        }
      }
      function draw() {
        generateCircle(vx, vy, radius, color);

        // Math.floor(Math.random() * (width - 0 + 1) + 0),
        //     Math.floor(Math.random() * (height - 0 + 1) + 0)
      }

      function drawAnimation() {
        draw();
      }

      drawAnimation();
    }
  }, [colors]);

  return (
    <>
      <Container>
        <canvas
          ref={canvasRef}
          {...props}
          className="canvas"
          style={colors ? { background: "#5e5e5e" } : null}
        />
        <section className="content">{props.children}</section>
      </Container>
    </>
  );
}
