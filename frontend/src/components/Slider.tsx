import React from 'react';
import { Link } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const sliderItems = [
  {
    key: '0',
    icon: <HomeFilled />,
    label: <Link to='/' />,
  },
  {
    key: '1',
    label: <Link to='/floor/1'>1 Этаж</Link>,
  },
  {
    key: '2',
    label: <Link to='/floor/2'>2 Этаж</Link>,
  },
  {
    key: '3',
    label: <Link to='/floor/3'>3 Этаж</Link>,
  },
  {
    key: '4',
    label: <Link to='/floor/4'>4 Этаж</Link>,
  },
]

export const Slider: React.FC = () => {
  return (
    <Layout.Sider>
      <Menu
        theme="dark"
        mode='inline'
        defaultSelectedKeys={['0']}
        items={sliderItems}
      />
    </Layout.Sider>
  );
};