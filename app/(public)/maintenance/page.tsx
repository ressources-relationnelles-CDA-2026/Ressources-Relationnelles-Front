export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">
          Maintenance en cours
        </h1>


        <p className="text-gray-600 mb-2">
          Le service est temporairement indisponible.
        </p>

        <p className="text-gray-600">
          Nos équipes travaillent au rétablissement de la plateforme.
        </p>
      </div>
    </main>
  );
}