import useLanguageStore from '@/lib/Stores/LanguageStore';
import { multiLang } from '@/lib/constants';
import React from 'react';
import ChatInterface from 'app/chatbot/page';

const SideButtons = () => {
  const { language } = useLanguageStore();
  return (
    <div className="absolute inset-0 flex justify-between">
      {/* Buttons */}
      <div className="pt-36 pl-16 z-10">
        <div className="flex gap-14 mb-4">
          <a href="https://www.irctc.co.in/nget/" target="_blank">
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-1.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_1}
              </p>
            </div>
          </a>
          <a href="https://enquiry.indianrail.gov.in/" target="_blank">
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_2}
              </p>
            </div>
          </a>
          <a href="http://www.indianrail.gov.in/" target="_blank">
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-3.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_3}
              </p>
            </div>
          </a>
          <a href="https://rr.irctc.co.in/#/home" target="_blank">
            <div className="flex flex-col w-24">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-4.png"
                alt=""
                className="max-w-16"
              />
              <p className="pt-2 text-center text-white text-sm -ml-8">
                {multiLang[language].EightButton_4}
              </p>
            </div>
          </a>
        </div>
        <div className="flex gap-14">
          <a href="http://www.indianrailways.gov.in/" target="_blank">
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-5.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_5}
              </p>
            </div>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.cris.utsmobile&hl=en_IN"
            target="_blank"
          >
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_6}
              </p>
            </div>
          </a>
          <a
            href="https://www.fois.indianrail.gov.in/RailSAHAY/index.jsp"
            target="_blank"
          >
            <div className="flex flex-col w-16">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-7.png"
                alt=""
              />
              <p className="pt-2 text-center text-white text-sm">
                {multiLang[language].EightButton_7}
              </p>
            </div>
          </a>
          <a href="https://parcel.indianrail.gov.in/" target="_blank">
            <div className="flex flex-col w-24">
              <img
                src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
                alt=""
                className="max-w-16"
              />
              <p className="pt-2 text-center text-white text-sm -ml-8">
                {multiLang[language].EightButton_8}
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* ChatSection */}
      <div className="w-1/2 h-[90%] my-auto rounded-2xl border-l-[7px] border-t-[7px] border-[#75002b] bg-white z-10 flex mr-20 overflow-hidden">
        <div className="w-full h-full overflow-auto">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default SideButtons;
