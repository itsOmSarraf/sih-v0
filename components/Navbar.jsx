"use client"
import { Phone } from 'lucide-react';
import useLanguageStore from '../lib/Stores/LanguageStore'; // Import the Zustand store
import multiLang from '../lib/constants'; // Import the multi-language object

const Navbar = () => {
  const { language, setLanguage } = useLanguageStore(); // Access language and setLanguage from the store

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value); // Update the global language state
  };

  return (
    <div className="flex items-center justify-between px-6">
      <div className="flex items-center">
        <img src="/emblem.png" alt="Emblem" className="w-14 h-20" />
        <img src="/logo.png" alt="Logo" className="w-24" />
        <img
          src="/G20_India_2023_logo.svg.png"
          alt="G20 Logo"
          className="w-20 h-14"
        />
      </div>
      <div>
        <h1 className="text-[#75002b] text-5xl font-bold">{multiLang[language].NavbarTitle}</h1>
        <p className="text-gray-500">
          For Inquiry, Assistance & Grievance Redressal
        </p>
      </div>
      <div className="flex items-center gap-5">
        <div className="cursor-pointer flex items-center gap-1 bg-orange-500 text-3xl text-white font-bold px-4 py-2 rounded-lg">
          <Phone />
          <a href="tel:139">139</a>
        </div>
        <p className="text-base">for Security/ Medical Assistance</p>
      </div>
      <div className="flex gap-3">
        <button className="bg-[#dcdef9] px-8 py-2 rounded-lg">FAQ</button>
        <button className="bg-[#efe4e8] px-6 py-2 rounded-lg">Search</button>
      </div>
      <div>
        <select
          name="language"
          id="language"
          value={language} // Bind the select value to the global language state
          onChange={handleLanguageChange} // Update the global state on change
          className="border-[1px] border-gray-300 rounded-lg px-5 py-2"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="tm">தமிழ்</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
