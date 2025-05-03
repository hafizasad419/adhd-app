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


