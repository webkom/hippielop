import * as ToggleGroup from "@radix-ui/react-toggle-group";

interface Props<T extends string> {
  value: T;
  onValueChange: (value: NoInfer<T>) => void;
  items: {
    value: T;
    label: string;
    disabled: boolean;
    selectedClassName?: string;
  }[];
}

export const ButtonGroup = <T extends string>({
  value,
  onValueChange,
  items,
}: Props<T>) => {
  return (
    <ToggleGroup.Root
      type="single"
      value={value}
      onValueChange={onValueChange}
      className="inline-flex overflow-hidden rounded-full border-2 text-sm ring-offset-background"
    >
      {items.map((item) => (
        <ToggleGroup.Item
          key={item.value}
          value={item.value}
          disabled={item.disabled}
          className={`border-r-2 p-2 text-primary-foreground transition-colors last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${value === item.value ? (item.selectedClassName ?? "bg-amber-500 hover:bg-amber-500/90") : "bg-primary hover:bg-primary/90"}`}
        >
          {item.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
};
