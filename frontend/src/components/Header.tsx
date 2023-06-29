import React from 'react';
import { Layout, theme, Typography } from 'antd';

export const Header: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout.Header style={{ padding: 30, background: colorBgContainer, display: 'flex', alignItems: 'center', columnGap: 10 }}>
            <Typography.Title level={3} style={{ margin: 0 }}>Тестовое задание eSoft</Typography.Title>
        </Layout.Header>
    );
};