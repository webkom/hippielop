"use client";

import { type Group } from "@prisma/client";
import { pacifico } from "./board";
import { type GetAllTask } from "~/app/useUpdatedTasks";

const scoreboardColors = [
  { border: "border-[#f6b815]", bg: "bg-[#f6b815]" },
  { border: "border-[#2f914d]", bg: "bg-[#2f914d]" },
  { border: "border-[#d673b2]", bg: "bg-[#d673b2]" },
  { border: "border-[#eb5a21]", bg: "bg-[#eb5a21]" },
];

export const Scoreboard = ({
  tasks,
  groups,
  currentGroupId,
}: {
  tasks: GetAllTask[];
  groups: Group[];
  currentGroupId: string;
}) => {
  const teamScores = tasks.reduce(
    (acc, task) => {
      task.groups.forEach((group) => {
        if (group.status !== "completed") return;
        if (!acc[group.groupId]) acc[group.groupId] = 0;
        acc[group.groupId]! += task.points;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const groupsWithScore = groups
    .filter((group) => !group.isAdmin)
    .map((group) => ({
      ...group,
      score: teamScores[group.id] ?? 0,
    }))
    .sort((a, b) => b.score - a.score);

  const maxScore = groupsWithScore[0]?.score ?? 0;

  return (
    <div className="flex flex-col items-center">
      <h2
        className={`${pacifico.className} my-8 text-3xl text-white drop-shadow`}
      >
        Poengtavle
      </h2>
      <div
        className="grid w-full flex-col gap-y-2"
        style={{
          gridTemplateColumns: "auto auto 1fr",
        }}
      >
        {groupsWithScore.map((group, index) => (
          <ScoreboardEntry
            key={group.id}
            group={group}
            score={group.score}
            maxScore={maxScore}
            isCurrentGroup={currentGroupId === group.id}
            colors={scoreboardColors[index % scoreboardColors.length]!}
          />
        ))}
      </div>
    </div>
  );
};

const ScoreboardEntry = ({
  group,
  score,
  maxScore,
  isCurrentGroup,
  colors,
}: {
  group: Group;
  score: number;
  maxScore: number;
  isCurrentGroup: boolean;
  colors: {
    border: string;
    bg: string;
  };
}) => {
  return (
    <>
      <div
        className={`flex items-center rounded-l border-2 border-r-0 px-1 ${isCurrentGroup ? "bg-amber-100" : ""} ${colors.border}`}
      >
        {group.name}
      </div>
      <div
        className={`flex items-center border-2 border-l-0 px-2 ${isCurrentGroup ? "bg-amber-100" : ""} ${colors.border}`}
      >
        {score}
      </div>
      <div className="h-10 flex-grow">
        <div
          className={`h-full rounded-r ${colors.bg}`}
          style={{
            width: `${(score / maxScore) * 100}%`,
          }}
        />
      </div>
    </>
  );
};
