import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Slider } from '../components/Slider';
import { Header } from '../components/Header';

export const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Slider />
      <Layout>
        <Header />
        <Layout.Content style={{ margin: '24px 16px 0', padding: 20 }}>
          <Outlet />
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          ©2023 Created by Aldar Bazarov
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};