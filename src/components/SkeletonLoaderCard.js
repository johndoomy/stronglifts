function SkeletonLoaderCard() {
  return (
    <div className="animate-pulse drop-shadow-lg mx-10 mt-6 border-2 border-slate-300 rounded-lg ">
      <h3 className="px-6 pt-2 text-sm flex justify-between">
        <span className="bg-gray-400 rounded rounded-full w-16 h-2"></span>
        <span className="bg-gray-400 rounded rounded-full w-20 h-2"></span>
      </h3>
      <div className="mx-4 pb-2 divide-y divide-solid">
        <div>
          <div className="flex justify-between rounded rounded-full pt-4">
            <span className="w-20 h-3 my-2 bg-gray-400 rounded rounded-full"></span>
            <div className="flex justify-between mt-3">
              <span className="mr-8 bg-gray-400 rounded rounded-full w-10 h-3"></span>
              <span className="bg-gray-400 rounded rounded-full w-12 h-3"></span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between rounded rounded-full pt-4">
            <span className="w-28 h-3 my-2 bg-gray-400 rounded rounded-full"></span>
            <div className="flex justify-between mt-3">
              <span className="mr-8 bg-gray-400 rounded rounded-full w-10 h-3"></span>
              <span className="bg-gray-400 rounded rounded-full w-10 h-3"></span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between rounded rounded-full pt-4">
            <span className="w-24 h-3 my-2 bg-gray-400 rounded rounded-full"></span>
            <div className="flex justify-between mt-3">
              <span className="mr-8 bg-gray-400 rounded rounded-full w-12 h-3"></span>
              <span className="bg-gray-400 rounded rounded-full w-12 h-3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoaderCard;
