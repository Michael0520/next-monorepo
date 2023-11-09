import StepForm from '../components/step-form';

export default async function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className="container p-20">
      <header className="flex flex-col justify-center items-center mb-4">
        <h1 className="text-4xl font-bold text-white">Title</h1>
      </header>
      <main>
        <StepForm />
      </main>
    </div>
  );
}
