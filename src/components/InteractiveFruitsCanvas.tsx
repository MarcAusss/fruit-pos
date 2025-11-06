import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

type Fruit = {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default function InteractiveFruitsCanvas() {
  const [fruits] = useState<Fruit[]>([
    { src: "/fruits/banana.png", x: 100, y: 200, width: 120, height: 120 },
    { src: "/fruits/mango.png", x: 300, y: 300, width: 120, height: 170 },
    { src: "/fruits/orange.webp", x: 500, y: 200, width: 250, height: 170 },
    { src: "/fruits/red-apple.png", x: 200, y: 500, width: 120, height: 120 },
    { src: "/fruits/strawberry.png", x: 100, y: 300, width: 120, height: 120 },
  ]);

  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const stageRef = useRef<Konva.Stage>(null);

  // Set stage size safely
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateSize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    requestAnimationFrame(updateSize);
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Load fruit images
  useEffect(() => {
    fruits.forEach((fruit) => {
      const img = new window.Image();
      img.src = fruit.src;
      img.onload = () => setImages((prev) => ({ ...prev, [fruit.src]: img }));
    });

    // Load background image
    const bg = new window.Image();
    bg.src = "/backgrounds/52915730-healthy-fruits-background-studio-photo-of-different-fruits-on-wooden-table.jpg"; // <-- your background path
    bg.onload = () => setBackgroundImage(bg);
  }, [fruits]);

  // Handle drag end with bounce
  const handleDragEnd = (i: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const shape = e.target;
    const tween = new Konva.Tween({
      node: shape,
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      x: Math.min(Math.max(shape.x(), 0), size.width - shape.width()),
      y: Math.min(Math.max(shape.y(), 0), size.height - shape.height()),
    });
    tween.play();
  };

  if (size.width === 0 || size.height === 0) return null;

  return (
    <Stage width={size.width} height={size.height} ref={stageRef}>
      <Layer>
        {/* Background Image */}
        {backgroundImage && (
          <KonvaImage
            image={backgroundImage}
            x={0}
            y={0}
            width={size.width}
            height={size.height}
          />
        )}

        {/* Fruits */}
        {fruits.map((fruit, i) => (
          <KonvaImage
            key={i}
            image={images[fruit.src]}
            x={fruit.x}
            y={fruit.y}
            width={fruit.width}
            height={fruit.height}
            draggable
            onDragEnd={(e) => handleDragEnd(i, e)}
            onClick={() => alert(`You clicked a fruit! 🍎`)}
          />
        ))}
      </Layer>
    </Stage>
  );
}
