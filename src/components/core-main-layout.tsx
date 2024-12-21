import React, { useState } from 'react';
import { Layout, Menu, MenuProps, Typography } from 'antd';
import { useSession } from '@/context/session-provider.context';
import AuthDialog from '@/features/auth/component/auth-dialog';
import { useRouter } from 'next/navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const CoreMainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  const { clearSession, accessToken } = useSession();
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const menuItems: MenuProps['items'] = [
    {
      key: 'login',
      label: accessToken ? `Logout` : 'Login',
      onClick: () => {
        if (!accessToken) {
          setOpenDialog(true);
        } else {
          clearSession();
        }
      },
    },
  ];

  return (
    <Layout className="m-0 p-0" style={{ minHeight: 800 }}>
      <Header className="flex items-center justify-between ">
        <Title
          level={4}
          style={{ color: 'white', cursor: 'pointer' }}
          onClick={() => {
            router.push('/');
          }}
        >
          Blog <b className="text-blue-400">Synapsis</b>
        </Title>
        <Menu
          theme="dark"
          mode="horizontal"
          items={menuItems}
          className="w-1/3 flex justify-end"
          defaultOpenKeys={['login']}
          selectedKeys={['login']}
        />
      </Header>
      <Content className="px-12 py-5">{children}</Content>
      <Footer className="text-center">
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
      <AuthDialog
        open={openDialog}
        setCloseDialog={() => setOpenDialog(false)}
      />
    </Layout>
  );
};

export default CoreMainLayout;
