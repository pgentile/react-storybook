import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import ResizeObserver from "resize-observer-polyfill";

import bemModifiers from "./utils/bemModifiers";

import "./AutoResizeMenu.scss";

export default function AutoResizeMenu() {
  const listRef = useRef();

  const [listRightPosition, setListRightPosition] = useState(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const [list] = entries;
      const clientRect = list.target.getBoundingClientRect();
      setListRightPosition(clientRect.right);
    });
    resizeObserver.observe(listRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const handleShowItem = useCallback((index) => {
    console.info("Show", index);
  }, []);

  const handleHideItem = useCallback((index) => {
    console.info("Hide", index);
  }, []);
  return (
    <>
      <div className="auto-resize-menu">
        <ul className="auto-resize-menu__list" ref={listRef}>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={0}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 1
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={1}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 2
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={2}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 3
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={3}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 4
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={4}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 5
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={5}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 6
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={6}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 7
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={7}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 8
          </AutoResizeMenuItem>
          <AutoResizeMenuItem
            listRightPosition={listRightPosition}
            index={8}
            onShow={handleShowItem}
            onHide={handleHideItem}
          >
            Item 9
          </AutoResizeMenuItem>
        </ul>
        <div className="auto-resize-menu__more auto-resize-menu__more-hidden">&hellip;</div>
      </div>
    </>
  );
}

AutoResizeMenu.propTypes = {};

function AutoResizeMenuItem({ listRightPosition, children, index, onShow, onHide }) {
  const itemRef = useRef();

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (listRightPosition !== null && itemRef.current) {
      const itemRect = itemRef.current.getBoundingClientRect();
      setHidden(itemRect.right > listRightPosition);
    }
  }, [listRightPosition]);

  useEffect(() => {
    const callback = hidden ? onHide : onShow;
    callback(index);
  }, [index, hidden, onShow, onHide]);

  const className = bemModifiers("auto-resize-menu__item", {
    hidden,
  });

  return (
    <li ref={itemRef} className={className}>
      {children}
    </li>
  );
}

AutoResizeMenuItem.propTypes = {
  listRightPosition: PropTypes.number,
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  onShow: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};
