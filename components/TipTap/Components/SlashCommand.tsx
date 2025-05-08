import { Editor, Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export const SlashCommand = Extension.create({
  name: "slash-command",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: true,
        items: ({ query }: { query: string }) => {
          return [
            {
              label: "Heading 1",
              command: ({ editor }: { editor: Editor }) =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
            },
            {
              label: "Heading 2",
              command: ({ editor }: { editor: Editor }) =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
            },
            {
              label: "Bullet List",
              command: ({ editor }: { editor: Editor }) =>
                editor.chain().focus().toggleBulletList().run(),
            },
            {
              label: "Ordered List",
              command: ({ editor }: { editor: Editor }) =>
                editor.chain().focus().toggleOrderedList().run(),
            },
            {
              label: "Code Block",
              command: ({ editor }: { editor: Editor }) =>
                editor.chain().focus().toggleCodeBlock().run(),
            },
          ].filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
          );
        },
        render: () => {
          // You can build a dropdown menu here (like Notion)
          return {};
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});
