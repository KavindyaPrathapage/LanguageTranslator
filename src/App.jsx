function App() {
  return (
    <div className="h-screen w-screen bg-slate-200">
      <div className="flex items-center justify-center flex-col gap-y-10 ">
        <h1 className="text-3xl text-zinc-700 font-bold">Text Translator</h1>
        <div className="flex items-center justify-center flex-col gap-y-5">
          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg px-5 py-2" />
          <textarea name="input-text" className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg px-5 py-2" />
        </div>
        <div>
          <label htmlFor="options">Converted Into : </label>
          <select name="value">
            <option value="">Select</option>
            <option value="si">Sinhala</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default App