'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { generatePDF } from '../../helper/pdf';

const ConsentForm = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    if (!consentGiven) {
      setLoading(false)
      setFirstTime(true)
      return;
    }
    try {
      const formData = { fName, lName, email, consentGiven };
      const response = await axios.post('/api/consent', formData, { headers: { 'Content-Type': 'application/json' } });
      generatePDF(fName, lName, response.data.consent.date);
      setFName('');
      setLName('');
      setEmail('');
      setConsentGiven(false);
      setFirstTime(false)
      setLoading(false)
    } catch (err) {
      console.error('Error submitting form:', err);
    } finally {
      setShowPopup(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setConsentGiven(isChecked);
    if (isChecked) {
      setShowPopup(true)
    }

    if (!isChecked) {
      setShowPopup(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">

      {loading && <div className="loading">Loading...</div>}

      <div className="content">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fName">
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fName"
              type="text"
              placeholder="First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lName">
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lName"
              type="text"
              placeholder="Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consentGiven">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="consentGiven"
                checked={consentGiven}
                onChange={handleCheckboxChange}
              />
              Consent Given
            </label>
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-10 bg-gray-800 bg-opacity-50">
              <div className="bg-white p-4 rounded shadow-md max-w-sm h-96 overflow-y-auto">
                <p className="text-lg font-bold mb-4">Consent Details</p>
                <div className="mb-4">
                  <p className="mb-2">
                    <strong>Use of Likeness:</strong> I consent to the use of my likeness, including but not limited to my image, voice, and any other identifiable attributes, in videos produced and published by Abhishek Savaliya on the YouTube channel @SriKrsnaBhajananvita.
                  </p>
                  <p className="mb-2">
                    <strong>Use of Likeness:</strong> I consent to the use of my likeness, including but not limited to my image, voice, and any other identifiable attributes, in videos produced and published by Abhishek Savaliya on the YouTube channel @SriKrsnaBhajananvita.
                  </p>
                  {/* Add more paragraphs here if needed */}
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-3"
                    onClick={() => { setShowPopup(false); setConsentGiven(false); }}
                  >
                    Close
                  </button>

                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => { setShowPopup(false) }}
                  >
                    Grant
                  </button>
                </div>
              </div>
            </div>
          )}

          {(!consentGiven && firstTime) && (
            <div className="text-red-500 -mt-4 text-xs mb-3">Please fill consent.</div>
          )}


          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConsentForm;