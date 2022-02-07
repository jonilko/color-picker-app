import { useEffect, useState } from "react";
import { PlainClientAPI } from "contentful-management";
import { FieldExtensionSDK } from "@contentful/app-sdk";
import { SketchPicker } from "react-color";

interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

interface Instance {
  colorPalette?: string;
}

const Field = (props: FieldProps) => {
  const [color, setColor] = useState<any>();
  const handleChange = (color: any) => {
    setColor(color);
    props.sdk.field.setValue(color);
  };

  useEffect(() => {
    props.sdk.window.startAutoResizer();
    setColor(props.sdk.field.getValue());
  }, [props.sdk.window, props.sdk.field]);

  const instance: Instance = props.sdk.parameters.instance;
  var colorPalette: any[] = [];
  if (instance.colorPalette != null && instance.colorPalette.length > 1) {
    colorPalette = instance.colorPalette?.split(",");
  }

  return (
    <SketchPicker
      color={color?.hsl}
      onChangeComplete={handleChange}
      presetColors={colorPalette}
    />
  );
};

export default Field;
