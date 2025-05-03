export const MONTHS_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]


export const IS_PRODUCTION =
    import.meta.env.VITE_ENV === "development" ? false : true



export const BASE_URL = IS_PRODUCTION ?
    "https://adhd-app.vercel.app/api/v1" :
    "http://localhost:5000/api/v1"


export const ADHD_APP_ACCESS = "adhd-app-access"


export const GENDERS = [
    "Prefer not to say",
    "Male",
    "Female",
    "Other"
]


export const USER_STORAGE_KEYS = {
  user: "USER_APP_ACCESS",
  admin: "ADMIN_APP_ACCESS",
};

export const ACTIVE_USER_ROLE_KEY = "ACTIVE_USER_ROLE";



/**
 * Constant data for symptoms and their categories
 */
export const SYMPTOMS = [
    {
      id: "hyperactivity",
      name: "Hyperactivity",
      category: "Behavioral",
      defaultValue: 1,
    },
    {
      id: "impulsivity",
      name: "Impulsivity / acts without thinking",
      category: "Behavioral",
      defaultValue: 6,
    },
    {
      id: "attention",
      name: "Trouble paying attention / staying focused",
      category: "Behavioral",
      defaultValue: 6,
    },
    {
      id: "forgetful",
      name: "Forgetful / loses things",
      category: "Behavioral",
      defaultValue: 3,
    },
    {
      id: "anxiety",
      name: "Anxiety / worry",
      category: "Behavioral",
      defaultValue: 8,
    },
    {
      id: "mood",
      name: "Sad / moody",
      category: "Behavioral",
      defaultValue: 9,
    },
    {
      id: "irritable",
      name: "Irritable / angry",
      category: "Behavioral",
      defaultValue: 2,
    },
    {
      id: "rude",
      name: "Rude / cruel / hateful",
      category: "Behavioral",
      defaultValue: 2,
    },
    {
      id: "tantrums",
      name: "Tantrums",
      category: "Behavioral",
      defaultValue: 10,
    },
    {
      id: "aggression",
      name: "Physical aggression",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "disobedient",
      name: "Disobedient / defiance",
      category: "Behavioral",
      defaultValue: 10,
    },
    {
      id: "sleep",
      name: "Sleep problems",
      category: "Physical",
      defaultValue: 10,
    },
    {
      id: "eating",
      name: "Picky Eating",
      category: "Physical",
      defaultValue: 6,
    },
    {
      id: "gas",
      name: "Gut Symptoms - Gas or bloating",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "constipation",
      name: "Gut Symptoms - Constipation",
      category: "Physical",
      defaultValue: 2,
    },
    {
      id: "diarrhea",
      name: "Gut Symptoms - Diarrhea",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "itching",
      name: "Skin - Itching",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "flushing",
      name: "Skin - Blushing / Flushing",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "eczema",
      name: "Skin - Eczema",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "urinating",
      name: "Urinating more at night",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "wheezing",
      name: "Wheezing",
      category: "Physical",
      defaultValue: 1,
    },
    {
      id: "other",
      name: "Other symptom not listed",
      category: "Physical",
      defaultValue: 1,
    },
  ]



