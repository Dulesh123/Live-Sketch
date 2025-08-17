

// // // // import { useEffect, useRef, useState } from 'react';
// // // // import { fabric } from 'fabric'; // Corrected import statement

// // // // const FabricCanvas: React.FC = () => {
// // // //   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// // // //   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null); // Use fabric.Canvas
// // // //   const [isDark, setIsDark] = useState(false);
// // // //   const [isDrawing, setIsDrawing] = useState(false);

// // // //   // Initialize Fabric.js canvas
// // // //   useEffect(() => {
// // // //     if (!canvasRef.current) return;

// // // //     // Use fabric.Canvas directly
// // // //     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
// // // //       selection: true,
// // // //       backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
// // // //     });
// // // //     setCanvas(fabricCanvas);

// // // //     const resizeCanvas = () => {
// // // //       const width = window.innerWidth;
// // // //       const height = window.innerHeight - 60;
// // // //       fabricCanvas.setWidth(width);
// // // //       fabricCanvas.setHeight(height);
// // // //       fabricCanvas.renderAll();
// // // //     };

// // // //     resizeCanvas();
// // // //     window.addEventListener('resize', resizeCanvas);

// // // //     return () => {
// // // //       window.removeEventListener('resize', resizeCanvas);
// // // //       fabricCanvas.dispose();
// // // //     };
// // // //   }, []); // isDark is not a dependency here because it's only used for initial background

// // // //   // Update theme
// // // //   useEffect(() => {
// // // //     if (canvas) {
// // // //       canvas.setBackgroundColor(isDark ? '#1e1e1e' : '#ffffff', () => {
// // // //         canvas.renderAll();
// // // //       });
// // // //     }
// // // //   }, [isDark, canvas]); // Added canvas to dependency array

// // // //   // Shape Functions
// // // //   const addRectangle = () =>
// // // //     canvas?.add(
// // // //       new fabric.Rect({ // Use fabric.Rect
// // // //         left: 100,
// // // //         top: 100,
// // // //         fill: '',
// // // //         stroke: isDark ? 'white' : 'black',
// // // //         strokeWidth: 2,
// // // //         width: 120,
// // // //         height: 80,
// // // //       })
// // // //     );

// // // //   const addCircle = () =>
// // // //     canvas?.add(
// // // //       new fabric.Circle({ // Use fabric.Circle
// // // //         radius: 50,
// // // //         left: 150,
// // // //         top: 150,
// // // //         fill: '',
// // // //         stroke: isDark ? 'white' : 'black',
// // // //         strokeWidth: 2,
// // // //       })
// // // //     );

// // // //   const addDiamond = () => {
// // // //     const size = 100;
// // // //     const points = [
// // // //       { x: 0, y: size / 2 },
// // // //       { x: size / 2, y: 0 },
// // // //       { x: size, y: size / 2 },
// // // //       { x: size / 2, y: size },
// // // //     ];
// // // //     canvas?.add(
// // // //       new fabric.Polygon(points, { // Use fabric.Polygon
// // // //         left: 250,
// // // //         top: 250,
// // // //         fill: '',
// // // //         stroke: isDark ? 'white' : 'black',
// // // //         strokeWidth: 2,
// // // //       })
// // // //     );
// // // //   };

// // // //   const addEllipse = () =>
// // // //     canvas?.add(
// // // //       new fabric.Ellipse({ // Use fabric.Ellipse
// // // //         rx: 60,
// // // //         ry: 40,
// // // //         left: 350,
// // // //         top: 200,
// // // //         fill: '',
// // // //         stroke: isDark ? 'white' : 'black',
// // // //         strokeWidth: 2,
// // // //       })
// // // //     );

// // // //   const addTriangle = () =>
// // // //     canvas?.add(
// // // //       new fabric.Triangle({ // Use fabric.Triangle
// // // //         width: 100,
// // // //         height: 100,
// // // //         left: 450,
// // // //         top: 250,
// // // //         fill: '',
// // // //         stroke: isDark ? 'white' : 'black',
// // // //         strokeWidth: 2,
// // // //       })
// // // //     );

// // // //   const addArrowLine = () => {
// // // //     const line = new fabric.Line([100, 100, 200, 200], { // Use fabric.Line
// // // //       stroke: isDark ? 'white' : 'black',
// // // //       strokeWidth: 2,
// // // //     });

// // // //     const arrow = new fabric.Polygon( // Use fabric.Polygon
// // // //       [
// // // //         { x: 0, y: 0 },
// // // //         { x: -10, y: -5 },
// // // //         { x: -10, y: 5 },
// // // //       ],
// // // //       {
// // // //         left: 200,
// // // //         top: 200,
// // // //         angle: 45,
// // // //         fill: isDark ? 'white' : 'black',
// // // //       }
// // // //     );

// // // //     canvas?.add(line);
// // // //     canvas?.add(arrow);
// // // //   };

// // // //   const toggleDrawingMode = () => {
// // // //     if (!canvas) return;
// // // //     const newMode = !isDrawing;
// // // //     setIsDrawing(newMode);
// // // //     canvas.isDrawingMode = newMode;
// // // //     // Check if freeDrawingBrush exists before accessing its properties
// // // //     if (canvas.freeDrawingBrush) {
// // // //       canvas.freeDrawingBrush.color = isDark ? 'white' : 'black';
// // // //       canvas.freeDrawingBrush.width = 2;
// // // //     }
// // // //   };

// // // //   const addText = () => {
// // // //     if (!canvas) return;
// // // //     const text = new fabric.Textbox("Double click to edit", { // Use fabric.Textbox
// // // //       left: 100,
// // // //       top: 100,
// // // //       fontSize: 24,
// // // //       fill: isDark ? 'white' : 'black',
// // // //     });
// // // //     canvas.add(text);
// // // //   };

// // // //   return (
// // // //     <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} w-screen h-screen flex flex-col`}>
// // // //       {/* Toolbar */}
// // // //       <div className="flex gap-4 items-center px-6 py-3 border-b">
// // // //         <button onClick={addRectangle} title="Rectangle" className="text-2xl">▭</button>
// // // //         <button onClick={addCircle} title="Circle" className="text-2xl">◯</button>
// // // //         <button onClick={addDiamond} title="Diamond" className="text-2xl">◆</button>
// // // //         <button onClick={addEllipse} title="Ellipse" className="text-2xl">⬭</button>
// // // //         <button onClick={addTriangle} title="Triangle" className="text-2xl">▲</button>
// // // //         <button onClick={addArrowLine} title="Arrow Line" className="text-2xl">↗</button>
// // // //         <button onClick={toggleDrawingMode} title="Pencil Tool" className="text-2xl">✏️</button>
// // // //         <button onClick={addText} title="Add Text" className="text-2xl">🅰️</button>
// // // //         <button onClick={() => setIsDark(!isDark)} className="ml-auto text-sm bg-gray-300 text-black px-2 py-1 rounded">
// // // //           {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
// // // //         </button>
// // // //       </div>

// // // //       {/* Canvas */}
// // // //       <canvas ref={canvasRef} className="flex-grow" />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default FabricCanvas;












import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
      selection: true,
    });
    setCanvas(fabricCanvas);

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight - 60;
      fabricCanvas.setWidth(width);
      fabricCanvas.setHeight(height);
      fabricCanvas.renderAll();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      fabricCanvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.setBackgroundColor(isDark ? '#1e1e1e' : '#ffffff', () => {
        canvas.renderAll();
      });
    }
  }, [isDark, canvas]);

  const applyBrush = () => {
    if (!canvas) return;

    canvas.isDrawingMode = isDrawing;
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = isErasing ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? 'white' : 'black');
      canvas.freeDrawingBrush.width = isErasing ? 10 : 2;
    }
  };

  useEffect(() => {
    applyBrush();
  }, [isDrawing, isErasing, isDark]);

  const addRectangle = () =>
    canvas?.add(new fabric.Rect({ left: 100, top: 100, width: 120, height: 80, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

  const addCircle = () =>
    canvas?.add(new fabric.Circle({ radius: 50, left: 150, top: 150, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

  const addEllipse = () =>
    canvas?.add(new fabric.Ellipse({ rx: 60, ry: 40, left: 350, top: 200, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

  const addTriangle = () =>
    canvas?.add(new fabric.Triangle({ width: 100, height: 100, left: 450, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

  const addDiamond = () => {
    const points = [
      { x: 0, y: 50 },
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
    ];
    canvas?.add(new fabric.Polygon(points, { left: 250, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
  };

  const addArrowLine = () => {
    const line = new fabric.Line([100, 100, 200, 200], { stroke: isDark ? 'white' : 'black', strokeWidth: 2 });
    const arrow = new fabric.Polygon(
      [{ x: 0, y: 0 }, { x: -10, y: -5 }, { x: -10, y: 5 }],
      { left: 200, top: 200, angle: 45, fill: isDark ? 'white' : 'black' }
    );
    canvas?.add(line);
    canvas?.add(arrow);
  };

  const addText = () => {
    const text = new fabric.Textbox('Double click to edit', {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: isDark ? 'white' : 'black',
    });
    canvas?.add(text);
  };

  const toggleDraw = () => {
    setIsDrawing(!isDrawing);
    setIsErasing(false);
  };

  const toggleErase = () => {
    setIsErasing(!isErasing);
    setIsDrawing(true); // enable drawing mode for erase
  };

  const clearCanvas = () => {
    if (!canvas) return;
    canvas.getObjects().forEach(obj => canvas.remove(obj));
    canvas.renderAll();
  };

  const downloadCanvas = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  };

  return (
    <div className={`${isDark ? 'bg-black text-white' : 'bg-white text-black'} w-screen h-screen flex flex-col`}>
      <div className="flex gap-3 items-center px-6 py-3 border-b shadow bg-opacity-70 backdrop-blur sticky top-0 z-10">
        <button onClick={addRectangle} title="Rectangle" className="text-2xl">▭</button>
        <button onClick={addCircle} title="Circle" className="text-2xl">◯</button>
        <button onClick={addDiamond} title="Diamond" className="text-2xl">◆</button>
        <button onClick={addEllipse} title="Ellipse" className="text-2xl">⬭</button>
        <button onClick={addTriangle} title="Triangle" className="text-2xl">▲</button>
        <button onClick={addArrowLine} title="Arrow Line" className="text-2xl">↗</button>
        <button onClick={toggleDraw} title="Pencil Tool" className="text-2xl">{isDrawing && !isErasing ? '🛑' : '✏️'}</button>
        <button onClick={toggleErase} title="Eraser" className="text-2xl">{isErasing ? '❌' : '🧽'}</button>
        <button onClick={addText} title="Add Text" className="text-2xl">🅰️</button>
        <button onClick={clearCanvas} title="Clear Canvas" className="text-2xl">🗑️</button>
        <button onClick={downloadCanvas} title="Download Image" className="text-2xl">💾</button>
        <button onClick={() => setIsDark(!isDark)} className="ml-auto text-sm bg-gray-300 text-black px-3 py-1 rounded">
          {isDark ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <canvas ref={canvasRef} className="flex-grow" />
    </div>
  );
};

export default FabricCanvas;







// // import { useEffect, useRef, useState } from 'react';
// // import { fabric } from 'fabric';

// // const FabricCanvas: React.FC = () => {
// //   const canvasRef = useRef<HTMLCanvasElement | null>(null);
// //   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
// //   const [isDark, setIsDark] = useState(false);
// //   const [isDrawing, setIsDrawing] = useState(false);
// //   const [isErasing, setIsErasing] = useState(false);

// //   useEffect(() => {
// //     if (!canvasRef.current) return;

// //     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
// //       backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
// //       selection: true,
// //     });
// //     setCanvas(fabricCanvas);

// //     const resizeCanvas = () => {
// //       const width = window.innerWidth;
// //       const height = window.innerHeight - 80;
// //       fabricCanvas.setWidth(width);
// //       fabricCanvas.setHeight(height);
// //       fabricCanvas.renderAll();
// //     };

// //     resizeCanvas();
// //     window.addEventListener('resize', resizeCanvas);

// //     return () => {
// //       window.removeEventListener('resize', resizeCanvas);
// //       fabricCanvas.dispose();
// //     };
// //   }, []);

// //   useEffect(() => {
// //     if (canvas) {
// //       canvas.setBackgroundColor(isDark ? '#1e1e1e' : '#ffffff', () => {
// //         canvas.renderAll();
// //       });
// //     }
// //   }, [isDark, canvas]);

// //   const applyBrush = () => {
// //     if (!canvas) return;
// //     canvas.isDrawingMode = isDrawing;
// //     if (canvas.freeDrawingBrush) {
// //       canvas.freeDrawingBrush.color = isErasing ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? 'white' : 'black');
// //       canvas.freeDrawingBrush.width = isErasing ? 10 : 2;
// //     }
// //   };

// //   useEffect(() => {
// //     applyBrush();
// //   }, [isDrawing, isErasing, isDark]);

// //   const addRectangle = () => canvas?.add(new fabric.Rect({ left: 100, top: 100, width: 120, height: 80, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
// //   const addCircle = () => canvas?.add(new fabric.Circle({ radius: 50, left: 150, top: 150, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
// //   const addEllipse = () => canvas?.add(new fabric.Ellipse({ rx: 60, ry: 40, left: 350, top: 200, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
// //   const addTriangle = () => canvas?.add(new fabric.Triangle({ width: 100, height: 100, left: 450, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
// //   const addDiamond = () => {
// //     const points = [
// //       { x: 0, y: 50 }, { x: 50, y: 0 }, { x: 100, y: 50 }, { x: 50, y: 100 }
// //     ];
// //     canvas?.add(new fabric.Polygon(points, { left: 250, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
// //   };
// //   const addArrowLine = () => {
// //     const line = new fabric.Line([100, 100, 200, 200], { stroke: isDark ? 'white' : 'black', strokeWidth: 2 });
// //     const arrow = new fabric.Polygon([{ x: 0, y: 0 }, { x: -10, y: -5 }, { x: -10, y: 5 }], {
// //       left: 200, top: 200, angle: 45, fill: isDark ? 'white' : 'black'
// //     });
// //     canvas?.add(line);
// //     canvas?.add(arrow);
// //   };
// //   const addText = () => {
// //     const text = new fabric.Textbox('Double click to edit', {
// //       left: 100, top: 100, fontSize: 24, fill: isDark ? 'white' : 'black',
// //     });
// //     canvas?.add(text);
// //   };

// //   const toggleDraw = () => {
// //     setIsDrawing(!isDrawing);
// //     setIsErasing(false);
// //   };

// //   const toggleErase = () => {
// //     setIsErasing(!isErasing);
// //     setIsDrawing(true);
// //   };

// //   const clearCanvas = () => {
// //     canvas?.getObjects().forEach(obj => canvas.remove(obj));
// //     canvas?.renderAll();
// //   };

// //   const downloadCanvas = () => {
// //     if (!canvas) return;
// //     const dataURL = canvas.toDataURL({ format: 'png' });
// //     const link = document.createElement('a');
// //     link.href = dataURL;
// //     link.download = 'canvas.png';
// //     link.click();
// //   };

// //   return (
// //     <div className={`${isDark ? 'bg-[#121212] text-white' : 'bg-gray-100 text-black'} w-screen h-screen flex flex-col`}>
// //       <div className="flex gap-4 items-center px-6 py-4 border-b shadow-md backdrop-blur sticky top-0 z-10 bg-opacity-70 bg-white dark:bg-black">
// //         <div className="text-2xl font-bold">🎨 DrawBoard</div>

// //         <div className="flex gap-3 text-xl ml-6">
// //           <button onClick={addRectangle} title="Rectangle" className="hover:scale-110 transition">▭</button>
// //           <button onClick={addCircle} title="Circle" className="hover:scale-110 transition">◯</button>
// //           <button onClick={addDiamond} title="Diamond" className="hover:scale-110 transition">◆</button>
// //           <button onClick={addEllipse} title="Ellipse" className="hover:scale-110 transition">⬭</button>
// //           <button onClick={addTriangle} title="Triangle" className="hover:scale-110 transition">▲</button>
// //           <button onClick={addArrowLine} title="Arrow Line" className="hover:scale-110 transition">↗</button>
// //           <button onClick={toggleDraw} title="Pencil" className="hover:scale-110 transition">{isDrawing && !isErasing ? '🛑' : '✏️'}</button>
// //           <button onClick={toggleErase} title="Eraser" className="hover:scale-110 transition">{isErasing ? '❌' : '🧽'}</button>
// //           <button onClick={addText} title="Text" className="hover:scale-110 transition">🅰️</button>
// //           <button onClick={clearCanvas} title="Clear" className="hover:scale-110 transition">🗑️</button>
// //           <button onClick={downloadCanvas} title="Download" className="hover:scale-110 transition">💾</button>
// //         </div>

// //         <button
// //           onClick={() => setIsDark(!isDark)}
// //           className="ml-auto px-4 py-1.5 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium shadow hover:scale-105 transition"
// //         >
// //           {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
// //         </button>
// //       </div>

// //       <canvas ref={canvasRef} className="flex-grow" />
// //     </div>
// //   );
// // };

// // export default FabricCanvas;



// import { useEffect, useRef, useState } from 'react';
// import { fabric } from 'fabric';

// const FabricCanvas: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
//   const [isDark, setIsDark] = useState(false);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isErasing, setIsErasing] = useState(false);
//   const ws = useRef<WebSocket | null>(null);
// const token=localStorage.getItem('token');
//   useEffect(() => {
//     // Initialize WebSocket
//     ws.current = new WebSocket('ws://localhost:8000?token='+token);
//     ws.current.onopen = () => console.log('WebSocket connected');
//     ws.current.onclose = () => console.log('WebSocket disconnected');

//     return () => {
//       ws.current?.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (!canvasRef.current) return;

//     const fabricCanvas = new fabric.Canvas(canvasRef.current, {
//       backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
//       selection: true,
//     });

//     setCanvas(fabricCanvas);

//     const resizeCanvas = () => {
//       fabricCanvas.setWidth(window.innerWidth);
//       fabricCanvas.setHeight(window.innerHeight - 80);
//       fabricCanvas.renderAll();
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       fabricCanvas.dispose();
//     };
//   }, []);

//   useEffect(() => {
//     if (canvas) {
//       canvas.setBackgroundColor(isDark ? '#1e1e1e' : '#ffffff', () => {
//         canvas.renderAll();
//       });
//     }
//   }, [isDark, canvas]);

//   const broadcastCanvas = (event: string, object: any) => {
//     if (ws.current?.readyState === WebSocket.OPEN) {
//       ws.current.send(
//         JSON.stringify({
//           event,
//           payload: object,
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     if (!canvas) return;

//     const onObjectAdded = (e: fabric.IEvent) => {
//       if (e.target) {
//         broadcastCanvas('object:added', e.target.toJSON(['left', 'top', 'fill', 'stroke', 'strokeWidth', 'radius', 'width', 'height', 'points', 'text']));
//       }
//     };

//     canvas.on('object:added', onObjectAdded);

//     return () => {
//       canvas.off('object:added', onObjectAdded);
//     };
//   }, [canvas]);

//   const applyBrush = () => {
//     if (!canvas) return;
//     canvas.isDrawingMode = isDrawing;
//     if (canvas.freeDrawingBrush) {
//       canvas.freeDrawingBrush.color = isErasing ? (isDark ? '#1e1e1e' : '#ffffff') : (isDark ? 'white' : 'black');
//       canvas.freeDrawingBrush.width = isErasing ? 10 : 2;
//     }
//   };

//   useEffect(() => {
//     applyBrush();
//   }, [isDrawing, isErasing, isDark]);

//   const addShape = (shape: fabric.Object) => {
//     canvas?.add(shape);
//     broadcastCanvas('object:added', shape.toJSON());
//   };

//   const addRectangle = () =>
//     addShape(new fabric.Rect({ left: 100, top: 100, width: 120, height: 80, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

//   const addCircle = () =>
//     addShape(new fabric.Circle({ radius: 50, left: 150, top: 150, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

//   const addEllipse = () =>
//     addShape(new fabric.Ellipse({ rx: 60, ry: 40, left: 350, top: 200, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

//   const addTriangle = () =>
//     addShape(new fabric.Triangle({ width: 100, height: 100, left: 450, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));

//   const addDiamond = () => {
//     const points = [
//       { x: 0, y: 50 },
//       { x: 50, y: 0 },
//       { x: 100, y: 50 },
//       { x: 50, y: 100 },
//     ];
//     addShape(new fabric.Polygon(points, { left: 250, top: 250, fill: '', stroke: isDark ? 'white' : 'black', strokeWidth: 2 }));
//   };

//   const addArrowLine = () => {
//     const line = new fabric.Line([100, 100, 200, 200], {
//       stroke: isDark ? 'white' : 'black',
//       strokeWidth: 2,
//     });
//     const arrow = new fabric.Polygon(
//       [
//         { x: 0, y: 0 },
//         { x: -10, y: -5 },
//         { x: -10, y: 5 },
//       ],
//       {
//         left: 200,
//         top: 200,
//         angle: 45,
//         fill: isDark ? 'white' : 'black',
//       }
//     );
//     canvas?.add(line);
//     canvas?.add(arrow);
//     broadcastCanvas('object:added', line.toJSON());
//     broadcastCanvas('object:added', arrow.toJSON());
//   };

//   const addText = () => {
//     const text = new fabric.Textbox('Double click to edit', {
//       left: 100,
//       top: 100,
//       fontSize: 24,
//       fill: isDark ? 'white' : 'black',
//     });
//     canvas?.add(text);
//     broadcastCanvas('object:added', text.toJSON());
//   };

//   const toggleDraw = () => {
//     setIsDrawing(!isDrawing);
//     setIsErasing(false);
//   };

//   const toggleErase = () => {
//     setIsErasing(!isErasing);
//     setIsDrawing(true);
//   };

//   const clearCanvas = () => {
//     canvas?.clear();
//     canvas?.setBackgroundColor(isDark ? '#1e1e1e' : '#ffffff', () => canvas.renderAll());
//     broadcastCanvas('canvas:cleared', {});
//   };

//   const downloadCanvas = () => {
//     if (!canvas) return;
//     const dataURL = canvas.toDataURL({ format: 'png' });
//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = 'canvas.png';
//     link.click();
//   };

//   return (
//     <div className={`${isDark ? 'bg-[#121212] text-white' : 'bg-gray-100 text-black'} w-screen h-screen flex flex-col`}>
//       <div className="flex gap-4 items-center px-6 py-4 border-b shadow-md backdrop-blur sticky top-0 z-10 bg-opacity-70 bg-white dark:bg-black">
//         <div className="text-2xl font-bold">🎨 DrawBoard</div>

//         <div className="flex gap-3 text-xl ml-6">
//           <button onClick={addRectangle} title="Rectangle">▭</button>
//           <button onClick={addCircle} title="Circle">◯</button>
//           <button onClick={addDiamond} title="Diamond">◆</button>
//           <button onClick={addEllipse} title="Ellipse">⬭</button>
//           <button onClick={addTriangle} title="Triangle">▲</button>
//           <button onClick={addArrowLine} title="Arrow Line">↗</button>
//           <button onClick={toggleDraw} title="Pencil">{isDrawing && !isErasing ? '🛑' : '✏️'}</button>
//           <button onClick={toggleErase} title="Eraser">{isErasing ? '❌' : '🧽'}</button>
//           <button onClick={addText} title="Text">🅰️</button>
//           <button onClick={clearCanvas} title="Clear">🗑️</button>
//           <button onClick={downloadCanvas} title="Download">💾</button>
//         </div>

//         <button
//           onClick={() => setIsDark(!isDark)}
//           className="ml-auto px-4 py-1.5 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-black text-sm font-medium shadow hover:scale-105 transition"
//         >
//           {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
//         </button>
//       </div>

//       <canvas ref={canvasRef} className="flex-grow" />
//     </div>
//   );
// };

// export default FabricCanvas;





















