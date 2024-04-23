import { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import Box from "@material-ui/core/Box";
import colours from "./colours";

import "react-quill/dist/quill.snow.css";

const EMPTY_DELTA = { ops: [] };

import { styled } from "@material-ui/core/styles";

export const WrapperEditor = styled(Box)({
  width: 864,
  position: "relative",
  background: "#fff",
  "& > .text-editor-error .ql-editor": {
    border: "1px solid #d32f2f",
  },
  "& .ql-editor ": {
    minHeight: "300px !important",
    fontFamily: "Open Sans",
    fontSize: 14,
  },
});

const AmountOfCharacters = styled(Box)({
  fontFamily: "Open Sans",
  fontSize: 12,
  color: "rgba(0, 0, 0, 0.58)",
  textAlign: "right",
  position: "absolute",
  right: 0,
  bottom: 0,
});

type Props = {
  onAfterChange?: (value: string) => void;
  defaultContent?: string;
  maxLength?: number;
  readOnly?: boolean;
  hideToolbar?: boolean;
  hideCharacters?: boolean;
  customStyles?: any;
};

const TextEditor = ({
  onAfterChange,
  defaultContent,
  maxLength,
  readOnly,
  hideToolbar,
  hideCharacters,
  customStyles,
}: Props) => {
  const textEditor: any = useRef();

  const [state, setState] = useState<any>({
    theme: "snow",
    enabled: true,
    readOnly: readOnly || false,
    value: EMPTY_DELTA,
    events: [],
    selection: "",
    htmlContent: "",
    pristine: false,
    isValid: true,
  });

  useEffect(() => {
    if (maxLength && state.textLength > maxLength) {
      setState((oldState) => ({
        ...oldState,
        isValid: false,
      }));
    } else {
      setState((oldState) => ({
        ...oldState,
        isValid: true,
      }));
    }
  }, [maxLength]);

  useEffect(() => {
    if (defaultContent && textEditor?.current && !state.pristine) {
      setState((oldState) => ({
        ...oldState,
        pristine: false,
        value: { ops: [{ insert: defaultContent }] },
      }));
      textEditor?.current
        .getEditor()
        .clipboard.dangerouslyPasteHTML(defaultContent);
    }
    // update the default content when text editor is readyOnly
    if (defaultContent && textEditor?.current && readOnly) {
      setState((oldState) => ({
        ...oldState,
        pristine: false,
        value: { ops: [{ insert: defaultContent }] },
      }));
      textEditor?.current
        .getEditor()
        .clipboard.dangerouslyPasteHTML(defaultContent);
    }
  }, [defaultContent]);

  const onEditorChange = (value, delta, source, editor) => {
    onAfterChange?.(value);

    setState((oldState) => ({
      ...oldState,
      pristine: true,
      htmlContent: value,
      textLength: editor?.getText()?.replaceAll("\n", "")?.length,
      value: editor.getContents(),
      events: [`[${source}] text-change`, ...state.events],
    }));
  };
  // !state.isValid
  return (
    <WrapperEditor style={customStyles || {}}>
      {state.enabled && (
        <ReactQuill
          className={!state.isValid ? "text-editor-error" : ""}
          ref={textEditor}
          theme={state.theme}
          value={state.value}
          readOnly={state.readOnly}
          onChange={onEditorChange}
          modules={{
            toolbar: hideToolbar
              ? false
              : [
                  [{ header: [1, 2, 3, 4, false] }],
                  [{ font: [] }],
                  [{ align: [] }],
                  [{ color: colours }], // , { 'background': ['#ccc'] }
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  [{ indent: "-1" }, { indent: "+1" }],
                  ["link", "image"],
                  [{ direction: "rtl" }],
                ],
          }}
        />
      )}

      <div style={{ paddingTop: 5 }}>
        {maxLength && state.textLength && !hideCharacters ? (
          <AmountOfCharacters
            style={{
              color: !state.isValid ? "#d32f2f" : "rgba(0, 0, 0, 0.58)",
            }}
          >
            {state.textLength}/{maxLength}
          </AmountOfCharacters>
        ) : null}
      </div>
    </WrapperEditor>
  );
};

export default TextEditor;
