import React, { useEffect, useState } from 'react'
import { FaCopy } from "react-icons/fa";
import './index.css'

const index = () => {


  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    length: 4,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSpecialChars: true
  });

  const [strength, setStrength] = useState('');
  const [copyBtnIcon, setCopyBtnIcon] = useState('');
  useEffect(() => {

    if (password) {
      passwordStrength(password);
    } else {
      setStrength(' ')
    }
  }, [password]);

  // function to generate a password string
  const generatePassword = () => {
    // destructuring options
    const { length, includeLowercase, includeUppercase, includeNumbers, includeSpecialChars } = options;
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+{}|[]\\;\',./<>?';

    let chars = '';
    if (includeLowercase) chars += lowercaseChars;
    if (includeUppercase) chars += uppercaseChars;
    if (includeNumbers) chars += numberChars;
    if (includeSpecialChars) chars += specialChars;

    // generating password
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    passwordStrength(generatePassword)

  };

  // checking strenght of the password
  const passwordStrength = (password) => {

    if (password.length <= 6) {
      setStrength("Weak")
    }
    else if (password.length <= 8) {
      setStrength("Medium")
    } else {
      setStrength("Strong")
    }
  }

  // handling  various option change
  const handleOptionChange = (option) => {
    setOptions({ ...options, [option]: !options[option] });
  };

  const handleLengthChange = (event) => {
    setOptions({ ...options, length: parseInt(event.target.value) });
  };

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password)
        .then(() => {
          setCopyBtnIcon(<small>copied</small>)
          setTimeout(() => setCopyBtnIcon(<FaCopy />), 3000)
        })
        .catch((error) => alert('Error copying text: '));
    }
  };



  return <>
    <section className='container'>
      <div className='heading'>
        <h2>Password Generator</h2>
      </div>
      <div className='password-input'>
        <input type="text" value={password} readOnly placeholder='password' />
        <button onClick={copyPassword}>{copyBtnIcon === "" ? <FaCopy /> : copyBtnIcon}</button>
      </div>
      <div className='strength'>{strength}</div>
      <div className='checkbox-container'>
        <div className='checkbox'>
          <input type="checkbox" checked={options.includeLowercase} onChange={() => handleOptionChange('includeLowercase')} />
          <label>
            Lowercase
          </label>
        </div>
        <div className='checkbox'>
          <input type="checkbox" checked={options.includeUppercase} onChange={() => handleOptionChange('includeUppercase')} />
          <label>
            Uppercase
          </label>
        </div>
        <div className='checkbox'>
          <input type="checkbox" checked={options.includeNumbers} onChange={() => handleOptionChange('includeNumbers')} />
          <label>
            Numbers
          </label>
        </div>
        <div className='checkbox'>
          <input type="checkbox" checked={options.includeSpecialChars} onChange={() => handleOptionChange('includeSpecialChars')} />
          <label>
            Special Characters
          </label>
        </div>
      </div>
      <div className='lenght-input'>
        <input type="number" defaultValue="4" onChange={handleLengthChange} />
        <label>
          Password Length
        </label>
      </div>

      <div className='btn'>
        <button onClick={generatePassword}>Generate</button>
      </div>
    </section>

  </>
}

export default index
