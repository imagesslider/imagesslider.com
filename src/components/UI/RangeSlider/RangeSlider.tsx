import React, { FC } from "react";
import "../RangeSlider/RangeSlider.css";

export type RangeSliderType = {
  title?: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: Object;
};

const RangeSlider: FC<RangeSliderType> = ({
  title,
  value,
  onMouseEnter,
  onMouseLeave,
  onChange,
  style,
}) => {
  return (
    <div
      className="range_slider_container"
      title={title}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
    >
      <p className="range_slider_title">{value?.toString().slice(0, -3)} s</p>
      <input
        type="range"
        min="1000"
        max="60000"
        step="1000"
        value={value}
        className="range_slider"
        onChange={onChange}
      />
    </div>
  );
};

export default RangeSlider;
