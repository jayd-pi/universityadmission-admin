// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminDashboard from "../components/admin/dashboard/AdminDashboard";
import CreateNewProduct from "../components/admin/product/CreateNewProduct";
import ListProducts from "../components/admin/product/ListProducts";
import ViewProductDetail from "../components/admin/product/ViewProductDetail";
import EditProductDetail from "../components/admin/product/EditProductDetail";
import ListVouchers from "../components/admin/majorInPlan/ListVouchers";
import CreateNewVoucher from "../components/admin/majorInPlan/CreateNewVoucher";
import EditVoucherDetail from "../components/admin/majorInPlan/EditVoucherDetail";
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
            <ListProducts />
          </AdminLayout>
        }
      />

      <Route
        path="admin/university/create"
        element={
          <AdminLayout>
            <CreateNewProduct />
          </AdminLayout>
        }
      />
      <Route
        path="admin/university/:id"
        element={
          <AdminLayout>
            <ViewProductDetail />
          </AdminLayout>
        }
      />
      <Route
        path="admin/university/:id/edit"
        element={
          <AdminLayout>
            <EditProductDetail />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp"
        element={
          <AdminLayout>
            <ListVouchers />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp/create"
        element={
          <AdminLayout>
            <CreateNewVoucher />
          </AdminLayout>
        }
      />
      <Route
        path="admin/mjp/:id/edit"
        element={
          <AdminLayout>
            <EditVoucherDetail />
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
