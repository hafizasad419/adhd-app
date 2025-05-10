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


