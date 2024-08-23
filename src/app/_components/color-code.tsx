const colorCodes = [
  {
    color: "bg-yellow-400",
    meaning: "Påbegynt",
  },
  {
    color: "bg-blue-400",
    meaning: "Sendt inn",
  },
  {
    color: "bg-green-400",
    meaning: "Godkjent",
  },
];

export const ColorCode = () => {
  return (
    <div className="flex justify-center gap-2">
      {colorCodes.map((color) => (
        <div key={color.color} className="flex items-center gap-1">
          <div className={`h-5 w-5 rounded-full ${color.color} `}></div>
          <div className="text-white">{color.meaning}</div>
        </div>
      ))}
    </div>
  );
};
