import PersistentDrawer from "../PersistentDrawer";


function Layout({ children }: any) {
  return (
    <PersistentDrawer>
      {children}
    </PersistentDrawer>
  );
}

export default Layout;
