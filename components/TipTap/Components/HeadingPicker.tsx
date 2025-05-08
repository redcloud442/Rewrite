import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Editor } from "@tiptap/react";
import { Heading1, Heading2, Heading3, Heading4 } from "lucide-react";

const HeadingPicker = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  // get the active heading level (or 0 if none)
  const activeLevel =
    [1, 2, 3, 4].find((lvl) => editor.isActive("heading", { level: lvl })) || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* show H1–H4 icon based on activeLevel, or a generic “H” when no heading */}
          {activeLevel === 1 && <Heading1 size={16} />}
          {activeLevel === 2 && <Heading2 size={16} />}
          {activeLevel === 3 && <Heading3 size={16} />}
          {activeLevel === 4 && <Heading4 size={16} />}
          {activeLevel === 0 && <>H</>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Heading level</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {[1, 2, 3, 4].map((level) => (
          <DropdownMenuItem
            key={level}
            onSelect={(e) => {
              // prevent the menu from auto-closing before we run the command
              e.preventDefault();
              editor.chain().focus().toggleHeading({ level }).run();
            }}
          >
            Heading {level}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeadingPicker;
