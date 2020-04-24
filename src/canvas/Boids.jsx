import React, { forwardRef, useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

import FieldContainer from "../forms/FieldContainer";
import InputField from "../forms/InputField";
import NumberInput from "../forms/NumberInput";
import Toggle from "../forms/Toggle";

import "./Boids.scss";

export default function Boids() {
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [debug, setDebug] = useState(false);

  return (
    <div className="boids">
      <BoidsCanvas width={width} height={height} debug={debug} />
      <BoidsControls
        width={width}
        height={height}
        debug={debug}
        onWidthChange={setWidth}
        onHeightChange={setHeight}
        onDebugChange={setDebug}
      />
    </div>
  );
}

Boids.propTypes = {};

function BoidsCanvas({ width, height, debug }) {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const sunRotationPerMinute = 10;
    let sunRotation = 0;

    const venusAroundSunRotationPerMinute = 9;
    let venusAroundSunRotation = 0;

    const venusRotationPerMinute = 20;
    let venusRotation = 0;

    const earthAroundSunRotationPerMinute = 5;
    let earthAroundSunRotation = 0;

    const earthRotationPerMinute = 20;
    let earthRotation = 0;

    const moonAroundEarthRotationPerMinute = -25;
    let moonAroundEarthRotation = 0;

    const moonRotationPerMinute = 5;
    let moonRotation = 0;

    const render = (deltaMs) => {
      const ratio = window.devicePixelRatio ?? 1;

      // Reset the transformation matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // Scale at pixel ratio width
      ctx.scale(ratio, ratio);

      // Erase the surface
      ctx.clearRect(0, 0, width, height);

      // Remettre l'axe vertical en direction du haut
      // See https://code-industry.net/masterpdfeditor-help/transformation-matrix/
      // ctx.transform(1, 0, 0, -1, 0, height);

      // Centrer la scene
      ctx.translate(width / 2, height / 2);

      // The scene
      const helper = new CanvasHelper(ctx, { debug });

      helper.withNewContext(() => {
        sunRotation += (deltaMs * sunRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(sunRotation));

        helper.renderCircle({
          radius: 50,
          fillStyle: "orange",
        });
        helper.renderCross({ name: "Sun" });
      });

      helper.withNewContext(() => {
        venusAroundSunRotation += (deltaMs * venusAroundSunRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(venusAroundSunRotation));

        helper.translate(100, 0);

        venusRotation += (deltaMs * venusRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(venusRotation));

        helper.renderCircle({
          radius: 18,
          fillStyle: "maroon",
        });
        helper.renderCross({ name: "Venus" });
      });

      helper.withNewContext(() => {
        earthAroundSunRotation += (deltaMs * earthAroundSunRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(earthAroundSunRotation));

        helper.translate(190, 0);

        helper.withNewContext(() => {
          earthRotation += (deltaMs * earthRotationPerMinute * 360) / (60 * 1000);
          ctx.rotate(degToRad(earthRotation));

          helper.renderCircle({
            radius: 20,
            fillStyle: "green",
          });
          helper.renderCross({ name: "Earth" });
        });

        moonAroundEarthRotation += (deltaMs * moonAroundEarthRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(moonAroundEarthRotation));

        helper.translate(40, 0);

        moonRotation += (deltaMs * moonRotationPerMinute * 360) / (60 * 1000);
        ctx.rotate(degToRad(moonRotation));

        helper.renderCircle({
          radius: 10,
          fillStyle: "grey",
        });
        helper.renderCross({ name: "Moon" });
      });
    };

    let handle;
    let lastTimestamp = null;

    const renderOnFrame = (timestamp) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      render(deltaMs);

      handle = requestAnimationFrame(renderOnFrame);
    };

    handle = requestAnimationFrame(renderOnFrame);

    return () => cancelAnimationFrame(handle);
  }, [width, height, debug]);

  return <HighResolution2DCanvas className="boids__canvas" width={width} height={height} ref={ref} />;
}

BoidsCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  debug: PropTypes.bool.isRequired,
};

class CanvasHelper {
  constructor(ctx, { debug = true }) {
    this.ctx = ctx;
    this.debug = debug;

    const methods = ["arc", "fill", "stroke", "moveTo", "lineTo", "rotate", "translate", "fillText"];

    methods.forEach((method) => {
      this[method] = ctx[method].bind(ctx);
    });
  }

  setProps(props) {
    Object.entries(props).forEach(([key, value]) => {
      this.ctx[key] = value;
    });
  }

  renderCircle({ radius, fillStyle }) {
    this.withNewContext(() => {
      this.setProps({ fillStyle });

      this.withNewPath(() => {
        this.arc(0, 0, radius, 0, 2 * Math.PI);
        this.fill();
      });
    });
  }

  renderCross({ name = "Debug" } = {}) {
    if (!this.debug) {
      return;
    }

    this.withNewContext(() => {
      const lineWidth = 2;

      // X arrow
      this.setProps({
        lineWidth,
        strokeStyle: "blue",
        fillStyle: "blue",
      });

      this.withNewPath(() => {
        this.ctx.moveTo(-length / 4, 0);
        this.ctx.lineTo(length / 2, 0);
        this.ctx.stroke();
      });

      this.drawArrow({ length });

      // Y arrow

      this.withNewContext(() => {
        this.rotate(degToRad(90));

        this.setProps({
          lineWidth,
          strokeStyle: "red",
          fillStyle: "red",
        });

        this.drawArrow({ length });
      });

      // Text
      if (name) {
        this.setProps({
          textBaseline: "top",
          fillStyle: "black",
          font: "14px sans-serif",
        });
        this.fillText(name, 10, 10);
      }
    });
  }

  drawArrow() {
    const length = 40;
    const height = 15;
    const width = 10;

    // Line
    this.withNewPath(() => {
      this.moveTo(-length / 4, 0);
      this.lineTo(length / 2, 0);
      this.stroke();
    });

    // Arrow
    this.withNewPath(() => {
      this.moveTo(length / 2 + height, 0);
      this.lineTo(length / 2, width / 2);
      this.lineTo(length / 2, -width / 2);
      this.fill();
    });
  }

  withNewContext(f) {
    this.ctx.save();
    try {
      f();
    } finally {
      this.ctx.restore();
    }
  }

  withNewPath(f) {
    this.ctx.beginPath();
    try {
      f();
    } finally {
      this.ctx.closePath();
    }
  }
}

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function BoidsControls({ width, height, debug, onWidthChange, onHeightChange, onDebugChange }) {
  return (
    <div className="boids__controls">
      <FieldContainer label="Screen DPI" readOnly className="boids__control-item">
        {(props) => <InputField {...props} as={NumberInput} value={window.devicePixelRatio} />}
      </FieldContainer>
      <FieldContainer label="Width" className="boids__control-item">
        {(props) => (
          <InputField
            {...props}
            as={NumberInput}
            value={width}
            onChange={(e) => onWidthChange(parseIntOrZero(e.target.value))}
          />
        )}
      </FieldContainer>
      <FieldContainer label="Height" className="boids__control-item">
        {(props) => (
          <InputField
            {...props}
            as={NumberInput}
            value={height}
            onChange={(e) => onHeightChange(parseIntOrZero(e.target.value))}
          />
        )}
      </FieldContainer>
      <FieldContainer label="Debug" className="boids__control-item">
        {(error, ...props) => <Toggle {...props} checked={debug} onChange={(e) => onDebugChange(e.target.checked)} />}
      </FieldContainer>
    </div>
  );
}

BoidsControls.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  debug: PropTypes.bool.isRequired,
  onWidthChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func.isRequired,
  onDebugChange: PropTypes.func.isRequired,
};

function parseIntOrZero(value) {
  const number = parseInt(value);
  return isNaN(number) ? 0 : number;
}

const HighResolution2DCanvas = forwardRef(function HighResolutionCanvas(props, ref) {
  const { width, height, style = {}, ...otherProps } = props;

  useEffect(() => {
    const ratio = window.devicePixelRatio ?? 1;
    const canvas = ref.current;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
  }, [ref, height, width]);

  const computedStyle = {
    ...style,
    width: `${width}px`,
    height: `${height}px`,
  };

  return <canvas {...otherProps} width={width} height={height} style={computedStyle} ref={ref}></canvas>;
});

HighResolution2DCanvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
};
