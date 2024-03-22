// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../components/admin/dashboard/AdminDashboard";
import CreateNewUniversity from "../components/admin/product/CreateNewUniversity";
import ListUniversity from "../components/admin/product/ListUniversity";
import EditUniversityDetail from "../components/admin/product/EditUniversityDetail";
import ListMJP from "../components/admin/majorInPlan/ListMJP";
import CreateNewMJP from "../components/admin/majorInPlan/CreateNewMJP";
import EditMJPDetail from "../components/admin/majorInPlan/EditMJPDetail";
import ListMajor from "../components/admin/major/ListMajor";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="admin" />} />
      <Route
        path="admin"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="admin/dashboard"
        element={
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        }
      />
      <Route
        path="admin/university"
        element={
          <AdminLayout>
            <ListUniversity />
          </AdminLayout>
        }
      />

      <Route
        path="admin/university/create"
        element={
          <AdminLayout>
            <CreateNewUniversity />
          </AdminLayout>
        }
      />
      <Route
        path="admin/university/:id/edit"
        element={
          <AdminLayout>
            <EditUniversityDetail />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp"
        element={
          <AdminLayout>
            <ListMJP />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp/create"
        element={
          <AdminLayout>
            <CreateNewMJP />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp/:id/edit"
        element={
          <AdminLayout>
            <EditMJPDetail />
          </AdminLayout>
        }
      />
      <Route
        path="admin/major"
        element={
          <AdminLayout>
            <ListMajor />
          </AdminLayout>
        }
      />
    </Routes>
  );
};
export default Routers;
