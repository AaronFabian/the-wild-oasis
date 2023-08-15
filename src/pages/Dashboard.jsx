import { useCabin } from "../features/cabins/useCabin";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  useCabin(); // immediately get the data

  return (
    <Row type="horizontal">
      <Heading as="h1">Dashboard</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Dashboard;
