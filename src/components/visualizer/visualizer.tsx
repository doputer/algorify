import useView from './useView';

interface VisualizerProps {
  algorithm: string;
  values: number[];
}

function Visualizer({ algorithm, values = [1, 2, 3] }: VisualizerProps) {
  const [Viewer, Controller] = useView(algorithm, values);

  return (
    <>
      <Viewer />
      <Controller />
    </>
  );
}

export default Visualizer;
