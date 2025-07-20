import React, { CSSProperties } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

interface TiptapEditorProps {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  style?: CSSProperties;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content = "",
  onChange,
  placeholder = "Nhập nội dung đánh giá.",
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "8px",
        borderRadius: "4px",
        minHeight: "150px",
      }}
    >
      <EditorContent editor={editor} />
    </div>
  );
};
