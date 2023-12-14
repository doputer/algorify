import useView from './useView';

function Visualizer({ algorithm }: { algorithm: string }) {
  const [Viewer, Controller] = useView(algorithm);

  return (
    <>
      <Viewer />
      <Controller />
    </>
  );
}

export default Visualizer;
