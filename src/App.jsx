import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutUser from "./layouts/LayoutUser";
import LayoutAdmin from "./layouts/LayoutAdmin";
import Dashboard from "./layouts/Admin/Dashboard/Dashboard.jsx";
import IntroPage from "./layouts/IntroPage/IntroPage.jsx";
import LoginPage from "./layouts/LoginPage/LoginPage.jsx";
import NewsPage from "./layouts/NewsPage/NewsPage.jsx";
import NewsList from "./layouts/NewsPage/NewsList.jsx";
import NewsDetail from "./layouts/NewsPage/NewsDetail.jsx";
import NewsManagement from "./layouts/Admin/NewsManagement/NewsManagement.jsx";
import NewsCreate from "./layouts/Admin/NewsManagement/NewsCreate.jsx";
import NewsTable from "./layouts/Admin/NewsManagement/NewsTable.jsx";

import AuthorPage from "./layouts/AuthorPage/AuthorPage.jsx";
import AuthorList from "./layouts/AuthorPage/AuthorList.jsx";
import AuthorDetail from "./layouts/AuthorPage/AuthorDetail.jsx";
import AuthorManagement from "./layouts/Admin/AuthorManagement/AuthorManagement.jsx";
import AuthorCreate from "./layouts/Admin/AuthorManagement/AuthorCreate.jsx";
import AuthorTable from "./layouts/Admin/AuthorManagement/AuthorTable.jsx";

import HomePage from "./layouts/homepage/HomePage";
import Map from "./components/Map/Map.jsx";
import RegisterPage from "./layouts/RegisterPage/RegisterPage.jsx";
import ConfirmPage from "./layouts/ConfirmEmail/ConfirmPage.jsx";
import AwardManagement from "./layouts/Admin/AwardManagement/AwardManagement.jsx";
import AwardTable from "./layouts/Admin/AwardManagement/AwardTable.jsx";
import AwardCreate from "./layouts/Admin/AwardManagement/AwardCreate.jsx";
import ExhibitManagement from "./layouts/Admin/ExhibitManagement/ExhibitManagement.jsx";
import ExhibitTable from "./layouts/Admin/ExhibitManagement/ExhibitTable.jsx";
import ExhibitCreate from "./layouts/Admin/ExhibitManagement/ExhibitCreate.jsx";
import WorkManagement from "./layouts/Admin/WorkManagement/WorkManagement.jsx";
import WorkTable from "./layouts/Admin/WorkManagement/WorkTable.jsx";
import WorkCreate from "./layouts/Admin/WorkManagement/WorkCreate.jsx";
import StoryManagement from "./layouts/Admin/StoryManagement/StoryManagement.jsx";
import StoryTable from "./layouts/Admin/StoryManagement/StoryTable.jsx";
import StoryCreate from "./layouts/Admin/StoryManagement/StoryCreate.jsx";
import UserManagement from "./layouts/Admin/UserManagement/UserManagement.jsx";
import UserTable from "./layouts/Admin/UserManagement/UserTable.jsx";
import BlogManagement from "./layouts/Admin/BlogManagement/BlogManagement.jsx";
import BlogTable from "./layouts/Admin/BlogManagement/BlogTable.jsx";
import BlogCreate from "./layouts/Admin/BlogManagement/BlogCreate.jsx";

function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutUser />}>
            {/* <Route path="/test" element={<TestUpload />} /> */}

            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="email-confirm" element={<ConfirmPage />} />
            <Route path="introduction" element={<IntroPage />}></Route>

            <Route path="news" element={<NewsPage />}>
              <Route index element={<NewsList />} />
              <Route path=":id" element={<NewsDetail />} />
            </Route>

            <Route path="authors" element={<AuthorPage />}>
              <Route index element={<AuthorList />} />
              <Route path=":id" element={<AuthorDetail />} />
            </Route>

            {/* <Route path="works" element={<WorkPage />} />
            <Route path="stories" element={<StoryPage />} /> */}
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />

            <Route path="news" element={<NewsManagement />}>
              <Route index element={<NewsTable />} />
              <Route path="create" element={<NewsCreate />} />
            </Route>

            {/* <Route path="stories" element={<StoryManagement />}>
            <Route index element={<StoryTable />} />
            <Route path="create" element={<StoryCreate />} />
            <Route path="edit/:id" element={<StoryEdit />} />
          </Route> */}

            <Route path="authors" element={<AuthorManagement />}>
              <Route index element={<AuthorTable />} />
              <Route path="create" element={<AuthorCreate />} />
            </Route>

            <Route path="awards" element={<AwardManagement />}>
              <Route index element={<AwardTable />} />
              <Route path="create" element={<AwardCreate />} />
            </Route>

            <Route path="exhibits" element={<ExhibitManagement />}>
              <Route index element={<ExhibitTable />} />
              <Route path="create" element={<ExhibitCreate />} />
            </Route>

            <Route path="users" element={<UserManagement />}>
              <Route index element={<UserTable />} />
            </Route>

            <Route path="works" element={<WorkManagement />}>
              <Route index element={<WorkTable />} />
              <Route path="create" element={<WorkCreate />} />
            </Route>

            <Route path="stories" element={<StoryManagement />}>
              <Route index element={<StoryTable />} />
              <Route path="create" element={<StoryCreate />} />
            </Route>

            <Route path="blogs" element={<BlogManagement />}>
              <Route index element={<BlogTable />} />
              <Route path="create" element={<BlogCreate />} />
            </Route>
            {/* 
          <Route path="works" element={<WorkManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="account" element={<AccountManagement />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
