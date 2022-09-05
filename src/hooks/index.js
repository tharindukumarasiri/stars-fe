import React, { useState, useEffect } from "react";
import { getSelectedCompany, getCompanyUsers } from "../services/userService";

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