import {
    generateAccessToken,
    signupAdminService,
    loginAdminService,
    loginUserService,
    signupUserService
} from "../services/auth.service.js";
import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import { COOKIE_OPTIONS, ROLES } from "../constants.js";
import { AppError, handleError } from "../utils/index.js";
import { SECRET_KEY } from "../config/index.js";




// Signup User
export const signupUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            gender,
            dateOfBirth,
            weight
        } = req.body;
        console.log (name, email,password,role,gender,dateOfBirth,weight)

        if (!name || !email || !password || !role || !gender || !dateOfBirth || !weight) {
            throw new AppError(400, "All fields are required.")
        }


        const user = await signupUserService(
            name,
            email,
            password,
            role,
            gender,
            dateOfBirth,
            weight
        )

        // console.log("Signed Up User", user)

        res.status(201).json({
            message: "User Created Successfully",
            id: user._id.toString()
        });

    } catch (error) {
        if (error instanceof AppError) {
            handleError(res, error, error.statusCode, error.message);
        } else {
            handleError(res, error, 500, "Error While Creating User");
        }
    }
};


// Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError(400, "Email and Password are required fields.")
        }

        const user = await loginUserService(email, password);
        const { accessToken } = await generateAccessToken(user._id, User, "User");


        const loggedInUser = await User.findById(user._id).select("-password").lean()



        res.clearCookie("accessToken", COOKIE_OPTIONS)

        res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json({
                message: "Login Successful",
                user: loggedInUser,
                accessToken
            });
    }
    catch (error) {
        handleError(res, error, error instanceof AppError ? error.statusCode : 401, "Invalid Email or Password");
    }
};


// Signup Admin
export const signupAdmin = async (req, res) => {
    try {
        const { name, email, password, secretKey } = req.body;

        if (!name || !email || !password || !secretKey) {
            throw new AppError(400, "All fields are required.")
        }

        // console.log("Received Secret Key:", secretKey);
        // console.log("Loaded Secret Key:", SECRET_KEY);
        if (secretKey !== SECRET_KEY) {
            throw new AppError(401, "Invalid Secret Key");
        }

        const admin = await signupAdminService(name, email, password)

        res.status(201).json({
            message: "Admin Created Successfully",
            id: admin._id.toString()
        });

    } catch (error) {
        if (error instanceof AppError) {
            handleError(res, error, error.statusCode, error.message);
        } else {
            handleError(res, error, 500, "Error While Creating Admin");
        }
    }
};


// Login Controller
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // if (secretKey !== SECRET_KEY) {
        //     throw new AppError(401, "Invalid Secret Key");
        // }

        const admin = await loginAdminService(email, password);
        const { accessToken } = await generateAccessToken(admin._id, Admin, "Admin");


        const loggedInAdmin = await Admin
            .findById(admin._id)
            .select("-password")
            .lean()


        res.clearCookie("accessToken", COOKIE_OPTIONS)

        res.status(200)
            .cookie("accessToken", accessToken, COOKIE_OPTIONS)
            .json({
                message: "Login Successful",
                admin: loggedInAdmin,
                accessToken
            });
    }
    catch (error) {
        handleError(res, error, error instanceof AppError ? error.statusCode : 401, "Invalid Email or Password");
    }
};


// single function to handle login by invoking current controllers as functions
export const login = async (req, res) => {
    try {
        const { role } = req.body;

        if (role === ROLES.ADMIN) {
            await loginAdmin(req, res);
        }
        else if (role === ROLES.USER) {
            await loginUser(req, res);
        }
        else {
            throw new AppError(400, "Invalid User Type.");
        }
    } catch (error) {
        handleError(res, error, 500, "Error While Logging In");
    }
}


export const signup = async (req, res) => {
    try {
        const { role } = req.body;

        if (role === ROLES.ADMIN) {
            await signupAdmin(req, res);
        }
        else if (role === ROLES.USER) {
            await signupUser(req, res);
        }
        else {
            throw new AppError(400, "Invalid User Type.");
        }
    } catch (error) {
        handleError(res, error, 500, "Error While Signing Up");
    }
};


// Logout Admin
export const logoutAdmin = async (req, res) => {
    try {
        res.clearCookie("accessToken", COOKIE_OPTIONS);
        res.status(200).json({ message: "Admin Logout Successful" });
    } catch (error) {
        handleError(res, error, 500, "Error While Logging Out Admin");
    }
};


// Logout User
export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("accessToken", COOKIE_OPTIONS);
        res.status(200).json({ message: "User Logout Successful" });
    } catch (error) {
        handleError(res, error, 500, "Error While Logging Out User");
    }
};

// Single Logout Handler
export const logout = async (req, res) => {
    try {
        const { role } = req.body;

        if (role === ROLES.ADMIN) {
            await logoutAdmin(req, res);
        }
        else if (role === ROLES.USER) {
            await logoutUser(req, res);
        }
        else {
            throw new AppError(400, "Invalid User Role");
        }
    } catch (error) {
        handleError(res, error, 500, "Error While Logging Out");
    }
};
