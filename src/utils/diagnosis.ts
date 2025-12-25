import { Question, Answers, Scores, MaskTypeCode, AnswerLevel } from "../types/diagnosis";

function getScoreWeight(level: AnswerLevel): { aScore: number; bScore: number } {
  switch (level) {
    case 1:
      return { aScore: 5, bScore: 0 };
    case 2:
      return { aScore: 3, bScore: 0 };
    case 3:
      return { aScore: 1, bScore: 0 };
    case 4:
      return { aScore: 0, bScore: 1 };
    case 5:
      return { aScore: 0, bScore: 3 };
    case 6:
      return { aScore: 0, bScore: 5 };
  }
}

export function calculateScores(questions: Question[], answers: Answers): Scores {
  const scores: Scores = {
    tension: { S: 0, M: 0 },
    position: { F: 0, B: 0 },
    distance: { C: 0, G: 0 },
    work: { P: 0, Q: 0 }
  };

  questions.forEach((question) => {
    const answerLevel = answers[question.id];
    if (!answerLevel) return;

    const { aScore, bScore } = getScoreWeight(answerLevel);
    const aTypeCode = question.options.A.typeCode;
    const bTypeCode = question.options.B.typeCode;

    switch (question.axis) {
      case "tension":
        if (aTypeCode === "S" || aTypeCode === "M") {
          scores.tension[aTypeCode] += aScore;
        }
        if (bTypeCode === "S" || bTypeCode === "M") {
          scores.tension[bTypeCode] += bScore;
        }
        break;
      case "position":
        if (aTypeCode === "F" || aTypeCode === "B") {
          scores.position[aTypeCode] += aScore;
        }
        if (bTypeCode === "F" || bTypeCode === "B") {
          scores.position[bTypeCode] += bScore;
        }
        break;
      case "distance":
        if (aTypeCode === "C" || aTypeCode === "G") {
          scores.distance[aTypeCode] += aScore;
        }
        if (bTypeCode === "C" || bTypeCode === "G") {
          scores.distance[bTypeCode] += bScore;
        }
        break;
      case "work":
        if (aTypeCode === "P" || aTypeCode === "Q") {
          scores.work[aTypeCode] += aScore;
        }
        if (bTypeCode === "P" || bTypeCode === "Q") {
          scores.work[bTypeCode] += bScore;
        }
        break;
    }
  });

  return scores;
}

export function determineTypeCode(scores: Scores): MaskTypeCode {
  const tension = scores.tension.S >= scores.tension.M ? "S" : "M";
  const position = scores.position.F >= scores.position.B ? "F" : "B";
  const distance = scores.distance.C >= scores.distance.G ? "C" : "G";
  const work = scores.work.P >= scores.work.Q ? "P" : "Q";

  return `${tension}${position}${distance}${work}` as MaskTypeCode;
}

export function isValidTypeCode(code: string): code is MaskTypeCode {
  const validCodes: MaskTypeCode[] = [
    "SFCP", "SFCQ", "SFGP", "SFGQ",
    "SBCP", "SBCQ", "SBGP", "SBGQ",
    "MFCP", "MFCQ", "MFGP", "MFGQ",
    "MBCP", "MBCQ", "MBGP", "MBGQ"
  ];
  return validCodes.includes(code as MaskTypeCode);
}
