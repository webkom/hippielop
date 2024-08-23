"use client";

import { Group } from "@prisma/client";
import { pacifico } from "./board";
import { GetAllTask } from "~/app/useUpdatedTasks";

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
        if (!acc[group.groupId]) {
          acc[group.groupId] = 0;
        }
        acc[group.groupId]! += task.points;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const scores = Object.entries(teamScores).sort((a, b) => b[1] - a[1]);
  const maxScore = scores[0]?.[1] ?? 0;

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
        {scores.map(([groupId, score]) => (
          <ScoreboardEntry
            key={groupId}
            group={groups.find((g) => g.id === groupId)!}
            score={score}
            maxScore={maxScore}
            isCurrentGroup={currentGroupId === groupId}
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
}: {
  group: Group;
  score: number;
  maxScore: number;
  isCurrentGroup: boolean;
}) => {
  return (
    <>
      <div
        className={`flex items-center rounded-l border-2 border-r-0 border-amber-900 px-1 ${isCurrentGroup ? "bg-amber-200" : ""}`}
      >
        {group.name}
      </div>
      <div
        className={`flex items-center border-2 border-l-0 border-amber-900 px-2 ${isCurrentGroup ? "bg-amber-200" : ""}`}
      >
        {score}
      </div>
      <div className="h-10 flex-grow">
        <div
          className="h-full rounded-r bg-amber-900"
          style={{
            width: `${(score / maxScore) * 100}%`,
          }}
        />
      </div>
    </>
  );
};
