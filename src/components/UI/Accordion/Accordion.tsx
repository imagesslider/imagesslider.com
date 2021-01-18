import React, { FC, useEffect, useRef, useState } from "react";
import "../../UI/Accordion/Accordion.css";

export type AccordionProps = {
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  title: string;
  children: React.ReactNode;
};

const Accordion: FC<AccordionProps> = ({
  isOpen,
  children,
  handleClick,
  title,
}) => {
  //state
  const [heightRef, setHeightRef] = useState<any>();
  let [previousCall] = useState<any>(0);
  const [resize, setResize] = useState<boolean>(false);

  //useRef
  let content = useRef<any>();

  //useEffect
  useEffect(() => {
    const unsub = setHeightRef(content.current.scrollHeight);
    return unsub;
  }, [isOpen]);

  useEffect(() => {
    if (resize) {
      setHeightRef(content.current.scrollHeight);
    }
    setResize(false);
  }, [resize]);

  useEffect(() => {
    //Debounce
    const debounce = () => {
      if (previousCall >= 0) {
        clearTimeout(previousCall);
      }
      previousCall = setTimeout(() => {
        setResize(true);
      }, 200);
    };
    window.addEventListener("resize", debounce);

    return () => {
      window.removeEventListener("resize", debounce);
    };
  }, []);

  return (
    <div className="btn-accordion-wrapper">
      <div className="btn-accordion" onClick={handleClick}>
        <strong className="accordion-title">{title}</strong>
        <i
          className={
            isOpen ? "fas fa-chevron-down" : "fas fa-chevron-down rotate"
          }
        ></i>
      </div>
      <div
        ref={content}
        style={{
          maxHeight: isOpen ? `${heightRef}px` : `0px`,
          overflow: "hidden",
          transition: "all 0.5s ease-in-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
