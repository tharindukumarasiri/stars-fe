import React, { useState, useEffect } from "react";
import { getSelectedCompany, getCompanyUsers, getLanguage, getUser } from "../services/userService";

export const FetchCurrentCompany = () => {
    const [selectedCompany, setSelectedCompany] = useState({ name: '', companyRegistrationId: '' });

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        getSelectedCompany().then((company) => {
            setSelectedCompany(company);
        });
    };

    return [selectedCompany];
}

export const FetchCurrentUser = () => {
    const [loggedUser, setLoggedUser] = useState(null);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        getUser().then((user) => {
            setLoggedUser(user);
        });
    };

    return [loggedUser];
}


export const FetchCompanyUsers = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        getSelectedCompany().then((company) => {
            getCompanyUsers({ id: company.companyPartyId }).then((response) => {
                setUsers(response.Data);
            })
        })
    };

    return [users];
}

export const FetchCurrentLanguage = () => {
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        getCurrentLanguage();
    }, []);

    const getCurrentLanguage = async () => {
        getLanguage().then((response) => {
            setLanguage(response.language);
        });
    };

    return [language];
}


export const useOutsideClick = (ref) => {
    const [outsideClecked, setOutsideClecked] = useState(false)

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOutsideClecked(true);
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside, true);
        };
    }, [ref]);

    return [outsideClecked, setOutsideClecked];

}