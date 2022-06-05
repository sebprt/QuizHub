import Head from "next/head";
import {Route} from "react-router-dom";
import {CustomRoutes} from 'react-admin';
import authProvider from "utils/authProvider";
import {useState} from "react";
import {dataProvider, RedirectToLogin} from "../../utils/dataProvider";
import {HydraAdmin, ResourceGuesser} from "@api-platform/admin";
import {ENTRYPOINT} from "../../config/entrypoint";
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StyleIcon from '@mui/icons-material/Style';
import CategoryIcon from '@mui/icons-material/Category';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import QuizList from "../../components/admin/quiz/QuizList";
import ShowList from "../../components/admin/quiz/ShowList";
import InvolvementList from "../../components/admin/involvement/InvolvementList";

const AdminLoader = () => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    return (
        <HydraAdmin dataProvider={dataProvider(setRedirectToLogin)} authProvider={authProvider} entrypoint={ENTRYPOINT}>
            <ResourceGuesser name="quizzes" list={QuizList} show={ShowList} icon={QuizIcon} />
            <ResourceGuesser name="involvements" list={InvolvementList} icon={SportsEsportsIcon} />
            <ResourceGuesser name="categories" icon={CategoryIcon} />
            <ResourceGuesser name="tags" icon={StyleIcon} />
            <ResourceGuesser name="users" icon={PeopleAltIcon} />
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
