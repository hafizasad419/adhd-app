import { Admin } from "../models/admin.model.js";
import { hash } from "bcryptjs";
import { AppError } from "../utils/index.js";
import { User } from "../models/user.model.js";


export const generateAccessToken = async (
  userId,
  model,
  userType
) => {
  try {
    const user = await model.findById(userId);

    if (!user) {
      throw new Error(`${userType} not found while generating access token.`);
    }

    const accessToken = user.generateAccessToken();
    await user.save({ validateBeforeSave: false });

    return { accessToken };
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      500,
      error?.message ||
        `Something went wrong on server, while generating access token for ${userType}.`
    );
  }
};


// Sign up a new Admin
export const signupAdminService =
    async (name, email, password) => {
        try {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                throw new AppError(409, "Admin already exists.");
            }

            const hashedPassword = await hash(password, 10);

            const admin = new Admin({
                name,
                email,
                password: hashedPassword,
            });

            return await admin.save();
        } catch (error) {
            throw new AppError(500, error?.message || "Failed to create admin.");
        }
    };
//Login admin by verifying credentials

/*
- Login Admin

1. Get admin name and pass from req body.
2. Check if admin exsists - compare email
3. if admin exsists, compare his pass with pass stored in database.
5. if comparison become false, return error.
4. if comparison become successfull, return access token.
5. Send cookies

*/
export const loginAdminService = async (email, password) => {

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new AppError(404, "Admin Not Found");
    }


    const isPasswordValid = await admin.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError(401, "Invalid Password");
    }

    return admin;
};


// Sign up a new user
export const signupUserService = async (
    name,
    email,
    password,
    role,
    gender,
    dateOfBirth,
    weight
) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError(409, "User already exists.");
        }

        const user = new User({
            name,
            email,
            password,
            role,
            gender,
            dateOfBirth,
            weight
        });

        return await user.save();

    } catch (error) {
        throw new AppError(500, error.message || "Failed to create user.");
    }
};
//Login user by verifying credentials

/*
- Login User

1. Get username and pass from req body.
2. Check if user exsists - compare email
3. if user exsists, compare his pass with pass stored in database.
5. if comparison become false, return error.
4. if comparison become successfull, return access and refresh token.
5. Send cookies

*/
export const loginUserService = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError(404, "User Not Found");
    }


    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError(401, "Invalid Password");
    }

    return user;
};
