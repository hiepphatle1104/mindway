import { IconButton } from "@radix-ui/themes";
import { Mic, Volume2 } from "lucide-react";

const Sounds = () => {
  return (
    <div className="absolute top-2.5 right-13 z-10 flex flex-col items-center justify-center gap-3 bg-white p-1.5 border-2 border-neutral-400 rounded-sm">
      <IconButton variant="ghost" color="gray">
        <Mic size={18} />
      </IconButton>
      <IconButton variant="ghost" color="gray">
        <Volume2 size={18} />
      </IconButton>
    </div>
  );
};

export default Sounds;
