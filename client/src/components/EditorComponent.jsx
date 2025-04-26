import React, { memo, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../utils/Editor_js_tools";
import ImageTool from "@editorjs/image";

const EditorComponent = ({ handleContentChange, handleImageUpload, content }) => {
  const ref = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ref.current = editor;
      },
      autofocus: true,
      data: content || { blocks: [] },
      onChange: async () => {
        const content = await editor.saver.save();
        handleContentChange(content);
      },
      tools: {
        ...EDITOR_JS_TOOLS,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                handleImageUpload(file);
                return {
                  success: 1,
                  file: { url: URL.createObjectURL(file) },
                };
              },
            },
          },
        },
      },
    });

    ref.current = editor;
  };

  useEffect(() => {
    if (!ref.current) {
      initEditor();
    } else {
      ref.current.blocks.render(content);
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
        ref.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="w-full h-auto text-xl"></div>;
};

export default memo(EditorComponent);
