'use client';
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { multiLang } from '../../lib/constants';
import { availableDepartments } from '../../lib/constants';
import { motion } from 'framer-motion';
import { NewComplaint } from 'app/actions/newComplaint';

export default function ChatInterface() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(null);
  const [pnrVerified, setPnrVerified] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [geminiEnabled, setGeminiEnabled] = useState(false);
  const [language, setLanguage] = useState(null);
  const [showLanguageOptions, setShowLanguageOptions] = useState(true);
  const [pnr, setPnr] = useState('');
  const [jsonSent, setJsonSent] = useState(false);
  const [jsonGenerated, setJsonGenerated] = useState(false);
  const [UUID, setUUID] = useState('');

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_APIKEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const sendJsonToBackend = (jsonData) => {
    console.log('Sending JSON to backend:', jsonData);

    NewComplaint(jsonData);
    // Implement actual backend sending logic here
  };

  const handleSubmit = async () => {
    if (input.trim() === '') return;
    const newUserMessage = { role: 'user', content: input };
    setHistory((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    if (!pnrVerified) {
      setTimeout(() => {
        if (input.trim().toLowerCase() === 'abc123') {
          addModelResponse(multiLang[language].introQuestion);
          setPnrVerified(true);
          setShowOptions(true);
          setPnr(input.trim());
        } else {
          addModelResponse('Invalid PNR. Please try again.');
        }
        setLoading(false);
      }, 1000);
    } else if (geminiEnabled) {
      try {
        const systemPrompt = `You are an AI assistant for RailMadad, a grievance redressal mechanism developed by the Indian Railways. Provide helpful and accurate information about train services in India, ticketing, and passenger assistance. Be polite, professional, and concise. Do not make up information about specific trains, schedules, or policies. Don't ask for PNR number in any case as the user has already provided PNR number and it is ${pnr}. Also reply only and only in ${language} language.

Current conversation history:
${history.map((msg) => `${msg.role}: ${msg.content}`).join('\n')}

User's new message: ${input}

First, summarize the user's query in one sentence, then provide a simple summary in 2-3 sentences. After that, give a detailed response to the user's query.`;

        const result = await model.generateContent([systemPrompt]);
        const response = await result.response;
        const text = response.text();

        const [summary, ...responseParts] = text.split('\n\n');
        const [oneLiner] = summary.split('\n');
        const detailedResponse = responseParts.join('\n\n');

        const department = await determineDepartment(input, oneLiner);
        const jsonResponse = processUserQuery(input, oneLiner, department);

        if (!jsonSent) {
          sendJsonToBackend(jsonResponse);
          setJsonSent(true);
          setJsonGenerated(true);
        }

        addModelResponse(detailedResponse);
      } catch (error) {
        console.error(error);
        addModelResponse('Oops! Something went wrong.');
      }
      setLoading(false);
    }
  };

  const determineDepartment = async (query, oneLiner) => {
    const selectedDepartment = availableDepartments[option] || [];
    const languageDepartments = getLanguageDepartments(language, option);

    const departmentPrompt = `Given the following user query and its one-line summary, determine the most appropriate department from the list below. Only return the name of the department and its sub-category if applicable, nothing else.

		User query: ${query}
		One-line summary: ${oneLiner}

		Available departments and their sub-categories:
		${languageDepartments.join(', ')}
		Please choose the most suitable department and sub-category from the list above`;

    try {
      const result = await model.generateContent([departmentPrompt]);
      const response = await result.response;
      const department = response.text().trim();

      // Validate if the department is in the selectedDepartment array
      const isValidDepartment = languageDepartments.some((dept) =>
        department.includes(dept)
      );

      return isValidDepartment ? department : 'Unknown';
    } catch (error) {
      console.error('Error determining department:', error);
      return 'Unknown';
    }
  };

  const getLanguageDepartments = (lang, selectedOption) => {
    const departments = {
      en: availableDepartments[selectedOption],
      hi: availableDepartments[
        multiLang.hi.categoriesArray[
          multiLang.en.categoriesArray.indexOf(selectedOption)
        ]
      ],
      tm: availableDepartments[
        multiLang.tm.categoriesArray[
          multiLang.en.categoriesArray.indexOf(selectedOption)
        ]
      ]
    };
    return departments[lang] || [];
  };

  const processUserQuery = (query, oneLiner, department) => {
    const uuid = generateUUID();
    return {
      pnr: pnr,
      uuid: uuid,
      timeCreated: new Date().toISOString(),
      departmentType: department,
      optionSelected: option,
      userQuery: query,
      oneLinerExplanation_of_UserQuery_in_english: oneLiner
    };
  };

  const generateUUID = () => {
    const alphanumeric = Math.random().toString(36).substring(2, 6); // Generate 4 alphanumeric characters
    const uuid = `${pnr}-${alphanumeric}`; // Combine PNR with the alphanumeric code
    setUUID(uuid);
    return uuid;
  };
  const addModelResponse = (content) => {
    setHistory((prev) => [
      ...prev,
      { role: 'model', content: <TypingAnimation content={content} /> }
    ]);
  };

  const handleOptionSelect = (selectedOption) => {
    setOption(selectedOption);
    addModelResponse(
      multiLang[language].youHaveSelected +
        ' ' +
        selectedOption +
        multiLang[language].selectedContinuation
    );
    setShowOptions(false);
    setGeminiEnabled(true);
  };

  const handleLanguageSelect = (value) => {
    setLanguage(value);
    setShowLanguageOptions(false);
    setHistory((prev) => [
      ...prev,
      {
        role: 'model',
        content: multiLang[value].PNR_Question
      }
    ]);
  };

  const TypingAnimation = ({ content }) => {
    const words = content.split(' ');

    return (
      <div className="typing-animation">
        {words.map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: index * 0.1
            }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {history.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-lg ${
              item.role === 'model' ? 'bg-blue-100 ml-auto' : 'bg-green-100'
            }`}
          >
            <p
              className={`${
                item.role === 'model' ? 'text-blue-800' : 'text-green-800'
              }`}
            >
              {item.content}
            </p>
          </motion.div>
        ))}
        {loading && (
          <div className="text-gray-500 italic">
            {multiLang[language]?.botThinkingText}
          </div>
        )}
      </div>

      {showLanguageOptions && (
        <div className="bg-white border rounded-lg p-4 mb-4 shadow-lg">
          <h3 className="font-bold text-lg mb-2">Choose Your Language</h3>
          <p className="text-sm text-gray-500 mb-4">
            Please select the language you prefer to communicate in:
          </p>
          <RadioGroup onValueChange={handleLanguageSelect}>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hi" id="hindi" />
                <Label htmlFor="hindi">हिंदी (Hindi)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tm" id="tamil" />
                <Label htmlFor="tamil">தமிழ் (Tamil)</Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {showOptions && (
        <div className="bg-white border rounded-lg p-4 mb-4 shadow-lg">
          <h3 className="font-bold text-lg mb-2">
            {multiLang[language]?.introQuestionBox}
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            {multiLang[language]?.selectionRequired}
          </p>
          <RadioGroup onValueChange={handleOptionSelect}>
            <div className="space-y-2">
              {multiLang[language]?.categoriesArray.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={category} id={`category_${index}`} />
                  <Label htmlFor={`category_${index}`}>{category}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      )}

      {jsonGenerated && (
        <div className="text-green-500 font-semibold mb-4">
          Your ticket has been raised with UUID: {UUID}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Textarea
          placeholder={multiLang[language]?.placeholderText}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          disabled={showOptions || showLanguageOptions || jsonGenerated}
        />
        <Button
          onClick={handleSubmit}
          disabled={loading || showOptions || showLanguageOptions}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
