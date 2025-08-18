import {
  GearIcon,
  GlobeIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { DropdownMenu, IconButton } from "@radix-ui/themes";

const options = [
  {
    title: "Settings",
    icon: GearIcon,
  },
  {
    title: "Account",
    icon: PersonIcon,
  },
  {
    title: "Maps",
    icon: RocketIcon,
  },
  {
    title: "Language",
    icon: GlobeIcon,
  },
];

const Settings = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="absolute bottom-15 right-15 z-10">
          <IconButton variant="solid" radius="full" color="cyan" size="3">
            <GearIcon />
          </IconButton>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="cyan" align="center">
        {options.map((opt) => (
          <DropdownMenu.Item>
            <opt.icon />
            {opt.title}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Settings;
