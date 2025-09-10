import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { LoaderCircle, Home, Languages, KeyRound } from "lucide-react";

// Text Translator Component
function TextTranslator() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTextTranslation = async () => {
    setLoading(true);
    try {
      const options = {
        method: "POST",
        url: "https://google-translator9.p.rapidapi.com/v2",
        headers: {
          "x-rapidapi-key": "40d00a8c00msh6c38d0cadfec5e5p1e7f4bjsn31d48f289ca7",
          "x-rapidapi-host": "google-translator9.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          q: textInput,
          source: "en",
          target: selectValue,
          format: "text",
        },
      };

      const response = await axios.request(options);
      setLoading(false);
      setResult(response?.data?.data?.translations?.[Number(0)]?.translatedText);
    } catch (error) {
      setLoading(false);
      console.log(error?.data);
    }
  };

  return (
    <div className="h-screen w-full bg-[url('/textbg4.jpg')] bg-cover flex items-center justify-center flex-col gap-y-10">
      <div className="bg-slate-800 bg-opacity-90 p-6 rounded-lg flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl text-slate-200 font-bold mb-6">
          Text Translator
        </h1>
        <div className="flex items-center justify-center flex-col gap-y-5">
          <textarea
            name="input-text"
            className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg px-5 py-2"
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text to translate"
          />
          <textarea
            name="output-text"
            className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg px-5 py-2"
            value={result}
            readOnly
            placeholder="Translation will appear here"
          />
        </div>

        <div>
          <label className="text-slate-100" htmlFor="options">
            Converted Into :{" "}
          </label>
          <select
            name="value"
            className="bg-white px-2 py-1 rounded-lg border border-zinc-700 outline-1 cursor-pointer"
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="">Select</option>
            <option value="si">Sinhala</option>
            <option value="hi">Hindi</option>
          </select>
        </div>

        <button
          className="bg-slate-300 text-slate-800 mx-auto w-[200px] py-2 rounded-lg cursor-pointer flex items-center justify-center hover:bg-slate-400 transition-colors"
          onClick={handleTextTranslation}
          disabled={loading || !textInput || !selectValue}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Translate"}
        </button>
      </div>
    </div>
  );
}

// Password Generator Component
function PasswordGenerator() {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(8);

  const handleLengthIncrease = (e) => {
    e.preventDefault();
    setPasswordLength(passwordLength + 1);
  };

  const handleLengthDecrease = (e) => {
    e.preventDefault();
    if (passwordLength === 8) return;
    setPasswordLength(passwordLength - 1);
  };

  const handlePasswordGenerate = React.useCallback(() => {
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZC!@#$%^&*()";
    let pass = "";

    for (let i = 0; i < passwordLength; i++) {
      pass = pass + chars[Math.floor(Math.random() * chars.length)];
    }

    setPassword(pass);
  }, [passwordLength]);

  React.useEffect(() => {
    handlePasswordGenerate();
  }, [passwordLength, handlePasswordGenerate]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="h-screen w-full bg-[url('/textbg4.jpg')] bg-cover flex flex-col items-center justify-center gap-10">
      <div className="bg-slate-800 bg-opacity-90 p-6 rounded-lg flex flex-col items-center justify-center gap-10">
        <h1 className="text-5xl text-slate-200 font-bold mb-6">
          Random Password Generator
        </h1>
        <div className="relative">
          <input
            type="text"
            className="h-10 w-80 outline-none border border-slate-800 rounded-lg px-5 text-center"
            value={password}
            readOnly
          />
          <button
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-600 hover:text-slate-800"
            title="Copy to clipboard"
          >
            📋
          </button>
        </div>
        <div className="flex items-center justify-center gap-x-3">
          <button
            className="h-10 w-10 text-xl font-bold bg-slate-300 text-slate-700 rounded-lg outline-none hover:bg-slate-400 transition-colors"
            onClick={handleLengthDecrease}
          >
            -
          </button>
          <input
            type="text"
            className="h-10 w-20 text-center outline-none border border-slate-800 rounded-lg"
            value={passwordLength}
            readOnly
          />
          <button
            className="h-10 w-10 text-xl font-bold bg-slate-300 text-slate-700 rounded-lg outline-none hover:bg-slate-400 transition-colors"
            onClick={handleLengthIncrease}
          >
            +
          </button>
        </div>
        <button
          className="bg-slate-300 text-slate-800 mx-auto w-[200px] py-2 rounded-lg cursor-pointer hover:bg-slate-400 transition-colors"
          onClick={handlePasswordGenerate}
        >
          Generate New
        </button>
      </div>
    </div>
  );
}

// Home Page Component
function HomePage() {
  return (
    <div className="h-screen w-full bg-[url('/textbg4.jpg')] bg-cover flex flex-col items-center justify-center">
      <div className="bg-slate-800 bg-opacity-90 p-10 rounded-lg text-center">
        <h1 className="text-5xl text-slate-200 font-bold mb-6">
          Utility App Suite
        </h1>
        <p className="text-slate-300 text-xl mb-10 max-w-2xl">
          Access useful tools like text translation and password generation all in one place.
        </p>
        
        <div className="flex justify-center gap-8">
          <Link
            to="/translator"
            className="flex flex-col items-center bg-slate-300 p-6 rounded-lg hover:bg-slate-400 transition-colors w-48"
          >
            <Languages size={48} className="mb-3 text-slate-700" />
            <span className="text-slate-800 font-semibold">Text Translator</span>
          </Link>
          
          <Link
            to="/password-generator"
            className="flex flex-col items-center bg-slate-300 p-6 rounded-lg hover:bg-slate-400 transition-colors w-48"
          >
            <KeyRound size={48} className="mb-3 text-slate-700" />
            <span className="text-slate-800 font-semibold">Password Generator</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav className="bg-slate-800 bg-opacity-90 text-slate-200 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Home size={24} />
          <span>Utility Apps</span>
        </Link>
        
        <div className="flex gap-6">
          <Link 
            to="/" 
            className="hover:text-slate-400 transition-colors flex items-center gap-1"
          >
            <Home size={18} />
            Home
          </Link>
          <Link 
            to="/translator" 
            className="hover:text-slate-400 transition-colors flex items-center gap-1"
          >
            <Languages size={18} />
            Translator
          </Link>
          <Link 
            to="/password-generator" 
            className="hover:text-slate-400 transition-colors flex items-center gap-1"
          >
            <KeyRound size={18} />
            Password Generator
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Main App Component with Routing
function App() {
  return (
    <Router>
      <div className="w-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/translator" element={<TextTranslator />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;