import PropTypes from "prop-types";
import { useSpring, animated } from "react-spring";

const ZMAX = 100;

export default function Translation3D({ yTranslate = 0 }) {
  return (
    <div
      className="translation-3d"
      style={{
        perspective: `${ZMAX}px`,
        height: "100vh",
      }}
    >
      <Square size={100} bgColor="red" yTranslate={yTranslate} />
      <Square x={90} y={-40} z={20} size={150} bgColor="blue" yTranslate={yTranslate} />
      <Square x={20} size={50} z={30} bgColor="green" yTranslate={yTranslate} />
    </div>
  );
}

Translation3D.propTypes = {
  yTranslate: PropTypes.number,
};

function Square({ size, bgColor, x = 0, y = 0, z = 0, yTranslate = 0 }) {
  const scale = 1 - z / ZMAX;
  const style = useSpring({
    position: "absolute",
    top: `calc(50% - (${size}px / 2) + ${y}px)`,
    left: `calc(50% - (${size}px / 2) + ${x}px)`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bgColor,
    transform: `translate3d(0, ${yTranslate}px, ${z}px) scale(${scale})`,
  });

  return <animated.div style={style} />;
}

Square.propTypes = {
  size: PropTypes.number.isRequired,
  bgColor: PropTypes.string.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  yTranslate: PropTypes.number,
};
