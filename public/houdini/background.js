class BackgroundPainter {
  static get inputProperties() {
    return ["--angle"];
  }

  paint(ctx, geom, properties) {
    ctx.fillStyle = "green";

    // Center of the box
    ctx.translate(geom.width / 2, geom.height / 2);

    // Rotation angle
    const angleStr = properties.get("--angle").toString();
    const angle = parseFloat(angleStr || "0.0");
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.rect(-15, -15, 30, 30);
    ctx.fill();
  }
}

registerPaint("my-bg", BackgroundPainter);
