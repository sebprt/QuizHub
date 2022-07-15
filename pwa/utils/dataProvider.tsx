import {parseHydraDocumentation} from '@api-platform/api-doc-parser';
import React from "react";
import {ENTRYPOINT} from "config/entrypoint";
import {
    hydraDataProvider as baseHydraDataProvider,
    fetchHydra as baseFetchHydra,
    useIntrospection,
} from "@api-platform/admin";
import {Navigate} from 'react-router-dom';

const getHeaders = () => localStorage.getItem('token') ? {Authorization: `Bearer ${localStorage.getItem('token')}`} : {};

const fetchHydra = (url, options = {}) =>
    baseFetchHydra(url, {
        ...options,
        headers: getHeaders,
    });

const apiDocumentationParser = (setRedirectToLogin) => async () => {
    try {
        setRedirectToLogin(false);

        return await parseHydraDocumentation(ENTRYPOINT, {headers: getHeaders});
    } catch (result) {
        const {api, response, status} = result;
        if (status !== 401 || !response) {
            throw result;
        }

        // Prevent infinite loop if the token is expired
        localStorage.removeItem('token');

        setRedirectToLogin(true);

        return {
            api,
            response,
            status,
        };
    }
};

export const dataProvider = (setRedirectToLogin) =>
    baseHydraDataProvider({
        useEmbedded: false,
        entrypoint: ENTRYPOINT,
        httpClient: fetchHydra,
        apiDocumentationParser: apiDocumentationParser(setRedirectToLogin),
    });


export const RedirectToLogin = () => {
    const introspect = useIntrospection();

    if (localStorage.getItem('token')) {
        introspect();
        return <></>;
    }

    return <Navigate to="/login"/>;
};