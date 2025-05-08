"use client";

import { Button } from "@/components/ui/button";
import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  List,
  ListCheck,
  ListOrdered,
  PaintBucket,
  Redo2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import HeadingPicker from "./Components/HeadingPicker";
import { SlashCommand } from "./Components/SlashCommand";

const TiptapPro = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-gray max-w-none min-h-screen h-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-primary",
      },
    },
    extensions: [
      // 1) Disable built-in lists so we can re-add them manually
      StarterKit.configure({
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        listItem: false,
      }),

      // 2) Re-register bullet + ordered lists
      BulletList.configure({
        HTMLAttributes: { class: "list-disc ml-2 px-4" },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal ml-2 px-4" },
      }),
      ListItem.configure({ HTMLAttributes: { class: "px-2 py-1" } }),

      // 3) Other formatting marks
      Underline,
      TextStyle,
      Color,
      Highlight,
      Heading.configure({
        levels: [1, 2, 3, 4],
        HTMLAttributes: { class: "my-4" },
      }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),

      // 4) Media & tables
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,

      // 5) Task/checkbox list
      TaskList.configure({ HTMLAttributes: { class: "flex flex-col gap-2" } }),
      TaskItem.configure({
        nested: true,
        HTMLAttributes: { class: "flex items-start gap-2 mb-2" },
      }),

      // 6) Your slash-command menu
      SlashCommand,
    ],
    content: "<p>Welcome to the Pro Editor! 🚀</p>",
  });

  if (!editor) return null;

  //   const setLink = () => {
  //     const url = window.prompt("Enter URL");
  //     if (url)
  //       editor
  //         .chain()
  //         .focus()
  //         .extendMarkRange("link")
  //         .setLink({ href: url })
  //         .run();
  //   };
  //   const setImage = () => {
  //     const url = window.prompt("Enter Image URL");
  //     if (url) editor.chain().focus().setImage({ src: url }).run();
  //   };

  return (
    <div className="border rounded-md p-4 space-y-3">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>
        <Button
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>
        <Button
          variant={editor.isActive("underline") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </Button>
        <HeadingPicker editor={editor} />
        <Button
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </Button>
        <Button
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </Button>
        <Button
          variant={editor.isActive("taskList") ? "secondary" : "ghost"}
          size="icon"
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <ListCheck size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 size={16} />
        </Button>
        {/* <Button variant="ghost" size="icon" onClick={setLink}>
          <Link2 size={16} />
        </Button>
        <Button variant="ghost" size="icon" onClick={setImage}>
          <ImageIcon size={16} />
        </Button> */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "yellow" }).run()
          }
        >
          <PaintBucket size={16} />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapPro;
