// import { ScrollArea } from "@/components/ui/ScrollArea";
// import { VapiButton, vapi } from "./features/Assistant";
// import { MessageList } from "./features/Messages";
// import { useVapi } from "./features/Assistant";
// import { CharacterPreview } from "./features/Character";
// import { useEffect, useRef } from "react";

// function App() {
//   const scrollAreaRef = useRef<any>(null);
//   const viewportRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     const viewport = viewportRef.current;
//     if (viewport) {
//       viewport.scrollTop = viewport.scrollHeight;
//     }
//   };
//   const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
//     useVapi();

//   useEffect(() => {
//     vapi.on("message", scrollToBottom);
//     return () => {
//       vapi.off("message", scrollToBottom);
//     };
//   });

//   return (
//     <main className="flex h-screen">
//       <CharacterPreview />
//       <div
//         id="card"
//         className="text-slate-950 dark:text-slate-50 w-full relative"
//       >
//         {/* <div
//           id="card-header"
//           className="flex flex-col space-y-1.5 p-6 shadow pb-4"
//         ></div> */}
//         <div id="card-content" className="p-6 pt-0">
//           <ScrollArea
//             ref={scrollAreaRef}
//             viewportRef={viewportRef}
//             className="h-[90vh] flex flex-1 p-4"
//           >
//             <div className="flex flex-1 flex-col min-h-[85vh] justify-end">
//               <MessageList
//                 messages={messages}
//                 activeTranscript={activeTranscript}
//               />
//             </div>
//           </ScrollArea>
//         </div>
//         <div
//           id="card-footer"
//           className="flex justify-center absolute bottom-0 left-0 right-0 py-4"
//         >
//           <VapiButton
//             audioLevel={audioLevel}
//             callStatus={callStatus}
//             toggleCall={toggleCall}
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;
import { ScrollArea } from "@/components/ui/ScrollArea";
import { VapiButton, vapi } from "./features/Assistant";
import { MessageList } from "./features/Messages";
import { useVapi } from "./features/Assistant";
//import { CharacterPreview } from "./features/Character";
import { useEffect, useRef } from "react";

function App() {
  const scrollAreaRef = useRef<any>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTop = viewport.scrollHeight;
    }
  };

  const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
    useVapi();

  useEffect(() => {
    vapi.on("message", scrollToBottom);
    return () => {
      vapi.off("message", scrollToBottom);
    };
  }, []);

  return (
    <main className="flex h-screen bg-gradient-to-b from-gray-900 to-blue-950 font-orbitron relative overflow-hidden">
      {/* Background Waveforms */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`waveform ${
            callStatus === "active" ? "animate-waveform" : ""
          }`}
        ></div>
        <div
          className={`waveform waveform-delay ${
            callStatus === "active" ? "animate-waveform" : ""
          }`}
        ></div>
      </div>

      {/* <CharacterPreview /> */}

      <div
        id="card"
        className="text-slate-50 w-full relative bg-gray-900 bg-opacity-50 backdrop-blur-md border border-cyan-500 shadow-lg shadow-cyan-500/50"
      >
        {/* Card Header */}
        <div id="card-header" className="p-6 shadow pb-4">
          <h1 className="text-3xl font-bold text-cyan-400 text-center">
            AI Assistant
          </h1>
          <div className="flex justify-center mt-4">
            <svg
              className={`w-8 h-8 text-purple-400 ${
                callStatus === "active" ? "animate-spin-slow" : ""
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10S2 17.5 2 12zm10-5a5 5 0 0 0 0 10 5 5 0 0 0 0-10z" />
            </svg>
          </div>
        </div>

        {/* Card Content */}
        <div id="card-content" className="p-6 pt-0">
          <ScrollArea
            ref={scrollAreaRef}
            viewportRef={viewportRef}
            className="h-[70vh] flex flex-1 p-4 bg-gray-800 bg-opacity-70 border border-purple-500 rounded-lg"
          >
            <div className="flex flex-1 flex-col min-h-[65vh] justify-end">
              <MessageList
                messages={messages}
                activeTranscript={activeTranscript}
              />
            </div>
          </ScrollArea>
        </div>

        {/* Card Footer */}
        <div
          id="card-footer"
          className="flex flex-col items-center absolute bottom-0 left-0 right-0 py-4"
        >
          <div className="flex justify-center space-x-4 mb-4">
            <VapiButton
              audioLevel={audioLevel}
              callStatus={callStatus}
              toggleCall={toggleCall}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                callStatus === "active"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 animate-pulse-glow"
                  : "bg-gradient-to-r from-gray-600 to-gray-800"
              }`}
            />
          </div>
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={toggleCall}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Stop
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-all duration-300"
            >
              Reset
            </button>
          </div>
          <p className="text-center text-sm text-cyan-400">
            Secure voice interaction • Powered by DigiRocket
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
// import { ScrollArea } from "@/components/ui/ScrollArea";
// import { VapiButton, vapi } from "./features/Assistant";
// import { MessageList } from "./features/Messages";
// import { useVapi } from "./features/Assistant";
// import { CharacterPreview } from "./features/Character";
// import { useEffect, useRef } from "react";

// function App() {
//   const scrollAreaRef = useRef<any>(null);
//   const viewportRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     const viewport = viewportRef.current;
//     if (viewport) {
//       viewport.scrollTop = viewport.scrollHeight;
//     }
//   };
//   const { toggleCall, messages, callStatus, activeTranscript, audioLevel } =
//     useVapi();

//   useEffect(() => {
//     vapi.on("message", scrollToBottom);
//     return () => {
//       vapi.off("message", scrollToBottom);
//     };
//   });

//   return (
//     <main className="flex h-screen">
//       <CharacterPreview />
//       <div
//         id="card"
//         className="text-slate-950 dark:text-slate-50 w-full relative"
//       >
//         {/* <div
//           id="card-header"
//           className="flex flex-col space-y-1.5 p-6 shadow pb-4"
//         ></div> */}
//         <div id="card-content" className="p-6 pt-0">
//           <ScrollArea
//             ref={scrollAreaRef}
//             viewportRef={viewportRef}
//             className="h-[90vh] flex flex-1 p-4"
//           >
//             <div className="flex flex-1 flex-col min-h-[85vh] justify-end">
//               <MessageList
//                 messages={messages}
//                 activeTranscript={activeTranscript}
//               />
//             </div>
//           </ScrollArea>
//         </div>
//         <div
//           id="card-footer"
//           className="flex justify-center absolute bottom-0 left-0 right-0 py-4"
//         >
//           <VapiButton
//             audioLevel={audioLevel}
//             callStatus={callStatus}
//             toggleCall={toggleCall}
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

// export default App;
