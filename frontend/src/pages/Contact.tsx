import '../App.css'; 

const Contact = () => {
  console.log("Contact component rendered"); // Debug log
  return (
    <div className="app" style={{ 
      paddingTop: '78px', 
      backgroundColor: '#000000', 
      color: '#FFFFFF', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center' 
    }}>
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <h1>Contact Us</h1>
        <p>Address: Av. Hoji ya Henda 132, Luanda</p>
        <p>Email: example@domain.com</p>
        <p>Phone: +244 123 456 789</p>
      </div>
    </div>
  );
};

export default Contact;