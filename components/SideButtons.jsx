import React from 'react';

const SideButtons = () => {
  return (
    <div className="absolute inset-0 flex justify-between">
      {/* Buttons */}
      <div className="pt-36 pl-16 z-10">
        <div className="flex gap-14 mb-4">
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-1.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">
              Ticket Booking
            </p>
          </div>
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">Train Enquiry</p>
          </div>
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-3.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">
              Reservation Enquiry
            </p>
          </div>
          <div className="flex flex-col w-24">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-4.png"
              alt=""
              className="max-w-16"
            />
            <p className="pt-2 text-center text-white text-sm -ml-8">
              Retiring Room Booking
            </p>
          </div>
        </div>
        <div className="flex gap-14">
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-5.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">
              Indian Railways
            </p>
          </div>
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">UTS Ticketing</p>
          </div>
          <div className="flex flex-col w-16">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-7.png"
              alt=""
            />
            <p className="pt-2 text-center text-white text-sm">
              Freight Business
            </p>
          </div>
          <div className="flex flex-col w-24">
            <img
              src="https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png"
              alt=""
              className="max-w-16"
            />
            <p className="pt-2 text-center text-white text-sm -ml-8">
              Railway Parcel Website
            </p>
          </div>
        </div>
      </div>

      {/* ChatSection */}
      <div className="w-1/2 h-[90%] my-auto rounded-2xl border-l-[7px] border-t-[7px] border-[#75002b] bg-white z-10 flex items-center justify-center mr-20">
        <p className="text-gray-500">ChatBot Section</p>
      </div>
    </div>
  );
};

export default SideButtons;