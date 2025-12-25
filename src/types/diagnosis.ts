export type TensionType = "S" | "M";
export type PositionType = "F" | "B";
export type DistanceType = "C" | "G";
export type WorkType = "P" | "Q";

export type AxisType = "tension" | "position" | "distance" | "work";
export type TypeCode = TensionType | PositionType | DistanceType | WorkType;

export type MaskTypeCode =
  | "SFCP" | "SFCQ" | "SFGP" | "SFGQ"
  | "SBCP" | "SBCQ" | "SBGP" | "SBGQ"
  | "MFCP" | "MFCQ" | "MFGP" | "MFGQ"
  | "MBCP" | "MBCQ" | "MBGP" | "MBGQ";

export interface QuestionOption {
  text: string;
  typeCode: TypeCode;
}

export interface Question {
  id: number;
  axis: AxisType;
  text: string;
  options: {
    A: QuestionOption;
    B: QuestionOption;
  };
}

export interface MaskTypeDefinition {
  code: MaskTypeCode;
  name: string;
  shortLabel: string;
  description: string;
  image?: string;
  axesSummary: {
    tension: "Sunny" | "Moon";
    position: "Front" | "Back";
    distance: "Close" | "Guard";
    work: "Persistent" | "Quick";
  };
  details?: {
    characteristics?: string[];
    behaviors?: string[];
    risks?: string[];
    compatibility?: {
      good?: string[];
      moderate?: string[];
      challenging?: string[];
    };
    tips?: string[];
  };
  article?: {
    opening: string;
    strengths: {
      title: string;
      items: string[];
    };
    weaknesses: {
      title: string;
      items: string[];
    };
    workplaceHabits: {
      colleague: {
        description: string;
        examples: string[];
      };
      subordinate: {
        description: string;
        examples: string[];
      };
      leader: {
        description: string;
        examples: string[];
      };
    };
    careerPaths: {
      strengths: string[];
      challenges: string;
    };
    conclusion: string;
  };
}

export interface AxisScore {
  S: number;
  M: number;
}

export interface Scores {
  tension: { S: number; M: number };
  position: { F: number; B: number };
  distance: { C: number; G: number };
  work: { P: number; Q: number };
}

export type AnswerLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Answers = Record<number, AnswerLevel>;
