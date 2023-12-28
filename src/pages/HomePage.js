import './HomePage.css'

function HomePage() {
  return (
    <div className="homepage">
      <div className="main-content">
        {/* Dynamic or featured content */}
      </div>

      <div className="image-text-container">
        <img src="../photos/DSC_0759.JPG" alt="Descriptive Alt Text" className="home-image" />
        <div className="text-box">
          <h2>Welcome, Scholars!</h2>
          <h2>(past, present, and future)</h2>
          <p>The UTSA Top Scholar program is a prestigious initiative at the University of Texas at San Antonio (UTSA) designed to nurture and support exceptionally talented and high-achieving students from across Texas. Beyond its comprehensive last-dollar scholarship covering tuition, fees, and room and board for up to four years of undergraduate education, the program offers a holistic educational experience. It empowers students to excel academically, develop leadership skills, and engage with their communities in meaningful ways. Top Scholars benefit from a unique blend of academic enrichment, professional development, and community engagement opportunities, including research experiences, mentorship from faculty and staff, and exclusive interactions with university leaders. This program fosters a close-knit community of scholars, providing them with a supportive network of peers and mentors who share a commitment to academic excellence and service to society. </p>
          <p>Through the UTSA Top Scholar program, students have the opportunity to not only receive a financial scholarship but also actively participate in a dynamic community of scholars. This community offers a wealth of opportunities to grow, learn, and contribute positively to the world. The program's ultimate goal is to prepare highly motivated and high-achieving students for success both academically and professionally while instilling in them a strong sense of social responsibility. If you are a student who seeks to excel academically, lead, and make a meaningful impact, the UTSA Top Scholar program may be the ideal platform to nurture your talents and aspirations on your journey toward a brighter future.</p>
          {/* Other text or elements */}
        </div>
      </div>

    </div>
  );
}

export default HomePage;
