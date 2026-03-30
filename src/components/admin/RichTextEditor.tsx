"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Escribe el contenido del post..." }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `editor/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, file);
      if (error) {
        alert("Error uploading image: " + error.message);
        return;
      }
      const { data: urlData } = supabase.storage.from("blog-images").getPublicUrl(path);
      editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div style={{ border: "1.5px solid var(--border)", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
      {/* Toolbar */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: "8px 12px",
        borderBottom: "1.5px solid var(--border)",
        background: "var(--bg-alt)",
      }}>
        <ToolbarBtn
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
          style={{ fontWeight: 700 }}
        />
        <ToolbarBtn
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
          style={{ fontStyle: "italic" }}
        />
        <div style={{ width: 1, background: "var(--border)", margin: "0 6px" }} />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          label="H1"
        />
        <ToolbarBtn
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H2"
        />
        <div style={{ width: 1, background: "var(--border)", margin: "0 6px" }} />
        <ToolbarBtn
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="• List"
        />
        <ToolbarBtn
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />
        <ToolbarBtn
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label="❝"
        />
        <div style={{ width: 1, background: "var(--border)", margin: "0 6px" }} />
        <ToolbarBtn
          active={editor.isActive("link")}
          onClick={setLink}
          label="🔗"
        />
        <ToolbarBtn
          active={false}
          onClick={addImage}
          label="🖼"
        />
      </div>

      {/* Editor area */}
      <style>{`
        .tiptap-editor .tiptap {
          padding: 20px;
          min-height: 300px;
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-secondary);
          outline: none;
        }
        .tiptap-editor .tiptap h1 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; margin: 24px 0 12px; color: var(--text-primary); }
        .tiptap-editor .tiptap h2 { font-family: var(--font-serif); font-size: 22px; font-weight: 600; margin: 20px 0 10px; color: var(--orange); }
        .tiptap-editor .tiptap p { margin: 0 0 12px; }
        .tiptap-editor .tiptap ul, .tiptap-editor .tiptap ol { padding-left: 24px; margin: 0 0 12px; }
        .tiptap-editor .tiptap blockquote { border-left: 3px solid var(--orange); padding-left: 16px; margin: 16px 0; color: var(--text-muted); font-style: italic; }
        .tiptap-editor .tiptap a { color: var(--orange); text-decoration: underline; }
        .tiptap-editor .tiptap img { max-width: 100%; border-radius: 8px; margin: 16px 0; }
        .tiptap-editor .tiptap p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: var(--text-muted); pointer-events: none; float: left; height: 0; }
      `}</style>
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function ToolbarBtn({
  active, onClick, label, style,
}: {
  active: boolean; onClick: () => void; label: string; style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 10px",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        fontSize: 13,
        fontWeight: 600,
        background: active ? "rgba(232,112,8,0.15)" : "transparent",
        color: active ? "#E87008" : "var(--text-secondary)",
        transition: "all 0.15s",
        ...style,
      }}
    >
      {label}
    </button>
  );
}
