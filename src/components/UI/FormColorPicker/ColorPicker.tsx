import { useState, useEffect } from 'react';
import { ColorPicker as MUIColorPicker } from 'material-ui-color';
import { HexColor } from 'utils/colors';
import debounce from 'lodash/debounce';

interface Props {
  value: HexColor;
  setValue: (value: HexColor) => void;
  defaultColor?: HexColor;
}

type Raw = string | number | object | string[] | number[];

type ColorObject = {
  css: React.CSSProperties;
  value: number;
  hex: string;
  raw: Raw
  name: string;
  alpha: number;
  rgb: [number, number, number];
  hsv: [number, number, number];
  hsl: [number, number, number];
};

function FormColorPicker({ value, setValue, defaultColor }: Props) {
  const [currentColor, setColor] = useState<any>();
  
  useEffect(() => {
    const selected = value || defaultColor;
    setColor(selected);
  }, [value]);

  // make the colorpicker to work with the object format
  // to user be able to change input value
  const setNewColor = (color: ColorObject) => {
    // object color defined internally
    setColor(color);
    // string setted on form
    setValue(`#${color?.hex}`);
  };

  // prevent to freeze sometimes
  const onSelectColor = debounce(setNewColor, 100);

  return (
    <MUIColorPicker
      onChange={onSelectColor}
      value={currentColor}
      hideTextfield
      disableAlpha
      disablePlainColor
      defaultValue={"#FF0000"}
    />
  );
}

export default FormColorPicker;
