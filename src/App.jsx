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
import AwardPage from "./layouts/AwardPage/AwardPage.jsx";
import AwardDetail from "./layouts/AwardPage/AwardDetail.jsx";
import AwardList from "./layouts/AwardPage/AwardList.jsx";
import WorkPage from "./layouts/WorkPage/WorkPage.jsx";
import WorkList from "./layouts/WorkPage/WorkList.jsx";
import WorkDetail from "./layouts/WorkPage/WorkDetail.jsx";
import StoryPage from "./layouts/StoryPage/StoryPage.jsx";
import StoryList from "./layouts/StoryPage/StoryList.jsx";
import StoryDetail from "./layouts/StoryPage/StoryDetail.jsx";
import ExhibitList from "./layouts/ExhibitPage/ExhibitList.jsx";
import ExhibitDetail from "./layouts/ExhibitPage/ExhibitDetail.jsx";
import ExhibitPage from "./layouts/ExhibitPage/ExhibitPage.jsx";
import ArtifactManagement from "./layouts/Admin/ArtifactManagement/ArtifactManagement.jsx";
import ArtifactTable from "./layouts/Admin/ArtifactManagement/ArtifactTable.jsx";
import ArtifactCreate from "./layouts/Admin/ArtifactManagement/ArtifactCreate.jsx";
import ArtifactPage from "./layouts/ArtifactPage/ArtifactPage.jsx";
import ArtifactList from "./layouts/ArtifactPage/ArtifactList.jsx";
import ArtifactDetail from "./layouts/ArtifactPage/ArtifactDetail.jsx";
import ChangePassword from "./layouts/ChangePassword/ChangePassword.jsx";
import UserBlogCreate from "./layouts/UserManageBlog/UserBlogCreate.jsx";
import UserBlogTable from "./layouts/UserManageBlog/UserBlogTable.jsx";
import BlogPage from "./layouts/BlogPage/BlogPage.jsx";
import BlogList from "./layouts/BlogPage/BlogList.jsx";
import BlogDetail from "./layouts/BlogPage/BlogDetail.jsx";
import UserBlog from "./layouts/Admin/UserManagement/UserBlog.jsx";

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

            <Route path="awards" element={<AwardPage />}>
              <Route index element={<AwardList />} />
              <Route path=":id" element={<AwardDetail />} />
            </Route>

            <Route path="works" element={<WorkPage />}>
              <Route index element={<WorkList />} />
              <Route path=":id" element={<WorkDetail />} />
            </Route>

            <Route path="exhibits" element={<ExhibitPage />}>
              <Route index element={<ExhibitList />} />
              <Route path=":id" element={<ExhibitDetail />} />
            </Route>

            <Route path="artifacts" element={<ArtifactPage />}>
              <Route index element={<ArtifactList />} />
              <Route path=":id" element={<ArtifactDetail />} />
            </Route>

            <Route path="stories" element={<StoryPage />}>
              <Route index element={<StoryList />} />
              <Route path=":id" element={<StoryDetail />} />
            </Route>

            <Route path="authors" element={<AuthorPage />}>
              <Route index element={<AuthorList />} />
              <Route path=":id" element={<AuthorDetail />} />
            </Route>

            <Route path="blogs" element={<BlogPage />}>
              <Route index element={<BlogList />} />
              <Route path=":id" element={<BlogDetail />} />
            </Route>

            <Route path="manage-blog" element={<UserBlogTable />}></Route>

            <Route path="create-blog" element={<UserBlogCreate />}></Route>

            <Route path="change-password" element={<ChangePassword />}></Route>

            {/* <Route path="artifacts" element={<ArtifactPage />}>
              <Route index element={<ArtifactList />} />
              <Route path=":id" element={<ArtifactDetail />} />
            </Route> */}
          </Route>

          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />

            <Route path="news" element={<NewsManagement />}>
              <Route index element={<NewsTable />} />
              <Route path="create" element={<NewsCreate />} />
            </Route>

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
              <Route path="blog" element={<UserBlog />} />
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

            <Route path="artifacts" element={<ArtifactManagement />}>
              <Route index element={<ArtifactTable />} />
              <Route path="create" element={<ArtifactCreate />} />
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
