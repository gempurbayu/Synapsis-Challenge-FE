import { useSession } from '@/context/session-provider.context';
import GridPost from './components/grid-post';
import { useEffect, useState } from 'react';
import AuthDialog from '../auth/component/auth-dialog';

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
      <GridPost />
      <AuthDialog
        open={openDialog}
        setCloseDialog={() => setOpenDialog(false)}
      />
    </>
  );
};

export default BlogPost;
