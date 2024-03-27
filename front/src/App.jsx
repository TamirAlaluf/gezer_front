import { useState } from 'react';
import './App.css';
import MyForm from './components/ui/MyForm.jsx';

function App() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    courseNumber: '',
    groupNumber: '',
    moedNumber: '1'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    console.log('Event:', e);
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 


  const handleSubmit = (e) => {

    console.log('Form data:', formData);
    setLoading(true); // Set loading to true on form submission

    // e.preventDefault();

  fetch('http://localhost:5000/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    console.log('Response:', response);
    if (response.status === 200) {
      console.log('Form data sent successfully!');
      return response.blob(); // Extract PDF blob from the response
    } 
    else if (response.status === 401){
      alert("פרטי הכניסה שגויים")
      return;
    }
    else {
      alert("המחברת עדיין לא פורסמה")
      return;
    }
  })
  .then(blob => {

    // print the blob
    console.log(blob);

    // Create a URL for the blob
    const pdfUrl = URL.createObjectURL(blob);
    
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', 'exam.pdf'); // Set the filename for the download

    // Append the link to the document body and trigger the click event
    document.body.appendChild(link);
    link.click();

    // Cleanup: remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(pdfUrl);
  })
  .catch(error => {
    return;
  })
  .finally(() => {
    setLoading(false); // Set loading back to false after fetching
    setSubmitted(true); // Set submitted to true after form submission

  });
  };





  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // if (submitted) {
  //   return <div>Form submitted successfully!</div>;
  // }
  return (
    <div className="App">
  <header className="App-header">
    <h1>שליפת מבחן מהגזר</h1>
  </header>
  <section className="about">
    <div>
      <h2>שירות המערכת</h2>
      <p>שירות זה מאפשר לך להוריד מבחן מהגזר בקלות ובמהירות.</p>
      <p>
      מטרת המערכת היא לספק הנגשה של שליפת מחברת המבחן ממערכת גזר במצב בו מופיעה ההודעה "המחברת נסרקה אך תפורסם לאחר פרסום הציונים" 
בשלב זה אנו יודעים להוציא את המחברת בצורה מאובטחת תוך שמירה על פרטיות המידע.<br></br>
 שום מידע אישי לא נשמר על הסטודנטים
      </p>
    </div>
  </section>

  <section className="requirements">
    <div>
      <h2>דרישות המערכת</h2>
      <p>על מנת שהמערכת תוכל לספק עבורך את המחברת אנו נזדקדק לכמה פרטים אישיים:
        <ul>
          <li>תעודת זהות</li>
          <li>שם משתמש וסיסמה של הגזר</li>
          <li>מספר קורס</li>
          <li>מספר קבוצה</li>
          <li>מועד</li>
        </ul>  
      </p>
      <p>
         אין שמירה של פרטי הסטודנטים במערכת והכל נעשה באופן מאובטח ומוצפן.
      </p>
    </div>
  </section>
  <MyForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
</div>
    
  );
}

export default App;
