import { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import Box from '@material-ui/core/Box';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
// import colours from './colours';
import 'react-quill/dist/quill.snow.css';
import { styled } from '@material-ui/core/styles';

const EMPTY_DELTA = { ops: [] };

export const WrapperEditor = styled(Box)({
  width: 765,
  marginBottom: 40,
  position: 'relative',
  height: 60,
  '& > .quill > .ql-container > .ql-editor': {
    maxHeight: '76px !important',
    fontFamily: 'Open Sans',
    background: '#F9F9F9',
    paddingBottom: 22,
  },
  '& > .ql-container': {
    maxHeight: 50
  },
  '& .ql-editor span': {
    fontFamily: 'Open Sans',
  },
  '& .ql-editor .ql-container.ql-snow': {
    background: '#F9F9F9 !important',
    borderRadius: 10,
    border: '0px solid #d32f2f !important',
    height: '90px !important',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
  // hide toolbar
  '& div.ql-toolbar .ql-snow': {
    height: '1px !important',
    padding: 0,
    border: 0,
    borderTop: '1px solid #ccc'
  },
  // customize placeholder
  '& div.ql-editor.ql-blank::before': {
    fontStyle: 'normal',
    color: '#808689',
    fontWeight: 400,
  }
});

export const WhiteTextEditor = styled(WrapperEditor)({
  '& > .quill > .ql-container > .ql-editor': {
    maxHeight: '76px !important',
    fontFamily: 'Open Sans',
    background: '#fcfcfc',
    paddingBottom: 22,
  },
  '& .ql-editor .ql-container.ql-snow': {
    background: '#fcfcfc !important',
    borderRadius: 10,
    border: '0px solid #fcfcfc !important',
    height: '90px !important',
    fontFamily: 'Open Sans',
    fontSize: 14,
  },
});

const AmountOfCharacters = styled(Box)({
  fontFamily: 'Open Sans',
  fontSize: 12,
  color: 'rgba(0, 0, 0, 0.58)',
  textAlign: 'right',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 16
});

type Props = {
  onAfterChange?: (value?: string, textLength?: number, maxLength?: number) => void;
  defaultContent?: string;
  maxLength?: number;
  readOnly?: boolean;
  customStyles?: any;
  placeholder?: string;
  shouldReset?: boolean;
  setRef?: (ref: any) => void;
  stylesOfAmountOfCharacters?: any;
  activePlaceholder?: string;
  isWhiteEditor?: boolean;
};

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};


const TextEditor = ({
  onAfterChange,
  defaultContent,
  maxLength,
  readOnly,
  customStyles,
  shouldReset,
  setRef,
  activePlaceholder,
  isWhiteEditor = false
}: Props) => {
  const textEditor: any = useRef();

  const [state, setState] = useState<any>({
    theme: '',
    enabled: true,
    readOnly: false,
    value: EMPTY_DELTA,
    events: [],
    selection: '',
    htmlContent: '',
    pristine: false,
    isValid: true,
  });
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const [focus, setFocus] = useState<boolean>(false);
  const emojiRef = useRef<null | HTMLDivElement>(null);
  useOnClickOutside(emojiRef, () => setShowSelector(!showSelector));

  let border;
  if (!(readOnly || state.readOnly)) {
  if (focus) {
    border = '2px solid #0077C8';
  }
  if (maxLength !== undefined && Number.isInteger(maxLength)) {
    if (state.textLength > maxLength) {
      border = '2px solid #d32f2f';
    }
  }
  }
  // border = focus ? '2px solid #0077C8' : undefined;
  const style = {
    marginTop: 20,
    marginBottom: 20,

    padding: 2,

    flexShrink: 1,
    flex: 1,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: 100,

    background: '#F9F9F9',
    color: '#808689',

    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: 400,

    cursor: 'text',

    borderRadius: 8,
    border,
    transition: 'border-color 0.3s ease-in-out',
  };

  const handleAdd = () => {
    setShowSelector(!showSelector);
  };

  useEffect(() => {
    // check the current max length and make it invalid when character limit exceed the maximum
    if (maxLength && state.textLength > maxLength && state.isValid) {
      setState((oldState) => ({
        ...oldState,
        isValid: false
      }));
    }
  }, [maxLength, state.textLength, state.isValid, state.pristine]);

  useEffect(() => {
    // check the current max length and make it invalid when character limit exceed the maximum
    if (shouldReset) {
      setState((oldState) => ({
        ...oldState,
        pristine: true
      }));
      // textEditor?.current.getEditor().clipboard.dangerouslyPasteHTML('');
    }
  }, [state.isValid, state.pristine]);

  useEffect(() => {
    if (textEditor) {
      setRef?.(textEditor);
    }
  }, [textEditor]);

  useEffect(() => {
    if (defaultContent && textEditor?.current && !state.pristine) {
      setState((oldState) => ({
        ...oldState,
        pristine: false,
        value: { ops: [{ insert: defaultContent }] },
      }));
      textEditor?.current.getEditor().clipboard.dangerouslyPasteHTML(defaultContent);
    }
    // update the default content when text editor is readyOnly
    if (defaultContent && textEditor?.current && readOnly) {
      setState((oldState) => ({
        ...oldState,
        pristine: false,
        value: { ops: [{ insert: defaultContent }] },
      }));
      textEditor?.current.getEditor().clipboard.dangerouslyPasteHTML(defaultContent);
    }
  }, [defaultContent, textEditor]);

  const onEditorChange = (value, delta, source, editor) => {
    const textLength = editor?.getText()?.replaceAll('\n', '')?.length;

    setState((oldState) => ({
      ...oldState,
      isValid: true,
      pristine: true,
      htmlContent: value,
      textLength,
      value: editor.getContents(),
      events: [`[${source}] text-change`, ...state.events],
    }));

    onAfterChange?.(value, textLength, maxLength);
  };

  const handleSelect = (emoji) => {
    const editor = textEditor.current?.getEditor();
    if (editor) {
      const range = editor ? editor.getSelection() : { index: 0 };
      const position = range ? range.index : 0;
      const textArr: string[] = Array.from(editor.getText().replace(/(\r\n|\n|\r)/gm, ""));
      let i = 0;
      let posToInsert = position;
      // Emojis are 2 chars long. 
      // Find the right place to insert the emoji
      textArr.forEach((str, index) => {
        if (i < position) {
          i = i + str.length;
          // Start inserting (splice) after this array element
          posToInsert = index + 1;
        }
      });
      textArr.splice(posToInsert, 0, emoji.native);
      editor.setText(textArr.join(''));
      editor.setSelection(position + emoji.native.length, 0);
    }
    setShowSelector(false);
  };

  const TextEditorComponent = isWhiteEditor ? WhiteTextEditor : WrapperEditor;

  return (
    <TextEditorComponent style={({
      ...style, ...customStyles,
    } || {})}>
      {state.enabled && (
        <ReactQuill
          ref={textEditor}
          theme={state.theme}
          value={state.value}
          readOnly={readOnly || state.readOnly}
          onChange={onEditorChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder={activePlaceholder}
          modules={{
            toolbar: [
              // [{ 'header': [1, 2, 3, 4, false] }],
              // [{ 'font': [] }],
              // [{ 'align': [] }],
              // ['bold', 'italic', 'underline', 'strike'],
              // [{ 'color': colours }], // , { 'background': ['#ccc'] }
              // [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              // [{ 'indent': '-1'}, { 'indent': '+1' }],
              // ['link', 'image'],
              // [{ 'direction': 'rtl' }],
            ]
          }} />
      )}
      {!readOnly ? (
        <AmountOfCharacters style={{ color: !state.isValid ? '#d32f2f' : '#808689' }}>
          <Box style={{ position: 'relative' }}>

            <Box style={{ cursor: 'pointer' }} onClick={handleAdd}>
              <InsertEmoticonOutlinedIcon />
            </Box>
            {
              showSelector
                ? <Box style={{ position: 'absolute', top: '100%', left: 0, zIndex: 999 }}>
                  <div ref={emojiRef}>
                    <Picker data={data} onEmojiSelect={handleSelect} theme="light" />
                  </div>
                </Box>
                : ''
            }
          </Box>
          {maxLength ? (state.textLength || 0) + '/' + maxLength + ' characters' : ''}
        </AmountOfCharacters>
      ) : null}
    </TextEditorComponent>
  );
};

export const CustomTextEditor = styled(TextEditor)({
  '& .ql-editor': {
    height: 60,
    fontFamily: 'Open Sans !important'
  }
});

export default CustomTextEditor;
