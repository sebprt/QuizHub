import Head from "next/head";
import {Route} from "react-router-dom";
import {CustomRoutes} from 'react-admin';
import authProvider from "utils/authProvider";
import {useState} from "react";
import {dataProvider, RedirectToLogin} from "../../utils/dataProvider";
import {HydraAdmin} from "@api-platform/admin";
import {ENTRYPOINT} from "../../config/entrypoint";

const AdminLoader = () => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    return (
        <HydraAdmin dataProvider={dataProvider(setRedirectToLogin)} authProvider={authProvider} entrypoint={ENTRYPOINT}>
            <CustomRoutes>
                {redirectToLogin ? (
                    <Route path="/" element={<RedirectToLogin/>}/>
                ) : null}
            </CustomRoutes>
        </HydraAdmin>
    );
};

const Admin = () => (
    <>
        <Head>
            <title>API Platform Admin</title>
        </Head>

        <AdminLoader/>
    </>
);

export default Admin;
