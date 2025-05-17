export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: IS_PRODUCTION,
    // sameSite: "strict",
    // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days //deprecated
    // signed: true
}

export const ROLES = {
    ADMIN: "admin",
    USER: "user",
}

export const DATE_FORMAT_REGEX = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
export const DATE_FORMAT_STRING = "MM-dd-yyyy";
export const USER_TYPES = [
  "client",
  "non-client"
]




export const SYMPTOMS = [
  {
    id: "hyperactivity",
    name: "Hyperactivity",
    category: "behavioral",
  },
  {
    id: "impulsivity",
    name: "Impulsivity / acts without thinking",
    category: "behavioral",
  },
  {
    id: "attention",
    name: "Trouble paying attention / staying focused",
    category: "behavioral",
  },
  {
    id: "forgetful",
    name: "Forgetful / loses things",
    category: "behavioral",
  },
  {
    id: "anxiety",
    name: "Anxiety / worry",
    category: "behavioral",
  },
  {
    id: "mood",
    name: "Sad / moody",
    category: "behavioral",
  },
  {
    id: "irritable",
    name: "Irritable / angry",
    category: "behavioral",
  },
  {
    id: "rude",
    name: "Rude / cruel / hateful",
    category: "behavioral",
  },
  {
    id: "tantrums",
    name: "Tantrums",
    category: "behavioral",
  },
  {
    id: "aggression",
    name: "Physical aggression",
    category: "physical",
  },
  {
    id: "disobedient",
    name: "Disobedient / defiance",
    category: "behavioral",
  },
  {
    id: "sleep",
    name: "Sleep problems",
    category: "physical",
  },
  {
    id: "eating",
    name: "Picky Eating",
    category: "physical",
  },
  {
    id: "gas",
    name: "Gut Symptoms - Gas or bloating",
    category: "physical",
  },
  {
    id: "constipation",
    name: "Gut Symptoms - Constipation",
    category: "physical",
  },
  {
    id: "diarrhea",
    name: "Gut Symptoms - Diarrhea",
    category: "physical",
  },
  {
    id: "itching",
    name: "Skin - Itching",
    category: "physical",
  },
  {
    id: "flushing",
    name: "Skin - Blushing / Flushing",
    category: "physical",
  },
  {
    id: "eczema",
    name: "Skin - Eczema",
    category: "physical",
  },
  {
    id: "urinating",
    name: "Urinating more at night",
    category: "physical",
  },
  {
    id: "wheezing",
    name: "Wheezing",
    category: "physical",
  },
  {
    id: "other",
    name: "Other symptom not listed",
    category: "physical",
  },
]

