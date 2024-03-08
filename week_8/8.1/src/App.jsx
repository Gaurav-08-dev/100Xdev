import "./App.css";

function App() {
  return (
    <>
      {/* <div className="grid grid-cols-4 w-[100px] h-[110px] bg-indigo-500">
        <div className="text-red-200 bg-sky-600 col-span-4">1</div>
        <div className="text-red-300 bg-black col-span-4">4</div>
        <div className="text-red-400 bg-slate-400 col-span-4">3</div>
        <div className="text-red-500 bg-slate-900 col-span-4">2</div>
      </div> */}

      <div className="min-w-[300px] max-w-[400px] rounded bg-[#146EB4] p-0 text-slate-100 hover:bg-sky-950">
        <div className="p-2 flex flex-col gap-3   transition-all">
          <div className="flex items-center gap-1 p-0 font-medium">
            Next Payout
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="0.7em"
              width="0.7em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm169.8-90.7c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"></path>
            </svg>
          </div>
          <div className="flex justify-between text-white-500 font-medium items-center">
            <div>2,314</div>
            <div className="underline underline-offset-1 flex items-center">
              23 Orders{" "}
              <svg
                className="pt-1"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-lg"
                height="0.5em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex gap-4 bg-sky-950 text-sm rounded p-3 justify-between gap-5">
          <span>Next Payment Date:</span>
          <span>Today, 4:00PM</span>
        </div>
      </div>
    </>
  );
}

export default App;
