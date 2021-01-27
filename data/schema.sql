CREATE TABLE "teams" (
  "teamName" varchar,
  "teamAbbrv" varchar PRIMARY KEY,
  "teamState" varchar,
  "teamCity" varchar
);

CREATE TABLE "players" (
  "playerName" varchar PRIMARY KEY,
  "position" varchar
);

CREATE TABLE "rosters" (
  "teamName" varchar PRIMARY KEY,
  "playerName" varchar,
  "year" integer,
  "salary" double
);

CREATE TABLE "resultsSB" (
  "yearSB" varchar PRIMARY KEY,
  "winner" varchar,
  "loser" varchar,
  "winnerScore" integer,
  "loserScore" integer,
  "neilsenRating" integer
);

CREATE TABLE "positions" (
  "position" varchar PRIMARY KEY,
  "offenseDefense" varchar
);

ALTER TABLE "players" ADD FOREIGN KEY ("position") REFERENCES "positions" ("position");

ALTER TABLE "rosters" ADD FOREIGN KEY ("teamName") REFERENCES "teams" ("teamName");

ALTER TABLE "players" ADD FOREIGN KEY ("playerName") REFERENCES "rosters" ("playerName");

ALTER TABLE "resultsSB" ADD FOREIGN KEY ("winner") REFERENCES "rosters" ("teamName");

ALTER TABLE "resultsSB" ADD FOREIGN KEY ("loser") REFERENCES "rosters" ("teamName");
