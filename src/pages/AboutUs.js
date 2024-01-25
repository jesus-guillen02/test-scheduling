import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const initialScholarsByYear = {
      '2024': [
        { name: 'Aguilar, Madeline', slug: 'madeline-aguilar' },
        { name: 'Coppin, Marissa', slug: 'marissa-coppin' },
        { name: 'Duque, Margot', slug: 'margot-duque' },
        { name: 'Guillen, Jesus', slug: 'jesus-guillen' },
        { name: 'Ho, Alexis', slug: 'alexis-ho' },
        { name: 'Hughes, William', slug: 'william-hughes' },
        { name: 'Narayanan, Tejas', slug: 'tejas-narayanan' },
        { name: 'Surampudi, Swapomti', slug: 'swapomti-surampudi' }
      ],
      '2025': [
        { name: 'Burchfield, Jordan', slug: 'jordan-burchfield' },
        { name: 'Busari, Aliyyah', slug: 'aliyyah-busari' },
        { name: 'De Guzman, Catherine', slug: 'catherine-de-guzman' },
        { name: 'Estrada-Contreras, Edith', slug: 'edith-estrada-contreras' },
        { name: 'Gonzalez, Carolina', slug: 'carolina-gonzalez' },
        { name: 'Lugo, Samantha', slug: 'samantha-lugo' },
        { name: 'Nguyen, Emily', slug: 'emily-nguyen' },
        { name: 'Schwartz, Alana', slug: 'alana-schwartz' },
        { name: 'Trujillo, Kayla', slug: 'kayla-trujillo' }
      ],
      '2026': [
        { name: 'Aminkeng, Ashlie-Chelsie', slug: 'ashlie-chelsie-aminkeng' },
        { name: 'Awad, North', slug: 'north-awad' },
        { name: 'Chidambaram, Adhishree', slug: 'adhishree-chidambaram' },
        { name: 'Graham, Journie', slug: 'journie-graham' },
        { name: 'Hughes, Patrick', slug: 'patrick-hughes' },
        { name: 'Medrano, Jasbeth', slug: 'jasbeth-medrano' },
        { name: 'Morales, Jose', slug: 'jose-morales' },
        { name: 'Pozos, Michael', slug: 'michael-pozos' },
        { name: 'Romero, Jade', slug: 'jade-romero' },
        { name: 'Vallejo-Chapa, Ana', slug: 'ana-vallejo-chapa' }
      ],
      '2027': [
        { name: 'Babu, Sahana', slug: 'sahana-babu' },
        { name: 'Burroughs, Madeleine', slug: 'madeleine-burroughs' },
        { name: 'Espinoza, Jonah', slug: 'jonah-espinoza' },
        { name: 'Hijazi, Zeina', slug: 'zeina-hijazi' },
        { name: 'Ho, Megan', slug: 'megan-ho' },
        { name: 'Monrroy-Huerta, Ashley', slug: 'ashley-monrroy-huerta' },
        { name: 'Nguyen, Collin', slug: 'collin-nguyen' },
        { name: 'Ohaji, Chizitere', slug: 'chizitere-ohaji' },
        { name: 'Pagnozzi, Ricky', slug: 'ricky-pagnozzi' },
        { name: 'Simpson, Kamian', slug: 'kamian-simpson' }
      ]
      // ... more scholars and years as needed ...
    };

  function AboutUs() {
    const [scholarsByYear, setScholarsByYear] = useState(initialScholarsByYear);
  
    useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await fetch('/api/scholars'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const fetchedScholars = await response.json();

        // Update the initial data with slugs from the fetched data
        const updatedScholars = Object.keys(scholarsByYear).reduce((acc, year) => {
          acc[year] = scholarsByYear[year].map(scholar => {
            const fetchedScholar = fetchedScholars.find(f => f.id === scholar.id);
            return { ...scholar, slug: fetchedScholar?.slug };
          });
          return acc;
        }, {});

        setScholarsByYear(updatedScholars);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchScholars();
  }, []);

  const renderScholars = (year) => {
    const totalScholars = scholarsByYear[year].length;
    const splitPoint = Math.ceil(totalScholars * 0.5); // Adjust the ratio as needed
  
    const topLineScholars = scholarsByYear[year].slice(0, splitPoint);
    const bottomLineScholars = scholarsByYear[year].slice(splitPoint);
  
    const renderLine = (scholars) => (
      <div className="scholar-line">
        {scholars.map((scholar, index) => (
          <Link key={scholar.id} to={`/about/scholars/${scholar.slug}`} className="scholar-link">
            {scholar.name}{index < scholars.length - 1 ? ' | ' : ''}
          </Link>
        ))}
      </div>
    );
    
  
    return (
      <div key={year}>
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
