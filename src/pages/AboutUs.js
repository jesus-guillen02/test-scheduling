import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

function AboutUs() {
  const scholarsByYear = {
    '2024': [{ name: 'Aguilar, Madeline', id: '1' }, { name: ' Coppin, Marissa', id: '2' }, { name: ' Duque, Margot', id: '3' }, { name: ' Guillen, Jesus', id: '4' }, { name: ' Ho, Alexis', id: '5' } ,{ name: ' Hughes, William', id: '6' }, { name: ' Narayanan, Tejas', id: '7' }, { name: ' Surampudi, Swapomti', id: '8' }],
    '2025': [{ name: 'Burchfield, Jordan', id: '9' }, { name: ' Busari, Aliyyah', id: '10' }, { name: ' De Guzman, Catherine', id: '11' }, { name: ' Estrada-Contreras, Edith', id: '12' }, { name: ' Gonzalez, Carolina', id: '13' }, { name: ' Lugo, Samantha', id: '14' }, { name: ' Nguyen, Emily', id: '15' }, { name: ' Schwartz, Alana', id: '16' }, { name: ' Trujillo, Kayla', id: '17' }],
    '2026': [{ name: 'Aminkeng, Ashlie-Chelsie', id: '18' }, { name: ' Awad, North', id: '19' }, { name: ' Chidambaram, Adhishree', id: '20' }, { name: ' Graham, Journie', id: '21' }, { name: ' Hughes, Patrick', id: '22' }, { name: ' Medrano, Jasbeth', id: '23' }, { name: ' Morales, Jose', id: '24' }, { name: ' Pozos, Michael', id: '25' }, { name: ' Romero, Jade', id: '26' }, { name: ' Vallejo-Chapa, Ana', id: '27' }],
    '2027': [{ name: 'Babu, Sahana', id: '28' }, { name: ' Burroughs, Madeleine', id: '29' }, { name: ' Espinoza, Jonah', id: '30' }, { name: ' Hijazi, Zeina', id: '31' }, { name: ' Ho, Megan', id: '32' }, { name: ' Monrroy-Huerta, Ashley', id: '33' }, { name: ' Nguyen, Collin', id: '34' }, { name: ' Ohaji, Chizitere', id: '35' }, { name: ' Pagnozzi, Ricky', id: '36' }, { name: ' Simpson, Kamian', id: '37' }],
    // More scholars grouped by year...
  };

  const renderScholars = (year) => {
    const totalScholars = scholarsByYear[year].length;
    // Define the split point, more on the top line
    const splitPoint = Math.ceil(totalScholars * 0.5); // Adjust the ratio as needed
  
    const topLineScholars = scholarsByYear[year].slice(0, splitPoint);
    const bottomLineScholars = scholarsByYear[year].slice(splitPoint);
  
    const renderLine = (scholars) => (
      <div className="scholar-line">
        {scholars.map((scholar, index) => (
          <Link key={scholar.slug} to={`/about/scholars/${scholar.slug}`} className="scholar-link">
            {scholar.name}{index < scholars.length - 1 ? ' | ' : ''}
          </Link>
        ))}
      </div>
    );
  
    return (
      <div>
        <h2>Class of '{year.substring(2)}</h2>
        {renderLine(topLineScholars)}
        {renderLine(bottomLineScholars)}
      </div>
    );
  };
  


  return (
    <div className="aboutUs">
      <h1>About Us</h1>
      <p>Welcome to our Scholar's 'About Us' Page!</p>
      {Object.keys(scholarsByYear).map(year => renderScholars(year))}

      <div className="mission-statement">
        <h1>Our Mission</h1>
        <p>The Top Scholar Program and the UTSA Honors College provide a unique educational experience for academically talented students. Our students join our community from across Texas, the United States, and all over the world. They are diverse in thought and share a commitment to excellence. The Honors College is open to students from all academic disciplines and currently has 2,000+ students. We welcome students from all backgrounds into our community. Through our curriculum, special programs, and academic counseling, we help students reimagine their horizons so that they exceed their own expectations. We believe that students succeed when they are well-rounded, and our curriculum lets them customize their learning inside and outside of the classroom in six areas: Service, Professional Development, Intellectual Achievement and Research, Cultural Exploration, Engaged Living, and Skill Development (S.P.I.C.E.S.).
      By making Honors a place where knowledge comes alive to solve problems, we develop talented, committed students who will contribute to the intellectual, economic, and social capital of San Antonio and the State of Texas. The experiences that the Honors College creates yield jobs, a robust and multigenerational landscape of leaders, and broader political and civic participation. As much as we coach students toward academic and career success, our ethos stresses that students are honorable, equitable, resilient, benevolent, and supportive (H.E.R.B.S.).
      In this section of our site, you’ll meet our staff and our community partners and learn about what we stand for as an Honors Community.</p>
      </div>

      {/* Static content */}
      {/* Social media links or other contact information */}
    </div>    
  );   
};

export default AboutUs;
