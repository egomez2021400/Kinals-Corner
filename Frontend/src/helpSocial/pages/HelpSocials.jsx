import  { useState, useEffect } from 'react';
import axios from 'axios';
import logo from "../../assets/image/ayudaSocial.png";
import '../../assets/styles/helpSocial.css';
import {URL_GLOBAL} from '../../constant';

function SocialHelpsByUser() {
  const [helpSocials, setHelpSocials] = useState([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const URL = URL_GLOBAL

  const fetchHelpSocials = async () => {
    try {
      const response = await axios.get(`${URL}read-helpSocial`);
      const helpSocialsData = response.data;

      setHelpSocials(helpSocialsData);
    } catch (error) {
      console.error(error);
      setError('Error al obtener las ayudas sociales');
    }
  }

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle('');
    setDescription('');
    setClaimantName('');
    setClaimed(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}create-helpSocial`, {
        token: localStorage.getItem('token'),
        title,
        description,
        claimantName,
        claimed
      });

      console.log(response.data);

      // Clear the form and close it
      handleCloseForm();

      fetchHelpSocials();
      setError('');
    } catch (error) {
      console.error(error);
      setError('Error al crear la ayuda social');
    }
  };

  useEffect(() => {
    fetchHelpSocials();
  }, []);

  return (
    <div>
      <h2 style={{ marginLeft: '70px', marginTop: '50px' }}>Lista y creación de ayuda sociales</h2>
      <button style={{ marginLeft: '70px' }} className='create' onClick={() => setShowForm(true)}>Agregar ayuda social</button>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container" style={{ marginTop: '15px' }}>
            <form onSubmit={handleSubmit}>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              <label>Description:</label>
              <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <ul />
              <div className='contenedor de botones'>
                <button type="submit">Crear ayuda social</button>
                <button type="button" onClick={handleCloseForm}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className='wrapper centered-wrapper' style={{ marginTop: '25px' }}>
        {helpSocials.map((helpSocial) => (
          <div key={helpSocial._id} className='card' style={{marginLeft: '25%' ,marginTop: '20px', padding: '10px' }}>
            <div className='card-img'>
              <img src={logo} style={{ width: '400px' }} alt="Ayuda Social" />
            </div>
            <div className='user-card-info' style={{ marginLeft: '350px', marginTop: '-200px', marginRight: '150px' }}>
              <h2><span>{helpSocial.title}</span></h2>
              <p><span>Descripción:</span> {helpSocial.description}</p>
              <p><span>Claimed:</span> {helpSocial.claimed ? 'Yes' : 'No'}</p>
              {helpSocial.claimed && <p><span>Claimant Name:</span> {helpSocial.claimantName}</p>}
              <p><span>Claim Date:</span> {new Date(helpSocial.claimDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocialHelpsByUser;



{/* <div>
      <h1>Social Help List</h1>
      {error && <p>{error}</p>}
      <ul>
        {helpSocials.map((helpSocial) => (
          <li key={helpSocial._id} className='card'>
            <h2>{helpSocial.title}</h2>
            <p>{helpSocial.description}</p>
            <p>Image: {helpSocial.image}</p>
            <p>Claimed: {helpSocial.claimed ? 'Yes' : 'No'}</p>
            {helpSocial.claimed && <p>Claimant Name: {helpSocial.claimantName}</p>}
            <p>Claim Date: {new Date(helpSocial.claimDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Help Social</h2>
        <form onSubmit={handleSubmit}>
          {/* Remove token input */}
    //       <label>Title:</label>
    //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    //       <label>Description:</label>
    //       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
    //       <button type="submit">Create</button>
    //     </form>
    //   </div>
    // </div> */}