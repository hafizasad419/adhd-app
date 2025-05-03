import { ADHD_APP_ACCESS } from "@src/constants.js";
import { toast } from 'react-hot-toast';


export const getToken = () => {
    let token = localStorage.getItem(ADHD_APP_ACCESS);
    if (token) {
        return JSON.parse(token).accessToken;
    } else {
        return false;
    }
}


export const getAuthUser = () => {
    let token = localStorage.getItem(ADHD_APP_ACCESS);
    if (token) {
        return JSON.parse(token).user;
    } else {
        return false;
    }
}


export const setToken = (access_token) => {
    localStorage.setItem(ADHD_APP_ACCESS, JSON.stringify(access_token));
}

export const removeToken = () => {
    localStorage.removeItem(ADHD_APP_ACCESS);
}


export const SuccessNotification = (message = 'Success!') => {
    toast.success(message, {
        duration: 4000,
        position: 'top-right',
        style: {
            background: '#10b981', // Tailwind green-500
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontWeight: 500,
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
        },
    });
};

export const ErrorNotification = (message = 'Something went wrong') => {
    toast.error(message, {
        duration: 5000,
        position: 'top-right',
        style: {
            background: '#ef4444', // Tailwind red-500
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            fontWeight: 500,
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
        },
    });
};



 export const formatDateOfBirthInput = (value) => {
        // Remove non-digit characters
        const digitsOnly = value.replace(/\D/g, '');

        // Format as YYYY-MM-DD
        const year = digitsOnly.slice(0, 4);
        const month = digitsOnly.slice(4, 6);
        const day = digitsOnly.slice(6, 8);

        let formatted = year;
        if (month) formatted += `-${month}`;
        if (day) formatted += `-${day}`;

        return formatted;
    };


export const dateFormat = /^\d{4}-\d{2}-\d{2}$/;  // RegEx for YYYY-MM-DD 
