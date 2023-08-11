import { GlobalStyles } from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Input from "./ui/Input";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyles />

      <Row>
        <Row type="horizontal">
          <Heading as="h1">The wild oasis</Heading>

          <div>
            <Button>check in</Button>
          </div>
        </Row>

        <Row>
          <Heading as="h2">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="Number of guests" />
          </form>
        </Row>
      </Row>
    </>
  );
}

export default App;
