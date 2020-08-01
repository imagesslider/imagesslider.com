//auto slider
export type ActionAUTO_SLIDER = {
  type: "AUTO_SLIDER";
  payload: boolean;
};

export const AUTO_SLIDER = "AUTO_SLIDER";
export const autoSliderAction = (autoSlider: boolean): ActionAUTO_SLIDER => ({
  type: AUTO_SLIDER,
  payload: autoSlider,
});

//interval Time
export type Action_Interval_Time_SLIDER = {
  type: "INTERVAL_TIME_SLIDER";
  payload: number;
};

export const INTERVAL_TIME_SLIDER = "INTERVAL_TIME_SLIDER";
export const intervalTimeSliderAction = (
  intervalTime: number
): Action_Interval_Time_SLIDER => ({
  type: INTERVAL_TIME_SLIDER,
  payload: intervalTime,
});

export type AllActionsSlider = ActionAUTO_SLIDER | Action_Interval_Time_SLIDER;
