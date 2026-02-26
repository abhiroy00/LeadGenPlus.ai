import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import LeadsPage from "../pages/LeadsPage";
import CampaignsPage from "../pages/CampaignsPage";
import InboxPage from "../pages/InboxPage";
import AnalyticsPage from "../pages/AnalyticsPage";
import AgentsPage from "../pages/AgentsPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProfilePage from "../pages/ProfilePage";
import BillingPage from "../pages/BillingPage";
import AppShell from "../layout/AppShell";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "leads", element: <LeadsPage /> },
      { path: "campaigns", element: <CampaignsPage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "agents", element: <AgentsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "billing", element: <BillingPage /> },
    ],
  },
]);