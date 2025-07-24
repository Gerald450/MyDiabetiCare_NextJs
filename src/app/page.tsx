import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-white text-gray-800">
      {/* Intro Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-sky-400">My</span>DiabetiCare
        </h1>
        <p className="text-lg max-w-2xl">
          An AI-powered comprehensive diabetes management app for Type I, Type II, and Prediabetes.
          <br />Simplifying care, predicting risks, and empowering patients.
        </p>
        <Link href="#main" className="mt-6 inline-block px-6 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">Explore</Link>
      </section>

      {/* Navigation */}
      <header className="bg-gray-100 shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold">MyDiabetiCare</Link>
          <nav>
            <ul className="flex flex-wrap gap-4 text-sm">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/login">Login/Sign Up</Link></li>
              <li><Link href="/profile">My Profile</Link></li>
              <li><a href="#features">Features</a></li>
              <li><Link href="/glucoseMonitoring">Glucose Monitoring</Link></li>
              <li><Link href="/diet+ExerciseTrack">Diet & Exercise Tracking</Link></li>
              <li><Link href="https://kyle-muchipi.github.io/Telehealth/index.html" target="_blank">Telehealth</Link></li>
              <li><Link href="/virtuadoc">VirtuaDoc</Link></li>
              <li><Link href="/medManagement">Medication Management</Link></li>
              <li><Link href="/ehrReports">Reports</Link></li>
              <li><Link href="/educationResources">Education & Support</Link></li>
              <li><Link href="/ehrReports">EHR Integration</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <section id="main" className="px-4 max-w-7xl mx-auto">
        {/* About */}
        <div className="my-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Why MyDiabetiCare?</h2>
          <p className="mb-6">
            Over 38 million Americans live with diabetes, and 96 million have prediabetes. 75% don't manage it well, leading to costly complications.
            <br />MyDiabetiCare changes that through smart, proactive care powered by AI.
          </p>
          <img
            src="https://api.prd.lottie.org/images/An_old_couple_smiling_37fd0fe4e9.webp"
            alt="MyDiabetiCare"
            width={900}
            height={600}
            className="mx-auto rounded shadow"
          />
        </div>

        {/* Features */}
        <section id="features" className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={feature.image} alt={feature.title} width={400} height={250} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="mb-4">{feature.description}</p>
                <Link href={feature.link} className="inline-block px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition">
                  Go
                </Link>
              </div>
            </article>
          ))}
        </section>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="mt-20 bg-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <input type="text" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block mb-1">Message</label>
              <textarea className="w-full border rounded px-3 py-2" rows={4}></textarea>
            </div>
            <button type="submit" className="bg-sky-500 text-white px-6 py-2 rounded hover:bg-sky-600 transition">Send Message</button>
          </form>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Address</h3>
              <p>University of Arkansas at Pine Bluff<br />Pine Bluff, AR</p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p><a href="mailto:info@mydiabeticare.com" className="text-sky-500">info@mydiabeticare.com</a></p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10 text-sm text-gray-500">
          &copy; MyDiabetiCare. Design adapted for: <Link href="https://bobo-creator.github.io/MyDiabetiCare/">MyDiabetiCare</Link>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    title: 'Real-time Glucose Monitoring',
    image: 'https://www.datocms-assets.com/46938/1652177632-woman-with-continuous-glucose-monitor.jpeg',
    description: 'Advanced, AI-driven Glucose Monitoring. Bluetooth enabled tracking with instant, easy-to-understand feedback.',
    link: '/glucoseMonitoring',
  },
  {
    title: 'Dietary & Exercise Tracking',
    image: 'https://myprintablehome.com/wp-content/uploads/2020/12/Food-Journal-and-Exercise-Log-Featured-scaled.jpg',
    description: 'AI-tailored exercise & meal recommendations that fit your lifestyle! Snap meals and get instant nutrition insights for smarter eating.',
    link: '/diet+ExerciseTrack',
  },
  {
    title: 'Medication Management',
    image: 'https://www.scripps.org/sparkle-assets/images/managing_medications_1200x750-17004342529536848178.jpg',
    description: 'Automated alerts remind users when to take medications and refill prescriptions, ensuring adherence to treatment plans.',
    link: '/medManagement',
  },
  {
    title: 'Reports & Insights',
    image: 'https://content.strategicabm.com/hubfs/images/img-icon-product-insights-dark.png',
    description: 'Get personalized summaries of how your weekly progress compares to your goals.',
    link: '/ehrReports',
  },
  {
    title: 'Virtual Assistant + TELEHEALTH',
    image: '/images/virtualdoc.png',
    description: 'Built-in AI virtual consultant offers education, answers questions, and connects users to telehealth services.',
    link: 'https://kyle-muchipi.github.io/Telehealth/index.html',
  },
  {
    title: 'EHR INTEGRATION',
    image: '/images/ehr.png',
    description: 'We securely connect to your doctor’s EHR system to streamline your health data sharing.',
    link: '/ehrReports',
  },
  {
    title: 'Education Resources & Community Support',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NRHT2g0qFCgUmsZwWXlz4jRBAkBZDTa2gA&s',
    description: 'Comprehensive diabetes education & peer support platform.',
    link: '/educationResources',
  },
  {
    title: 'Emergency Support & Alerts',
    image: '/images/alert.png',
    description: 'Alerts, GPS locators, and AI-powered risk predictions to prevent emergencies.',
    link: '/glucoseMonitoring',
  },
];
