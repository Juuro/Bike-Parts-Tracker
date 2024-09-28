import { fetchBike } from "@/utils/requestsServer";
import AddPartModal from "@/components/AddPartModal";
import InstallationsTable from "@/components/InstallationsTable";

const BikePage = async ({ params }: { params: any }) => {
  const { id: bikeId } = params;

  const bike = await fetchBike(bikeId);

  return (
    <section className="bg-slate-50 pt-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6">{bike.name}</h1>
        <AddPartModal showCloseButton={true} bike={bike} />
        <InstallationsTable bikeId={bikeId} />
      </div>
    </section>
  );
};

export default BikePage;
