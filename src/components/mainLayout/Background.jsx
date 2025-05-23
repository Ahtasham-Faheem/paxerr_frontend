const Background = () => {
  return (
    <>
      <div className="fixed top-0 left-0 -z-50 w-screen h-screen lg:p-5">
        <div className="relative background h-full w-full bg-[#0D0D0D] lg:rounded-4xl">
          <img
            className="hidden lg:block absolute max-lg:rotate-90 -right-22 bottom-40 lg:top-0 lg:right-50 h-6 2xl:h-auto"
            src="/images/shapes/shape-tr.svg"
            alt=""
          />
          
          {/* Desktop */}
          <div className="hidden absolute left-0 lg:flex flex-col justify-start items-start h-full">
            <img
              className="h-16 2xl:h-auto"
              src="/images/shapes/shape-tl.svg"
              alt=""
            />
            <div className="w-fit flex flex-col gap-4 pl-6 items-center h-full">
              <img className="mb-4" src="/images/shapes/shape-lmt.svg" alt="" />
              <img className="w-fit" src="/images/shapes/plus.svg" alt="" />
              <span className="bg-[#1A1A1A] w-[5px] h-full rounded-full flex-1"></span>
              <img className="w-fit" src="/images/shapes/plus.svg" alt="" />
              <span className="bg-[#1A1A1A] w-[5px] h-full rounded-full flex-1"></span>
              <img className="w-fit" src="/images/shapes/plus.svg" alt="" />
              <img className="mt-4" src="/images/shapes/shape-lmt.svg" alt="" />
            </div>
            <img
              className="min-h-28 2xl:min-h-auto"
              src="/images/shapes/shape-bl.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <spline-viewer
        url="https://prod.spline.design/VmDAieSMsRbcTZfN/scene.splinecode"
        className="particles pointer-events-none lg:!pointer-events-auto"
      ></spline-viewer>
      <script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.9.45/build/spline-viewer.js"
        async
      ></script>
      <div className="spline-overlay"></div>
    </>
  );
};

export default Background;
