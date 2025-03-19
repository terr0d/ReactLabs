import Navigation from '../components/Navigation';

const PageLayout = ({ children }) => {
  return (
    <div>
      <header>
        <Navigation />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default PageLayout;