import Head from "next/head";
import { Route } from "react-router-dom";
import { CustomRoutes, Resource } from "react-admin";
import authProvider from "utils/authProvider";
import { useState } from "react";
import { dataProvider, RedirectToLogin } from "../../utils/dataProvider";
import { HydraAdmin } from "@api-platform/admin";
import { ENTRYPOINT } from "../../config/entrypoint";
import QuizIcon from "@mui/icons-material/Quiz";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StyleIcon from "@mui/icons-material/Style";
import CategoryIcon from "@mui/icons-material/Category";
import QuizList from "../../components/admin/quiz/QuizList";
import QuizShow from "../../components/admin/quiz/QuizShow";
import QuizEdit from "../../components/admin/quiz/QuizEdit";
import QuizCreate from "../../components/admin/quiz/QuizCreate";
import CategoryList from "../../components/admin/category/CategoryList";
import CategoryShow from "../../components/admin/category/CategoryShow";
import CategoryEdit from "../../components/admin/category/CategoryEdit";
import CategoryCreate from "../../components/admin/category/CategoryCreate";
import TagList from "../../components/admin/tag/TagList";
import TagShow from "../../components/admin/tag/TagShow";
import TagEdit from "../../components/admin/tag/TagEdit";
import TagCreate from "../../components/admin/tag/TagCreate";
import UserList from "../../components/admin/user/UserList";
import UserShow from "../../components/admin/user/UserShow";
import QuestionShow from "../../components/admin/question/QuestionShow";
import QuestionEdit from "../../components/admin/question/QuestionEdit";
import ChoiceShow from "../../components/admin/choice/ChoiceShow";
import ChoiceEdit from "../../components/admin/choice/ChoiceEdit";
import ChoiceCreate from "../../components/admin/choice/ChoiceCreate";

const AdminLoader = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  return (
    <HydraAdmin
      dataProvider={dataProvider(setRedirectToLogin)}
      authProvider={authProvider}
      entrypoint={ENTRYPOINT}
    >
      <Resource
        name="quizzes"
        list={QuizList}
        show={QuizShow}
        edit={QuizEdit}
        create={QuizCreate}
        icon={QuizIcon}
      />
      <Resource
        name="questions"
        list={null}
        show={QuestionShow}
        edit={QuestionEdit}
        create={null}
      />
      <Resource
        name="choices"
        list={null}
        show={ChoiceShow}
        edit={ChoiceEdit}
        create={ChoiceCreate}
      />
      <Resource
        name="categories"
        list={CategoryList}
        show={CategoryShow}
        edit={CategoryEdit}
        create={CategoryCreate}
        icon={CategoryIcon}
      />
      <Resource
        name="tags"
        list={TagList}
        show={TagShow}
        edit={TagEdit}
        create={TagCreate}
        icon={StyleIcon}
      />
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={null}
        create={null}
        icon={PeopleAltIcon}
      />
      <CustomRoutes>
        {redirectToLogin ? (
          <Route path="/" element={<RedirectToLogin />} />
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

    <AdminLoader />
  </>
);

export default Admin;
