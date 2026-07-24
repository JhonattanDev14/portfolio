export function textToPoints(
  text: string,
  count: number,
  options = {
    scale: 0.02,
    offsetX: 0,
    offsetY: 0,
  }
) {
  const canvas = document.createElement("canvas");

  // canvas.width = 1000;
  canvas.height = 300;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return {
      points: [],
      width: 0,
      height: 0,
    };
  }
  ctx.font = "bold 180px Arial";

  const metrics = ctx.measureText(text);

  canvas.width = Math.ceil(metrics.width + 100);

  ctx.fillStyle = "white";
  ctx.font = "bold 180px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    text,
    canvas.width / 2,
    canvas.height / 2
  );

  const imageData = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );

  const points = [];
  const gap = 1;

  for (let y = 0; y < canvas.height; y += gap) {
    for (let x = 0; x < canvas.width; x += gap) {
      const index = (y * canvas.width + x) * 4;
      const alpha = imageData.data[index + 3];

      if (alpha > 128) {
        points.push({
          x:
            (x - canvas.width / 2) *
              options.scale +
            options.offsetX,

          y:
            -(y - canvas.height / 2) *
              options.scale +
            options.offsetY,
        });
      }
    }
  }

  points.sort(() => Math.random() - 0.5);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    if (point.x < minX) minX = point.x;
    if (point.x > maxX) maxX = point.x;

    if (point.y < minY) minY = point.y;
    if (point.y > maxY) maxY = point.y;
  }

  const width = maxX - minX;
  const height = maxY - minY;

  let finalPoints = points;

  if (points.length > count) {
    finalPoints = [];

    const step = points.length / count;

    for (let i = 0; i < count; i++) {
      finalPoints.push(
        points[Math.floor(i * step)]
      );
    }
  }

  return {
    points: finalPoints,
    width,
    height,
  };
}