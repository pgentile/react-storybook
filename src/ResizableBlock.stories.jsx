import ResizableBlock from "./ResizableBlock";

export default {
  title: "ResizableBlock",
  component: ResizableBlock,
};

export const main = () => {
  const breakpoints = [
    {
      name: "M",
      minWidth: 600,
    },
    {
      name: "L",
      minWidth: 800,
    },
    {
      name: "XL",
      minWidth: 1100,
    },
  ];

  return (
    <div style={{ maxWidth: "1000px" }}>
      <ResizableBlock defaultBreakpoint="S" breakpoints={breakpoints}>
        {(breakpoint) => {
          return (
            <div style={{ border: "2px dotted red", padding: "10px" }}>
              Breakpoint: <b>{breakpoint}</b>
            </div>
          );
        }}
      </ResizableBlock>
    </div>
  );
};
