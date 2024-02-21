export default function Privacy() {
  return (
    <div className="flex justify-center w-[50vw] text-gray-400 font-medium">
      <div className="mx-auto">
        <h2 className="text-center text-2xl tracking-wider mb-10 ">Security</h2>
        <form>
          <div>
            <label
              htmlFor="email"
              className="text-lg capitalize text-gray-300 tracking-widest"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3 w-full"
            />
          </div>
          <div className="flex justify-between items-center gap-5 mt-6">
            <div>
              <label
                htmlFor="password"
                className="text-lg capitalize text-gray-300 tracking-widest"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                className="block border-2 border-gray-500 rounded-xl py-4 px-4 mt-3 w-full"
              />
            </div>
            <button className="text-blue-500 mt-5 capitalize tracking-wide">
              change{" "}
            </button>
          </div>

          <button className="btn mt-10">save</button>
        </form>
      </div>
    </div>
  );
}
