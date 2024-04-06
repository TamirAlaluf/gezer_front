import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MyForm = ({ formData, handleChange, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (e) => {
    e.preventDefault();
    console.log('Validating form...');
  
    let newErrors = {};
  
    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = ' שדה חובה';
    }else if (!/^[a-zA-Z]+$/.test(formData.username.trim())) {
      newErrors.username = 'שם משתמש לא חוקי';
    }

  
    // Validate ID
    if (!formData.id.trim()) {
      newErrors.id = 'שדה חובה';
    } else if (!/^\d{9}$/.test(formData.id.trim())) {
      newErrors.id = 'תז לא חוקית';
    }
  
    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = ' שדה חובה';
    } 
  
    // Validate courseNumber
    if (!formData.courseNumber.trim()) {
      newErrors.courseNumber = ' שדה חובה';
    }
    else if (!/^\d{1,12}$/.test(formData.courseNumber.trim())) {
      newErrors.courseNumber = 'מספר קורס צריך רק ספרות';
    }
  
    // Validate groupNumber 1- 9 
    if (!formData.groupNumber.trim()) {
      newErrors.groupNumber = ' שדה חובה';
    }else if (!/^[1-9]$/.test(formData.groupNumber.trim())) {
      newErrors.groupNumber = 'מספר קבוצה לא חוקי';
    }

    // Validate moedNumber
    if (!formData.moedNumber) {
      newErrors.moedNumber = ' שדה חובה';
    }
  
    if (Object.keys(newErrors).length > 0) {
      console.log('Validation errors:', newErrors);
      setErrors(newErrors);  // Update the errors state
      return;
    }
  
    console.log('Form data:', formData);
    handleSubmit();
  }


  return (
    <div className="container">
      <h2>טופס בקשת מבחן </h2>
      <form className="form" onSubmit={(e) => validateForm(e)}>
        <div className="form-group">
          <label>שם משתמש:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
          <div className="error">{errors.username}</div>
        </div>
        <div className="form-group">
          <label>תז:</label>
          <input type="text" name="id" value={formData.id} onChange={handleChange} />
          <div className="error">{errors.id}</div>
        </div>
        <div className="form-group">
          <label>סיסמה לגזר:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="error">{errors.password}</div>
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "הסתר" : "הצג "}
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>מספר קורס:</label>
          <input type="text" name="courseNumber" value={formData.courseNumber} onChange={handleChange} />
          <div className="error">{errors.courseNumber}</div>
        </div>
         <div className="form-group">
          <label>מספר קבוצה:</label>
          <input type="text" name="groupNumber" value={formData.groupNumber} onChange={handleChange} />
          <div className="error">{errors.groupNumber}</div>
        </div> 
        <div className="form-group">
          <label>מועד:</label>
          <select name="moedNumber" value={formData.moedNumber} onChange={handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <div className="error">{errors.moedNumber}</div>
        </div>
        {/* <Link to="/submit" className="spacial"> */}
          <button className='spacial' type="submit">הגשה</button>
        {/* </Link> */}
      </form>
    </div>
  );
}

export default MyForm;
