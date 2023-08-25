import { useCabin } from "../features/cabins/useCabin";
import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
	useCabin(); // immediately get the data

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Dashboard</Heading>
				<DashboardFilter />
			</Row>

			<DashboardLayout />
		</>
	);
}

export default Dashboard;
