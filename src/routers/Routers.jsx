// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ListProducts from "../components/admin/product/ListProducts";
import ListVouchers from "../components/admin/voucher/ListVouchers";
import AdminDashboard from "../components/admin/dashboard/AdminDashboard";
import CreateNewProduct from "../components/admin/product/CreateNewProduct";
import ViewProductDetail from "../components/admin/product/ViewProductDetail";
import EditProductDetail from "../components/admin/product/EditProductDetail";
import CreateNewVoucher from "../components/admin/voucher/CreateNewVoucher";
import EditVoucherDetail from "../components/admin/voucher/EditVoucherDetail";
import Cart from "../pages/cart/Cart";
import Wishlist from "../pages/home/Wishlist";
import Order from "../pages/cart/Order";
import EditProfile from "../pages/login/EditProfile";

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
        path="admin/products/create"
        element={
          <AdminLayout>
            <CreateNewProduct />
          </AdminLayout>
        }
      />
      <Route
        path="admin/products/:id"
        element={
          <AdminLayout>
            <ViewProductDetail />
          </AdminLayout>
        }
      />
      <Route
        path="admin/products/:id/edit"
        element={
          <AdminLayout>
            <EditProductDetail />
          </AdminLayout>
        }
      />
        <Route
        path="admin/vouchers"
        element={
          <AdminLayout>
            <ListVouchers/>
          </AdminLayout>
        }
      />
      <Route
        path="admin/vouchers/create"
        element={
          <AdminLayout>
            <CreateNewVoucher />
          </AdminLayout>
        }
      />
      <Route
        path="admin/vouchers/:id/edit"
        element={
          <AdminLayout>
            <EditVoucherDetail />
          </AdminLayout>
        }
      />

      <Route
        path="cart"
        element={
          <MainLayout>
            <Cart />
          </MainLayout>
        }
      />
      <Route
        path="wishlist"
        element={
          <MainLayout>
            <Wishlist />
          </MainLayout>
        }
      />
      <Route
        path="order"
        element={
          <MainLayout>
            <Order />
          </MainLayout>
        }
      />
      <Route
        path="editProfile"
        element={
          <MainLayout>
            <EditProfile />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default Routers;
