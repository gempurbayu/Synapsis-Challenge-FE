import { useSession } from '@/context/session-provider.context';
import GridPost from './components/grid-post';
import { useEffect, useState } from 'react';
import AuthDialog from '../auth/component/auth-dialog';
import { Breadcrumb } from 'antd';

const BlogPost = () => {
  const session = useSession();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!session.accessToken) {
      setOpenDialog(true);
    } else {
      setOpenDialog(false);
    }
  }, [session.accessToken]);

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
        ]}
      />
      <GridPost />
      <AuthDialog
        open={openDialog}
        setCloseDialog={() => setOpenDialog(false)}
      />
    </>
  );
};

export default BlogPost;
