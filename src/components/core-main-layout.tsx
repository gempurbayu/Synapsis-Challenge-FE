import React from 'react';
import { Layout, Menu, MenuProps, theme, Typography } from 'antd';
import { useSession } from '@/context/session-provider.context';

interface MainLayoutProps {
  children: React.ReactNode;
}

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const CoreMainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { clearSession, name, accessToken } = useSession();

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: accessToken ? `Welcome, ${name}` : 'Login',
      onClick: () => {
        if (!accessToken) {
          // Jika belum login, arahkan ke halaman login
          window.location.href = '/login';
        } else {
          clearSession();
        }
      },
    },
  ];

  return (
    <Layout style={{ margin: 0, padding: 0 }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <Title
          level={3}
          style={{ color: 'white', marginTop: 'auto', marginBottom: 'auto' }}
        >
          Blog Post <b>Synapsis</b>
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
          }}
        ></Menu>
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default CoreMainLayout;
