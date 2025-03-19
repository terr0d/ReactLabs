import Button from './components/Button';
import Container from './components/Container';
import PageLayout from './layouts/PageLayout';

function App() {
  const handleClick = () => {
    alert('Hello World!');
  };

  return (
    <PageLayout>
      <Container>
        <h1>Hello World</h1>
        <Button onClick={handleClick}>
          Click me
        </Button>
      </Container>
    </PageLayout>
  );
}

export default App;