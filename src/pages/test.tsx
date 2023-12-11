// import { useEffect, useRef, useState } from 'react';

// import { Button } from '@/components/ui/button';
// import styled from 'styled-components';

// function SortPage() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [canvas, setCanvas] = useState<HTMLCanvasElement | null>();
//   const [context, setContext] = useState<CanvasRenderingContext2D | null>();

//   // const [bars, setBars] = useState([
//   //   { value: 1, height: 50, isPick: 'false' },
//   //   { value: 4, height: 200, isPick: 'false' },
//   //   { value: 2, height: 100, isPick: 'false' },
//   //   { value: 5, height: 250, isPick: 'false' },
//   //   { value: 3, height: 150, isPick: 'false' },
//   // ]);

//   const useSleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const a = canvasRef.current;

//     setCanvas(a);
//     setContext(a.getContext('2d'));
//   }, []);

//   useEffect(() => {
//     draw();
//   }, [context]);

//   const bars = [
//     { x: 0, value: 1, height: 50, isPick: false },
//     { x: 50, value: 4, height: 200, isPick: false },
//     { x: 100, value: 2, height: 100, isPick: false },
//     { x: 150, value: 5, height: 250, isPick: false },
//     { x: 200, value: 3, height: 150, isPick: false },
//   ];

//   const draw = () => {
//     if (!context || !canvas) return;

//     context.clearRect(0, 0, canvas.width, canvas.height);

//     context.beginPath();

//     for (let i = 0; i < bars.length; i++) {
//       if (bars[i].isPick) {
//         context.fillStyle = 'green';
//         context.fillRect(bars[i].x, 300 - bars[i].height, 30, bars[i].height);
//       } else {
//         context.fillStyle = 'skyblue';
//         context.fillRect(bars[i].x, 300 - bars[i].height, 30, bars[i].height);
//       }
//     }

//     context.closePath();
//   };

//   const pick = (indexes: number[]) => {
//     for (const index of indexes) bars[index].isPick = true;
//     draw();
//   };

//   const unpick = (indexes: number[]) => {
//     for (const index of indexes) bars[index].isPick = false;
//     draw();
//   };

//   const swap = async (indexes: number[]) => {
//     const x1 = bars[indexes[0]].x - 50;
//     const x2 = bars[indexes[1]].x + 50;

//     if (x1 === bars[indexes[1]].x && x2 === bars[indexes[0]].x) return;

//     if (bars[indexes[0]].x < x2) bars[indexes[0]].x++;
//     if (bars[indexes[1]].x > x1) bars[indexes[1]].x--;

//     await useSleep(10);
//     draw();
//     await swap(indexes);
//   };

//   const click = async () => {
//     for (let i = 0; i < bars.length; i++) {
//       for (let j = 0; j < bars.length - i - 1; j++) {
//         pick([j, j + 1]);
//         await useSleep(300);

//         if (bars[j].value > bars[j + 1].value) {
//           await swap([j, j + 1]);
//           [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
//         }

//         unpick([j, j + 1]);
//         await useSleep(300);
//       }
//     }

//     // for (let i = 0; i < bars.length; i++) {
//     //   for (let j = 0; j < bars.length - i - 1; j++) {
//     //     bars[j].isPick = 'true';
//     //     bars[j + 1].isPick = 'true';
//     //     setBars([...bars]);
//     //     await useSleep(300);
//     //     if (bars[j].value > bars[j + 1].value) {
//     //       [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
//     //       setBars([...bars]);
//     //       await useSleep(500);
//     //     }
//     //     bars[j].isPick = 'false';
//     //     bars[j + 1].isPick = 'false';
//     //     setBars([...bars]);
//     //     await useSleep(300);
//     //   }
//     // }
//   };

//   return (
//     <>
//       <canvas
//         ref={canvasRef}
//         height={300}
//         style={{
//           marginLeft: 30,
//         }}
//       />
//       {/* <Box>
//         {bars.map((bar, index) => (
//           <Bar
//             key={index}
//             style={{ height: bar.height }}
//             pick={bar.isPick || 'false'}
//             left={(index * 50).toString()}
//           >
//             {bar.value}
//           </Bar>
//         ))}
//       </Box> */}
//       <Tool>
//         <Button onClick={click}>시작</Button>
//       </Tool>
//     </>
//   );
// }

// // const Box = styled.div`
// //   position: relative;
// //   display: flex;
// //   gap: 8px;
// //   justify-content: center;
// //   align-items: end;
// //   background-color: grey;
// //   padding: 200px 0;
// // `;

// // const Bar = styled.div<{ pick: string; left: string }>`
// //   position: absolute;
// //   left: ${({ left }) => left + 'px'};
// //   bottom: 0px;
// //   width: 30px;
// //   background-color: ${({ pick }) => (pick === 'true' ? 'red' : 'skyblue')};
// //   display: flex;
// //   justify-content: center;
// //   align-items: end;
// //   padding-bottom: 8px;
// //   transition: all 1s;
// // `;

// const Tool = styled.div`
//   margin-top: 30px;
//   margin-left: 30px;
// `;

// export default SortPage;
